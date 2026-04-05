import React from "react";

export const PageHeader = ({ title, subtitle, actions }) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h1>
      {subtitle ? <p className="mt-1 text-sm text-slate-600 md:text-base">{subtitle}</p> : null}
    </div>
    {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
  </div>
);

export const Surface = ({ children, className = "" }) => (
  <section
    className={`rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] backdrop-blur md:p-5 ${className}`}
  >
    {children}
  </section>
);

export const StatTile = ({ label, value, hint, tone = "slate" }) => {
  const toneMap = {
    slate: "from-slate-900 to-slate-700",
    teal: "from-teal-700 to-cyan-600",
    orange: "from-orange-600 to-amber-500",
    emerald: "from-emerald-700 to-green-600",
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
      <div className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-linear-to-br opacity-15 ${toneMap[tone] || toneMap.slate}`} />
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
};

export const Badge = ({ children, tone = "slate" }) => {
  const toneClasses = {
    slate: "bg-slate-100 text-slate-700",
    teal: "bg-teal-100 text-teal-800",
    emerald: "bg-emerald-100 text-emerald-800",
    orange: "bg-orange-100 text-orange-800",
    rose: "bg-rose-100 text-rose-800",
    indigo: "bg-indigo-100 text-indigo-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone] || toneClasses.slate}`}
    >
      {children}
    </span>
  );
};

export const PrimaryButton = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

export const GhostButton = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);
