-- Run this SQL in your Railway MySQL database to set up all tables

CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tech_stack VARCHAR(500),          -- e.g. "React, Node.js, MySQL"
  live_url VARCHAR(500),
  github_url VARCHAR(500),
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),            -- e.g. "Frontend", "Backend", "Tools"
  level INT DEFAULT 80              -- percentage 0-100
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read_status BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin table (one row for you)
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

-- Sample data (edit to match your real info)
INSERT INTO projects (title, description, tech_stack, live_url, github_url, featured) VALUES
('Portfolio Website', 'This full-stack personal portfolio to showcase projects and skills.', 'React, Node.js, MySQL', 'https://yourportfolio.vercel.app', 'https://github.com/you/portfolio', TRUE),
('E-Commerce App', 'A full-stack online shop with cart and payments.', 'React, Express, Stripe', '', 'https://github.com/you/shop', FALSE);

INSERT INTO skills (name, category, level) VALUES
('HTML & CSS', 'Frontend', 90),
('JavaScript', 'Frontend', 85),
('React.js', 'Frontend', 80),
('Node.js', 'Backend', 75),
('Express.js', 'Backend', 75),
('MySQL', 'Database', 70),
('Git & GitHub', 'Tools', 85);
