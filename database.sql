CREATE TABLE "users" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "username", varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "password_hash" varchar(255),
    "bio" text,
    "profile_picture" text,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "is_active" boolean DEFAULT true,
    CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
)

CREATE TABLE "user_sessions" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "session_token" varchar(255) NOT NULL,
    "expires_at" timestamp NOT NULL,
    "created_at" timestamp DEFAULT now(),
    CONSTRAINT "user_sessions_session_token_unique" UNIQUE("session_token")
)

CREATE TABLE "oauth_accounts" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "provider" varchar(50) NOT NULL,
    "provider_account_id" varchar(255) NOT NULL,
    "access_token" text,
    "refresh_token" text,
    "expires_at" timestamp,
    "created_at" timestamp DEFAULT now(),
    CONSTRAINT "oauth_accounts_provider_account_unique" UNIQUE("provider","provider_account_id")
)

CREATE TABLE "projects" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "name" varchar(255) NOT NULL,
    "creator_id" varchar(36) NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "last_activity_at" timestamp DEFAULT now(),
    "logo" text,
)

CREATE TABLE "links" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "project_id" varchar(36) NOT NULL,
    "source_id" varchar(36) NOT NULL,
    "source_type" varchar(36) NOT NULL,
    "target_id" varchar(36) NOT NULL,
    "target_type" varchar(36) NOT NULL,
    "created_at" timestamp DEFAULT now()
)

CREATE TABLE "email_verification_tokens" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "token" varchar(255) NOT NULL,
    "expires_at" timestamp NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "used" boolean DEFAULT false,
    CONSTRAINT "email_verification_tokens_token_unique" UNIQUE("token")
)

CREATE TABLE "tasks" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "project_id" varchar(36) NOT NULL,
    "contributor_id" varchar(36) NOT NULL,
    "completed_by" varchar(36),
    "started_by" json DEFAULT '[]'::json,
    "assigned_to" varchar(36),
    "assigned_by" varchar(36),
    "title" varchar(255) NOT NULL,
    "prepare" text,
    "implement" text,
    "verify" text,
    "status" varchar(20) DEFAULT 'pending', -- 'pending', 'blocked', 'in_progress', 'completed', 'review'
    "workspace" varchar(20) DEFAULT 'core', -- 'core', 'feature', 'experiment'
    "dependencies" json DEFAULT '[]'::json,
    "allocated_time" integer,
    "actual_time_spent" float,
    "started_at" timestamp,
    "all_start_times" json DEFAULT '[]'::json,
    "completed_at" timestamp,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
)

CREATE TABLE "ideas" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "project_id" varchar(36) NOT NULL,
    "contributor_id" varchar(36) NOT NULL,
    "title" varchar(255) NOT NULL,
    "content" text,
    "type" varchar(20) DEFAULT 'note' NOT NULL, -- 'note', 'design', 'sketch', 'protocol', 'equation'
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
)


CREATE TABLE "suggestions" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "project_id" varchar(36) NOT NULL,
    "suggested_by" varchar(36) NOT NULL,
    "status" varchar(20) DEFAULT 'pending' NOT NULL, -- 'pending', 'rejected', 'accepted'
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
)

CREATE TABLE "suggestions_deletions" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "tasks" json DEFAULT '[]'::json,
    "ideas" json DEFAULT '[]'::json,
    "links" json DEFAULT '[]'::json,
)


CREATE TABLE "suggestions_additions" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "tasks" json DEFAULT '[]'::json,
    "ideas" json DEFAULT '[]'::json,
    "links" json DEFAULT '[]'::json,

-- Notes:
-- `tasks` is a JSON array of Task Objects with structure {"id", "title", "verify", "prepare", "implement", "workspace", "allocated_time"}
-- `ideas` has structure {"id", "title", "content", "type"}
-- `links` has structure {"id", "source_id", "source_type", "target_id", "target_type"}
)


CREATE TABLE "join_requests" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "project_id" varchar(36) NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "sender_user_id" varchar(36) NOT NULL,
    "status" varchar(20) DEFAULT 'pending', -- 'pending', 'rejected', 'accepted'
    "created_at" timestamp DEFAULT now(),
    CONSTRAINT "unique_project_request" UNIQUE("project_id","user_id")
)

CREATE TABLE "project_members" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "project_id" varchar(36) NOT NULL,
    "is_admin" boolean DEFAULT false,
    "joined_at" timestamp DEFAULT now(),
    CONSTRAINT "unique_project_member" UNIQUE("project_id","user_id")
)

CREATE TABLE "meetings" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "project_id" varchar(36) NOT NULL,
    "title" varchar(255) NOT NULL,
    "started_by" varchar(36) NOT NULL,
    "start_time" timestamp NOT NULL,
    "end_time" timestamp,
    "status" varchar(20) DEFAULT 'planned', -- 'planned', 'ended', 'ongoing', 'cancelled'
)

CREATE TABLE "meeting_participant" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "meeting_id" varchar(36) NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "join_time" timestamp DEFAULT now(),
    "leave_time" timestamp,
)

CREATE TABLE "messages" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "senderId" varchar(36) NOT NULL,
    "project_id" varchar(36) NOT NULL,
    "content" text,
    "image_url" text,
    "mentions" json DEFAULT '[]'::json,
    "timestamp" timestamp DEFAULT now(),
    "edited_at" timestamp,
    "is_deleted" boolean DEFAULT false,
    "is_deleted_by_admin" boolean DEFAULT false
)

CREATE TABLE "message_statuses" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "message_id" varchar(36) NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "status" varchar(20) DEFAULT 'sent' NOT NULL, -- 'sent', 'received', 'read'
    "received_at" timestamp,
    "read_at" timestamp,
    CONSTRAINT "unique_message_status" UNIQUE("message_id","user_id")
)

CREATE TABLE "message_reactions" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "message_id" varchar(36) NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "timestamp" timestamp DEFAULT now(),
    "emoji" varchar(255) NOT NULL,
    CONSTRAINT "unique_message_reaction" UNIQUE("message_id","user_id")
)

CREATE TABLE "files" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "project_id" varchar(36) NOT NULL,
    "title" varchar(255) NOT NULL,
    "path" text,
    "size" varchar(10) DEFAULT "0Ko" NOT NULL,
    "is_editable" boolean DEFAULT true,
    "last_modified" timestamp DEFAULT now(),
)

CREATE TABLE "cursors_in_doc_collab" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "file_id" varchar(36) NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "position" int NOT NULL,
)

CREATE TABLE "doc_presence" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "file_id" varchar(36) NOT NULL,
    "isPresent" boolean default false,
)

CREATE TABLE "folders" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "project_id" varchar(36) NOT NULL,
    "parent_id" varchar(36) NOT NULL,
    "name" varchar(255) NOT NULL
)


CREATE TABLE "file_folders" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "folder_id" varchar(36) NOT NULL,
    "file_id" varchar(36) NOT NULL,
)

CREATE TABLE "document_edits" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "file_id" varchar(36) NOT NULL,
    "timestamp" timestamp,
    "operation" text,
)

CREATE TABLE "daily_logs" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "project_id" varchar(36) NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "timestamp" timestamp DEFAULT now(),
    "content" text,
)


CREATE TABLE "task_notes" (
    "id" varchar(36) PRIMARY KEY NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "task_id" varchar(36) NOT NULL,
    "timestamp" timestamp DEFAULT now(),
    "content" text,
)