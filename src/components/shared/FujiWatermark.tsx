import React from "react";

export function FujiWatermark({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden flex items-end justify-center opacity-[0.045] mix-blend-multiply ${className}`}
    >
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-6xl h-auto"
      >
        {/* Red Rising Sun */}
        <circle cx="600" cy="240" r="140" fill="#DC2626" opacity="0.6" />

        {/* Mount Fuji Peak and Slopes */}
        <path
          d="M600 80 L760 480 L440 480 Z"
          fill="#1E293B"
        />
        {/* Fuji Snow Cap */}
        <path
          d="M600 80 L650 200 L630 220 L610 190 L590 230 L570 200 L550 220 L600 80 Z"
          fill="#FFFFFF"
        />

        {/* Japanese Seigaiha Waves at the base */}
        <g stroke="#0F172A" strokeWidth="2.5" fill="none">
          <path d="M0 520 Q75 460 150 520 T300 520 T450 520 T600 520 T750 520 T900 520 T1050 520 T1200 520" />
          <path d="M0 540 Q75 480 150 540 T300 540 T450 540 T600 540 T750 540 T900 540 T1050 540 T1200 540" />
          <path d="M0 560 Q75 500 150 560 T300 560 T450 560 T600 560 T750 560 T900 560 T1050 560 T1200 560" />
          <path d="M0 580 Q75 520 150 580 T300 580 T450 580 T600 580 T750 580 T900 580 T1050 580 T1200 580" />
        </g>
      </svg>
    </div>
  );
}

export function ToriiDivider({ title }: { title?: string }) {
  return (
    <div className="flex items-center justify-center my-10 gap-4">
      <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-japanRed-500/30 to-japanRed-600/60" />
      <div className="flex items-center gap-2 px-3 py-1 bg-japanRed-50 border border-japanRed-200/80 rounded-full shadow-sm">
        {/* Torii Gate Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-japanRed-600 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 5h20v2H2V5zm3 3h14v2H5V8zm2 3h2v10H7V11zm8 0h2v10h-2V11z" />
        </svg>
        {title && (
          <span className="text-xs font-semibold uppercase tracking-wider text-japanRed-700 font-sans">
            {title}
          </span>
        )}
      </div>
      <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-japanRed-500/30 to-japanRed-600/60" />
    </div>
  );
}
