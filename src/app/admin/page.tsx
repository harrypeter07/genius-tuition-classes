"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"inquiries" | "settings" | "classes" | "teachers" | "results">(
    "teachers"
  );

  const [data, setData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    name: "Genius Tuition Classes",
    tagline: "Better Learning • Brighter Future",
    motto: "Quality education. Personal attention. Real progress.",
    contactPerson: "AKRAM SIR",
    roleTitle: "Founder & Lead Educator",
    phone: "+91 91756 91457",
    phoneRaw: "919175691457",
    address: "Near Koradi Devi Temple Road / Koradi Power Station Colony, Koradi, Nagpur, Maharashtra - 441111",
    visiting_morning: "8:00 AM - 12:30 PM",
    visiting_evening: "4:00 PM - 8:30 PM",
    banner_announcement: "Admissions Open for New Offline Batches! Free 2-Day Demo Class.",
  });

  // Modal Dialog States
  const [modalType, setModalType] = useState<"teacher" | "class" | "testimonial" | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSavingItem, setIsSavingItem] = useState(false);

  // Search & Filter state
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const res = await fetch("/api/admin/data");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        if (json.data.settings) {
          setSettingsForm((prev) => ({ ...prev, ...json.data.settings }));
        }
      }
    } catch (e) {
      console.error(e);
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
        fetchData();
      } else {
        setLoginError(json.error || "Incorrect credentials");
      }
    } catch (e) {
      setLoginError("Login failed. Please try again.");
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
        setSaveStatus("Saved successfully!");
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus("Error: " + json.error);
      }
    } catch (e: any) {
      setSaveStatus("Failed: " + e.message);
    }
  };

  // CRUD for Teacher
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
      const payload = {
        ...editingItem,
        subjects: Array.isArray(editingItem.subjects)
          ? editingItem.subjects
          : String(editingItem.subjects).split(",").map((s) => s.trim()).filter(Boolean),
      };

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_teacher", payload }),
      });
      if (res.ok) {
        setModalType(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingItem(false);
    }
  };

  const handleDeleteTeacher = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete teacher profile: ${name}?`)) return;
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_teacher", payload: { id } }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // CRUD for Class Batch
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
      const payload = {
        ...editingItem,
        subjects: Array.isArray(editingItem.subjects)
          ? editingItem.subjects
          : String(editingItem.subjects).split(",").map((s) => s.trim()).filter(Boolean),
        features: Array.isArray(editingItem.features)
          ? editingItem.features
          : String(editingItem.features).split("\n").map((f) => f.trim()).filter(Boolean),
      };

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_class", payload }),
      });
      if (res.ok) {
        setModalType(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingItem(false);
    }
  };

  const handleDeleteClass = async (id: string, grade: string) => {
    if (!confirm(`Are you sure you want to delete batch: ${grade}?`)) return;
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_class", payload: { id } }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // CRUD for Testimonial / Topper
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
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_testimonial", payload: editingItem }),
      });
      if (res.ok) {
        setModalType(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingItem(false);
    }
  };

  const handleDeleteTestimonial = async (id: string, name: string) => {
    if (!confirm(`Delete topper review for ${name}?`)) return;
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_testimonial", payload: { id } }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Inquiries Actions
  const handleUpdateInquiryStatus = async (id: number, status: string) => {
    try {
      await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_inquiry_status",
          payload: { id, status },
        }),
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteInquiry = async (id: number, name: string) => {
    if (!confirm(`Delete inquiry for ${name}?`)) return;
    try {
      await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete_inquiry",
          payload: { id },
        }),
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  // Filter inquiries
  const inquiries = data?.inquiries || [];
  const filteredInquiries = inquiries.filter((inq: any) => {
    const matchesSearch =
      inq.student_name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.parent_phone.includes(inquirySearch) ||
      inq.grade.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesStatus =
      inquiryStatusFilter === "all" || inq.status === inquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070c18] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-blue-600/30">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white">
              Genius Tuition Classes
            </h1>
            <p className="text-xs text-slate-400">
              Admin & Management Portal • Koradi, Nagpur
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
              className="w-full rounded-xl font-bold py-3 text-sm"
            >
              Unlock Admin Panel
            </Button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col">
      
      {/* Top Admin Header Bar - Highly Mobile Responsive */}
      <header className="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-white text-sm sm:text-base leading-tight">
              Genius Tuition Classes
            </div>
            <div className="text-[10px] sm:text-[11px] text-blue-400 font-medium">
              Admin &amp; Management Portal • Koradi
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={fetchData}
            title="Refresh Data"
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 w-full flex-1 space-y-6">
        
        {/* Navigation Tabs - Horizontally scrollable on mobile */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveTab("teachers")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "teachers"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Faculty &amp; Akram Sir</span>
          </button>

          <button
            onClick={() => setActiveTab("classes")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "classes"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Batches &amp; Classes</span>
          </button>

          <button
            onClick={() => setActiveTab("results")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "results"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Toppers &amp; Results</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "inquiries"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Admission Inquiries</span>
            {inquiries.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-blue-950 text-blue-300 text-[10px] font-bold border border-blue-800">
                {inquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "settings"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Institute &amp; Contact Info</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: FACULTY & TEACHERS (FULL CRUD) */}
        {/* ============================================================== */}
        {activeTab === "teachers" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Faculty Members</span>
                  <Badge variant="default" className="text-xs">Live Database</Badge>
                </h2>
                <p className="text-xs text-slate-400">
                  Add, edit, or remove teachers. Changes reflect immediately on the live website.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => handleOpenTeacherModal()}
                className="w-full sm:w-auto font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Teacher</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data?.teachers || []).map((t: any) => (
                <Card
                  key={t.id}
                  className="p-5 sm:p-6 bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-white text-lg">{t.name}</h3>
                        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                          {t.role}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {t.experience} {t.qualification ? `• ${t.qualification}` : ""}
                        </div>
                      </div>

                      {/* Edit / Delete Action Buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenTeacherModal(t)}
                          className="p-2 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800 transition-colors cursor-pointer"
                          title="Edit Teacher"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteTeacher(t.id, t.name)}
                          className="p-2 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 transition-colors cursor-pointer"
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
                        <div className="text-[11px] font-semibold text-slate-400 uppercase">
                          Subjects:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(Array.isArray(t.subjects) ? t.subjects : String(t.subjects).split(",")).map(
                            (sub: string) => (
                              <span
                                key={sub}
                                className="px-2.5 py-0.5 rounded-md text-[11px] bg-slate-800 text-slate-300 border border-slate-700"
                              >
                                {sub.trim()}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {t.highlight && (
                    <div className="text-xs text-amber-300 pt-3 border-t border-slate-800 flex items-center gap-1.5">
                      <span>⭐</span>
                      <span>{t.highlight}</span>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: BATCHES & CLASSES (FULL CRUD) */}
        {/* ============================================================== */}
        {activeTab === "classes" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Active Batches &amp; Classes</span>
                  <Badge variant="default" className="text-xs">Live Database</Badge>
                </h2>
                <p className="text-xs text-slate-400">
                  Manage class offerings, student capacity caps, timings, and syllabi.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => handleOpenClassModal()}
                className="w-full sm:w-auto font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Batch</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data?.classes || []).map((batch: any) => (
                <Card
                  key={batch.id}
                  className="p-5 sm:p-6 bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-black text-white">{batch.grade}</span>
                          {batch.badge && <Badge variant="accent">{batch.badge}</Badge>}
                        </div>
                        <div className="font-semibold text-sm text-blue-400 mt-1">
                          {batch.title}
                        </div>
                      </div>

                      {/* Edit / Delete Buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenClassModal(batch)}
                          className="p-2 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800 transition-colors cursor-pointer"
                          title="Edit Batch"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteClass(batch.id, batch.grade)}
                          className="p-2 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 transition-colors cursor-pointer"
                          title="Delete Batch"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {batch.description}
                    </p>

                    <div className="text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1 pt-2 border-t border-slate-800">
                      <span>Timing: <strong className="text-white">{batch.batchTiming}</strong></span>
                      <span>Cap: <strong className="text-white">{batch.batchSize}</strong></span>
                      <span>Board: <strong className="text-white">{batch.curriculum}</strong></span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: TOPPERS & RESULTS (FULL CRUD) */}
        {/* ============================================================== */}
        {activeTab === "results" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Student Toppers &amp; Testimonials</span>
                  <Badge variant="default" className="text-xs">Live Database</Badge>
                </h2>
                <p className="text-xs text-slate-400">
                  Highlight star achievers, board percentages, and parent recommendations in Koradi.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => handleOpenTestimonialModal()}
                className="w-full sm:w-auto font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add Topper / Review</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data?.testimonials || []).map((item: any) => (
                <Card
                  key={item.id}
                  className="p-5 sm:p-6 bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-white text-base">{item.name}</h3>
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
                          className="p-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteTestimonial(item.id, item.name)}
                          className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 transition-colors"
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
                    <span className="text-emerald-400">✓ Verified Review</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: ADMISSION INQUIRIES (FULL MANAGEMENT) */}
        {/* ============================================================== */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Student &amp; Parent Inquiries
                </h2>
                <p className="text-xs text-slate-400">
                  Real-time leads submitted through the admission form on the website.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, phone..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="new">New Leads</option>
                  <option value="contacted">Contacted</option>
                  <option value="admitted">Admitted</option>
                </select>
              </div>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-sm">
                No inquiries found yet. Submissions from the website form will appear here automatically!
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredInquiries.map((inq: any) => {
                  const dateStr = inq.created_at
                    ? new Date(Number(inq.created_at)).toLocaleString("en-IN")
                    : "Recently";

                  const whatsappReplyUrl = `https://wa.me/91${inq.parent_phone.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(
                    `Hello! This is Akram Sir from Genius Tuition Classes, Koradi. Thank you for your inquiry for ${inq.student_name} (${inq.grade}). When can we schedule your 2-day demo class?`
                  )}`;

                  return (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
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
                          <span className="font-mono text-slate-200">📞 {inq.parent_phone}</span>
                        </div>

                        {inq.notes && (
                          <div className="text-xs text-slate-400 italic pt-1">
                            &ldquo;{inq.notes}&rdquo;
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                        <a
                          href={`tel:${inq.parent_phone}`}
                          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700"
                        >
                          <Phone className="w-3.5 h-3.5 text-blue-400" />
                          <span>Call</span>
                        </a>

                        <a
                          href={whatsappReplyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                          className="px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none"
                        >
                          <option value="new">Mark New</option>
                          <option value="contacted">Mark Contacted</option>
                          <option value="admitted">Mark Admitted</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq.id, inq.student_name)}
                          className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40"
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
                <Badge variant="default" className="text-xs">Live Database</Badge>
              </h2>
              <p className="text-xs text-slate-400">
                Updates here change the contact number, Akram Sir details, and addresses across the website immediately.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="p-5 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                    Institute Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
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
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactPerson: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                    Phone Number (Display)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                    Raw WhatsApp Number (No spaces)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phoneRaw}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phoneRaw: e.target.value })}
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
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
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
                    onChange={(e) => setSettingsForm({ ...settingsForm, visiting_morning: e.target.value })}
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
                    onChange={(e) => setSettingsForm({ ...settingsForm, visiting_evening: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-2">
                  Announcement Banner (Top of Website)
                </label>
                <input
                  type="text"
                  value={settingsForm.banner_announcement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, banner_announcement: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto rounded-xl font-bold px-6 py-2.5"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes to Database
                </Button>

                {saveStatus && (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
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
      {/* MODAL DIALOGS FOR ADD / EDIT (TEACHER, BATCH, TESTIMONIAL) */}
      {/* ============================================================== */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {modalType === "teacher" && (editingItem?.id ? "Edit Teacher Profile" : "Add New Teacher")}
                {modalType === "class" && (editingItem?.id ? "Edit Batch Details" : "Add New Batch")}
                {modalType === "testimonial" && (editingItem?.id ? "Edit Topper Result" : "Add New Topper Review")}
              </h3>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
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
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
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
                      onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
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
                      onChange={(e) => setEditingItem({ ...editingItem, experience: e.target.value })}
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
                    onChange={(e) => setEditingItem({ ...editingItem, qualification: e.target.value })}
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
                    value={Array.isArray(editingItem.subjects) ? editingItem.subjects.join(", ") : editingItem.subjects || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, subjects: e.target.value })}
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
                    onChange={(e) => setEditingItem({ ...editingItem, bio: e.target.value })}
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
                    onChange={(e) => setEditingItem({ ...editingItem, highlight: e.target.value })}
                    placeholder="e.g. Mentored 850+ students with 95%+ board toppers"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button type="button" variant="outline" size="md" onClick={() => setModalType(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md" isLoading={isSavingItem}>
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
                      onChange={(e) => setEditingItem({ ...editingItem, grade: e.target.value })}
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
                      onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
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
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
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
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
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
                      onChange={(e) => setEditingItem({ ...editingItem, batchTiming: e.target.value })}
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
                      onChange={(e) => setEditingItem({ ...editingItem, batchSize: e.target.value })}
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
                    value={Array.isArray(editingItem.subjects) ? editingItem.subjects.join(", ") : editingItem.subjects || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, subjects: e.target.value })}
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
                    onChange={(e) => setEditingItem({ ...editingItem, curriculum: e.target.value })}
                    placeholder="e.g. Maharashtra State Board (SSC) & CBSE"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button type="button" variant="outline" size="md" onClick={() => setModalType(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md" isLoading={isSavingItem}>
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
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
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
                      onChange={(e) => setEditingItem({ ...editingItem, score: e.target.value })}
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
                      onChange={(e) => setEditingItem({ ...editingItem, grade: e.target.value })}
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
                      onChange={(e) => setEditingItem({ ...editingItem, school: e.target.value })}
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
                    onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                    placeholder="Feedback about Akram Sir's personal attention, weekly tests, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button type="button" variant="outline" size="md" onClick={() => setModalType(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md" isLoading={isSavingItem}>
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
