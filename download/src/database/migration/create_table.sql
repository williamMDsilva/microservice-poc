-- DROP TABLE IF EXISTS document;

CREATE TABLE IF NOT EXISTS document (
    "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "data" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "ready" BOOLEAN NOT NULL DEFAULT false
)