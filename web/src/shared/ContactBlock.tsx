"use client";

import { useLanguage } from "@/shared/LanguageProvider";

export default function ContactBlock() {
  const { language } = useLanguage();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">
        {language === "en" ? "Contact us" : "Связаться с нами"}
      </h3>

      <p className="text-sm leading-6 text-slate-400">
        {language === "en"
          ? "Questions or suggestions? Send us an email."
          : "Есть вопросы или предложения? Напиши нам на почту."}
      </p>

      <a
        href="mailto:zubarevvictor5@outlook.com?subject=Esurpys%20-%20Contact"
        className="inline-flex items-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-3 text-sm font-medium text-cyan-300 transition hover:border-cyan-400/50 hover:bg-cyan-400/10"
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
  );
}
