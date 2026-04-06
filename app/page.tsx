"use client";

import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
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

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();
    const text = data.content?.[0]?.text || "Something went wrong. Please try again.";
    setOutput(text);
    setLoading(false);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      
      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "1rem 2rem", display: "flex", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: "1.25rem", color: "#111" }}>FirstResume</span>
        <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", background: "#f3f0ff", color: "#6d28d9", padding: "2px 8px", borderRadius: "9999px" }}>for students</span>
      </header>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "3rem 1rem 2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#111", marginBottom: "0.75rem" }}>
          No experience? No problem.
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1.1rem", maxWidth: "480px", margin: "0 auto" }}>
          Build a job-winning resume in 5 minutes — designed for high school and university students.
        </p>
      </section>

      {/* Form Card */}
      <section style={{ maxWidth: "560px", margin: "0 auto", padding: "0 1rem 3rem" }}>
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem" }}>

          {/* Progress */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "4px", borderRadius: "9999px", background: step >= 1 ? "#7c3aed" : "#e5e7eb" }} />
            <div style={{ flex: 1, height: "4px", borderRadius: "9999px", background: step >= 2 ? "#7c3aed" : "#e5e7eb" }} />
          </div>

          {step === 1 && (
            <div>
              <h2 style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "1.25rem", color: "#111" }}>Tell us about yourself</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  name="name"
                  placeholder="Your full name"
                  onChange={handleChange}
                  style={{ border: "1px solid #d1d5db", borderRadius: "8px", padding: "10px 14px", fontSize: "15px", outline: "none", width: "100%", boxSizing: "border-box" }}
                />
                <textarea
                  name="education"
                  placeholder="Education (e.g. Grade 11, Westview High School, GPA 3.8)"
                  onChange={handleChange}
                  rows={2}
                  style={{ border: "1px solid #d1d5db", borderRadius: "8px", padding: "10px 14px", fontSize: "15px", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical" }}
                />
                <textarea
                  name="activities"
                  placeholder="Clubs, sports, volunteering, school projects, part-time jobs"
                  onChange={handleChange}
                  rows={3}
                  style={{ border: "1px solid #d1d5db", borderRadius: "8px", padding: "10px 14px", fontSize: "15px", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical" }}
                />
                <textarea
                  name="skills"
                  placeholder="Skills (e.g. teamwork, Microsoft Excel, coding, customer service)"
                  onChange={handleChange}
                  rows={2}
                  style={{ border: "1px solid #d1d5db", borderRadius: "8px", padding: "10px 14px", fontSize: "15px", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical" }}
                />
                <button
                  onClick={() => setStep(2)}
                  style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontSize: "15px", fontWeight: 600, cursor: "pointer", width: "100%" }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.5rem", color: "#111" }}>Job description (optional)</h2>
              <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "1rem" }}>Paste the job posting to tailor your resume to it.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <textarea
                  name="jobDesc"
                  placeholder="Paste job or internship description here (or leave blank)"
                  onChange={handleChange}
                  rows={5}
                  style={{ border: "1px solid #d1d5db", borderRadius: "8px", padding: "10px 14px", fontSize: "15px", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical" }}
                />
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => setStep(1)}
                    style={{ background: "#fff", color: "#374151", border: "1px solid #d1d5db", borderRadius: "8px", padding: "12px", fontSize: "15px", cursor: "pointer", flex: 1 }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={generateResume}
                    disabled={loading}
                    style={{ background: loading ? "#a78bfa" : "#7c3aed", color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", flex: 2 }}
                  >
                    {loading ? "Generating..." : "Generate My Resume"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Output */}
        {output && (
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", marginTop: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ fontWeight: 600, fontSize: "1.1rem", color: "#111", margin: 0 }}>Your Resume</h2>
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                style={{ background: "#f3f0ff", color: "#6d28d9", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "13px", cursor: "pointer", fontWeight: 500 }}
              >
                Copy
              </button>
            </div>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.7", color: "#374151", margin: 0 }}>{output}</pre>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "1.5rem", color: "#9ca3af", fontSize: "13px" }}>
        © 2026 FirstResume — Built for students.
      </footer>
    </main>
  );
}