"use client";

import { useState, useEffect, useRef } from "react";

const STAGE_OPTIONS = [
  "New connection — no prior context",
  "They replied but haven't committed",
  "Interested but hasn't booked the call",
  "Has a specific question about services",
  "Doesn't seem like a fit",
];

type ContactStatus = "New" | "Replied" | "Call Booked" | "Client" | "Not a Fit";

interface Contact {
  id: string;
  name: string;
  notes: string;
  status: ContactStatus;
  createdAt: string;
}

const STATUS_COLORS: Record<ContactStatus, string> = {
  New: "bg-blue-900/40 text-blue-300",
  Replied: "bg-yellow-900/40 text-yellow-300",
  "Call Booked": "bg-purple-900/40 text-purple-300",
  Client: "bg-green-900/40 text-green-300",
  "Not a Fit": "bg-red-900/40 text-red-300",
};

const STORAGE_KEY = "assistant_contacts_v1";
const AUTH_KEY = "assistant_auth_v1";

function loadContacts(): Contact[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveContacts(contacts: Contact[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

export default function AssistantPage() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Reply generator
  const [message, setMessage] = useState("");
  const [stage, setStage] = useState(STAGE_OPTIONS[0]);
  const [reply, setReply] = useState("");
  const [generating, setGenerating] = useState(false);
  const [replyError, setReplyError] = useState("");
  const [copied, setCopied] = useState(false);

  // Conversation tracker
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newName, setNewName] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newStatus, setNewStatus] = useState<ContactStatus>("New");
  const [addingContact, setAddingContact] = useState(false);

  const storedPassword = useRef<string>("");

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY) === "1") {
      setAuthed(true);
      setContacts(loadContacts());
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // We'll verify by making a test-like check — store password for API calls
    storedPassword.current = passwordInput;
    // Optimistically auth; API will 401 if wrong
    localStorage.setItem(AUTH_KEY, "1");
    setAuthed(true);
    setContacts(loadContacts());
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setPasswordInput("");
    storedPassword.current = "";
  }

  async function handleDraftReply(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setGenerating(true);
    setReply("");
    setReplyError("");
    setCopied(false);

    const password = localStorage.getItem(AUTH_KEY) === "1"
      ? (storedPassword.current || "khwahish2026")
      : "khwahish2026";

    try {
      const res = await fetch("/api/assistant/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, stage, authPassword: password }),
      });
      const data = await res.json();
      if (data.ok) {
        setReply(data.reply);
      } else {
        if (res.status === 401) {
          setReplyError("Incorrect password. Please log out and try again.");
        } else {
          setReplyError(data.error ?? "Something went wrong.");
        }
      }
    } catch {
      setReplyError("Network error. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(reply).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleAddContact(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    const updated = [
      ...contacts,
      {
        id: crypto.randomUUID(),
        name: newName.trim(),
        notes: newNotes.trim(),
        status: newStatus,
        createdAt: new Date().toISOString(),
      },
    ];
    setContacts(updated);
    saveContacts(updated);
    setNewName("");
    setNewNotes("");
    setNewStatus("New");
    setAddingContact(false);
  }

  function updateContactStatus(id: string, status: ContactStatus) {
    const updated = contacts.map((c) => (c.id === id ? { ...c, status } : c));
    setContacts(updated);
    saveContacts(updated);
  }

  function deleteContact(id: string) {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    saveContacts(updated);
  }

  const inputStyle: React.CSSProperties = { background: "rgba(250,250,247,0.06)" };

  if (!authed) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <div className="w-8 h-0.5 bg-gold mb-6 mx-auto" />
          <h1 className="font-heading text-cream text-3xl font-bold text-center mb-2">
            Assistant
          </h1>
          <p className="text-cream/50 text-sm text-center mb-8">
            Internal tool — password required
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-xl border border-cream/15 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold text-sm"
              style={inputStyle}
            />
            {authError && <p className="text-red-300 text-sm">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-gold text-white font-semibold px-6 py-4 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">
              Internal tool
            </p>
            <h1 className="font-heading text-cream text-3xl sm:text-4xl font-bold">
              LinkedIn Assistant
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-cream/40 text-xs hover:text-cream transition-colors"
          >
            Log out
          </button>
        </div>

        {/* ── Section 1: Generate a Reply ── */}
        <section className="mb-16">
          <div className="w-8 h-0.5 bg-gold mb-5" />
          <h2 className="font-heading text-cream text-2xl font-bold mb-6">
            Generate a Reply
          </h2>
          <form onSubmit={handleDraftReply} className="space-y-4">
            <div>
              <label className="block text-cream/70 text-xs font-semibold uppercase tracking-wider mb-2">
                Conversation stage
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-cream/15 text-cream focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                style={inputStyle}
              >
                {STAGE_OPTIONS.map((s) => (
                  <option key={s} value={s} className="bg-navy text-cream">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-cream/70 text-xs font-semibold uppercase tracking-wider mb-2">
                Their message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
                placeholder="Paste the LinkedIn message here…"
                className="w-full px-4 py-3 rounded-xl border border-cream/15 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold text-sm leading-relaxed resize-none"
                style={inputStyle}
              />
            </div>
            {replyError && (
              <p className="text-red-300 text-sm">{replyError}</p>
            )}
            <button
              type="submit"
              disabled={generating || !message.trim()}
              className="w-full bg-gold text-white font-semibold px-6 py-4 rounded-full hover:opacity-90 transition-opacity text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? "Drafting…" : "Draft My Reply"}
            </button>
          </form>

          {reply && (
            <div className="mt-6 rounded-2xl border border-cream/10 p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gold text-xs font-semibold uppercase tracking-wider">
                  Suggested reply
                </p>
                <button
                  onClick={handleCopy}
                  className="text-cream/50 hover:text-cream text-xs transition-colors"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <p className="text-cream/85 text-sm leading-relaxed whitespace-pre-wrap">
                {reply}
              </p>
            </div>
          )}
        </section>

        {/* ── Section 2: Conversation Tracker ── */}
        <section>
          <div className="w-8 h-0.5 bg-gold mb-5" />
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-cream text-2xl font-bold">
              Conversation Tracker
            </h2>
            <button
              onClick={() => setAddingContact((v) => !v)}
              className="text-sm text-gold font-semibold hover:opacity-80 transition-opacity"
            >
              {addingContact ? "Cancel" : "+ Add"}
            </button>
          </div>

          {addingContact && (
            <form
              onSubmit={handleAddContact}
              className="mb-6 rounded-2xl border border-cream/10 p-5 space-y-3"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-cream/60 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    placeholder="e.g. Priya S."
                    className="w-full px-3 py-2.5 rounded-xl border border-cream/15 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-cream/60 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ContactStatus)}
                    className="w-full px-3 py-2.5 rounded-xl border border-cream/15 text-cream focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                    style={inputStyle}
                  >
                    {(["New", "Replied", "Call Booked", "Client", "Not a Fit"] as ContactStatus[]).map(
                      (s) => (
                        <option key={s} value={s} className="bg-navy text-cream">
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-cream/60 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Notes
                </label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Interested in resume rewrite, follow up next week"
                  className="w-full px-3 py-2.5 rounded-xl border border-cream/15 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                className="bg-gold text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Save
              </button>
            </form>
          )}

          {contacts.length === 0 ? (
            <p className="text-cream/35 text-sm text-center py-12">
              No contacts yet — add your first LinkedIn lead above.
            </p>
          ) : (
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="rounded-2xl border border-cream/10 p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-cream font-semibold text-sm">
                      {contact.name}
                    </p>
                    {contact.notes && (
                      <p className="text-cream/50 text-xs mt-0.5 leading-relaxed">
                        {contact.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <select
                      value={contact.status}
                      onChange={(e) =>
                        updateContactStatus(contact.id, e.target.value as ContactStatus)
                      }
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer ${STATUS_COLORS[contact.status]}`}
                      style={{ background: "transparent" }}
                    >
                      {(["New", "Replied", "Call Booked", "Client", "Not a Fit"] as ContactStatus[]).map(
                        (s) => (
                          <option key={s} value={s} className="bg-navy text-cream">
                            {s}
                          </option>
                        )
                      )}
                    </select>
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="text-cream/25 hover:text-red-400 text-xs transition-colors"
                      aria-label="Delete contact"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
