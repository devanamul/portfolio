-- CreateTable
CREATE TABLE "profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "linkedin" TEXT NOT NULL DEFAULT '',
    "github" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "photo_url" TEXT NOT NULL DEFAULT '/uploads/default-avatar.png',
    "cv_url" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "skills" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "company_url" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL DEFAULT '',
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "tech" TEXT NOT NULL DEFAULT '',
    "bullets" TEXT NOT NULL DEFAULT '[]',
    "display_order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tech" TEXT NOT NULL DEFAULT '',
    "live_url" TEXT NOT NULL DEFAULT '',
    "github_url" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "display_order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "education" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT '',
    "start_year" TEXT NOT NULL DEFAULT '',
    "end_year" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "certifications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "year" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "display_order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "leadership" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "publications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "contact_messages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL,
    "created_at" TEXT NOT NULL DEFAULT ''
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_username_key" ON "admin_users"("username");
