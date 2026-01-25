import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  details: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const submission: ContactSubmission = await req.json();
    
    console.log("New contact form submission:", {
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      project_type: submission.project_type,
      details: submission.details.substring(0, 100) + "...",
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
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
