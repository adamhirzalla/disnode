DROP TABLE IF EXISTS server_tags CASCADE;
DROP TABLE IF EXISTS connections CASCADE;
DROP TABLE IF EXISTS requests CASCADE;
DROP TABLE IF EXISTS friends CASCADE;
DROP TABLE IF EXISTS views CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS participants CASCADE;
DROP TABLE IF EXISTS dms CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS channels CASCADE;
DROP TABLE IF EXISTS servers CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS icons CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS roles CASCADE;

CREATE TYPE "roles" AS ENUM (
  'user',
  'mod',
  'admin',
  'owner'
);

CREATE TABLE users (
  "id" SERIAL PRIMARY KEY,
  "full_name" VARCHAR(255),
  "nickname" VARCHAR(255),
  "username" VARCHAR(255) UNIQUE,
  "email" VARCHAR(255) UNIQUE,
  "password" VARCHAR(255),
  "avatar" VARCHAR(255),
  "bio" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "is_active" BOOLEAN DEFAULT true
);

CREATE TABLE icons (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "path" VARCHAR(255)
);

CREATE TABLE tags (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255)
);

CREATE TABLE servers (
  "id" SERIAL PRIMARY KEY,
  "creator_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "title" VARCHAR(255),
  "logo" VARCHAR(255),
  "invite_code" VARCHAR(255)
);

CREATE TABLE channels (
  "id" SERIAL PRIMARY KEY,
  "creator_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "server_id" INT REFERENCES servers(id) ON DELETE CASCADE,
  "title" VARCHAR(255),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE members (
  "id" SERIAL PRIMARY KEY,
  "server_id" INT REFERENCES servers(id) ON DELETE CASCADE,
  "user_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "role" roles,
  "joined_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE dms (
  "id" SERIAL PRIMARY KEY,
  "creator_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE participants (
  "id" SERIAL PRIMARY KEY,
  "dm_id" INT REFERENCES dms(id) ON DELETE CASCADE,
  "user_id" INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE messages (
  "id" SERIAL PRIMARY KEY,
  "sender_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "dm_id" INT REFERENCES dms(id) ON DELETE CASCADE,
  "channel_id" INT REFERENCES channels(id) ON DELETE CASCADE,
  "body" TEXT,
  "sent_at" TIMESTAMP DEFAULT NOW(),
  "last_edited" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE views (
  "id" SERIAL PRIMARY KEY,
  "message_id" INT REFERENCES messages(id) ON DELETE CASCADE,
  "user_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "viewed_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE friends (
  "id" SERIAL PRIMARY KEY,
  "user1_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "user2_id" INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE requests (
  "id" SERIAL PRIMARY KEY,
  "sender_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "receiver_id" INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE connections (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "icon_id" INT REFERENCES icons(id) ON DELETE CASCADE,
  "url" VARCHAR(255)
);

CREATE TABLE server_tags (
  "id" SERIAL PRIMARY KEY,
  "server_id" INT REFERENCES servers(id) ON DELETE CASCADE,
  "tag_id" INT REFERENCES tags(id) ON DELETE CASCADE
);