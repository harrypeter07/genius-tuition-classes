# Genius Tuition Classes — Admin Manual & Architecture Guide

This guide details the hosting architecture, cloud database details, admin login credentials, and a step-by-step operational tutorial for **Genius Tuition Classes** (Koradi, Nagpur).

---

## 1. Cloud Database Hosting Breakdown

The PostgreSQL database powering this website is **100% cloud-hosted**, not stored locally on your machine.

### Hosting Details
* **Cloud Provider:** [Supabase](https://supabase.com) (Enterprise Cloud Infrastructure)
* **Cloud Region:** AWS Asia Pacific (`ap-southeast-2`)
* **Database Type:** Managed PostgreSQL 15+
* **Connection Pooler:** `aws-1-ap-southeast-2.pooler.supabase.com` (Port `5432`)
* **Encryption & Security:** SSL/TLS enabled (`rejectUnauthorized: false` for pooled serverless connections)
* **High Availability:** Automatically backed up, managed, and provisioned in the cloud.

### Database Tables Created
1. `genius_inquiries` — Stores all incoming student names, parent contact numbers, grades, batch preferences, notes, and admission statuses.
2. `genius_settings` — Stores dynamic institute settings, contact numbers, Koradi address, visiting hours, and announcement alerts.
3. `genius_classes` — Stores offline batch specifications, curriculum, timings, and capacity limits.
4. `genius_teachers` — Stores faculty profiles, qualifications, experience, and Akram Sir's bio.
5. `genius_testimonials` — Stores verified student board marks, schools, and parent feedback.
6. `genius_faqs` — Stores parent frequently asked questions and answers.

The database environment variable `DATABASE_URL` is configured in both your local environment (`.env.local`) and live production secrets on Vercel. Even if your local laptop is turned off, the live website and database run 24/7 in the cloud.

---

## 2. Key URLs & Access Credentials

| Resource | URL | Credentials |
| :--- | :--- | :--- |
| **Live Public Website** | [https://genius-tuition-classes.vercel.app](https://genius-tuition-classes.vercel.app) | Public access |
| **Admin Management Portal** | [https://genius-tuition-classes.vercel.app/admin](https://genius-tuition-classes.vercel.app/admin) | PIN: `2026`<br>Password: `akramsir2026` |
| **GitHub Source Code** | [harrypeter07/genius-tuition-classes](https://github.com/harrypeter07/genius-tuition-classes) | Linked to your GitHub account |
| **Vercel Project Dashboard** | [Vercel Project Console](https://vercel.com/harrypeter07s-projects/genius-tuition-classes) | Managed via your Vercel account |

---

## 3. How to Log in to the Admin Portal

1. Open your browser and navigate to:
   ```
   https://genius-tuition-classes.vercel.app/admin
   ```
   *(Or click the small shield icon in the footer of any page).*
2. On the login card, enter either:
   * **Quick PIN:** `2026`
   * **Admin Password:** `akramsir2026`
3. Click **"Unlock Admin Panel"**.
4. You will be authenticated and redirected into the management workspace.

---

## 4. Admin Portal Step-by-Step Tutorial

### Tab 1: Admission Inquiries Inbox
This is the primary lead-generation dashboard where parent inquiries appear the moment they submit the admission form on the website.

* **Real-Time Data Displayed:**
  * Student Name & Grade (e.g., *Rahul Sharma — Class 10th*).
  * Parent Phone Number.
  * Preferred Subjects & Batch Timing (Morning or Evening).
  * Submission Timestamp (Indian Standard Time).
  * Status badge (`New`, `Contacted`, `Admitted`, or `Archived`).
* **Instant Actions:**
  * **📞 Call Parent:** Tap the Call button to dial the parent's phone number directly.
  * **💬 WhatsApp Parent:** Opens WhatsApp with a pre-formatted message:
    > *"Hello! This is Akram Sir from Genius Tuition Classes, Koradi. Thank you for your inquiry for [Student Name] ([Grade]). When can we schedule your 2-day demo class?"*
  * **Status Dropdown:** Update lead stages from `New` to `Contacted` or `Admitted` to keep admissions organized.
* **Search & Filter:** Search by student name, phone number, or filter by lead status.

---

### Tab 2: Institute & Contact Information
Use this tab to update operational details without touching any code:

1. **Institute Name:** Displays across navigation and headers.
2. **Contact Person:** Defaults to `AKRAM SIR`.
3. **Phone Number (Display):** Formatted number shown to parents (`+91 91756 91457`).
4. **Raw WhatsApp Number:** Clean number without spaces or symbols (`919175691457`).
5. **Institute Address:** Physical center address in Koradi, Nagpur.
6. **Visiting Hours:** Morning (`8:00 AM - 12:30 PM`) and Evening (`4:00 PM - 8:30 PM`) sessions.
7. **Announcement Banner:** Changes the alert text across the top of the website (e.g., *"Admissions Open for 2026-2027 Batches! Free 2-Day Demo Class."*).
8. Click **"Save Changes to Database"** to immediately update the live website.

---

### Tab 3: Batches & Classes Management
Review active offline batches:
* **Class 5th - 8th:** Middle School Foundation Batch (Maths, Science, English, Social Studies).
* **Class 9th:** Pre-Board Accelerator Batch.
* **Class 10th:** Target 95%+ Board Exam Masterclass (State Board SSC & CBSE).
* **Class 11th & 12th:** Senior Secondary Board & Foundation.
* **Cap Enforcement:** Strictly highlights the 15–18 student per-batch limit.

---

### Tab 4: Faculty & Mentors
* Displays **AKRAM SIR** as Founder & Lead Mentor (Mathematics & Science specialist with 10+ years experience).
* Shows dedicated faculty profiles for Physics/Chemistry, English & Social Science, and personal Doubt Mentoring.

---

### Tab 5: Toppers & Results
* Displays real student achievements (e.g., *96.4% in 10th Board*, *98/100 in Maths*).
* Shows parent testimonials emphasizing the value of physical offline coaching in Koradi, Nagpur over screen-based online courses.

---

## 5. Overall Website Features

1. **High-Performance Marketing Landing Page:** Built with Next.js App Router and Tailwind CSS, achieving near-instant load speeds.
2. **Reference Design Match:** Faithful reproduction of the requested modern dark-navy aesthetic, glowing accents, and clean feature cards.
3. **Authentic Photography:** Integrated realistic study desk and classroom images matching the offline tuition setting in Koradi.
4. **Offline Education Focus:** Strong messaging addressing common parent pain points:
   * Zero mobile distractions during lectures.
   * On-the-spot notebook checks and step-by-step corrections.
   * Weekly Sunday simulated test series.
   * Monthly one-on-one Parent-Teacher meetings.
5. **High-Conversion Inquiries:**
   * Direct **Submit Inquiry** (saves to cloud PostgreSQL + sends to admin inbox).
   * Direct **Send via WhatsApp** (pre-formats complete student profile into WhatsApp chat with Akram Sir).
   * Floating WhatsApp button and sticky mobile quick-call bar for mobile visitors.
