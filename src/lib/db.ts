import { Pool } from "pg";
import {
  INSTITUTE_DETAILS,
  CLASSES_DATA,
  TEACHERS_DATA,
  RESULTS_DATA,
  FAQS_DATA,
  ClassBatch,
  Teacher,
  Testimonial,
  FaqItem,
} from "@/data/tuitionData";

let pool: Pool | null = null;

export function getPool(): Pool | null {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn("DATABASE_URL is not set. Falling back to local data store.");
    return null;
  }

  try {
    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
    return pool;
  } catch (err: any) {
    console.error("Failed to initialize Postgres pool:", err.message);
    return null;
  }
}

let isInitialized = false;

export async function initDb() {
  if (isInitialized) return;
  const p = getPool();
  if (!p) return;

  try {
    const client = await p.connect();
    try {
      // 1. Settings Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS genius_settings (
          key VARCHAR(100) PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at BIGINT NOT NULL
        );
      `);

      // 2. Classes Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS genius_classes (
          id VARCHAR(100) PRIMARY KEY,
          grade VARCHAR(100) NOT NULL,
          category VARCHAR(50) NOT NULL,
          title VARCHAR(200) NOT NULL,
          badge VARCHAR(100),
          description TEXT NOT NULL,
          subjects JSONB NOT NULL,
          features JSONB NOT NULL,
          batch_timing VARCHAR(100) NOT NULL,
          batch_size VARCHAR(100) NOT NULL,
          curriculum VARCHAR(150) NOT NULL,
          display_order INT DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          updated_at BIGINT NOT NULL
        );
      `);

      // 3. Teachers Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS genius_teachers (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          role VARCHAR(150) NOT NULL,
          qualification VARCHAR(150),
          experience VARCHAR(100),
          subjects JSONB NOT NULL,
          bio TEXT NOT NULL,
          highlight TEXT,
          image_url TEXT,
          display_order INT DEFAULT 0,
          updated_at BIGINT NOT NULL
        );
      `);

      // 4. Testimonials Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS genius_testimonials (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          grade VARCHAR(100) NOT NULL,
          school VARCHAR(150) NOT NULL,
          score VARCHAR(100) NOT NULL,
          quote TEXT NOT NULL,
          parent_name VARCHAR(150),
          year VARCHAR(50),
          is_featured BOOLEAN DEFAULT true,
          display_order INT DEFAULT 0,
          updated_at BIGINT NOT NULL
        );
      `);

      // 5. Inquiries Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS genius_inquiries (
          id SERIAL PRIMARY KEY,
          student_name VARCHAR(150) NOT NULL,
          parent_phone VARCHAR(50) NOT NULL,
          grade VARCHAR(100) NOT NULL,
          subjects VARCHAR(200),
          preferred_batch VARCHAR(100),
          notes TEXT,
          status VARCHAR(50) DEFAULT 'new',
          created_at BIGINT NOT NULL
        );
      `);

      // 6. FAQs Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS genius_faqs (
          id VARCHAR(100) PRIMARY KEY,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          category VARCHAR(100),
          display_order INT DEFAULT 0,
          updated_at BIGINT NOT NULL
        );
      `);

      // Seed default settings if empty
      const settingsCount = await client.query("SELECT COUNT(*) FROM genius_settings");
      if (parseInt(settingsCount.rows[0].count, 10) === 0) {
        const now = Date.now();
        const defaultSettings = [
          ["name", INSTITUTE_DETAILS.name],
          ["tagline", INSTITUTE_DETAILS.tagline],
          ["motto", INSTITUTE_DETAILS.motto],
          ["contactPerson", INSTITUTE_DETAILS.contactPerson],
          ["roleTitle", INSTITUTE_DETAILS.roleTitle],
          ["phone", INSTITUTE_DETAILS.phone],
          ["phoneRaw", INSTITUTE_DETAILS.phoneRaw],
          ["address", INSTITUTE_DETAILS.address],
          ["visiting_morning", INSTITUTE_DETAILS.visitingHours.morning],
          ["visiting_evening", INSTITUTE_DETAILS.visitingHours.evening],
          ["visiting_days", INSTITUTE_DETAILS.visitingHours.days],
          ["banner_announcement", "Admissions Open for New Offline Batches! Free 2-Day Demo Class."],
        ];

        for (const [k, v] of defaultSettings) {
          await client.query(
            "INSERT INTO genius_settings (key, value, updated_at) VALUES ($1, $2, $3) ON CONFLICT (key) DO NOTHING",
            [k, v, now]
          );
        }
      }

      // Seed default classes if empty
      const classesCount = await client.query("SELECT COUNT(*) FROM genius_classes");
      if (parseInt(classesCount.rows[0].count, 10) === 0) {
        const now = Date.now();
        for (let i = 0; i < CLASSES_DATA.length; i++) {
          const c = CLASSES_DATA[i];
          await client.query(
            `INSERT INTO genius_classes (id, grade, category, title, badge, description, subjects, features, batch_timing, batch_size, curriculum, display_order, is_active, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true, $13)
             ON CONFLICT (id) DO NOTHING`,
            [
              c.id,
              c.grade,
              c.category,
              c.title,
              c.badge,
              c.description,
              JSON.stringify(c.subjects),
              JSON.stringify(c.features),
              c.batchTiming,
              c.batchSize,
              c.curriculum,
              i,
              now,
            ]
          );
        }
      }

      // Seed default teachers if empty
      const teachersCount = await client.query("SELECT COUNT(*) FROM genius_teachers");
      if (parseInt(teachersCount.rows[0].count, 10) === 0) {
        const now = Date.now();
        for (let i = 0; i < TEACHERS_DATA.length; i++) {
          const t = TEACHERS_DATA[i];
          await client.query(
            `INSERT INTO genius_teachers (id, name, role, qualification, experience, subjects, bio, highlight, image_url, display_order, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             ON CONFLICT (id) DO NOTHING`,
            [
              t.id,
              t.name,
              t.role,
              t.qualification,
              t.experience,
              JSON.stringify(t.subjects),
              t.bio,
              t.highlight,
              i === 0 ? "/images/akram-sir-teaching.jpg" : null,
              i,
              now,
            ]
          );
        }
      }

      // Seed default testimonials if empty
      const testCount = await client.query("SELECT COUNT(*) FROM genius_testimonials");
      if (parseInt(testCount.rows[0].count, 10) === 0) {
        const now = Date.now();
        for (let i = 0; i < RESULTS_DATA.length; i++) {
          const t = RESULTS_DATA[i];
          await client.query(
            `INSERT INTO genius_testimonials (id, name, grade, school, score, quote, parent_name, year, is_featured, display_order, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, $9, $10)
             ON CONFLICT (id) DO NOTHING`,
            [
              t.id,
              t.name,
              t.grade,
              t.school,
              t.score,
              t.quote,
              t.parentName || null,
              t.year,
              i,
              now,
            ]
          );
        }
      }

      // Seed default FAQs if empty
      const faqCount = await client.query("SELECT COUNT(*) FROM genius_faqs");
      if (parseInt(faqCount.rows[0].count, 10) === 0) {
        const now = Date.now();
        for (let i = 0; i < FAQS_DATA.length; i++) {
          const f = FAQS_DATA[i];
          await client.query(
            `INSERT INTO genius_faqs (id, question, answer, category, display_order, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (id) DO NOTHING`,
            [f.id, f.question, f.answer, f.category, i, now]
          );
        }
      }

      isInitialized = true;
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error("Error initializing Postgres schema:", err.message);
  }
}

// Data retrieval helpers with fallback to static data
export async function getDbSettings(): Promise<Record<string, string>> {
  await initDb();
  const p = getPool();
  if (!p) {
    return {
      name: INSTITUTE_DETAILS.name,
      tagline: INSTITUTE_DETAILS.tagline,
      motto: INSTITUTE_DETAILS.motto,
      contactPerson: INSTITUTE_DETAILS.contactPerson,
      roleTitle: INSTITUTE_DETAILS.roleTitle,
      phone: INSTITUTE_DETAILS.phone,
      phoneRaw: INSTITUTE_DETAILS.phoneRaw,
      address: INSTITUTE_DETAILS.address,
      visiting_morning: INSTITUTE_DETAILS.visitingHours.morning,
      visiting_evening: INSTITUTE_DETAILS.visitingHours.evening,
      visiting_days: INSTITUTE_DETAILS.visitingHours.days,
      banner_announcement: "Admissions Open for New Offline Batches! Free 2-Day Demo Class.",
    };
  }

  try {
    const res = await p.query("SELECT key, value FROM genius_settings");
    const map: Record<string, string> = {};
    for (const row of res.rows) {
      map[row.key] = row.value;
    }
    return map;
  } catch (err) {
    return {
      name: INSTITUTE_DETAILS.name,
      phone: INSTITUTE_DETAILS.phone,
    };
  }
}

export async function getDbClasses(): Promise<ClassBatch[]> {
  await initDb();
  const p = getPool();
  if (!p) return CLASSES_DATA;

  try {
    const res = await p.query(
      "SELECT * FROM genius_classes WHERE is_active = true ORDER BY display_order ASC, id ASC"
    );
    if (res.rows.length === 0) return CLASSES_DATA;
    return res.rows.map((r) => ({
      id: r.id,
      grade: r.grade,
      category: r.category,
      title: r.title,
      badge: r.badge,
      description: r.description,
      subjects: typeof r.subjects === "string" ? JSON.parse(r.subjects) : r.subjects,
      features: typeof r.features === "string" ? JSON.parse(r.features) : r.features,
      batchTiming: r.batch_timing,
      batchSize: r.batch_size,
      curriculum: r.curriculum,
    }));
  } catch (err) {
    return CLASSES_DATA;
  }
}

export async function getDbTeachers(): Promise<Teacher[]> {
  await initDb();
  const p = getPool();
  if (!p) return TEACHERS_DATA;

  try {
    const res = await p.query("SELECT * FROM genius_teachers ORDER BY display_order ASC, id ASC");
    if (res.rows.length === 0) return TEACHERS_DATA;
    return res.rows.map((r) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      qualification: r.qualification,
      experience: r.experience,
      subjects: typeof r.subjects === "string" ? JSON.parse(r.subjects) : r.subjects,
      bio: r.bio,
      highlight: r.highlight,
    }));
  } catch (err) {
    return TEACHERS_DATA;
  }
}

export async function getDbTestimonials(): Promise<Testimonial[]> {
  await initDb();
  const p = getPool();
  if (!p) return RESULTS_DATA;

  try {
    const res = await p.query(
      "SELECT * FROM genius_testimonials WHERE is_featured = true ORDER BY display_order ASC, id ASC"
    );
    if (res.rows.length === 0) return RESULTS_DATA;
    return res.rows.map((r) => ({
      id: r.id,
      name: r.name,
      grade: r.grade,
      school: r.school,
      score: r.score,
      quote: r.quote,
      parentName: r.parent_name,
      year: r.year,
    }));
  } catch (err) {
    return RESULTS_DATA;
  }
}

export async function getDbFaqs(): Promise<FaqItem[]> {
  await initDb();
  const p = getPool();
  if (!p) return FAQS_DATA;

  try {
    const res = await p.query("SELECT * FROM genius_faqs ORDER BY display_order ASC, id ASC");
    if (res.rows.length === 0) return FAQS_DATA;
    return res.rows.map((r) => ({
      id: r.id,
      question: r.question,
      answer: r.answer,
      category: r.category,
    }));
  } catch (err) {
    return FAQS_DATA;
  }
}

export async function getDbInquiries() {
  await initDb();
  const p = getPool();
  if (!p) return [];

  try {
    const res = await p.query("SELECT * FROM genius_inquiries ORDER BY created_at DESC LIMIT 100");
    return res.rows;
  } catch (err) {
    return [];
  }
}

export async function saveInquiry(data: {
  studentName: string;
  parentPhone: string;
  grade: string;
  subjects?: string;
  preferredBatch?: string;
  notes?: string;
}) {
  await initDb();
  const p = getPool();
  const now = Date.now();
  if (!p) return { id: now, ...data, created_at: now, status: "new" };

  try {
    const res = await p.query(
      `INSERT INTO genius_inquiries (student_name, parent_phone, grade, subjects, preferred_batch, notes, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'new', $7)
       RETURNING *`,
      [
        data.studentName,
        data.parentPhone,
        data.grade,
        data.subjects || "All Core",
        data.preferredBatch || "Evening",
        data.notes || "",
        now,
      ]
    );
    return res.rows[0];
  } catch (err: any) {
    console.error("Failed to save inquiry to DB:", err.message);
    return { id: now, ...data, created_at: now, status: "new" };
  }
}
