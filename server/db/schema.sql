-- HydroHerbs Database Schema
-- Run this SQL in phpMyAdmin or MySQL command line

-- Create database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS hydroherbs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE hydroherbs;

-- Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  blend VARCHAR(100) NOT NULL,
  taste_rating INT NOT NULL,
  aroma_rating INT NOT NULL,
  packaging_rating INT NOT NULL,
  overall_experience INT NOT NULL,
  would_buy VARCHAR(50),
  liked_most TEXT,
  stood_out TEXT,
  improve TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at),
  INDEX idx_blend (blend)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Newsletter Subscriptions Table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  INDEX idx_email (email),
  INDEX idx_subscribed_at (subscribed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

