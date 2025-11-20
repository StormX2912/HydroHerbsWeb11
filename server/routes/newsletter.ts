import { RequestHandler } from "express";
import { supabase } from "../db/supabase";
import { z } from "zod";

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const handleNewsletterSubscription: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const validationResult = newsletterSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address",
      });
    }

    const { email } = validationResult.data;

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from("newsletter_subscriptions")
      .select("id, is_active")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows returned (email doesn't exist)
      throw checkError;
    }

    if (existing) {
      // Email exists - reactivate if inactive
      if (!existing.is_active) {
        const { error: updateError } = await supabase
          .from("newsletter_subscriptions")
          .update({ is_active: true })
          .eq("email", email);

        if (updateError) {
          throw updateError;
        }

        return res.json({
          success: true,
          message: "Welcome back! You've been resubscribed to our newsletter.",
        });
      } else {
        return res.json({
          success: true,
          message: "You're already subscribed to our newsletter!",
        });
      }
    }

    // Insert new subscription
    const { error: insertError } = await supabase
      .from("newsletter_subscriptions")
      .insert({ email });

    if (insertError) {
      // Handle duplicate entry error (unique constraint violation)
      if (insertError.code === "23505") {
        return res.json({
          success: true,
          message: "You're already subscribed to our newsletter!",
        });
      }
      throw insertError;
    }

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to our newsletter!",
    });
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    
    // Handle duplicate entry error
    if (error.code === "23505") {
      return res.json({
        success: true,
        message: "You're already subscribed to our newsletter!",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to subscribe. Please try again later.",
    });
  }
};

