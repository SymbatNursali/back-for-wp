-- Enums
CREATE TYPE "event_status" AS ENUM ('pending', 'processed', 'failed');
CREATE TYPE "match_state" AS ENUM ('unmatched', 'partial', 'matched', 'rejected');
CREATE TYPE "ingest_source" AS ENUM ('webhook', 'api', 'csv_import', 'retry_job');

-- Core entities
CREATE TABLE "sessions" (
  "id" BIGSERIAL PRIMARY KEY,
  "session_id" VARCHAR(128) NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW()
);

CREATE TABLE "leads" (
  "id" BIGSERIAL PRIMARY KEY,
  "session_id" BIGINT NOT NULL,
  "lead_token" VARCHAR(128) NOT NULL,
  "fbclid" VARCHAR(255),
  "status" "event_status" NOT NULL,
  "match_state" "match_state" NOT NULL DEFAULT 'unmatched',
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  CONSTRAINT "fk_leads_session" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE RESTRICT
);

CREATE TABLE "wa_chats" (
  "id" BIGSERIAL PRIMARY KEY,
  "wa_chat_id" VARCHAR(128) NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW()
);

CREATE TABLE "wa_messages" (
  "id" BIGSERIAL PRIMARY KEY,
  "wa_chat_ref_id" BIGINT NOT NULL,
  "wa_message_id" VARCHAR(128) NOT NULL,
  "event_id" VARCHAR(128) NOT NULL,
  "status" "event_status" NOT NULL,
  "dedupe_key" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  CONSTRAINT "fk_wa_messages_chat" FOREIGN KEY ("wa_chat_ref_id") REFERENCES "wa_chats"("id") ON DELETE RESTRICT
);

CREATE TABLE "ingest_events" (
  "id" BIGSERIAL PRIMARY KEY,
  "session_id" BIGINT NOT NULL,
  "source" "ingest_source" NOT NULL,
  "dedupe_key" VARCHAR(255) NOT NULL,
  "payload" JSONB NOT NULL,
  "status" "event_status" NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  CONSTRAINT "fk_ingest_events_session" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE RESTRICT
);

CREATE TABLE "meta_events" (
  "id" BIGSERIAL PRIMARY KEY,
  "lead_id" BIGINT,
  "event_id" VARCHAR(128) NOT NULL,
  "dedupe_key" VARCHAR(255) NOT NULL,
  "payload" JSONB NOT NULL,
  "status" "event_status" NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  CONSTRAINT "fk_meta_events_lead" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE SET NULL
);

CREATE TABLE "admin_users" (
  "id" BIGSERIAL PRIMARY KEY,
  "email" VARCHAR(255) NOT NULL,
  "full_name" VARCHAR(255) NOT NULL,
  "role" VARCHAR(64) NOT NULL,
  "password_hash" VARCHAR(255) NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW()
);

CREATE TABLE "status_dictionary" (
  "id" SERIAL PRIMARY KEY,
  "code" VARCHAR(64) NOT NULL,
  "title" VARCHAR(128) NOT NULL,
  "description" VARCHAR(255),
  "is_terminal" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW()
);

CREATE TABLE "label_mappings" (
  "id" BIGSERIAL PRIMARY KEY,
  "external_label" VARCHAR(128) NOT NULL,
  "internal_status_id" INTEGER NOT NULL,
  CONSTRAINT "fk_label_mappings_status" FOREIGN KEY ("internal_status_id") REFERENCES "status_dictionary"("id") ON DELETE RESTRICT
);

-- Unique constraints (including idempotency)
ALTER TABLE "sessions" ADD CONSTRAINT "uq_sessions_session_id" UNIQUE ("session_id");
ALTER TABLE "leads" ADD CONSTRAINT "uq_leads_lead_token" UNIQUE ("lead_token");
ALTER TABLE "leads" ADD CONSTRAINT "uq_leads_fbclid" UNIQUE ("fbclid");
ALTER TABLE "wa_chats" ADD CONSTRAINT "uq_wa_chats_wa_chat_id" UNIQUE ("wa_chat_id");
ALTER TABLE "wa_messages" ADD CONSTRAINT "uq_wa_messages_wa_message_id" UNIQUE ("wa_message_id");
ALTER TABLE "wa_messages" ADD CONSTRAINT "uq_wa_messages_dedupe_key" UNIQUE ("dedupe_key");
ALTER TABLE "ingest_events" ADD CONSTRAINT "uq_ingest_events_dedupe_key" UNIQUE ("dedupe_key");
ALTER TABLE "meta_events" ADD CONSTRAINT "uq_meta_events_dedupe_key" UNIQUE ("dedupe_key");
ALTER TABLE "admin_users" ADD CONSTRAINT "uq_admin_users_email" UNIQUE ("email");
ALTER TABLE "status_dictionary" ADD CONSTRAINT "uq_status_dictionary_code" UNIQUE ("code");
ALTER TABLE "label_mappings" ADD CONSTRAINT "uq_label_mappings_external_internal" UNIQUE ("external_label", "internal_status_id");

-- Required indexes
CREATE INDEX "idx_leads_session_id" ON "leads"("session_id");
CREATE INDEX "idx_leads_status" ON "leads"("status");
CREATE INDEX "idx_leads_created_at" ON "leads"("created_at");
CREATE INDEX "idx_leads_match_state" ON "leads"("match_state");
CREATE INDEX "idx_ingest_events_session_id" ON "ingest_events"("session_id");
CREATE INDEX "idx_ingest_events_status" ON "ingest_events"("status");
CREATE INDEX "idx_ingest_events_created_at" ON "ingest_events"("created_at");
CREATE INDEX "idx_meta_events_event_id" ON "meta_events"("event_id");
CREATE INDEX "idx_meta_events_status" ON "meta_events"("status");
CREATE INDEX "idx_meta_events_created_at" ON "meta_events"("created_at");
CREATE INDEX "idx_wa_messages_event_id" ON "wa_messages"("event_id");
CREATE INDEX "idx_wa_messages_status" ON "wa_messages"("status");
CREATE INDEX "idx_wa_messages_created_at" ON "wa_messages"("created_at");
CREATE INDEX "idx_sessions_created_at" ON "sessions"("created_at");
CREATE INDEX "idx_wa_chats_created_at" ON "wa_chats"("created_at");
CREATE INDEX "idx_admin_users_created_at" ON "admin_users"("created_at");
CREATE INDEX "idx_status_dictionary_created_at" ON "status_dictionary"("created_at");
