import React from "react";

export function FujiWatermark({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden flex items-end justify-center ${className}`}
    >
      <svg
        viewBox="0 0 1200 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-7xl h-auto"
      >
        <defs>
          {/* Glowing Red Rising Sun Gradient */}
          <radialGradient id="fujiSunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#EF4444" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>

          {/* Mount Fuji Deep Volcanic Slope Gradient - Smooth Natural Fade to Base */}
          <linearGradient id="fujiMountainGradient" x1="600" y1="120" x2="600" y2="620" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0.7" />
            <stop offset="45%" stopColor="#0F172A" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#0F172A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </linearGradient>

          {/* Snow Ridge Shading Gradient */}
          <linearGradient id="snowShadow" x1="500" y1="120" x2="700" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#E2E8F0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.75" />
          </linearGradient>

          {/* Natural Bottom Fade Mask for pure seamless blending */}
          <linearGradient id="bottomFadeMask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <mask id="mountainMask">
            <rect x="0" y="0" width="1200" height="680" fill="url(#bottomFadeMask)" />
          </mask>
        </defs>

        {/* 1. ICONIC JAPANESE RED RISING SUN (Behind Fuji's summit) */}
        <g opacity="0.4">
          <circle cx="600" cy="230" r="170" fill="url(#fujiSunGlow)" />
          <circle cx="600" cy="230" r="120" fill="#DC2626" opacity="0.3" />
        </g>

        {/* 2. MOUNT FUJI MAIN VOLCANIC BODY (Wide curved flared slopes, naturally dissolving into base) */}
        <g mask="url(#mountainMask)" opacity="0.22">
          {/* Wide Volcanic Mountain Body with authentic concave flare */}
          <path
            d="
              M 535 125
              Q 600 133, 665 125
              C 700 210, 780 380, 1040 620
              L 160 620
              C 420 380, 500 210, 535 125
              Z
            "
            fill="url(#fujiMountainGradient)"
          />

          {/* Subtle Volcanic Ridge Contours */}
          <path
            d="M 600 133 C 585 240, 560 380, 510 560"
            stroke="#0F172A"
            strokeWidth="2.5"
            opacity="0.25"
            fill="none"
          />
          <path
            d="M 600 133 C 615 240, 640 380, 690 560"
            stroke="#0F172A"
            strokeWidth="2.5"
            opacity="0.25"
            fill="none"
          />
        </g>

        {/* 3. ICONIC SNOW-CAPPED SUMMIT (Famous White Snow Tongue Gullies) */}
        <g opacity="0.4">
          {/* Main Snow Cap with natural volcanic ravines (雪渓) */}
          <path
            d="
              M 535 125
              Q 600 133, 665 125
              C 690 190, 715 250, 755 315
              L 730 300
              L 715 330
              L 685 295
              L 665 345
              L 640 290
              L 620 355
              L 600 305
              L 580 350
              L 560 290
              L 535 340
              L 515 295
              L 485 330
              L 470 300
              L 445 315
              C 485 250, 510 190, 535 125
              Z
            "
            fill="url(#snowShadow)"
          />

          {/* Snow highlights extending down volcanic ridges */}
          <path d="M 620 355 L 615 390 L 610 350" fill="#FFFFFF" opacity="0.9" />
          <path d="M 580 350 L 585 385 L 590 345" fill="#FFFFFF" opacity="0.9" />
          <path d="M 665 345 L 670 375 L 660 340" fill="#FFFFFF" opacity="0.9" />
          <path d="M 535 340 L 530 370 L 540 335" fill="#FFFFFF" opacity="0.9" />

          {/* Summit Crater Rim Highlight */}
          <path
            d="M 535 125 Q 600 133, 665 125"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* 4. CHERRY BLOSSOM (SAKURA) BRANCH SILHOUETTES (Classic Japanese Spring Framing) */}
        <g opacity="0.25">
          {/* Left Branch & Blossoms */}
          <path
            d="M -20 80 Q 80 120, 160 100 Q 240 85, 290 140"
            stroke="#475569"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 160 100 Q 210 140, 240 180"
            stroke="#475569"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="290" cy="140" r="8" fill="#F43F5E" opacity="0.8" />
          <circle cx="280" cy="130" r="7" fill="#FDA4AF" opacity="0.9" />
          <circle cx="305" cy="145" r="6" fill="#F43F5E" opacity="0.8" />
          <circle cx="240" cy="180" r="8" fill="#FDA4AF" opacity="0.9" />
          <circle cx="250" cy="195" r="6" fill="#F43F5E" opacity="0.8" />
          <circle cx="170" cy="95" r="7" fill="#FDA4AF" opacity="0.8" />

          {/* Right Branch & Blossoms */}
          <path
            d="M 1220 70 Q 1120 110, 1040 90 Q 960 75, 910 130"
            stroke="#475569"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 1040 90 Q 990 130, 960 170"
            stroke="#475569"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="910" cy="130" r="8" fill="#F43F5E" opacity="0.8" />
          <circle cx="920" cy="120" r="7" fill="#FDA4AF" opacity="0.9" />
          <circle cx="895" cy="135" r="6" fill="#F43F5E" opacity="0.8" />
          <circle cx="960" cy="170" r="8" fill="#FDA4AF" opacity="0.9" />
          <circle cx="950" cy="185" r="6" fill="#F43F5E" opacity="0.8" />
          <circle cx="1030" cy="85" r="7" fill="#FDA4AF" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

export function ToriiDivider({ title }: { title?: string }) {
  return (
    <div className="flex items-center justify-center my-8 sm:my-12 gap-4">
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
