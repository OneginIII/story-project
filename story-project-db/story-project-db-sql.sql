CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "username" text,
  "password" varchar,
  "created_at" timestamp
);

CREATE TABLE "stories" (
  "id" uuid PRIMARY KEY,
  "created_by" uuid,
  "title" text,
  "icon" text,
  "url" varchar UNIQUE,
  "visible" boolean,
  "created_at" timestamp,
  "modified_at" timestamp
);

CREATE TABLE "chapters" (
  "id" uuid PRIMARY KEY,
  "story_id" uuid,
  "number" serial,
  "title" text,
  "text" text,
  "created_at" timestamp,
  "modified_at" timestamp
);

ALTER TABLE "stories" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "chapters" ADD FOREIGN KEY ("story_id") REFERENCES "stories" ("id");
