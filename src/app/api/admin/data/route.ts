import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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

export async function GET(request: Request) {
  // Accessing request properties or headers ensures dynamic runtime
  const { searchParams } = new URL(request.url);
  try {
    const [settings, classes, teachers, testimonials, faqs, inquiries] = await Promise.all([
      getDbSettings(),
      getDbClasses(),
      getDbTeachers(),
      getDbTestimonials(),
      getDbFaqs(),
      getDbInquiries(),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          settings,
          classes,
          teachers,
          testimonials,
          faqs,
          inquiries,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
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

    const triggerRevalidate = () => {
      try {
        revalidatePath("/");
        revalidatePath("/admin");
      } catch (e) {
        // revalidation error ignored
      }
    };

    if (action === "update_setting") {
      const { key, value } = payload;
      await p.query(
        `INSERT INTO genius_settings (key, value, updated_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
        [key, String(value || "").trim(), now]
      );
      triggerRevalidate();
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
      triggerRevalidate();
      return NextResponse.json({ success: true, message: "Settings updated successfully" });
    }

    if (action === "update_inquiry_status") {
      const { id, status } = payload;
      await p.query(
        "UPDATE genius_inquiries SET status = $1 WHERE id = $2",
        [status, id]
      );
      triggerRevalidate();
      return NextResponse.json({ success: true, message: "Inquiry status updated" });
    }

    if (action === "delete_inquiry") {
      const { id } = payload;
      await p.query("DELETE FROM genius_inquiries WHERE id = $1", [id]);
      triggerRevalidate();
      return NextResponse.json({ success: true, message: "Inquiry deleted" });
    }

    if (action === "save_class") {
      const c = payload;
      const classId = c.id || `class-${Date.now()}`;
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
          classId,
          c.grade,
          c.category || "foundation",
          c.title,
          c.badge || "Popular",
          c.description,
          JSON.stringify(Array.isArray(c.subjects) ? c.subjects : String(c.subjects).split(",").map(s => s.trim())),
          JSON.stringify(Array.isArray(c.features) ? c.features : String(c.features).split("\n").map(f => f.trim()).filter(Boolean)),
          c.batchTiming || c.batch_timing,
          c.batchSize || c.batch_size,
          c.curriculum,
          now,
        ]
      );
      triggerRevalidate();
      return NextResponse.json({ success: true, message: "Class batch saved", id: classId });
    }

    if (action === "delete_class") {
      const { id } = payload;
      await p.query("DELETE FROM genius_classes WHERE id = $1", [id]);
      triggerRevalidate();
      return NextResponse.json({ success: true, message: "Class batch deleted" });
    }

    if (action === "save_teacher") {
      const t = payload;
      const teacherId = t.id || `teacher-${Date.now()}`;
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
          teacherId,
          t.name,
          t.role,
          t.qualification,
          t.experience,
          JSON.stringify(Array.isArray(t.subjects) ? t.subjects : String(t.subjects).split(",").map(s => s.trim())),
          t.bio,
          t.highlight,
          t.imageUrl || t.image_url || null,
          now,
        ]
      );
      triggerRevalidate();
      return NextResponse.json({ success: true, message: "Teacher saved", id: teacherId });
    }

    if (action === "delete_teacher") {
      const { id } = payload;
      await p.query("DELETE FROM genius_teachers WHERE id = $1", [id]);
      triggerRevalidate();
      return NextResponse.json({ success: true, message: "Teacher deleted" });
    }

    if (action === "save_testimonial") {
      const t = payload;
      const testId = t.id || `res-${Date.now()}`;
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
          testId,
          t.name,
          t.grade,
          t.school,
          t.score,
          t.quote,
          t.parentName || t.parent_name || null,
          t.year,
          now,
        ]
      );
      triggerRevalidate();
      return NextResponse.json({ success: true, message: "Testimonial saved", id: testId });
    }

    if (action === "delete_testimonial") {
      const { id } = payload;
      await p.query("DELETE FROM genius_testimonials WHERE id = $1", [id]);
      triggerRevalidate();
      return NextResponse.json({ success: true, message: "Testimonial deleted" });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
