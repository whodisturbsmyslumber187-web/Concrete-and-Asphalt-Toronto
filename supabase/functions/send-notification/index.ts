import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-captcha-token",
};

interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  details: string;
}

// Input validation constants
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MAX_PHONE_LENGTH = 20;
const MIN_PHONE_LENGTH = 10;
const MAX_DETAILS_LENGTH = 5000;
const MIN_DETAILS_LENGTH = 10;
const VALID_PROJECT_TYPES = ["residential", "commercial", "hospitality", "other"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateSubmission = (submission: unknown): { valid: boolean; error?: string } => {
  if (!submission || typeof submission !== "object") {
    return { valid: false, error: "Invalid request format" };
  }

  const data = submission as ContactSubmission;

  // Validate name
  if (!data.name || typeof data.name !== "string") {
    return { valid: false, error: "Name is required" };
  }
  if (data.name.trim().length < 1 || data.name.length > MAX_NAME_LENGTH) {
    return { valid: false, error: `Name must be between 1 and ${MAX_NAME_LENGTH} characters` };
  }

  // Validate email
  if (!data.email || typeof data.email !== "string") {
    return { valid: false, error: "Email is required" };
  }
  if (data.email.length > MAX_EMAIL_LENGTH) {
    return { valid: false, error: `Email must be less than ${MAX_EMAIL_LENGTH} characters` };
  }
  if (!EMAIL_REGEX.test(data.email)) {
    return { valid: false, error: "Invalid email format" };
  }

  // Validate phone
  if (!data.phone || typeof data.phone !== "string") {
    return { valid: false, error: "Phone is required" };
  }
  const phoneDigits = data.phone.replace(/[^0-9]/g, "");
  if (phoneDigits.length < MIN_PHONE_LENGTH || phoneDigits.length > MAX_PHONE_LENGTH) {
    return { valid: false, error: `Phone must be between ${MIN_PHONE_LENGTH} and ${MAX_PHONE_LENGTH} digits` };
  }

  // Validate project type
  if (!data.project_type || typeof data.project_type !== "string") {
    return { valid: false, error: "Project type is required" };
  }
  if (!VALID_PROJECT_TYPES.includes(data.project_type)) {
    return { valid: false, error: "Invalid project type" };
  }

  // Validate details
  if (!data.details || typeof data.details !== "string") {
    return { valid: false, error: "Project details are required" };
  }
  if (data.details.trim().length < MIN_DETAILS_LENGTH || data.details.length > MAX_DETAILS_LENGTH) {
    return { valid: false, error: `Details must be between ${MIN_DETAILS_LENGTH} and ${MAX_DETAILS_LENGTH} characters` };
  }

  return { valid: true };
};

const verifyCaptcha = async (token: string): Promise<boolean> => {
  const secret = Deno.env.get("HCAPTCHA_SECRET");
  
  if (!secret) {
    console.error("HCAPTCHA_SECRET not configured - skipping verification");
    // In production with no secret, fail closed for security
    return false;
  }
  
  try {
    const response = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secret,
        response: token,
      }),
    });
    
    const result = await response.json();
    console.log("CAPTCHA verification result:", result.success);
    return result.success === true;
  } catch (error) {
    console.error("CAPTCHA verification error:", error);
    return false;
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get and verify CAPTCHA token
    const captchaToken = req.headers.get("x-captcha-token");
    
    if (!captchaToken) {
      return new Response(
        JSON.stringify({ error: "CAPTCHA verification required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return new Response(
        JSON.stringify({ error: "CAPTCHA verification failed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate submission
    const body = await req.json();
    const validation = validateSubmission(body);
    
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const submission = body as ContactSubmission;
    
    console.log("New contact form submission:", {
      name: submission.name.substring(0, 50),
      email: submission.email,
      phone: submission.phone,
      project_type: submission.project_type,
      details_length: submission.details.length,
    });

    // Get WhatsApp number from secrets
    const whatsappNumber = Deno.env.get("WHATSAPP_NUMBER") || "+971412345678";
    
    // Log notification details (in production, integrate with email service like Resend)
    console.log(`📧 Email notification would be sent to business owner`);
    console.log(`📱 WhatsApp notification available at: https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notification processed",
        whatsappLink: `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`New inquiry from ${submission.name}: ${submission.details.substring(0, 100)}`)}`
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Notification error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
