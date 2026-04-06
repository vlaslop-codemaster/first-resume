"use client";

import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [output, setOutput] = useState("");
  const [form, setForm] = useState({
    name: "",
    education: "",
    activities: "",
    skills: "",
    jobDesc: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateResume = async () => {
    setLoading(true);
    setOutput("");

    const prompt = `
You are a professional resume writer helping students with little or no experience.
Turn the student's experiences into strong, professional bullet points.

Name: ${form.name}
Education: ${form.education}
Activities/Clubs/Volunteering: ${form.activities}
Skills: ${form.skills}
Job Description they are applying to: ${form.jobDesc}

Rules:
- Use strong action verbs
- Add estimated metrics where possible (e.g. "200+ attendees")
- Make it sound impressive but realistic
- Keep it ATS-friendly
- Format it cleanly as a resume

Format:
${form.name}

EDUCATION
[education details]

EXPERIENCE & ACTIVITIES
- [bullet points]

SKILLS
[skills list]
    `;

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setOutput(data.text || "Something went wrong. Please try again.");
    setLoading(false);
  };

  const handlePay = async () => {
    setPaying(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeData: output }),
    });
    const data = await res.json();
   if (data.url) {
  window.open(data.url, "_self");
}
    } else {
      alert("Payment failed to initialize. Please try again.");
      setPaying(false);
    }
  };

  const lines = output.split("\n");
  const half = Math.ceil(lines.length / 2);
  const visibleText = lines.slice(0, half).join("\n");
  const hiddenText = lines.slice(half).join("\n");

  return (
    <main style={{ minHeight: "100vh", background: "#f5f4ff", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Navbar */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", background: "#7c3aed", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>F</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111" }}>FirstResume</span>
        </div>
        <span style={{ fontSize: "13px", color: "#6b7280" }}>Built for students 🎓</span>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "4rem 1rem 2rem" }}>
        <div style={{ display: "inline-block", background: "#ede9fe", color: "#6d28d9", padding: "4px 14px", borderRadius: "9999px", fontSize: "13px", fontWeight: 500, marginBottom: "1rem" }}>
          Free to generate · $1 to download
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#111", marginBottom: "1rem", lineHeight: 1.2 }}>
          No experience?<br />
          <span style={{ color: "#7c3aed" }}>No problem.</span>
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1.1rem", maxWidth: "460px", margin: "0 auto 2rem" }}>
          Build a job-winning resume in 5 minutes — designed for high school and university students.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {["✅ ATS-friendly", "✅ No experience needed", "✅ 5 minutes or less"].map((badge) => (
            <span key={badge} style={{ color: "#374151", fontSize: "14px", fontWeight: 500 }}>{badge}</span>
          ))}
        </div>
      </section>

      {/* Form Card */}
      <section style={{ maxWidth: "580px", margin: "0 auto", padding: "0 1rem 3rem" }}>
        <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #e5e7eb", padding: "2rem", boxShadow: "0 4px 24px rgba(124,58,237,0.07)" }}>

          <div style={{ display: "flex", gap: "8px", marginBottom: "1.75rem" }}>
            {[1, 2].map((s) => (
              <div key={s} style={{ flex: 1, height: "5px", borderRadius: "9999px", background: step >= s ? "#7c3aed" : "#e5e7eb", transition: "background 0.3s" }} />
            ))}
          </div>

          {step === 1 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.25rem", color: "#111" }}>Tell us about yourself</h2>
              <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "1.25rem" }}>Don't worry if you don't have much experience — that's what we're here for.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  name="name"
                  placeholder="Your full name"
                  onChange={handleChange}
                  style={{ border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", fontSize: "15px", outline: "none", width: "100%", boxSizing: "border-box" }}
                />
                <textarea
                  name="education"
                  placeholder="Education (e.g. Grade 11, Westview High School, GPA 3.8)"
                  onChange={handleChange}
                  rows={2}
                  style={{ border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", fontSize: "15px", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical" }}
                />
                <textarea
                  name="activities"
                  placeholder="Clubs, sports, volunteering, school projects, part-time jobs"
                  onChange={handleChange}
                  rows={3}
                  style={{ border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", fontSize: "15px", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical" }}
                />
                <textarea
                  name="skills"
                  placeholder="Skills (e.g. teamwork, Microsoft Excel, coding, customer service)"
                  onChange={handleChange}
                  rows={2}
                  style={{ border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", fontSize: "15px", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical" }}
                />
                <button
                  onClick={() => setStep(2)}
                  style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "10px", padding: "14px", fontSize: "15px", fontWeight: 700, cursor: "pointer", width: "100%" }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.25rem", color: "#111" }}>Job description (optional)</h2>
              <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "1.25rem" }}>Paste the job posting to tailor your resume — or leave blank for a general resume.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <textarea
                  name="jobDesc"
                  placeholder="Paste job or internship description here (or leave blank)"
                  onChange={handleChange}
                  rows={5}
                  style={{ border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", fontSize: "15px", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical" }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => setStep(1)}
                    style={{ background: "#fff", color: "#374151", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "14px", fontSize: "15px", cursor: "pointer", flex: 1 }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={generateResume}
                    disabled={loading}
                    style={{ background: loading ? "#a78bfa" : "#7c3aed", color: "#fff", border: "none", borderRadius: "10px", padding: "14px", fontSize: "15px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", flex: 2 }}
                  >
                    {loading ? "Generating your resume..." : "Generate My Resume ✨"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resume Output */}
        {output && (
          <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #e5e7eb", marginTop: "1.5rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(124,58,237,0.07)" }}>
            <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #f3f4f6" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111", margin: 0 }}>Your Resume Preview</h2>
              <p style={{ color: "#9ca3af", fontSize: "13px", margin: "4px 0 0" }}>Pay $1 to unlock and download the full version</p>
            </div>

            <div style={{ padding: "1.5rem 2rem 0" }}>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.8", color: "#374151", margin: 0 }}>{visibleText}</pre>
            </div>

            <div style={{ position: "relative", padding: "0 2rem" }}>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.8", color: "#374151", margin: 0, filter: "blur(4px)", userSelect: "none" }}>{hiddenText}</pre>

              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: "2rem" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontWeight: 700, fontSize: "1rem", color: "#111", marginBottom: "0.5rem" }}>🔒 Unlock your full resume</p>
                  <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "1rem" }}>Pay just $1 to view, copy and download</p>
                  <button
                    onClick={handlePay}
                    disabled={paying}
                    style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "10px", padding: "14px 32px", fontSize: "15px", fontWeight: 700, cursor: paying ? "not-allowed" : "pointer" }}
                  >
                    {paying ? "Redirecting..." : "Unlock for $1 →"}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ height: "120px" }} />
          </div>
        )}
      </section>

      <footer style={{ textAlign: "center", padding: "2rem", color: "#9ca3af", fontSize: "13px", borderTop: "1px solid #e5e7eb", background: "#fff" }}>
        © 2026 FirstResume — Helping students land their first job.
      </footer>
    </main>
  );
}