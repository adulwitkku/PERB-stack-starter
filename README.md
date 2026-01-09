# PERB Stack Starter

> **P**ostgres + **E**lysia + **R**eact (Next.js) + **B**un

Template สำหรับสร้างแอปพลิเคชันแบบ Full-Stack ที่รองรับทั้ง Web, iOS, Android และ Desktop จาก codebase เดียว

## ✨ Features

- 🌐 **Next.js 16** + React 19 + Tailwind CSS 4
- 🚀 **Elysia.js** - API framework ที่เร็วมากบน Bun runtime
- 🗄️ **PostgreSQL** + Drizzle ORM
- 🔐 **Better Auth** - Authentication พร้อมใช้งาน (Email/Password + OAuth)
- 📱 **Tauri 2** - Build native apps (iOS, Android, macOS, Windows, Linux)
- 🌍 **next-intl** - รองรับหลายภาษา (EN/TH)
- 🎨 **shadcn/ui** - UI Components สวยงาม
- 🧪 **Playwright** - E2E Testing

---

## 📋 Prerequisites

ก่อนเริ่มต้น ตรวจสอบให้แน่ใจว่าติดตั้งสิ่งเหล่านี้แล้ว:

- [Bun](https://bun.sh/) - JavaScript runtime & package manager
- [Docker](https://www.docker.com/) - สำหรับรัน PostgreSQL
- [Node.js](https://nodejs.org/) (optional) - บาง tools อาจต้องการ

สำหรับ Mobile Development:
- [Xcode](https://developer.apple.com/xcode/) - สำหรับ iOS (macOS only)
- [Android Studio](https://developer.android.com/studio) - สำหรับ Android

---

## 🚀 Getting Started

### 1. Clone และติดตั้ง Dependencies

```bash
git clone <repository-url>
cd PERB-stack-starter
bun i
```

### 2. ตั้งค่า Environment Variables

```bash
cp .env.example .env
```


แก้ไขไฟล์ `.env` ตามต้องการ:

**หมายเหตุ:** `NEXT_PUBLIC_API_URL` ต้องใช้ IP address ของเครื่องในเครือข่าย (ไม่ใช่ localhost) เพื่อให้ iOS และ Android สามารถเข้าถึง API ได้


```env
DATABASE_URL=postgresql://postgres:randompassword@localhost:5432/perb_db
BETTER_AUTH_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=http://192.168.1.xxx:3000
```

### 3. เริ่ม Database (PostgreSQL)

```bash
docker compose up -d
```

รัน PostgreSQL container ใน background mode  
📖 [Docker Compose Docs](https://docs.docker.com/compose/)

### 4. สร้าง Database Schema

```bash
bun run generate
```

Generate migration files จาก schema ที่กำหนดใน `db/schema.ts`  
📖 [Drizzle Kit Docs](https://orm.drizzle.team/kit-docs/overview)

```bash
bun run migrate
```

Apply migrations ไปยัง database  
📖 [Drizzle Migrations](https://orm.drizzle.team/docs/migrations)

### 5. เริ่ม Development Server

```bash
bun run dev
```

เปิด Next.js development server ที่ http://localhost:3000  
📖 [Next.js Docs](https://nextjs.org/docs)

---

## 🛠️ Available Commands

### Development

| Command | Description |
|---------|-------------|
| `bun i` | ติดตั้ง dependencies ทั้งหมด |
| `bun run dev` | เริ่ม Next.js dev server (http://localhost:3000) |
| `bun run build` | Build production version |
| `bun run start` | รัน production server |
| `bun run lint` | ตรวจสอบ code ด้วย ESLint |

### Database

| Command | Description |
|---------|-------------|
| `docker compose up -d` | เริ่ม PostgreSQL database |
| `docker compose down` | หยุด PostgreSQL database |
| `bun run generate` | Generate migrations จาก schema |
| `bun run migrate` | Apply migrations ไปยัง database |
| `bun run studio` | เปิด Drizzle Studio (Database GUI) |

📖 [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)

### Mobile/Desktop (Tauri)

| Command | Description |
|---------|-------------|
| `bun run ios` | รัน iOS development build (iPhone 15) |
| `bun run android` | รัน Android development build |

📖 [Tauri Docs](https://v2.tauri.app/)

### Testing (Playwright)

| Command | Description |
|---------|-------------|
| `bun run test` | รัน E2E tests แบบ headless |
| `bun run test:ui` | รัน tests พร้อม Playwright UI |

📖 [Playwright Docs](https://playwright.dev/docs/intro)

---

## 📚 Documentation Links

ศึกษาเพิ่มเติมก่อนเริ่ม Vibe Coding:

| Technology | Documentation |
|------------|---------------|
| **Next.js** | https://nextjs.org/docs |
| **Elysia.js** | https://elysiajs.com/ |
| **Drizzle ORM** | https://orm.drizzle.team/docs/overview |
| **Better Auth** | https://www.better-auth.com/docs |
| **Tauri** | https://v2.tauri.app/ |
| **shadcn/ui** | https://ui.shadcn.com/ |
| **Tailwind CSS** | https://tailwindcss.com/docs |
| **next-intl** | https://next-intl.dev/ |
| **Playwright** | https://playwright.dev/ |

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── [locale]/           # i18n routes (en, th)
│   │   ├── auth/           # Authentication pages
│   │   ├── account/        # User account pages
│   │   └── page.tsx        # Homepage
│   └── api/                # Elysia API routes
├── components/             # React components
│   └── ui/                 # shadcn/ui components
├── db/                     # Database schema & connection
├── lib/                    # Utilities & auth config
├── messages/               # i18n translation files
├── src-tauri/              # Tauri native app config
├── tests/                  # Playwright E2E tests
└── llms/                   # LLM documentation files
```

---

## 🤖 AI Vibe Coding with Spec-Driven Development

โปรเจคนี้ออกแบบมาสำหรับการทำ **Spec-Driven Development** ด้วย AI โดยใช้ [spec-kit](https://github.com/github/spec-kit) จาก GitHub

> **Spec-Driven Development** คือแนวคิดที่เปลี่ยนจาก "code-first" เป็น "specification-first" โดย specifications จะกลายเป็น executable ที่ generate working implementations โดยตรง

### 🎯 Recommended Workflow

#### Step 0: ติดตั้ง Tools

```bash
# ติดตั้ง spec-kit CLI (ต้องมี uv ก่อน)
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# ตรวจสอบ tools ที่ติดตั้ง
specify check

# Initialize spec-kit ในโปรเจค (ถ้ายังไม่มี)
specify init . --ai claude
```

📖 [spec-kit Documentation](https://github.com/github/spec-kit)

---

### Step 1: สร้าง Constitution (Claude Opus 4.5)

กำหนด "หลักการ" ของโปรเจคที่ AI จะยึดถือตลอดการพัฒนา

```bash
# เปิด Claude Code ในโปรเจค
claude
```

**🇹🇭 ตัวอย่างภาษาไทย:**
```
/speckit.constitution สร้าง principles สำหรับโปรเจคนี้โดยเน้น:
- Code quality และ testing standards
- User experience consistency  
- Performance requirements
- ใช้ PERB stack (Postgres, Elysia, React/Next.js, Bun)
- รองรับ i18n (EN/TH)
- ทุก feature ต้องมี E2E tests
```

**🇺🇸 English example:**
```
/speckit.constitution Create principles for this project focusing on:
- Code quality and testing standards
- User experience consistency  
- Performance requirements
- Using PERB stack (Postgres, Elysia, React/Next.js, Bun)
- Support i18n (EN/TH)
- Every feature must have E2E tests
```

**Output:** `.specify/memory/constitution.md`

---

### Step 2: เขียน Specification (Claude Opus 4.5)

อธิบาย **อะไร** ที่ต้องการสร้าง และ **ทำไม** (ยังไม่ต้องคิดเรื่อง tech stack)

**🇹🇭 ตัวอย่างภาษาไทย:**
```
/speckit.specify สร้างแพลตฟอร์มเรียนออนไลน์คล้าย Coursera ที่:
- มี 2 roles: ผู้สอน (Instructor) และ ผู้เรียน (Student)
- ผู้สอนสามารถสร้างคอร์ส, เพิ่มบทเรียน (lessons), อัพโหลดวิดีโอ
- แต่ละคอร์สมี title, description, thumbnail, price, category
- ผู้เรียนสามารถค้นหาคอร์ส, ลงทะเบียนเรียน, ดูวิดีโอบทเรียน
- มีระบบติดตามความคืบหน้า (progress tracking) แต่ละบทเรียน
- มีระบบ certificate เมื่อเรียนจบคอร์ส
- รองรับทั้ง Web และ Mobile (iOS/Android)
- ต้อง login ก่อนใช้งาน
```

**🇺🇸 English example:**
```
/speckit.specify Build an online learning platform like Coursera that:
- Has 2 roles: Instructor and Student
- Instructors can create courses, add lessons, upload videos
- Each course has title, description, thumbnail, price, category
- Students can search courses, enroll, watch lesson videos
- Has progress tracking system for each lesson
- Has certificate system upon course completion
- Supports both Web and Mobile (iOS/Android)
- Requires login before use
```

**Output:** `.specify/specs/001-online-learning/spec.md`

---

### Step 3: Clarify Requirements (Claude Opus 4.5)

ให้ AI ถามคำถามเพื่อ clarify requirements ที่ไม่ชัดเจน

```
/speckit.clarify
```

AI จะถามคำถามเช่น:
- "ต้องการระบบ quiz/assessment ในแต่ละบทเรียนไหม?"
- "วิดีโอจะเก็บที่ไหน? (local storage, S3, YouTube)"
- "ต้องการระบบ review/rating สำหรับคอร์สไหม?"
- "การชำระเงินใช้ payment gateway อะไร?"

ตอบคำถามให้ครบ แล้ว AI จะอัพเดท spec ให้สมบูรณ์

---

### Step 4: สร้าง Technical Plan (Claude Opus 4.5)

ตอนนี้ค่อยระบุ tech stack และรายละเอียดทางเทคนิค

```
/speckit.plan Use PERB stack:
- Frontend: Next.js 16 + React 19 + Tailwind CSS + shadcn/ui
- Backend: Elysia.js API routes in Next.js
- Database: PostgreSQL + Drizzle ORM
- Auth: Better Auth (email/password + Google OAuth)
- File Storage: S3-compatible (for video uploads)
- Mobile: Tauri 2
- Testing: Playwright E2E
```

**Output:**
- `.specify/specs/001-online-learning/plan.md` - Implementation plan
- `.specify/specs/001-online-learning/data-model.md` - Database schema
- `.specify/specs/001-online-learning/research.md` - Tech research

---

### Step 5: แตก Tasks (Claude Opus 4.5)

สร้าง task breakdown จาก plan

```
/speckit.tasks
```

**Output:** `.specify/specs/001-todo-list/tasks.md`

ตัวอย่าง tasks ที่ได้:
```markdown
## Phase 1: Database Setup
- [x] Task 1.1: Create todos table schema
- [ ] Task 1.2: Generate and run migrations

## Phase 2: API Development  
- [ ] Task 2.1: Create GET /api/todos endpoint
- [ ] Task 2.2: Create POST /api/todos endpoint
...
```

---

### Step 6: Implementation (GLM 4.7 / Fast Models)

**เปลี่ยนมาใช้ model ที่เร็วกว่า** สำหรับ execute แต่ละ task

```
/speckit.implement
```

หรือ implement ทีละ task:

```
Implement Task 1.1: Create todos table schema ตาม data-model.md
```

**ทำไมเปลี่ยน model:**
- GLM 4.7 เร็วกว่า ประหยัด tokens
- Task ที่ชัดเจนแล้วไม่ต้องใช้ reasoning มาก
- Opus 4.5 เหมาะสำหรับ planning มากกว่า execution

---

### Step 7: Test & Verify

```bash
# รัน E2E tests
bun run test

# ดู test results แบบ interactive
bun run test:ui
```

**Loop:**
- ❌ Test fail → กลับไปแก้ไข (Step 6)
- ✅ Test pass → ไป task ถัดไป

---

### 📋 Workflow Summary

```
┌─────────────────────────────────────────────────────────
│  0. SETUP                                               
│     └── specify init . --ai claude                      
├─────────────────────────────────────────────────────────
│  1. CONSTITUTION (Opus 4.5)                             
│     └── /speckit.constitution → หลักการโปรเจค           
├─────────────────────────────────────────────────────────
│  2. SPECIFY (Opus 4.5)                                  
│     └── /speckit.specify → อธิบาย what & why            
├─────────────────────────────────────────────────────────
│  3. CLARIFY (Opus 4.5)                                  
│     └── /speckit.clarify → ถาม-ตอบให้ชัดเจน             
├─────────────────────────────────────────────────────────
│  4. PLAN (Opus 4.5)                                     
│     └── /speckit.plan → tech stack & architecture       
├─────────────────────────────────────────────────────────
│  5. TASKS (Opus 4.5)                                    
│     └── /speckit.tasks → แตก tasks                      
├─────────────────────────────────────────────────────────
│  6. IMPLEMENT (GLM 4.7)                                 
│     └── /speckit.implement → execute tasks              
├─────────────────────────────────────────────────────────
│  7. VERIFY                                              
│     └── bun run test → Pass? Next : Fix & retry         
└─────────────────────────────────────────────────────────
```

---

### 🔧 Spec-Kit Commands Reference

| Command | Description |
|---------|-------------|
| `/speckit.constitution` | สร้างหลักการและ guidelines ของโปรเจค |
| `/speckit.specify` | เขียน functional specification (what & why) |
| `/speckit.clarify` | ถามคำถามเพื่อ clarify requirements |
| `/speckit.plan` | สร้าง technical implementation plan |
| `/speckit.tasks` | แตก plan เป็น actionable tasks |
| `/speckit.implement` | Execute tasks ตาม plan |
| `/speckit.analyze` | วิเคราะห์ความสอดคล้องของ artifacts |
| `/speckit.checklist` | สร้าง quality checklist |

---

### 📖 Local Documentation (llms/)

AI จะอ้างอิงจากไฟล์เหล่านี้:

- `llms/elysiajs.md` - Elysia.js reference
- `llms/drizzle-full.md` - Drizzle ORM docs
- `llms/better-auth-ui.md` - Better Auth UI components

### 🔌 MCP Servers

MCP (Model Context Protocol) servers ที่ใช้ร่วมกับ Claude:

| Server | Description |
|--------|-------------|
| `next-devtools` | Next.js documentation & caching |
| `shadcn` | shadcn/ui components lookup |
| `better-auth` | Better Auth documentation |
| `playwright` | E2E testing automation |
| `drizzle` | Drizzle ORM schema tools |
| `postgres` | PostgreSQL database access |


