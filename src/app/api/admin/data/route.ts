import { NextResponse } from "next/server";
import {
  getDbSettings,
  getDbClasses,
  getDbTeachers,
  getDbTestimonials,
  getDbFaqs,
  getDbInquiries,
  getPool,
  initDb,
} from "@/lib/db";

export async function GET() {
  try {
    const [settings, classes, teachers, testimonials, faqs, inquiries] = await Promise.all([
      getDbSettings(),
      getDbClasses(),
      getDbTeachers(),
      getDbTestimonials(),
      getDbFaqs(),
      getDbInquiries(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        settings,
        classes,
        teachers,
        testimonials,
        faqs,
        inquiries,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;
    await initDb();
    const p = getPool();

    if (!p) {
      return NextResponse.json(
        { success: false, error: "Database not connected" },
        { status: 500 }
      );
    }

    const now = Date.now();

    if (action === "update_setting") {
      const { key, value } = payload;
      await p.query(
        `INSERT INTO genius_settings (key, value, updated_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
        [key, String(value || "").trim(), now]
      );
      return NextResponse.json({ success: true, message: `Setting ${key} updated` });
    }

    if (action === "update_all_settings") {
      const settings = payload; // Record<string, string>
      for (const [k, v] of Object.entries(settings)) {
        await p.query(
          `INSERT INTO genius_settings (key, value, updated_at)
           VALUES ($1, $2, $3)
           ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
          [k, String(v || "").trim(), now]
        );
      }
      return NextResponse.json({ success: true, message: "Settings updated successfully" });
    }

    if (action === "update_inquiry_status") {
      const { id, status } = payload;
      await p.query(
        "UPDATE genius_inquiries SET status = $1 WHERE id = $2",
        [status, id]
      );
      return NextResponse.json({ success: true, message: "Inquiry status updated" });
    }

    if (action === "save_class") {
      const c = payload;
      await p.query(
        `INSERT INTO genius_classes (id, grade, category, title, badge, description, subjects, features, batch_timing, batch_size, curriculum, is_active, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true, $12)
         ON CONFLICT (id) DO UPDATE SET
           grade = excluded.grade,
           category = excluded.category,
           title = excluded.title,
           badge = excluded.badge,
           description = excluded.description,
           subjects = excluded.subjects,
           features = excluded.features,
           batch_timing = excluded.batch_timing,
           batch_size = excluded.batch_size,
           curriculum = excluded.curriculum,
           updated_at = excluded.updated_at`,
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
          now,
        ]
      );
      return NextResponse.json({ success: true, message: "Class batch saved" });
    }

    if (action === "save_teacher") {
      const t = payload;
      await p.query(
        `INSERT INTO genius_teachers (id, name, role, qualification, experience, subjects, bio, highlight, image_url, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE SET
           name = excluded.name,
           role = excluded.role,
           qualification = excluded.qualification,
           experience = excluded.experience,
           subjects = excluded.subjects,
           bio = excluded.bio,
           highlight = excluded.highlight,
           image_url = excluded.image_url,
           updated_at = excluded.updated_at`,
        [
          t.id,
          t.name,
          t.role,
          t.qualification,
          t.experience,
          JSON.stringify(t.subjects),
          t.bio,
          t.highlight,
          t.imageUrl || null,
          now,
        ]
      );
      return NextResponse.json({ success: true, message: "Teacher saved" });
    }

    if (action === "save_testimonial") {
      const t = payload;
      await p.query(
        `INSERT INTO genius_testimonials (id, name, grade, school, score, quote, parent_name, year, is_featured, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, $9)
         ON CONFLICT (id) DO UPDATE SET
           name = excluded.name,
           grade = excluded.grade,
           school = excluded.school,
           score = excluded.score,
           quote = excluded.quote,
           parent_name = excluded.parent_name,
           year = excluded.year,
           updated_at = excluded.updated_at`,
        [
          t.id,
          t.name,
          t.grade,
          t.school,
          t.score,
          t.quote,
          t.parentName || null,
          t.year,
          now,
        ]
      );
      return NextResponse.json({ success: true, message: "Testimonial saved" });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
