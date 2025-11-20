import { RequestHandler } from "express";
import { supabase } from "../db/supabase";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  blend: z.string().min(1, "Blend selection is required"),
  tasteRating: z.number().int().min(1).max(10),
  aromaRating: z.number().int().min(1).max(10),
  packagingRating: z.number().int().min(1).max(10),
  overallExperience: z.number().int().min(1).max(10),
  wouldBuy: z.string().optional(),
  likedMost: z.string().optional(),
  stoodOut: z.string().optional(),
  improve: z.string().optional(),
});

export const handleContactSubmission: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const validationResult = contactSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: validationResult.error.errors,
      });
    }

    const data = validationResult.data;

    // Insert into Supabase
    const { data: result, error } = await supabase
      .from("contact_submissions")
      .insert({
        name: data.name,
        blend: data.blend,
        taste_rating: data.tasteRating,
        aroma_rating: data.aromaRating,
        packaging_rating: data.packagingRating,
        overall_experience: data.overallExperience,
        would_buy: data.wouldBuy || null,
        liked_most: data.likedMost || null,
        stood_out: data.stoodOut || null,
        improve: data.improve || null,
      })
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      message: "Thank you for your feedback! We'll review it shortly.",
      id: result.id,
    });
  } catch (error: any) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to submit feedback. Please try again later.",
    });
  }
};

