"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  Settings,
  BookOpen,
  MessageSquare,
  Award,
  Phone,
  MessageCircle,
  Clock,
  Save,
  Lock,
  LogOut,
  ExternalLink,
  RefreshCw,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertCircle,
  CheckCircle,
  Database,
  Eye,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Toast {
  message: string;
  type: "success" | "error" | "info";
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "teachers" | "classes" | "results" | "inquiries" | "settings"
  >("teachers");

  const [data, setData] = useState<any>({
    teachers: [],
    classes: [],
    testimonials: [],
    inquiries: [],
    settings: {},
  });
  const [isFetching, setIsFetching] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 4000);
  };

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    name: "Akram's Genius Academy",
    tagline: "Better Learning • Brighter Future",
    motto: "Quality education. Personal attention. Real progress.",
    contactPerson: "AKRAM SIR",
    roleTitle: "Founder & Lead Educator",
    phone: "+91 91756 91457",
    phoneRaw: "919175691457",
    address:
      "Near Koradi Devi Temple Road / Koradi Power Station Colony, Koradi, Nagpur, Maharashtra - 441111",
    visiting_morning: "8:00 AM - 12:30 PM",
    visiting_evening: "4:00 PM - 8:30 PM",
    banner_announcement: "Admissions Open for New Offline Batches! Free 2-Day Demo Class.",
  });

  // Modal Dialog States
  const [modalType, setModalType] = useState<"teacher" | "class" | "testimonial" | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSavingItem, setIsSavingItem] = useState(false);

  // In-app Delete Confirmation Modal State
  const [deleteModal, setDeleteModal] = useState<{
    type: "teacher" | "class" | "testimonial" | "inquiry";
    id: string | number;
    title: string;
  } | null>(null);
  const [isDeletingItem, setIsDeletingItem] = useState(false);

  // Search & Filter state for each tab
  const [teacherSearch, setTeacherSearch] = useState("");
  const [classSearch, setClassSearch] = useState("");
  const [resultSearch, setResultSearch] = useState("");
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");

  const fetchData = async (showSuccessNotice = false) => {
    setIsFetching(true);
    try {
      const res = await fetch(`/api/admin/data?t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
        },
      });
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
        if (json.data.settings && Object.keys(json.data.settings).length > 0) {
          setSettingsForm((prev) => ({ ...prev, ...json.data.settings }));
        }
        if (showSuccessNotice) {
          showToast("Data refreshed from Supabase Cloud Database!", "info");
        }
      }
    } catch (e: any) {
      console.error(e);
      showToast("Error connecting to database: " + e.message, "error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("genius_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setIsFetching(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (json.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("genius_admin_auth", "true");
        showToast("Authenticated successfully. Welcome Akram Sir!", "success");
        fetchData();
      } else {
        setLoginError(json.error || "Incorrect credentials");
      }
    } catch (e) {
      setLoginError("Login failed. Please check internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("genius_admin_auth");
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_all_settings",
          payload: settingsForm,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSaveStatus("Settings saved successfully!");
        showToast("Institute settings updated on live website!", "success");
        setTimeout(() => setSaveStatus(null), 3500);
        await fetchData();
      } else {
        setSaveStatus("Error: " + json.error);
        showToast("Failed to save settings: " + json.error, "error");
      }
    } catch (e: any) {
      setSaveStatus("Failed: " + e.message);
      showToast("Network error saving settings: " + e.message, "error");
    }
  };

  // ==========================================
  // CRUD FOR TEACHERS
  // ==========================================
  const handleOpenTeacherModal = (teacher?: any) => {
    setModalType("teacher");
    setEditingItem(
      teacher || {
        id: "",
        name: "",
        role: "Educator",
        qualification: "",
        experience: "",
        subjects: "",
        bio: "",
        highlight: "",
        imageUrl: "",
      }
    );
  };

  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingItem(true);
    try {
      const subjectsArray = Array.isArray(editingItem.subjects)
        ? editingItem.subjects
        : String(editingItem.subjects || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

      const payload = {
        ...editingItem,
        subjects: subjectsArray,
      };

      const isEdit = Boolean(editingItem.id);
      const generatedId = editingItem.id || `teacher-${Date.now()}`;
      const updatedTeacher = { ...payload, id: generatedId };

      // Immediate UI update (Optimistic)
      setData((prev: any) => {
        const teachers = prev.teachers || [];
        const exists = teachers.some((t: any) => t.id === generatedId);
        const updated = exists
          ? teachers.map((t: any) => (t.id === generatedId ? updatedTeacher : t))
          : [...teachers, updatedTeacher];
        return { ...prev, teachers: updated };
      });

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_teacher", payload }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setModalType(null);
        showToast(
          isEdit
            ? `Teacher "${payload.name}" updated successfully!`
            : `Teacher "${payload.name}" added to live website!`,
          "success"
        );
        fetchData();
      } else {
        showToast("Error saving teacher: " + (json.error || "Unknown error"), "error");
      }
    } catch (err: any) {
      console.error(err);
      showToast("Error saving teacher: " + err.message, "error");
    } finally {
      setIsSavingItem(false);
    }
  };

  // ==========================================
  // CRUD FOR CLASS BATCHES
  // ==========================================
  const handleOpenClassModal = (batch?: any) => {
    setModalType("class");
    setEditingItem(
      batch || {
        id: "",
        grade: "",
        category: "foundation",
        title: "",
        badge: "Special",
        description: "",
        subjects: "",
        features: "",
        batchTiming: "Evening 4:30 PM - 6:30 PM",
        batchSize: "Max 18 Students",
        curriculum: "State Board & CBSE",
      }
    );
  };

  const handleSaveClass = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingItem(true);
    try {
      const subjectsArray = Array.isArray(editingItem.subjects)
        ? editingItem.subjects
        : String(editingItem.subjects || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

      const featuresArray = Array.isArray(editingItem.features)
        ? editingItem.features
        : String(editingItem.features || "")
            .split("\n")
            .map((f) => f.trim())
            .filter(Boolean);

      const payload = {
        ...editingItem,
        subjects: subjectsArray,
        features: featuresArray,
      };

      const isEdit = Boolean(editingItem.id);
      const generatedId = editingItem.id || `class-${Date.now()}`;
      const updatedClass = { ...payload, id: generatedId };

      // Immediate UI update (Optimistic)
      setData((prev: any) => {
        const classes = prev.classes || [];
        const exists = classes.some((c: any) => c.id === generatedId);
        const updated = exists
          ? classes.map((c: any) => (c.id === generatedId ? updatedClass : c))
          : [...classes, updatedClass];
        return { ...prev, classes: updated };
      });

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_class", payload }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setModalType(null);
        showToast(
          isEdit
            ? `Batch "${payload.grade}" updated successfully!`
            : `Batch "${payload.grade}" added to live website!`,
          "success"
        );
        fetchData();
      } else {
        showToast("Error saving batch: " + (json.error || "Unknown error"), "error");
      }
    } catch (err: any) {
      console.error(err);
      showToast("Error saving batch: " + err.message, "error");
    } finally {
      setIsSavingItem(false);
    }
  };

  // ==========================================
  // CRUD FOR TOPPERS & TESTIMONIALS
  // ==========================================
  const handleOpenTestimonialModal = (item?: any) => {
    setModalType("testimonial");
    setEditingItem(
      item || {
        id: "",
        name: "",
        grade: "Class 10th",
        school: "Koradi School, Nagpur",
        score: "95%+",
        quote: "",
        year: "2026 Batch",
      }
    );
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingItem(true);
    try {
      const payload = editingItem;
      const isEdit = Boolean(editingItem.id);
      const generatedId = editingItem.id || `res-${Date.now()}`;
      const updatedItem = { ...payload, id: generatedId };

      // Immediate UI update (Optimistic)
      setData((prev: any) => {
        const testimonials = prev.testimonials || [];
        const exists = testimonials.some((t: any) => t.id === generatedId);
        const updated = exists
          ? testimonials.map((t: any) => (t.id === generatedId ? updatedItem : t))
          : [...testimonials, updatedItem];
        return { ...prev, testimonials: updated };
      });

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_testimonial", payload }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setModalType(null);
        showToast(
          isEdit
            ? `Topper record for "${payload.name}" updated successfully!`
            : `Topper record for "${payload.name}" published to live website!`,
          "success"
        );
        fetchData();
      } else {
        showToast("Error saving topper: " + (json.error || "Unknown error"), "error");
      }
    } catch (err: any) {
      console.error(err);
      showToast("Error saving topper: " + err.message, "error");
    } finally {
      setIsSavingItem(false);
    }
  };

  // ==========================================
  // INQUIRIES MANAGEMENT
  // ==========================================
  const handleUpdateInquiryStatus = async (id: number, status: string) => {
    // Immediate UI update (Optimistic)
    setData((prev: any) => ({
      ...prev,
      inquiries: (prev.inquiries || []).map((inq: any) =>
        inq.id === id ? { ...inq, status } : inq
      ),
    }));

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_inquiry_status",
          payload: { id, status },
        }),
      });
      if (res.ok) {
        showToast(`Inquiry marked as "${status.toUpperCase()}"`, "info");
        fetchData();
      }
    } catch (e: any) {
      console.error(e);
      showToast("Failed to update status: " + e.message, "error");
    }
  };

  // ==========================================
  // CONFIRMED DELETE HANDLER (CUSTOM MODAL)
  // ==========================================
  const triggerDeleteConfirm = (
    type: "teacher" | "class" | "testimonial" | "inquiry",
    id: string | number,
    title: string
  ) => {
    setDeleteModal({ type, id, title });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal) return;
    const { type, id, title } = deleteModal;
    setIsDeletingItem(true);

    try {
      // 1. Immediate UI update (Optimistic Removal)
      if (type === "teacher") {
        setData((prev: any) => ({
          ...prev,
          teachers: (prev.teachers || []).filter((t: any) => t.id !== id),
        }));
      } else if (type === "class") {
        setData((prev: any) => ({
          ...prev,
          classes: (prev.classes || []).filter((c: any) => c.id !== id),
        }));
      } else if (type === "testimonial") {
        setData((prev: any) => ({
          ...prev,
          testimonials: (prev.testimonials || []).filter((t: any) => t.id !== id),
        }));
      } else if (type === "inquiry") {
        setData((prev: any) => ({
          ...prev,
          inquiries: (prev.inquiries || []).filter((i: any) => i.id !== id),
        }));
      }

      // 2. Call backend deletion
      const actionMap = {
        teacher: "delete_teacher",
        class: "delete_class",
        testimonial: "delete_testimonial",
        inquiry: "delete_inquiry",
      };

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: actionMap[type],
          payload: { id },
        }),
      });

      if (res.ok) {
        showToast(`"${title}" deleted successfully from database!`, "success");
        setDeleteModal(null);
        await fetchData();
      } else {
        const json = await res.json();
        showToast("Error deleting item: " + (json.error || "Unknown"), "error");
        fetchData(); // Rollback if needed
      }
    } catch (err: any) {
      console.error(err);
      showToast("Network error deleting item: " + err.message, "error");
      fetchData();
    } finally {
      setIsDeletingItem(false);
    }
  };

  // ==========================================
  // FILTERED DATA SELECTORS
  // ==========================================
  const filteredTeachers = useMemo(() => {
    const list = data?.teachers || [];
    if (!teacherSearch.trim()) return list;
    const query = teacherSearch.toLowerCase();
    return list.filter(
      (t: any) =>
        t.name?.toLowerCase().includes(query) ||
        t.role?.toLowerCase().includes(query) ||
        t.bio?.toLowerCase().includes(query) ||
        (Array.isArray(t.subjects) ? t.subjects.join(" ") : String(t.subjects || ""))
          .toLowerCase()
          .includes(query)
    );
  }, [data?.teachers, teacherSearch]);

  const filteredClasses = useMemo(() => {
    const list = data?.classes || [];
    if (!classSearch.trim()) return list;
    const query = classSearch.toLowerCase();
    return list.filter(
      (c: any) =>
        c.grade?.toLowerCase().includes(query) ||
        c.title?.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query) ||
        (Array.isArray(c.subjects) ? c.subjects.join(" ") : String(c.subjects || ""))
          .toLowerCase()
          .includes(query)
    );
  }, [data?.classes, classSearch]);

  const filteredTestimonials = useMemo(() => {
    const list = data?.testimonials || [];
    if (!resultSearch.trim()) return list;
    const query = resultSearch.toLowerCase();
    return list.filter(
      (r: any) =>
        r.name?.toLowerCase().includes(query) ||
        r.grade?.toLowerCase().includes(query) ||
        r.school?.toLowerCase().includes(query) ||
        r.score?.toLowerCase().includes(query) ||
        r.quote?.toLowerCase().includes(query)
    );
  }, [data?.testimonials, resultSearch]);

  const filteredInquiries = useMemo(() => {
    const list = data?.inquiries || [];
    return list.filter((inq: any) => {
      const matchesSearch =
        inq.student_name?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.parent_phone?.includes(inquirySearch) ||
        inq.grade?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.subjects?.toLowerCase().includes(inquirySearch.toLowerCase());
      const matchesStatus =
        inquiryStatusFilter === "all" || inq.status === inquiryStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data?.inquiries, inquirySearch, inquiryStatusFilter]);

  const newInquiriesCount = (data?.inquiries || []).filter(
    (i: any) => i.status === "new"
  ).length;

  // ==========================================
  // LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070c18] flex items-center justify-center p-4 selection:bg-blue-600 selection:text-white">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-blue-600/30">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white">Genius Tuition Classes</h1>
            <p className="text-xs text-slate-400">
              Admin &amp; Management Portal • Koradi, Nagpur
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                Admin Password / PIN
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your admin PIN or password"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/50 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full rounded-xl font-bold py-3 text-sm cursor-pointer shadow-lg shadow-blue-600/30"
            >
              Unlock Admin Panel
            </Button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Live Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-3 duration-300">
          <div
            className={`p-4 rounded-2xl shadow-2xl border flex items-center justify-between gap-3 ${
              toast.type === "success"
                ? "bg-slate-900/95 border-emerald-500/50 text-emerald-300 shadow-emerald-950/40"
                : toast.type === "error"
                ? "bg-slate-900/95 border-red-500/50 text-red-300 shadow-red-950/40"
                : "bg-slate-900/95 border-blue-500/50 text-blue-300 shadow-blue-950/40"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" && (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {toast.type === "error" && (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              {toast.type === "info" && (
                <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
              )}
              <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="bg-slate-900/95 backdrop-blur border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-white text-sm sm:text-base leading-tight">
              Genius Tuition Classes
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Cloud PostgreSQL Connected</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">View Live Site</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <button
            type="button"
            onClick={() => fetchData(true)}
            title="Refresh from Cloud Database"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin text-blue-400" : ""}`} />
            <span className="hidden md:inline">Sync Now</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 w-full flex-1 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveTab("teachers")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "teachers"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Faculty Members</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === "teachers" ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
              }`}
            >
              {data?.teachers?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("classes")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "classes"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Batches &amp; Classes</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === "classes" ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
              }`}
            >
              {data?.classes?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("results")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "results"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Toppers &amp; Results</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === "results" ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
              }`}
            >
              {data?.testimonials?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "inquiries"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Admission Inquiries</span>
            {newInquiriesCount > 0 ? (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black animate-pulse">
                {newInquiriesCount} New
              </span>
            ) : (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === "inquiries"
                    ? "bg-white/20 text-white"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {data?.inquiries?.length || 0}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "settings"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Institute &amp; Contact Info</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: FACULTY & TEACHERS (FULL LIVE CRUD) */}
        {/* ============================================================== */}
        {activeTab === "teachers" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Faculty Members</span>
                  <Badge variant="default" className="text-xs">Live Cloud DB</Badge>
                </h2>
                <p className="text-xs text-slate-400">
                  Manage teachers &amp; mentors. Adding, editing, or deleting updates the live website instantly.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search teachers by name, subject..."
                    value={teacherSearch}
                    onChange={(e) => setTeacherSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  {teacherSearch && (
                    <button
                      onClick={() => setTeacherSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleOpenTeacherModal()}
                  className="font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/30 whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Teacher</span>
                </Button>
              </div>
            </div>

            {filteredTeachers.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
                <Users className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="font-bold text-white text-base">No teachers found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {teacherSearch
                    ? `No teacher matching "${teacherSearch}". Try a different search term.`
                    : "No faculty members in the database yet. Click below to add the first teacher!"}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenTeacherModal()}
                  className="rounded-xl mt-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Add First Teacher</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTeachers.map((t: any) => (
                  <Card
                    key={t.id}
                    className="p-5 sm:p-6 bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 rounded-3xl shadow-xl shadow-slate-950/40"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-sm flex items-center justify-center shadow-md shrink-0">
                            {t.name
                              ? t.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .slice(0, 2)
                                  .join("")
                                  .toUpperCase()
                              : "ED"}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-base sm:text-lg">
                              {t.name}
                            </h3>
                            <div className="text-xs font-semibold text-blue-400">
                              {t.role}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {t.experience} {t.qualification ? `• ${t.qualification}` : ""}
                            </div>
                          </div>
                        </div>

                        {/* Edit / Delete Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenTeacherModal(t)}
                            className="p-2 rounded-xl bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800/80 transition-colors cursor-pointer"
                            title="Edit Teacher Profile"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => triggerDeleteConfirm("teacher", t.id, t.name)}
                            className="p-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/80 transition-colors cursor-pointer"
                            title="Delete Teacher"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {t.bio}
                      </p>

                      {t.subjects && (
                        <div className="space-y-1">
                          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                            Subjects Handled:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {(Array.isArray(t.subjects)
                              ? t.subjects
                              : String(t.subjects).split(",")
                            ).map((sub: string) => (
                              <span
                                key={sub}
                                className="px-2.5 py-0.5 rounded-lg text-[11px] bg-slate-800 text-slate-300 border border-slate-700/80"
                              >
                                {sub.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {t.highlight && (
                      <div className="text-xs text-amber-300 pt-3 border-t border-slate-800 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{t.highlight}</span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: BATCHES & CLASSES (FULL LIVE CRUD) */}
        {/* ============================================================== */}
        {activeTab === "classes" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Batches &amp; Classes</span>
                  <Badge variant="default" className="text-xs">Live Cloud DB</Badge>
                </h2>
                <p className="text-xs text-slate-400">
                  Update timings, batch size caps, syllabi, or add new classes to the course listings.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search batches by grade, title..."
                    value={classSearch}
                    onChange={(e) => setClassSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  {classSearch && (
                    <button
                      onClick={() => setClassSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleOpenClassModal()}
                  className="font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/30 whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Batch</span>
                </Button>
              </div>
            </div>

            {filteredClasses.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
                <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="font-bold text-white text-base">No batches found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {classSearch
                    ? `No batch matching "${classSearch}". Try a different grade name.`
                    : "No batches configured in the database yet. Click below to add a class batch."}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenClassModal()}
                  className="rounded-xl mt-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Add First Batch</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredClasses.map((batch: any) => (
                  <Card
                    key={batch.id}
                    className="p-5 sm:p-6 bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 rounded-3xl shadow-xl shadow-slate-950/40"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-white">{batch.grade}</span>
                            {batch.badge && (
                              <Badge variant="accent" className="text-[11px]">
                                {batch.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="font-semibold text-sm text-blue-400 mt-0.5">
                            {batch.title}
                          </div>
                        </div>

                        {/* Edit / Delete Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenClassModal(batch)}
                            className="p-2 rounded-xl bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800/80 transition-colors cursor-pointer"
                            title="Edit Batch"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => triggerDeleteConfirm("class", batch.id, batch.grade)}
                            className="p-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/80 transition-colors cursor-pointer"
                            title="Delete Batch"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {batch.description}
                      </p>

                      {batch.subjects && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(Array.isArray(batch.subjects)
                            ? batch.subjects
                            : String(batch.subjects).split(",")
                          ).map((sub: string) => (
                            <span
                              key={sub}
                              className="px-2 py-0.5 rounded-md text-[11px] bg-slate-800 text-slate-300"
                            >
                              {sub.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1 pt-3 border-t border-slate-800">
                        <span>
                          Timing: <strong className="text-white">{batch.batchTiming}</strong>
                        </span>
                        <span>
                          Batch Cap: <strong className="text-white">{batch.batchSize}</strong>
                        </span>
                        <span>
                          Curriculum: <strong className="text-white">{batch.curriculum}</strong>
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: TOPPERS & RESULTS (FULL LIVE CRUD) */}
        {/* ============================================================== */}
        {activeTab === "results" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Student Toppers &amp; Testimonials</span>
                  <Badge variant="default" className="text-xs">Live Cloud DB</Badge>
                </h2>
                <p className="text-xs text-slate-400">
                  Celebrate top board scores (95%+), student testimonials, and parent feedback in Koradi.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by student, score, school..."
                    value={resultSearch}
                    onChange={(e) => setResultSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  {resultSearch && (
                    <button
                      onClick={() => setResultSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleOpenTestimonialModal()}
                  className="font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/30 whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Topper</span>
                </Button>
              </div>
            </div>

            {filteredTestimonials.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
                <Award className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="font-bold text-white text-base">No toppers found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {resultSearch
                    ? `No result matching "${resultSearch}".`
                    : "No topper reviews stored yet. Click below to add a student result."}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenTestimonialModal()}
                  className="rounded-xl mt-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Add First Topper</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTestimonials.map((item: any) => (
                  <Card
                    key={item.id}
                    className="p-5 sm:p-6 bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 rounded-3xl shadow-xl shadow-slate-950/40"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-white text-base sm:text-lg">
                            {item.name}
                          </h3>
                          <div className="text-xs text-blue-400">
                            {item.grade} • {item.school}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-xl bg-blue-950 text-blue-300 font-black text-xs border border-blue-800">
                            {item.score}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleOpenTestimonialModal(item)}
                            className="p-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800 transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              triggerDeleteConfirm("testimonial", item.id, item.name)
                            }
                            className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800 flex justify-between">
                      <span>Batch: {item.year}</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Verified Result</span>
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: ADMISSION INQUIRIES (FULL MANAGEMENT) */}
        {/* ============================================================== */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Student &amp; Parent Inquiries</span>
                  <Badge variant="default" className="text-xs">Live Cloud DB</Badge>
                </h2>
                <p className="text-xs text-slate-400">
                  Incoming demo class bookings &amp; admission queries submitted through the website.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, phone, grade..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  {inquirySearch && (
                    <button
                      onClick={() => setInquirySearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Statuses ({data?.inquiries?.length || 0})</option>
                  <option value="new">New Leads</option>
                  <option value="contacted">Contacted</option>
                  <option value="admitted">Admitted</option>
                </select>
              </div>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
                <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="font-bold text-white text-base">No inquiries found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {inquirySearch
                    ? `No leads matching "${inquirySearch}".`
                    : "Form submissions from students and parents will show up here in real time."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredInquiries.map((inq: any) => {
                  const dateStr = inq.created_at
                    ? new Date(Number(inq.created_at)).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Recently";

                  const cleanPhone = String(inq.parent_phone || "")
                    .replace(/\D/g, "")
                    .slice(-10);

                  const whatsappReplyUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                    `Hello! This is Akram Sir from Genius Tuition Classes, Koradi. Thank you for your inquiry for ${inq.student_name} (${inq.grade}). When can we schedule your free 2-day demo class?`
                  )}`;

                  return (
                    <div
                      key={inq.id}
                      className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-slate-950/30"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="font-bold text-white text-base">
                            {inq.student_name}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              inq.status === "new"
                                ? "bg-amber-950 text-amber-300 border border-amber-800"
                                : inq.status === "contacted"
                                ? "bg-blue-950 text-blue-300 border border-blue-800"
                                : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            }`}
                          >
                            {inq.status}
                          </span>
                          <span className="text-xs text-slate-500">{dateStr}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                          <span className="font-semibold text-blue-400">{inq.grade}</span>
                          <span>•</span>
                          <span>Subjects: {inq.subjects}</span>
                          <span>•</span>
                          <span>Batch: {inq.preferred_batch}</span>
                          <span>•</span>
                          <span className="font-mono text-slate-200">
                            📞 {inq.parent_phone}
                          </span>
                        </div>

                        {inq.notes && (
                          <div className="text-xs text-slate-400 italic pt-1">
                            &ldquo;{inq.notes}&rdquo;
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                        <a
                          href={`tel:${inq.parent_phone}`}
                          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-blue-400" />
                          <span>Call</span>
                        </a>

                        <a
                          href={whatsappReplyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleUpdateInquiryStatus(inq.id, e.target.value)
                          }
                          className="px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none cursor-pointer"
                        >
                          <option value="new">Mark New</option>
                          <option value="contacted">Mark Contacted</option>
                          <option value="admitted">Mark Admitted</option>
                        </select>

                        <button
                          type="button"
                          onClick={() =>
                            triggerDeleteConfirm("inquiry", inq.id, inq.student_name)
                          }
                          className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: INSTITUTE SETTINGS */}
        {/* ============================================================== */}
        {activeTab === "settings" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>Institute Information &amp; Numbers</span>
                <Badge variant="default" className="text-xs">Live Cloud DB</Badge>
              </h2>
              <p className="text-xs text-slate-400">
                Updates here change the contact number, Akram Sir details, address, and announcement banner across the public website immediately.
              </p>
            </div>

            <form
              onSubmit={handleSaveSettings}
              className="p-5 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                    Institute Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.contactPerson}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, contactPerson: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                    Phone Number (Display Format)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                    Raw WhatsApp Number (digits only, e.g. 919175691457)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phoneRaw}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, phoneRaw: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                  Institute Address (Koradi, Nagpur)
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.address}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, address: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                    Morning Visiting Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.visiting_morning}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        visiting_morning: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                    Evening Visiting Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.visiting_evening}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        visiting_evening: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                  Announcement Banner (Top of Public Website)
                </label>
                <input
                  type="text"
                  value={settingsForm.banner_announcement}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      banner_announcement: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto rounded-xl font-bold px-6 py-2.5 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes to Database
                </Button>

                {saveStatus && (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    {saveStatus}
                  </span>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* IN-APP CONFIRMATION MODAL FOR DELETIONS */}
      {/* ============================================================== */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-red-900/60 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-800/80 flex items-center justify-center text-red-400 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-bold text-white">
                Delete {deleteModal.title}?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to delete this record? This action will permanently remove it from the Supabase cloud database and the live website.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="md"
                disabled={isDeletingItem}
                onClick={() => setDeleteModal(null)}
                className="flex-1 rounded-xl cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                isLoading={isDeletingItem}
                onClick={handleConfirmDelete}
                className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL DIALOGS FOR ADD / EDIT (TEACHER, BATCH, TESTIMONIAL) */}
      {/* ============================================================== */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {modalType === "teacher" &&
                  (editingItem?.id ? "Edit Teacher Profile" : "Add New Teacher")}
                {modalType === "class" &&
                  (editingItem?.id ? "Edit Batch Details" : "Add New Batch")}
                {modalType === "testimonial" &&
                  (editingItem?.id ? "Edit Topper Result" : "Add New Topper Review")}
              </h3>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* TEACHER FORM */}
            {modalType === "teacher" && (
              <form onSubmit={handleSaveTeacher} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                    Teacher Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                    placeholder="e.g. AKRAM SIR"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                      Role / Designation *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.role}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, role: e.target.value })
                      }
                      placeholder="e.g. Lead Mathematics Educator"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                      Experience *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.experience}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, experience: e.target.value })
                      }
                      placeholder="e.g. 10+ Years Experience"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={editingItem.qualification || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, qualification: e.target.value })
                    }
                    placeholder="e.g. M.Sc. Mathematics, B.Ed."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                    Subjects Taught (comma separated)
                  </label>
                  <input
                    type="text"
                    value={
                      Array.isArray(editingItem.subjects)
                        ? editingItem.subjects.join(", ")
                        : editingItem.subjects || ""
                    }
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, subjects: e.target.value })
                    }
                    placeholder="e.g. Mathematics, Science, Mental Ability"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                    Teacher Bio / Methodology *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingItem.bio}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, bio: e.target.value })
                    }
                    placeholder="Teaching style, patience with weak students..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                    Key Highlight / Achievement
                  </label>
                  <input
                    type="text"
                    value={editingItem.highlight || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, highlight: e.target.value })
                    }
                    placeholder="e.g. Mentored 850+ students with 95%+ board toppers"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => setModalType(null)}
                    className="rounded-xl cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSavingItem}
                    className="rounded-xl font-bold cursor-pointer shadow-lg shadow-blue-600/30"
                  >
                    Save Teacher Profile
                  </Button>
                </div>
              </form>
            )}

            {/* CLASS BATCH FORM */}
            {modalType === "class" && (
              <form onSubmit={handleSaveClass} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                      Grade Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.grade}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, grade: e.target.value })
                      }
                      placeholder="e.g. Class 10th"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                      Badge / Tag
                    </label>
                    <input
                      type="text"
                      value={editingItem.badge || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, badge: e.target.value })
                      }
                      placeholder="e.g. Flagship Batch"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                    Batch Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    placeholder="e.g. Target 95%+ Board Exam Masterclass"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                    Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingItem.description}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                      Batch Timing *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.batchTiming}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, batchTiming: e.target.value })
                      }
                      placeholder="e.g. Evening 6:00 PM - 8:00 PM"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                      Batch Size Limit *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.batchSize}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, batchSize: e.target.value })
                      }
                      placeholder="e.g. Max 18 Students"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                    Subjects (comma separated)
                  </label>
                  <input
                    type="text"
                    value={
                      Array.isArray(editingItem.subjects)
                        ? editingItem.subjects.join(", ")
                        : editingItem.subjects || ""
                    }
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, subjects: e.target.value })
                    }
                    placeholder="e.g. Maths, Science, English, Social"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                    Curriculum / Board
                  </label>
                  <input
                    type="text"
                    value={editingItem.curriculum || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, curriculum: e.target.value })
                    }
                    placeholder="e.g. Maharashtra State Board (SSC) & CBSE"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => setModalType(null)}
                    className="rounded-xl cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSavingItem}
                    className="rounded-xl font-bold cursor-pointer shadow-lg shadow-blue-600/30"
                  >
                    Save Batch
                  </Button>
                </div>
              </form>
            )}

            {/* TESTIMONIAL FORM */}
            {modalType === "testimonial" && (
              <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                      Student / Parent Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.name}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, name: e.target.value })
                      }
                      placeholder="e.g. Rohan Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                      Score / Percentage *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.score}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, score: e.target.value })
                      }
                      placeholder="e.g. 96.4% (Maths 98/100)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                      Grade / Exam *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.grade}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, grade: e.target.value })
                      }
                      placeholder="e.g. Class 10th SSC"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                      School / Location
                    </label>
                    <input
                      type="text"
                      value={editingItem.school || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, school: e.target.value })
                      }
                      placeholder="e.g. Koradi High School, Nagpur"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1.5">
                    Review / Testimonial Quote *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingItem.quote}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, quote: e.target.value })
                    }
                    placeholder="Feedback about Akram Sir's personal attention, weekly tests, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => setModalType(null)}
                    className="rounded-xl cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSavingItem}
                    className="rounded-xl font-bold cursor-pointer shadow-lg shadow-blue-600/30"
                  >
                    Save Testimonial
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
