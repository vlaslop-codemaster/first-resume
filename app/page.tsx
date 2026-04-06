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
- Add estimated metrics where possible
- Make it sound impressive but realistic
- Keep it ATS-friendly

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
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: output }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
      } else {
        alert("Payment failed to initialize. Please try again.");
        setPaying(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setPaying(false);
    }
  };

  const lines = output.split("\n");
  const half = Math.ceil(lines.length / 2);
  const visibleText = lines.slice(0, half).join("\n");
  const hiddenText = lines.slice(half).join("\n");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #0f0a1e;
          color: #e8e0f0;
          min-height: 100vh;
        }

        .page { min-height: 100vh; position: relative; overflow: hidden; }

        .bg-orbs {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
        }
        .orb {
          position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.25;
        }
        .orb1 { width: 500px; height: 500px; background: #7c3aed; top: -100px; left: -100px; }
        .orb2 { width: 400px; height: 400px; background: #ec4899; bottom: 100px; right: -100px; }
        .orb3 { width: 300px; height: 300px; background: #3b82f6; top: 50%; left: 50%; transform: translate(-50%,-50%); }

        nav {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          background: rgba(15,10,30,0.6);
        }

        .logo {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Sora', sans-serif; font-weight: 800; font-size: 1.1rem;
          color: #fff;
        }

        .logo-icon {
          width: 34px; height: 34px; border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }

        .nav-badge {
          font-size: 12px; color: #a78bfa;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3);
          padding: 4px 12px; border-radius: 9999px;
        }

        .hero {
          position: relative; z-index: 10;
          text-align: center; padding: 5rem 1rem 3rem;
        }

        .pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.35);
          color: #c4b5fd; font-size: 13px; font-weight: 500;
          padding: 6px 16px; border-radius: 9999px; margin-bottom: 1.5rem;
        }

        h1 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2.2rem, 6vw, 3.5rem);
          font-weight: 800; line-height: 1.15;
          color: #fff; margin-bottom: 1.25rem;
        }

        h1 .gradient-text {
          background: linear-gradient(135deg, #a78bfa, #ec4899);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 1.05rem; color: #9ca3af;
          max-width: 440px; margin: 0 auto 2.5rem; line-height: 1.7;
        }

        .badges {
          display: flex; justify-content: center; flex-wrap: wrap; gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .badge {
          display: flex; align-items: center; gap: 6px;
          font-size: 14px; color: #d1d5db; font-weight: 500;
        }

        .card {
          position: relative; z-index: 10;
          max-width: 580px; margin: 0 auto; padding: 0 1rem 3rem;
        }

        .form-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px; padding: 2rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
        }

        .progress-bar { display: flex; gap: 8px; margin-bottom: 2rem; }
        .progress-seg {
          flex: 1; height: 4px; border-radius: 9999px;
          background: rgba(255,255,255,0.1);
          transition: background 0.3s;
        }
        .progress-seg.active {
          background: linear-gradient(90deg, #7c3aed, #ec4899);
        }

        .form-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.15rem; font-weight: 700;
          color: #fff; margin-bottom: 4px;
        }

        .form-subtitle {
          font-size: 13px; color: #6b7280; margin-bottom: 1.25rem;
        }

        .fields { display: flex; flex-direction: column; gap: 12px; }

        input, textarea {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          color: #e8e0f0;
          outline: none;
          transition: border 0.2s, background 0.2s;
          resize: vertical;
        }

        input::placeholder, textarea::placeholder { color: #4b5563; }

        input:focus, textarea:focus {
          border-color: rgba(124,58,237,0.6);
          background: rgba(124,58,237,0.08);
        }

        .btn-primary {
          width: 100%;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: #fff; border: none; border-radius: 12px;
          padding: 14px; font-size: 15px; font-weight: 700;
          font-family: 'Sora', sans-serif;
          cursor: pointer; transition: opacity 0.2s, transform 0.1s;
          letter-spacing: 0.01em;
        }

        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .btn-secondary {
          flex: 1;
          background: rgba(255,255,255,0.06);
          color: #d1d5db; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 14px; font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: background 0.2s;
        }

        .btn-secondary:hover { background: rgba(255,255,255,0.1); }

        .btn-row { display: flex; gap: 10px; }

        .output-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px; margin-top: 1.5rem;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
        }

        .output-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .output-title {
          font-family: 'Sora', sans-serif;
          font-weight: 700; font-size: 1rem; color: #fff;
        }

        .output-sub { font-size: 13px; color: #6b7280; margin-top: 4px; }

        .resume-text {
          white-space: pre-wrap; font-size: 14px;
          line-height: 1.8; color: #d1d5db;
          font-family: 'DM Sans', sans-serif;
          margin: 0;
        }

        .resume-visible { padding: 1.5rem 2rem 0; }

        .resume-locked { position: relative; padding: 0 2rem; }

        .resume-blurred {
          filter: blur(5px); user-select: none; pointer-events: none;
        }

        .lock-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(15,10,30,0.97) 60%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding-bottom: 2.5rem;
        }

        .lock-box { text-align: center; }

        .lock-icon {
          font-size: 2rem; margin-bottom: 0.75rem; display: block;
        }

        .lock-title {
          font-family: 'Sora', sans-serif;
          font-weight: 700; font-size: 1.05rem;
          color: #fff; margin-bottom: 6px;
        }

        .lock-sub { font-size: 14px; color: #6b7280; margin-bottom: 1.25rem; }

        .btn-unlock {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: #fff; border: none; border-radius: 12px;
          padding: 14px 36px; font-size: 15px; font-weight: 700;
          font-family: 'Sora', sans-serif;
          cursor: pointer; transition: opacity 0.2s, transform 0.1s;
        }

        .btn-unlock:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-unlock:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .spacer { height: 140px; }

        footer {
          position: relative; z-index: 10;
          text-align: center; padding: 2rem;
          color: #4b5563; font-size: 13px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
      `}</style>

      <div className="page">
        <div className="bg-orbs">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="orb orb3" />
        </div>

        <nav>
          <div className="logo">
            <div className="logo-icon">📄</div>
            FirstResume
          </div>
          <span className="nav-badge">🎓 Built for students</span>
        </nav>

        <section className="hero">
          <div className="pill">✨ Free to generate · $1 to download</div>
          <h1>
            No experience?<br />
            <span className="gradient-text">No problem.</span>
          </h1>
          <p className="subtitle">
            Build a job-winning resume in 5 minutes — designed for high school and university students.
          </p>
          <div className="badges">
            <span className="badge">✅ ATS-friendly</span>
            <span className="badge">✅ No experience needed</span>
            <span className="badge">✅ 5 minutes or less</span>
          </div>
        </section>

        <div className="card">
          <div className="form-card">
            <div className="progress-bar">
              {[1, 2].map((s) => (
                <div key={s} className={`progress-seg${step >= s ? " active" : ""}`} />
              ))}
            </div>

            {step === 1 && (
              <div>
                <p className="form-title">👋 Tell us about yourself</p>
                <p className="form-subtitle">Don&apos;t worry if you don&apos;t have much — that&apos;s what we&apos;re here for.</p>
                <div className="fields">
                  <input name="name" placeholder="Your full name" onChange={handleChange} />
                  <textarea name="education" placeholder="🏫 Education (e.g. Grade 11, Westview High School, GPA 3.8)" onChange={handleChange} rows={2} />
                  <textarea name="activities" placeholder="⚽ Clubs, sports, volunteering, school projects, part-time jobs" onChange={handleChange} rows={3} />
                  <textarea name="skills" placeholder="💡 Skills (e.g. teamwork, Excel, coding, customer service)" onChange={handleChange} rows={2} />
                  <button className="btn-primary" onClick={() => setStep(2)}>Continue →</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="form-title">📋 Job description (optional)</p>
                <p className="form-subtitle">Paste the job posting to tailor your resume — or leave blank.</p>
                <div className="fields">
                  <textarea name="jobDesc" placeholder="Paste job or internship description here (or leave blank)" onChange={handleChange} rows={5} />
                  <div className="btn-row">
                    <button className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
                    <button
                      className="btn-primary"
                      onClick={generateResume}
                      disabled={loading}
                      style={{ flex: 2 }}
                    >
                      {loading ? "✨ Generating..." : "Generate My Resume ✨"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {output && (
            <div className="output-card">
              <div className="output-header">
                <p className="output-title">📄 Your Resume Preview</p>
                <p className="output-sub">Pay $1 to unlock and download the full version</p>
              </div>

              <div className="resume-visible">
                <pre className="resume-text">{visibleText}</pre>
              </div>

              <div className="resume-locked">
                <pre className="resume-text resume-blurred">{hiddenText}</pre>
                <div className="lock-overlay">
                  <div className="lock-box">
                    <span className="lock-icon">🔒</span>
                    <p className="lock-title">Unlock your full resume</p>
                    <p className="lock-sub">Pay just $1 to view, copy and download</p>
                    <button className="btn-unlock" onClick={handlePay} disabled={paying}>
                      {paying ? "Redirecting..." : "Unlock for $1 →"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="spacer" />
            </div>
          )}
        </div>

        <footer>© 2026 FirstResume — Helping students land their first job 🚀</footer>
      </div>
    </>
  );
}