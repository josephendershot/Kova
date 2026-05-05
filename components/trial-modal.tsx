"use client";

import { useState } from "react";

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
    useLabel: "What will you use Kova for?",
    useOptions: ["Client services accounting", "Tax preparation", "Audit", "Advisory", "All of the above"],
    submit: "Submit",
    privacy: "We will use the information you provide to respond to your inquiry and communicate with you about our services. We do not sell or share personal information. For more information, see our",
    privacyLink: "Privacy Policy",
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
    useLabel: "¿Para qué usarás Kova?",
    useOptions: ["Servicios contables", "Preparación de impuestos", "Auditoría", "Asesoría", "Todo lo anterior"],
    submit: "Enviar",
    privacy: "Usaremos la información que proporciones para responder a tu consulta y comunicarnos contigo sobre nuestros servicios. No vendemos ni compartimos información personal. Para más información, consulta nuestra",
    privacyLink: "Política de Privacidad",
  },
};

export function TrialModal({
  isOpen,
  onClose,
  lang,
}: TrialModalProps) {
  const t = modalT[lang];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    size: "",
    use: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setStatus("success");
      
      // Reset after showing success
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setFormData({ name: "", email: "", company: "", size: "", use: "" });
      }, 2000);
    }, 1500);
  };

  return (
    <div className="lp-modal-overlay" onClick={onClose}>
      <div className="lp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="lp-modal-close" onClick={onClose} aria-label="Close">
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
              />
            </div>
            <div className="lp-form-field">
              <label className="lp-form-label">{t.sizeLabel}</label>
              <select
                className="lp-form-select"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                required
              >
                <option value="" disabled></option>
                {t.sizeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="lp-form-field lp-form-full">
            <label className="lp-form-label">{t.useLabel}</label>
            <select
              className="lp-form-select"
              value={formData.use}
              onChange={(e) => setFormData({ ...formData, use: e.target.value })}
              required
            >
              <option value="" disabled></option>
              {t.useOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="lp-form-submit" disabled={status === "loading" || status === "success"}>
            <span>
              {status === "idle" && t.submit}
              {status === "loading" && (lang === "en" ? "Sending..." : "Enviando...")}
              {status === "success" && (lang === "en" ? "Sent!" : "¡Enviado!")}
              {status === "error" && (lang === "en" ? "Error" : "Error")}
            </span>
            {status === "idle" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
            {status === "loading" && (
              <svg className="lp-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
              </svg>
            )}
            {status === "success" && (
              <svg className="lp-success-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
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
          position: absolute;
          top: 20px; right: 20px;
          background: none; border: none;
          cursor: pointer; color: ${BLACK};
          padding: 4px;
        }
        .lp-modal-close:hover { opacity: 0.6; }
        .lp-modal-title {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 400; color: ${BLACK};
          margin: 0 0 8px;
          letter-spacing: -0.02em;
        }
        .lp-modal-subtitle {
          font-size: clamp(14px, 1.4vw, 16px);
          color: rgba(17,17,17,0.7);
          margin: 0 0 32px;
          line-height: 1.5;
        }
        .lp-modal-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .lp-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .lp-form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .lp-form-full {
          width: 100%;
        }
        .lp-form-label {
          font-size: 13px;
          font-weight: 400;
          color: ${BLACK};
          letter-spacing: 0.02em;
        }
        .lp-form-input,
        .lp-form-select {
          font-family: 'Lato', sans-serif;
          font-size: 15px;
          padding: 14px 16px;
          border: 1px solid rgba(17,17,17,0.15);
          border-radius: 6px;
          background: ${BONE};
          color: ${BLACK};
          outline: none;
          transition: border-color 0.2s;
        }
        .lp-form-input:focus,
        .lp-form-select:focus {
          border-color: rgba(17,17,17,0.4);
        }
        .lp-form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23111' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }
        .lp-form-submit {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Lato', sans-serif;
          font-size: clamp(18px, 2.5vw, 24px);
          font-weight: 400;
          background: rgba(17,17,17,0.06);
          color: ${BLACK};
          border: none;
          padding: 20px 24px;
          cursor: pointer;
          border-radius: 6px;
          margin-top: 8px;
          transition: background 0.2s, opacity 0.2s;
        }
        .lp-form-submit:not(:disabled):hover {
          background: rgba(17,17,17,0.1);
        }
        .lp-form-submit:disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }
        @keyframes lp-spin {
          100% { transform: rotate(360deg); }
        }
        .lp-spinner {
          animation: lp-spin 1s linear infinite;
        }
        .lp-success-icon, .lp-error-icon {
          animation: lp-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes lp-pop {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .lp-form-privacy {
          font-size: 12px;
          color: rgba(17,17,17,0.6);
          line-height: 1.6;
          margin: 8px 0 0;
        }
        .lp-privacy-link {
          color: ${BLACK};
          text-decoration: underline;
        }
        .lp-italic {
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
        }

        @media (max-width: 640px) {
          .lp-modal-overlay {
            padding: 20px 12px;
          }
          .lp-modal { 
            padding: 32px 20px; 
            border-radius: 12px; 
          }
          .lp-form-row { 
            grid-template-columns: 1fr; 
            gap: 16px;
          }
          .lp-modal-form {
            gap: 16px;
          }
          .lp-modal-title { 
            font-size: 26px; 
          }
          .lp-modal-subtitle { 
            font-size: 14px; 
            margin-bottom: 24px; 
          }
          .lp-form-submit { 
            padding: 16px 20px; 
            font-size: 18px; 
          }
          .lp-modal-close {
            top: 12px; right: 12px;
          }
        }
      `}</style>
    </div>
  );
}
