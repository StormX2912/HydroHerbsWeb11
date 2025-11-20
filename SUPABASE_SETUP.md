# Supabase Setup Guide

## Step 1: Create Supabase Account & Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Click "New Project"
4. Fill in:
   - **Name**: HydroHerbs (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
5. Click "Create new project" (takes 1-2 minutes)

## Step 2: Get Your Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon)
2. Click **API** in the left sidebar
3. You'll see:
   - **Project URL** (this is your `SUPABASE_URL`)
   - **anon/public key** (this is your `SUPABASE_ANON_KEY`)

## Step 3: Set Environment Variables

Create or update your `.env` file in the project root:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Never commit your `.env` file to git! It should already be in `.gitignore`.

## Step 4: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy and paste the entire contents of `server/db/supabase-schema.sql`
4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned" - this means the tables were created!

## Step 5: Verify Tables

1. Go to **Table Editor** in the left sidebar
2. You should see two tables:
   - `contact_submissions` - Stores feedback form data
   - `newsletter_subscriptions` - Stores newsletter email subscriptions

## Step 6: Test the Connection

1. Start your dev server: `npm run dev` (or `pnpm dev`)
2. Check the console - you should see: `✅ Supabase connected successfully`
3. If you see an error, double-check your `.env` file credentials

## Database Tables

### `contact_submissions`
Stores user feedback from the contact form:
- `id` (UUID) - Primary key
- `name` - User's name
- `blend` - Selected tea blend
- `taste_rating` - Rating 1-10
- `aroma_rating` - Rating 1-10
- `packaging_rating` - Rating 1-10
- `overall_experience` - Rating 1-10
- `would_buy` - Would they buy again?
- `liked_most` - What they liked most
- `stood_out` - What stood out
- `improve` - Suggestions for improvement
- `created_at` - Timestamp
- `updated_at` - Timestamp

### `newsletter_subscriptions`
Stores newsletter email subscriptions:
- `id` (UUID) - Primary key
- `email` - Email address (unique)
- `subscribed_at` - When they subscribed
- `is_active` - Active status (true/false)
- `updated_at` - Timestamp

## Viewing Data in Supabase

- **Table Editor**: View and edit data directly in the dashboard
- **SQL Editor**: Run custom queries
- **API Docs**: Auto-generated API documentation for your tables

## Troubleshooting

**Connection failed?**
- Check your `.env` file has correct `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Make sure there are no extra spaces or quotes in the values
- Restart your dev server after updating `.env`

**Tables not found?**
- Make sure you ran the SQL schema in Step 4
- Check the SQL Editor for any error messages

**Insert errors?**
- Check that the table structure matches the code
- Verify your Supabase project is active (not paused)

