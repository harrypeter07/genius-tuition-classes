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
  CheckCircle,
  Clock,
  Save,
  Lock,
  LogOut,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"inquiries" | "settings" | "classes" | "teachers" | "results">(
    "inquiries"
  );

  const [data, setData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Form states for settings
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

  const handleUpdateInquiryStatus = async (id: number, status: string) => {
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
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered inquiries
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
        <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-blue-600/30">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white">
              Genius Tuition Classes
            </h1>
            <p className="text-xs text-slate-400">
              Admin & Management Portal (Koradi, Nagpur)
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
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
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
              className="w-full rounded-xl font-bold py-3"
            >
              Unlock Admin Panel
            </Button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <span>← Back to Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-white text-base leading-tight">
              Genius Tuition Classes
            </div>
            <div className="text-[11px] text-blue-400 font-medium">
              Management Portal • Koradi, Nagpur
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            <span>View Live Site</span>
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/40 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "inquiries"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Admission Inquiries</span>
            {inquiries.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 text-[10px] font-bold border border-blue-800">
                {inquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "settings"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Institute & Contact Info</span>
          </button>

          <button
            onClick={() => setActiveTab("classes")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "classes"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Batches & Classes</span>
          </button>

          <button
            onClick={() => setActiveTab("teachers")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "teachers"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Faculty & Akram Sir</span>
          </button>

          <button
            onClick={() => setActiveTab("results")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "results"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Toppers & Results</span>
          </button>
        </div>

        {/* TAB 1: INQUIRIES INBOX */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Student & Parent Inquiries
                </h2>
                <p className="text-xs text-slate-400">
                  Real-time leads from the website admission form
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, phone..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
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
                      className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
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

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                          <span className="font-semibold text-blue-400">
                            {inq.grade}
                          </span>
                          <span>•</span>
                          <span>Subjects: {inq.subjects}</span>
                          <span>•</span>
                          <span>Batch: {inq.preferred_batch}</span>
                        </div>

                        {inq.notes && (
                          <div className="text-xs text-slate-400 italic pt-1">
                            &ldquo;{inq.notes}&rdquo;
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                        <a
                          href={`tel:${inq.parent_phone}`}
                          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700"
                        >
                          <Phone className="w-3.5 h-3.5 text-blue-400" />
                          <span>Call</span>
                        </a>

                        <a
                          href={whatsappReplyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                          className="px-2 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none"
                        >
                          <option value="new">Mark New</option>
                          <option value="contacted">Mark Contacted</option>
                          <option value="admitted">Mark Admitted</option>
                          <option value="archived">Archive</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INSTITUTE SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                Institute Information & Contact Numbers
              </h2>
              <p className="text-xs text-slate-400">
                Updates here change the contact number, Akram Sir details, and addresses across the website immediately.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
              
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

              <div className="pt-2 flex items-center justify-between">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="rounded-xl font-bold px-6 py-2.5"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes to Database
                </Button>

                {saveStatus && (
                  <span className="text-xs font-semibold text-emerald-400">
                    {saveStatus}
                  </span>
                )}
              </div>

            </form>
          </div>
        )}

        {/* TAB 3: CLASSES & BATCHES */}
        {activeTab === "classes" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                Active Classes & Batches
              </h2>
              <p className="text-xs text-slate-400">
                View offline batches and student capacity limits in Koradi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data?.classes || []).map((batch: any) => (
                <Card key={batch.id} className="p-6 bg-slate-900/60 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">{batch.grade}</span>
                    <Badge variant="accent">{batch.badge}</Badge>
                  </div>
                  <div className="font-semibold text-sm text-blue-400">{batch.title}</div>
                  <p className="text-xs text-slate-300">{batch.description}</p>
                  <div className="text-xs text-slate-400 flex justify-between pt-2 border-t border-slate-800">
                    <span>Timing: <strong className="text-white">{batch.batchTiming}</strong></span>
                    <span>Cap: <strong className="text-white">{batch.batchSize}</strong></span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TEACHERS */}
        {activeTab === "teachers" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                Faculty Members
              </h2>
              <p className="text-xs text-slate-400">
                Teachers providing offline guidance to students
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data?.teachers || []).map((t: any) => (
                <Card key={t.id} className="p-6 bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">{t.name}</h3>
                    <span className="text-xs text-blue-400">{t.experience}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">{t.role}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{t.bio}</p>
                  <div className="text-xs text-amber-300 pt-2 border-t border-slate-800">
                    ⭐ {t.highlight}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: RESULTS & TOPPERS */}
        {activeTab === "results" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                Student Toppers & Testimonials
              </h2>
              <p className="text-xs text-slate-400">
                Recent academic achievements and verified parent feedback
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data?.testimonials || []).map((item: any) => (
                <Card key={item.id} className="p-6 bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base">{item.name}</h3>
                      <div className="text-xs text-blue-400">{item.grade} • {item.school}</div>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-blue-950 text-blue-300 font-bold text-xs border border-blue-800">
                      {item.score}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic">&ldquo;{item.quote}&rdquo;</p>
                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                    Batch: {item.year}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
