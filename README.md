# pchimta-3b4d8f1a-f8ce-4f5f-b2fb-8f1f0e28c7aa-
link:  https://guard-task-guard.lovable.app 

# Secure Task Management System – README

A full-stack **secure Task Management System** built in an Nx-style monorepo with:

- **Backend**: NestJS, TypeORM, JWT authentication, RBAC, audit logging  
- **Frontend**: Angular, TailwindCSS, drag-and-drop task board  
- **Shared libs**: DTOs/interfaces (`libs/data`) and RBAC decorators (`libs/auth`)

The goal is to securely manage tasks so that **only authorized users** can view or modify data, based on **role** and **organization hierarchy**.

---

## 1. Setup Instructions

### 1.1 Prerequisites

- Node.js LTS (≥ 18 recommended)
- npm
- SQLite (CLI or GUI like “DB Browser for SQLite”) – only needed if you want to inspect/seed the DB manually.

### 1.2 Install Dependencies

From the project root:

```bash
npm install
