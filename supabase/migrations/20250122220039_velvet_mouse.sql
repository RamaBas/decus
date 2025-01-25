/*
  # Initial Schema for DECUS Academic Library

  1. Tables
    - users (authentication handled by Supabase Auth)
    - academics
      - id (uuid, primary key)
      - name (text)
      - type (text)
      - cv_url (text)
      - decus_activities (text)
      - photo_url (text)
    - books
      - id (uuid, primary key)
      - title (text)
      - author (text)
      - description (text)
      - category (text)
      - cover_url (text)
      - index_url (text)
    - activities
      - id (uuid, primary key)
      - type (text)
      - title (text)
      - description (text)
      - date (timestamptz)
      - multimedia_url (text)
    - publications
      - id (uuid, primary key)
      - title (text)
      - category (text)
      - cover_url (text)
      - index_url (text)
      - description (text)
      - price (numeric)
      - purchase_link (text)
    - news
      - id (uuid, primary key)
      - title (text)
      - content (text)
      - date (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin write access
*/

-- Create academics table
CREATE TABLE academics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('honorary', 'ordinary')),
  cv_url text,
  decus_activities text,
  photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create books table
CREATE TABLE books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  description text,
  category text NOT NULL,
  cover_url text,
  index_url text
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create activities table
CREATE TABLE activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('course', 'conference', 'seminar', 'concert', 'video', 'theater', 'workshop')),
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  multimedia_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create publications table
CREATE TABLE publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('collection', 'magazine', 'recording', 'video')),
  cover_url text,
  index_url text,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  purchase_link text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create news table
CREATE TABLE news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  date timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE academics ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on academics"
  ON academics FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on books"
  ON books FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on activities"
  ON activities FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on publications"
  ON publications FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on news"
  ON news FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated admin write access
CREATE POLICY "Allow authenticated admin write access on academics"
  ON academics FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow authenticated admin write access on books"
  ON books FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow authenticated admin write access on activities"
  ON activities FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow authenticated admin write access on publications"
  ON publications FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow authenticated admin write access on news"
  ON news FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_academics_updated_at
  BEFORE UPDATE ON academics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_books_updated_at
  BEFORE UPDATE ON books
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at
  BEFORE UPDATE ON activities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_publications_updated_at
  BEFORE UPDATE ON publications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();