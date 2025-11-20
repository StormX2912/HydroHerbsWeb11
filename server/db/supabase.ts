import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// Supabase connection
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️  Supabase credentials not found. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("newsletter_subscriptions").select("count").limit(1);
    
    if (error && error.code !== "PGRST116") { // PGRST116 = table doesn't exist (expected on first run)
      throw error;
    }
    
    console.log("✅ Supabase connected successfully");
    return true;
  } catch (error: any) {
    console.error("❌ Supabase connection failed:", error.message);
    return false;
  }
}

