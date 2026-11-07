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
          {/* Glowing Red Japanese Rising Sun Radial Gradient */}
          <radialGradient id="fujiSunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#EF4444" stopOpacity="0.45" />
            <stop offset="85%" stopColor="#DC2626" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>

          {/* Mount Fuji Majestic Volcanic Slope Gradient (Indigo & Sumi Ink) */}
          <linearGradient id="fujiMountainGradient" x1="600" y1="120" x2="600" y2="640" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#334155" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#1E293B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </linearGradient>

          {/* Snow Ridge Shading Gradient for authentic depth */}
          <linearGradient id="snowShadow" x1="600" y1="120" x2="600" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="65%" stopColor="#F1F5F9" stopOpacity="0.95" />
            <stop offset="85%" stopColor="#E2E8F0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.75" />
          </linearGradient>

          {/* Snow Ravine Crevice Shading */}
          <linearGradient id="ravineShading" x1="500" y1="120" x2="700" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#64748B" stopOpacity="0.6" />
          </linearGradient>

          {/* Natural Bottom Fade Mask for seamless blending into Washi cream */}
          <linearGradient id="bottomFadeMask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="90%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <mask id="mountainMask">
            <rect x="0" y="0" width="1200" height="680" fill="url(#bottomFadeMask)" />
          </mask>
        </defs>

        {/* 1. ICONIC JAPANESE RED RISING SUN (Centered behind Mount Fuji summit) */}
        <g opacity="0.45">
          <circle cx="600" cy="210" r="175" fill="url(#fujiSunGlow)" />
          <circle cx="600" cy="210" r="115" fill="#DC2626" opacity="0.4" />
        </g>

        {/* 2. MOUNT FUJI MAIN VOLCANIC BODY (Wide Stratovolcano Flared Slopes) */}
        <g mask="url(#mountainMask)" opacity="0.32">
          {/* Authentic Concave Flared Silhouette */}
          <path
            d="
              M 525 125
              Q 600 134, 675 125
              C 715 210, 795 380, 1070 630
              L 130 630
              C 405 380, 485 210, 525 125
              Z
            "
            fill="url(#fujiMountainGradient)"
          />

          {/* Volcanic Ridge & Rib Contours (Depth & Natural Texture) */}
          <path
            d="M 600 134 C 585 240, 555 380, 490 580"
            stroke="#0F172A"
            strokeWidth="2.5"
            opacity="0.3"
            fill="none"
          />
          <path
            d="M 600 134 C 615 240, 645 380, 710 580"
            stroke="#0F172A"
            strokeWidth="2.5"
            opacity="0.3"
            fill="none"
          />
          <path
            d="M 560 130 C 530 260, 480 400, 380 590"
            stroke="#0F172A"
            strokeWidth="1.8"
            opacity="0.2"
            fill="none"
          />
          <path
            d="M 640 130 C 670 260, 720 400, 820 590"
            stroke="#0F172A"
            strokeWidth="1.8"
            opacity="0.2"
            fill="none"
          />
        </g>

        {/* 3. ICONIC SNOW-CAPPED SUMMIT (Crisp White Mantle with Volcanic Snow Tongues) */}
        <g opacity="0.88">
          {/* Main Snow Cap with authentic jagged volcanic ravines (雪渓) */}
          <path
            d="
              M 525 125
              Q 600 134, 675 125
              C 700 190, 728 250, 770 320
              L 745 305
              L 728 335
              L 698 298
              L 675 352
              L 648 295
              L 625 365
              L 600 310
              L 575 360
              L 552 295
              L 525 348
              L 502 300
              L 472 335
              L 455 305
              L 430 320
              C 472 250, 500 190, 525 125
              Z
            "
            fill="url(#snowShadow)"
          />

          {/* Volcanic Snow Ravine highlights extending down slopes */}
          <path d="M 625 365 L 620 405 L 614 360" fill="#FFFFFF" opacity="0.9" />
          <path d="M 575 360 L 580 400 L 586 355" fill="#FFFFFF" opacity="0.9" />
          <path d="M 675 352 L 680 388 L 670 346" fill="#FFFFFF" opacity="0.85" />
          <path d="M 525 348 L 520 382 L 531 342" fill="#FFFFFF" opacity="0.85" />
          <path d="M 728 335 L 732 365 L 724 330" fill="#FFFFFF" opacity="0.8" />
          <path d="M 472 335 L 468 365 L 476 330" fill="#FFFFFF" opacity="0.8" />

          {/* Summit Crater Rim Line */}
          <path
            d="M 525 125 Q 600 134, 675 125"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        {/* 4. CHERRY BLOSSOM (SAKURA) BRANCH SILHOUETTES & PETALS (Matching the user's reference) */}
        <g opacity="0.35">
          {/* Left Branch */}
          <path
            d="M -20 80 Q 80 120, 160 100 Q 240 85, 290 140"
            stroke="#334155"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 160 100 Q 210 140, 240 180"
            stroke="#334155"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 240 85 Q 260 55, 300 45"
            stroke="#334155"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Sakura Petal Clusters */}
          <circle cx="290" cy="140" r="9" fill="#E11D48" opacity="0.85" />
          <circle cx="280" cy="128" r="8" fill="#FDA4AF" opacity="0.95" />
          <circle cx="305" cy="145" r="7" fill="#FB7185" opacity="0.9" />
          <circle cx="240" cy="180" r="9" fill="#FDA4AF" opacity="0.95" />
          <circle cx="252" cy="195" r="7" fill="#E11D48" opacity="0.85" />
          <circle cx="170" cy="95" r="8" fill="#FDA4AF" opacity="0.9" />
          <circle cx="300" cy="45" r="7" fill="#FDA4AF" opacity="0.9" />
          <circle cx="312" cy="55" r="6" fill="#FB7185" opacity="0.85" />

          {/* Right Branch */}
          <path
            d="M 1220 70 Q 1120 110, 1040 90 Q 960 75, 910 130"
            stroke="#334155"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 1040 90 Q 990 130, 960 170"
            stroke="#334155"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 960 75 Q 940 45, 900 35"
            stroke="#334155"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Sakura Petal Clusters */}
          <circle cx="910" cy="130" r="9" fill="#E11D48" opacity="0.85" />
          <circle cx="922" cy="118" r="8" fill="#FDA4AF" opacity="0.95" />
          <circle cx="895" cy="135" r="7" fill="#FB7185" opacity="0.9" />
          <circle cx="960" cy="170" r="9" fill="#FDA4AF" opacity="0.95" />
          <circle cx="948" cy="185" r="7" fill="#E11D48" opacity="0.85" />
          <circle cx="1030" cy="85" r="8" fill="#FDA4AF" opacity="0.9" />
          <circle cx="900" cy="35" r="7" fill="#FDA4AF" opacity="0.9" />
          <circle cx="888" cy="45" r="6" fill="#FB7185" opacity="0.85" />

          {/* Drifting Petals in the Air (Japanese Spring Feel) */}
          <ellipse cx="400" cy="180" rx="6" ry="3" fill="#FDA4AF" transform="rotate(-25 400 180)" opacity="0.75" />
          <ellipse cx="450" cy="240" rx="5" ry="2.5" fill="#FB7185" transform="rotate(35 450 240)" opacity="0.7" />
          <ellipse cx="780" cy="200" rx="6" ry="3" fill="#FDA4AF" transform="rotate(15 780 200)" opacity="0.75" />
          <ellipse cx="740" cy="270" rx="5" ry="2.5" fill="#FB7185" transform="rotate(-30 740 270)" opacity="0.7" />
          <ellipse cx="610" cy="110" rx="4" ry="2" fill="#FDA4AF" transform="rotate(45 610 110)" opacity="0.65" />
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
