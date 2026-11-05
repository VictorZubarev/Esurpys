"use client";

import { useEffect, useState } from "react";

type Language = "en" | "ru";

export default function EsurpysFooter() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    function syncLanguage() {
      const saved = localStorage.getItem("esurpys-language");
      if (saved === "en" || saved === "ru") {
        setLanguage(saved);
      }
    }

    syncLanguage();
    window.addEventListener("esurpys-language-change", syncLanguage);

    return () => {
      window.removeEventListener("esurpys-language-change", syncLanguage);
    };
  }, []);

  return (
    <footer className="border-t border-white/10 bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-white">
            {language === "en" ? "Contact us" : "Связаться с нами"}
          </h3>

          <a
            href="mailto:zubarevvictor5@outlook.com?subject=Esurpys%20-%20Contact"
            className="w-fit rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-3 text-sm font-medium text-cyan-300 transition hover:border-cyan-400/50 hover:bg-cyan-400/10"
          >
            {language === "en" ? "Send an email" : "Написать письмо"}
          </a>

          <p className="text-xs text-slate-500">
            {language === "en"
              ? "If the button doesn't work, email us at:"
              : "Если кнопка не работает, напиши на почту:"}{" "}
            <a
              href="mailto:zubarevvictor5@outlook.com"
              className="text-slate-400 hover:text-cyan-300"
            >
              zubarevvictor5@outlook.com
            </a>
          </p>
        </div>

        <p className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-600">
          © 2026 Esurpys.
        </p>
      </div>
    </footer>
  );
}