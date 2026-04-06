"use client";

import { useEffect, useState } from "react";

export default function Success() {
  const [resume, setResume] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("resumeOutput");
    if (saved) {
      setResume(saved);
      sessionStorage.removeItem("resumeOutput");
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(resume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #0f0a1e; color: #e8e0f0; min-height: 100vh; }
        .page { min-height: 100vh; position: relative; }
        .bg-orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
        .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.25; }
        .orb1 { width: 500px; height: 500px; background: #7c3aed; top: -100px; left: -100px; }
        .orb2 { width: 400px; height: 400px; background: #ec4899; bottom: 100px; right: -100px; }

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
          font-family: 'Sora', sans-serif; font-weight: 800; font-size: 1.1rem; color: #fff;
        }
        .logo-icon {
          width: 34px; height: 34px; border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          display: flex; align-items: center; justify-content: center; font-size: 16px;
        }

        .content {
          position: relative; z-index: 10;
          max-width: 620px; margin: 0 auto; padding: 3rem 1rem;
        }

        .success-banner {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px; padding: 2.5rem 2rem;
          text-align: center; margin-bottom: 1.5rem;
          backdrop-filter: blur(20px);
        }

        .success-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }

        .success-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.75rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #a78bfa, #ec4899);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .success-sub { color: #9ca3af; font-size: 15px; margin-bottom: 1.5rem; }

        .btn-back {
          display: inline-block;
          background: rgba(255,255,255,0.08);
          color: #d1d5db; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 12px 24px; font-size: 14px;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          text-decoration: none; transition: background 0.2s;
        }
        .btn-back:hover { background: rgba(255,255,255,0.14); }

        .resume-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px; overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
        }

        .resume-header {
          padding: 1.25rem 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: space-between;
        }

        .resume-title { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 1rem; color: #fff; }

        .btn-copy {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: #fff; border: none; border-radius: 10px;
          padding: 8px 20px; font-size: 14px; font-weight: 600;
          font-family: 'Sora', sans-serif; cursor: pointer;
        }

        .resume-body { padding: 1.5rem 2rem; }
        .resume-text {
          white-space: pre-wrap; font-size: 14px; line-height: 1.9;
          color: #d1d5db; font-family: 'DM Sans', sans-serif; margin: 0;
        }

        .no-resume {
          text-align: center; color: #6b7280; font-size: 15px; padding: 2rem;
        }
      `}</style>

      <div className="page">
        <div className="bg-orbs">
          <div className="orb orb1" />
          <div className="orb orb2" />
        </div>

        <nav>
          <div className="logo">
            <div className="logo-icon">📄</div>
            FirstResume
          </div>
        </nav>

        <div className="content">
          <div className="success-banner">
            <span className="success-icon">🎉</span>
            <h1 className="success-title">
              Payment <span className="gradient-text">successful!</span>
            </h1>
            <p className="success-sub">Your full resume is unlocked below. Copy it and paste it anywhere!</p>
            <a href="/" className="btn-back">← Generate another resume</a>
          </div>

          {resume ? (
            <div className="resume-card">
              <div className="resume-header">
                <p className="resume-title">📄 Your Full Resume</p>
                <button className="btn-copy" onClick={handleCopy}>
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>
              <div className="resume-body">
                <pre className="resume-text">{resume}</pre>
              </div>
            </div>
          ) : (
            <div className="resume-card">
              <div className="resume-body">
                <p className="no-resume">
                  Resume not found. Please go back and generate a new one.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}