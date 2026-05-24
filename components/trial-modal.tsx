"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────
// .env.local:
//   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
// ─────────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BONE = "#ffffff";
const BLACK = "#111";

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "es";
}

const modalT = {
  en: {
    title: "Join the",
    titleItalic: "waitlist",
    subtitle: "Share your information to join our waitlist for access to Kova.",
    nameLabel: "Name",
    emailLabel: "Work Email",
    companyLabel: "Name of Company",
    sizeLabel: "What is the size of your company?",
    sizeOptions: ["Solo practitioner", "2-10 employees", "11-50 employees", "51-200 employees", "200+ employees"],
    submit: "Submit",
    sending: "Sending...",
    sent: "Sent!",
    duplicateEmail: "This email is already on the waitlist.",
    genericError: "Something went wrong. Please try again.",
    privacy: "We will use the information you provide to respond to your inquiry and communicate with you about our services. We do not sell or share personal information. For more information, see our",
    privacyLink: "",
  },
  es: {
    title: "Únete a la",
    titleItalic: "lista de espera",
    subtitle: "Comparte tu información para unirte a nuestra lista de espera y acceder a Kova.",
    nameLabel: "Nombre",
    emailLabel: "Correo de trabajo",
    companyLabel: "Nombre de la empresa",
    sizeLabel: "¿Cuál es el tamaño de tu empresa?",
    sizeOptions: ["Profesional independiente", "2-10 empleados", "11-50 empleados", "51-200 empleados", "200+ empleados"],
    submit: "Enviar",
    sending: "Enviando...",
    sent: "¡Enviado!",
    duplicateEmail: "Este correo ya está en la lista de espera.",
    genericError: "Algo salió mal. Por favor intenta de nuevo.",
    privacy: "Usaremos la información que proporciones para responder a tu consulta y comunicarnos contigo sobre nuestros servicios. No vendemos ni compartimos información personal. Para más información, consulta nuestra",
    privacyLink: "",
  },
};

const EMPTY_FORM = { name: "", email: "", company: "", size: "" };

export function TrialModal({ isOpen, onClose, lang }: TrialModalProps) {
  const t = modalT[lang];
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase.from("waitlist_requests").insert({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      company_name: formData.company.trim(),
      company_size: formData.size,
    });

    if (error) {
      if (error.code === "23505") {
        setErrorMessage(t.duplicateEmail);
      } else {
        setErrorMessage(t.genericError);
        console.error("[Waitlist] Supabase error:", error.message);
      }
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 4000);
      return;
    }

    setStatus("success");
    // El usuario cierra el modal manualmente — no hay auto-close
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setErrorMessage("");
      setFormData(EMPTY_FORM);
    }, 300);
  };

  return (
    <div className="lp-modal-overlay" onClick={handleClose}>
      <div className="lp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="lp-modal-close" onClick={handleClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h3 className="lp-modal-title">
          {t.title} <span className="lp-italic">{t.titleItalic}</span>
        </h3>
        <p className="lp-modal-subtitle">{t.subtitle}</p>

        <form onSubmit={handleSubmit} className="lp-modal-form">
          <div className="lp-form-row">
            <div className="lp-form-field">
              <label className="lp-form-label">{t.nameLabel}</label>
              <input
                type="text"
                className="lp-form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={status === "loading" || status === "success"}
              />
            </div>
            <div className="lp-form-field">
              <label className="lp-form-label">{t.emailLabel}</label>
              <input
                type="email"
                className="lp-form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={status === "loading" || status === "success"}
              />
            </div>
          </div>

          <div className="lp-form-row">
            <div className="lp-form-field">
              <label className="lp-form-label">{t.companyLabel}</label>
              <input
                type="text"
                className="lp-form-input"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                disabled={status === "loading" || status === "success"}
              />
            </div>
            <div className="lp-form-field">
              <label className="lp-form-label">{t.sizeLabel}</label>
              <select
                className="lp-form-select"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                required
                disabled={status === "loading" || status === "success"}
              >
                <option value="" disabled></option>
                {t.sizeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Error inline */}
          {status === "error" && errorMessage && (
            <div className="lp-form-error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Botón — mismo diseño original, palomita en éxito */}
          <button
            type="submit"
            className="lp-form-submit"
            disabled={status === "loading" || status === "success"}
          >
            <span>
              {status === "idle" && t.submit}
              {status === "loading" && t.sending}
              {status === "success" && t.sent}
              {status === "error" && t.submit}
            </span>

            {/* Flecha — idle o error */}
            {(status === "idle" || status === "error") && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}

            {/* Spinner — loading */}
            {status === "loading" && (
              <svg className="lp-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
              </svg>
            )}

            {/* Palomita verde — success */}
            {status === "success" && (
              <svg className="lp-success-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}

            {/* X roja — error (solo en el botón brevemente) */}
            {status === "error" && (
              <svg className="lp-error-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            )}
          </button>

          <p className="lp-form-privacy">
            {t.privacy} <a href="#" className="lp-privacy-link">{t.privacyLink}</a>.
          </p>
        </form>
      </div>

      <style>{`
        .lp-modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          display: flex; align-items: flex-start; justify-content: center;
          padding: 40px 20px; background: rgba(17,17,17,0.72);
          overflow-y: auto;
        }
        .lp-modal {
          position: relative;
          width: 100%; max-width: 680px;
          margin: auto;
          background: ${BONE}; color: ${BLACK};
          border-radius: 12px; padding: 40px 48px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.35);
        }
        .lp-modal-close {
          position: absolute; top: 20px; right: 20px;
          background: none; border: none;
          cursor: pointer; color: ${BLACK}; padding: 4px;
        }
        .lp-modal-close:hover { opacity: 0.6; }
        .lp-modal-title {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 400; color: ${BLACK};
          margin: 0 0 8px; letter-spacing: -0.02em;
        }
        .lp-modal-subtitle {
          font-size: clamp(14px, 1.4vw, 16px);
          color: rgba(17,17,17,0.7);
          margin: 0 0 32px; line-height: 1.5;
        }
        .lp-modal-form { display: flex; flex-direction: column; gap: 20px; }
        .lp-form-row   { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .lp-form-field { display: flex; flex-direction: column; gap: 6px; }
        .lp-form-full  { width: 100%; }
        .lp-form-label {
          font-size: 13px; font-weight: 400;
          color: ${BLACK}; letter-spacing: 0.02em;
        }
        .lp-form-input,
        .lp-form-select {
          font-family: 'Lato', sans-serif;
          font-size: 15px; padding: 14px 16px;
          border: 1px solid rgba(17,17,17,0.15);
          border-radius: 6px; background: ${BONE};
          color: ${BLACK}; outline: none; transition: border-color 0.2s;
        }
        .lp-form-input:focus,
        .lp-form-select:focus { border-color: rgba(17,17,17,0.4); }
        .lp-form-input:disabled,
        .lp-form-select:disabled { opacity: 0.5; cursor: not-allowed; }
        .lp-form-select {
          cursor: pointer; appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23111' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 16px center; padding-right: 40px;
        }
        .lp-form-error {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: #b91c1c;
          background: #fff1f2; border: 1px solid #fecdd3;
          border-radius: 6px; padding: 10px 14px;
        }
        .lp-form-submit {
          display: flex; align-items: center; justify-content: space-between;
          font-family: 'Lato', sans-serif;
          font-size: clamp(18px, 2.5vw, 24px); font-weight: 400;
          background: rgba(17,17,17,0.06); color: ${BLACK};
          border: none; padding: 20px 24px; cursor: pointer;
          border-radius: 6px; margin-top: 8px;
          transition: background 0.2s, opacity 0.2s;
        }
        .lp-form-submit:not(:disabled):hover { background: rgba(17,17,17,0.1); }
        .lp-form-submit:disabled { cursor: not-allowed; opacity: 0.8; }
        @keyframes lp-spin { 100% { transform: rotate(360deg); } }
        .lp-spinner { animation: lp-spin 1s linear infinite; }
        .lp-success-icon, .lp-error-icon {
          animation: lp-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes lp-pop {
          0%   { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1);   opacity: 1; }
        }
        .lp-form-privacy {
          font-size: 12px; color: rgba(17,17,17,0.6);
          line-height: 1.6; margin: 8px 0 0;
        }
        .lp-privacy-link { color: ${BLACK}; text-decoration: underline; }
        .lp-italic {
          font-family: Georgia, 'Times New Roman', serif; font-style: italic;
        }
        @media (max-width: 640px) {
          .lp-modal-overlay { padding: 20px 12px; }
          .lp-modal { padding: 32px 20px; border-radius: 12px; }
          .lp-form-row { grid-template-columns: 1fr; gap: 16px; }
          .lp-modal-form { gap: 16px; }
          .lp-modal-title { font-size: 26px; }
          .lp-modal-subtitle { font-size: 14px; margin-bottom: 24px; }
          .lp-form-submit { padding: 16px 20px; font-size: 18px; }
          .lp-modal-close { top: 12px; right: 12px; }
        }
      `}</style>
    </div>
  );
}