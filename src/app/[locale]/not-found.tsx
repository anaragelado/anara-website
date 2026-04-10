import { useTranslations } from "next-intl";

function MeltingCone() {
  return (
    <svg
      width="160"
      height="200"
      viewBox="0 0 160 200"
      fill="none"
      aria-hidden="true"
      className="mx-auto"
    >
      {/* Puddle */}
      <ellipse cx="80" cy="185" rx="55" ry="12" fill="#FDDB00" opacity="0.3" />

      {/* Cone */}
      <path
        d="M58 110L80 180L102 110"
        fill="#D2B48C"
        stroke="#C4A47A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Cone lines */}
      <line x1="68" y1="115" x2="76" y2="170" stroke="#C4A47A" strokeWidth="1" opacity="0.5" />
      <line x1="92" y1="115" x2="84" y2="170" stroke="#C4A47A" strokeWidth="1" opacity="0.5" />
      <line x1="62" y1="130" x2="98" y2="130" stroke="#C4A47A" strokeWidth="1" opacity="0.5" />
      <line x1="66" y1="145" x2="94" y2="145" stroke="#C4A47A" strokeWidth="1" opacity="0.5" />

      {/* Scoop (melting) */}
      <circle cx="80" cy="90" r="30" fill="#EA567A" />
      {/* Melting drips */}
      <path
        d="M55 95C53 110 56 125 58 115C60 105 55 95 55 95Z"
        fill="#EA567A"
      >
        <animate
          attributeName="d"
          values="M55 95C53 110 56 125 58 115C60 105 55 95 55 95Z;M55 95C51 115 54 140 58 125C62 110 55 95 55 95Z;M55 95C53 110 56 125 58 115C60 105 55 95 55 95Z"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M100 92C103 108 101 120 98 112C95 104 100 92 100 92Z"
        fill="#EA567A"
      >
        <animate
          attributeName="d"
          values="M100 92C103 108 101 120 98 112C95 104 100 92 100 92Z;M100 92C105 112 103 135 98 122C93 109 100 92 100 92Z;M100 92C103 108 101 120 98 112C95 104 100 92 100 92Z"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M75 118C74 128 76 138 78 130C80 122 75 118 75 118Z"
        fill="#EA567A"
      >
        <animate
          attributeName="d"
          values="M75 118C74 128 76 138 78 130C80 122 75 118 75 118Z;M75 118C73 132 75 148 78 138C81 128 75 118 75 118Z;M75 118C74 128 76 138 78 130C80 122 75 118 75 118Z"
          dur="3.5s"
          repeatCount="indefinite"
        />
      </path>

      {/* Highlight on scoop */}
      <ellipse cx="72" cy="80" rx="8" ry="5" fill="white" opacity="0.3" />
    </svg>
  );
}

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="text-center">
        <MeltingCone />

        <p className="mt-6 font-accent text-7xl text-brand-yellow md:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight md:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-text-secondary">
          {t("subtitle")}
        </p>
        <p className="mt-2 text-sm font-medium text-text-secondary/70 italic">
          {t("hint")}
        </p>
        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-brand-yellow px-8 py-3 text-sm font-semibold text-text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-green hover:text-white"
        >
          {t("cta")}
        </a>
      </div>
    </main>
  );
}
