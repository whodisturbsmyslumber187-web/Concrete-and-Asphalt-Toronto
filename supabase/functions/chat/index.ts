import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a helpful assistant for Apex Stairs & Railings, a premium staircase and railing company in Dubai with 60+ years of combined experience.

Key information about the company:
- Services: Custom staircases, glass railings, steel railings, wood railings for residential, commercial, and hospitality projects
- Location: Industrial Area 13, Al Quoz, Dubai, UAE
- Phone: +971 4 123 4567
- Email: info@apexstairs.ae
- Hours: Saturday-Thursday 8AM-6PM

Your role:
- Answer questions about services, materials, and processes
- Provide general pricing guidance (custom quotes required for specific projects)
- Help customers understand project timelines
- Collect basic project information if they want a quote

Keep responses concise, friendly, and professional. If someone wants a detailed quote or needs to speak to a human, offer to connect them to WhatsApp for direct assistance.

When you sense the customer wants to proceed with a quote or speak to someone, suggest they click the "Chat on WhatsApp" button for immediate assistance.`;

// Input validation constants
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 4000;
const VALID_ROLES = ["user", "assistant", "system"];

// Rate limiting configuration
const RATE_LIMIT_REQUESTS = 15; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window

// In-memory rate limiter (resets on function cold start, but provides basic protection)
const rateLimiter = new Map<string, { count: number; reset: number }>();

// Cleanup old entries periodically to prevent memory growth
const cleanupRateLimiter = () => {
  const now = Date.now();
  for (const [key, value] of rateLimiter.entries()) {
    if (value.reset < now) {
      rateLimiter.delete(key);
    }
  }
};

const checkRateLimit = (identifier: string): { allowed: boolean; retryAfter?: number } => {
  const now = Date.now();
  const record = rateLimiter.get(identifier);

  // Cleanup old entries occasionally
  if (Math.random() < 0.1) {
    cleanupRateLimiter();
  }

  if (!record || record.reset < now) {
    rateLimiter.set(identifier, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_REQUESTS) {
    const retryAfter = Math.ceil((record.reset - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
};

const getClientIdentifier = (req: Request): string => {
  // Try to get real client IP from various headers
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  // Fallback to a fingerprint based on available headers
  const userAgent = req.headers.get("user-agent") || "unknown";
  const acceptLanguage = req.headers.get("accept-language") || "unknown";
  return `fingerprint:${userAgent.substring(0, 50)}:${acceptLanguage.substring(0, 20)}`;
};

interface ChatMessage {
  role: string;
  content: string;
}

const validateMessages = (messages: unknown): { valid: boolean; error?: string } => {
  // Check if messages is an array
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Invalid request format: messages must be an array" };
  }

  // Check message count
  if (messages.length === 0) {
    return { valid: false, error: "At least one message is required" };
  }

  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `Too many messages (max ${MAX_MESSAGES})` };
  }

  // Validate each message
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i] as ChatMessage;

    // Check message structure
    if (!msg || typeof msg !== "object") {
      return { valid: false, error: `Invalid message at index ${i}` };
    }

    // Check content exists and is a string
    if (!msg.content || typeof msg.content !== "string") {
      return { valid: false, error: `Invalid message content at index ${i}` };
    }

    // Check content length
    if (msg.content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message too long at index ${i} (max ${MAX_MESSAGE_LENGTH} characters)` };
    }

    // Validate role
    if (!msg.role || !VALID_ROLES.includes(msg.role)) {
      return { valid: false, error: `Invalid message role at index ${i}` };
    }
  }

  return { valid: true };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Apply rate limiting
    const clientId = getClientIdentifier(req);
    const rateCheck = checkRateLimit(clientId);
    
    if (!rateCheck.allowed) {
      console.log(`Rate limit exceeded for client: ${clientId.substring(0, 20)}...`);
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": String(rateCheck.retryAfter || 60)
          } 
        }
      );
    }

    const body = await req.json();
    const { messages } = body;

    // Validate input
    const validation = validateMessages(messages);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
