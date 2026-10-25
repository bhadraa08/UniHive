import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { StorybookCampusLandscape } from '../intro/StorybookCampusLandscape';

interface CampusIllustrationProps {
  variant?: 'banner' | 'auth' | 'intro' | 'compact' | 'sidebar-botanicals' | 'feed-collaboration';
  className?: string;
  height?: number | string;
}

export const CampusIllustration: React.FC<CampusIllustrationProps> = ({
  variant = 'banner',
  className = '',
  height
}) => {
  const { isDark } = useTheme();

  /* -------------------------------------------------------------
   * 0. INTRO & AUTH STORYBOOK CAMPUS LANDSCAPE (Enchanted Aesthetic)
   * ----------------------------------------------------------- */
  if (variant === 'intro' || variant === 'auth') {
    return <StorybookCampusLandscape className={className} variant={variant} height={height} />;
  }

  // Colors aligned with the Dreamy Editorial Reference Tokens:
  // Light: Peach #E7B09B, Lavender #A991C8, Sage #A9B7A0, Plum #39283F, Parchment #F6F0E7
  // Dark: Deep twilight #191522, Plum surface #251F32, Lavender #AD91D0, Peach #DDA18E, Glowing amber #FAD08E
  const skyGradStart = isDark ? '#191522' : '#F7EEE5';
  const skyGradMid = isDark ? '#261C33' : '#F5E3D5';
  const skyGradEnd = isDark ? '#3D2A4F' : '#E8D4E2';

  const mountainColor = isDark ? '#261E34' : '#E7D5C7';
  const distantBuildingColor = isDark ? '#2C223C' : '#DFCCC0';
  const midBuildingColor = isDark ? '#382A4B' : '#C49E8E';
  const frontBuildingColor = isDark ? '#48355F' : '#B86F58'; // Collegiate brick / warm terracotta
  const roofColor = isDark ? '#302441' : '#68546C';

  const foliageBack = isDark ? '#2D223B' : '#BFAECB';
  const foliageMid = isDark ? '#362B46' : '#92A888';
  const foliageFront = isDark ? '#423356' : '#6C8360';

  const groundColor = isDark ? '#1C1625' : '#DDE8D2';
  const groundShadow = isDark ? '#16111E' : '#CAD9BE';
  const pathColor = isDark ? '#271F36' : '#F4EEE4';

  const windowGlow = isDark ? '#FAD08E' : '#FFF6E5';
  const lanternLight = isDark ? '#FBD99B' : '#F6C176';
  const nodeColor = isDark ? '#AD91D0' : '#E7B09B';

  /* -------------------------------------------------------------
   * 1. SIDEBAR BOTANICALS (Bottom-left corner of the sidebar)
   * ----------------------------------------------------------- */
  if (variant === 'sidebar-botanicals') {
    const stemColor = isDark ? '#4A3B5C' : '#D0BEAE';
    const flowerColor1 = isDark ? '#AD91D0' : '#E7B09B';
    const flowerColor2 = isDark ? '#C5B9CE' : '#A991C8';
    const leafColor = isDark ? '#3D314E' : '#A9B7A0';

    return (
      <div className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`} style={{ height: height || 130 }}>
        <svg
          viewBox="0 0 200 130"
          preserveAspectRatio="xMinYMax meet"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle connecting hexagon motif */}
          <g opacity={isDark ? "0.35" : "0.3"} stroke={isDark ? "#AD91D0" : "#D0BEAE"} strokeWidth="1" fill="none">
            <polygon points="40,25 50,31 50,43 40,49 30,43 30,31" />
            <polygon points="58,40 68,46 68,58 58,64 48,58 48,46" />
            <polygon points="32,55 42,61 42,73 32,79 22,73 22,61" />
            <line x1="40" y1="49" x2="48" y2="58" strokeDasharray="2 2" />
          </g>

          {/* Stems rising from bottom left */}
          <path d="M 10 130 Q 25 80 45 40" stroke={stemColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 0 130 Q 15 95 25 70" stroke={stemColor} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M 25 130 Q 55 90 85 55" stroke={stemColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 40 130 Q 75 100 110 75" stroke={stemColor} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M 5 130 Q 40 110 70 95" stroke={stemColor} strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Leaves */}
          <path d="M 30 70 Q 20 60 25 55 Q 35 60 30 70 Z" fill={leafColor} opacity="0.8" />
          <path d="M 50 85 Q 65 75 60 70 Q 48 75 50 85 Z" fill={leafColor} opacity="0.8" />
          <path d="M 70 80 Q 82 72 80 67 Q 68 72 70 80 Z" fill={leafColor} opacity="0.75" />
          <path d="M 18 90 Q 8 82 14 78 Q 24 82 18 90 Z" fill={leafColor} opacity="0.8" />

          {/* Delicate Wildflowers & Wheat Grains */}
          {/* Main tall wildflower */}
          <circle cx="45" cy="38" r="3" fill={flowerColor1} />
          <circle cx="41" cy="35" r="2.5" fill={flowerColor2} />
          <circle cx="49" cy="35" r="2.5" fill={flowerColor2} />
          <circle cx="45" cy="32" r="2.5" fill={flowerColor1} />
          <circle cx="45" cy="44" r="2" fill={flowerColor1} opacity="0.8" />

          {/* Secondary wildflower */}
          <circle cx="85" cy="53" r="3" fill={flowerColor2} />
          <circle cx="81" cy="50" r="2.2" fill={flowerColor1} />
          <circle cx="89" cy="50" r="2.2" fill={flowerColor1} />
          <circle cx="85" cy="47" r="2" fill={flowerColor2} />

          {/* Small buds */}
          <circle cx="110" cy="74" r="2.5" fill={flowerColor1} />
          <circle cx="106" cy="71" r="1.8" fill={flowerColor2} />
          <circle cx="25" cy="69" r="2.2" fill={flowerColor1} />
        </svg>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * 2. FEED BOTTOM COLLABORATION BANNER ("Find your people...")
   * ----------------------------------------------------------- */
  if (variant === 'feed-collaboration') {
    return (
      <div className={`relative w-full overflow-hidden select-none rounded-2xl ${className}`}>
        <svg
          viewBox="0 0 600 120"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="collabSky" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={isDark ? '#261C33' : '#F6E6DA'} />
              <stop offset="60%" stopColor={isDark ? '#352547' : '#EED8E4'} />
              <stop offset="100%" stopColor={isDark ? '#231A2E' : '#F8EFE7'} />
            </linearGradient>
          </defs>

          <rect width="600" height="120" fill="url(#collabSky)" />

          {/* Distant Trees & Sunset Quad */}
          <circle cx="80" cy="115" r="50" fill={isDark ? '#342646' : '#C7B6D1'} opacity="0.6" />
          <circle cx="140" cy="110" r="45" fill={isDark ? '#412F57' : '#B88274'} opacity="0.5" />
          <circle cx="200" cy="118" r="40" fill={isDark ? '#2C203B' : '#A9B7A0'} opacity="0.6" />

          {/* Rolling ground */}
          <path d="M 0 95 Q 150 85 300 92 T 600 88 L 600 120 L 0 120 Z" fill={isDark ? '#1C1625' : '#E8DCD1'} />

          {/* Group of 4 students sitting/standing collaborating */}
          {/* Student 1 (sitting with laptop) */}
          <circle cx="65" cy="74" r="6" fill={isDark ? '#AD91D0' : '#39283F'} />
          <path d="M 58 82 Q 65 80 72 82 L 72 96 L 58 96 Z" fill={isDark ? '#DDA18E' : '#B86F58'} />
          <polygon points="70,88 84,88 82,92 70,92" fill={isDark ? '#F7EFE8' : '#FFF9F1'} />

          {/* Student 2 (talking/gesturing) */}
          <circle cx="88" cy="68" r="6" fill={isDark ? '#F7EFE8' : '#39283F'} />
          <path d="M 80 76 Q 88 74 96 76 L 98 96 L 80 96 Z" fill={isDark ? '#AD91D0' : '#7D6A8E'} />

          {/* Student 3 (standing with notebook) */}
          <circle cx="115" cy="62" r="6" fill={isDark ? '#DDA18E' : '#39283F'} />
          <path d="M 108 70 Q 115 68 122 70 L 123 96 L 107 96 Z" fill={isDark ? '#A9B7A0' : '#A9B7A0'} />

          {/* Student 4 (sitting cross-legged) */}
          <circle cx="142" cy="74" r="6" fill={isDark ? '#AD91D0' : '#39283F'} />
          <path d="M 134 82 Q 142 80 150 82 L 152 96 L 132 96 Z" fill={isDark ? '#E7B09B' : '#DDA18E'} />

          {/* Campus Lamp */}
          <line x1="175" y1="55" x2="175" y2="96" stroke={isDark ? '#AD91D0' : '#39283F'} strokeWidth="1.5" />
          <circle cx="175" cy="53" r="3" fill={isDark ? '#FAD08E' : '#F6C176'} />
          <circle cx="175" cy="53" r="10" fill={isDark ? '#FAD08E' : '#F6C176'} opacity="0.3" />
        </svg>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * 3. WIDE CAMPUS PANORAMA BANNER (Direct Match to Reference)
   * ----------------------------------------------------------- */
  return (
    <div className={`relative w-full overflow-hidden select-none rounded-3xl ${className}`} style={{ minHeight: height || 200 }}>
      <svg
        viewBox="0 0 1000 230"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bannerSkyRef" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={skyGradStart} />
            <stop offset="45%" stopColor={skyGradMid} />
            <stop offset="100%" stopColor={skyGradEnd} />
          </linearGradient>

          <radialGradient id="sunMoonGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor={isDark ? '#AD91D0' : '#FFE4D1'} stopOpacity={isDark ? "0.6" : "0.75"} />
            <stop offset="60%" stopColor={isDark ? '#261C33' : '#F5E3D5'} stopOpacity={isDark ? "0.2" : "0.3"} />
            <stop offset="100%" stopColor={isDark ? '#191522' : '#F7EEE5'} stopOpacity="0" />
          </radialGradient>

          {/* Soft gradient fade on the left to ensure crisp text readability */}
          <linearGradient id="textProtector" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={isDark ? '#191522' : '#F6F0E7'} stopOpacity={isDark ? "0.9" : "0.85"} />
            <stop offset="40%" stopColor={isDark ? '#191522' : '#F6F0E7'} stopOpacity={isDark ? "0.55" : "0.45"} />
            <stop offset="70%" stopColor={isDark ? '#191522' : '#F6F0E7'} stopOpacity="0.05" />
            <stop offset="100%" stopColor={isDark ? '#191522' : '#F6F0E7'} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Atmospheric Sky */}
        <rect width="1000" height="230" fill="url(#bannerSkyRef)" />

        {/* Morning Sun or Twilight Crescent Moon */}
        {isDark ? (
          <g>
            <circle cx="840" cy="55" r="40" fill="url(#sunMoonGlow)" />
            {/* Elegant crescent moon */}
            <path
              d="M 845 42 A 16 16 0 1 0 858 64 A 14 14 0 1 1 845 42 Z"
              fill="#F7EFE8"
              opacity="0.95"
            />
            {/* Distant evening stars */}
            <circle cx="780" cy="40" r="1.5" fill="#FFF" opacity="0.8" />
            <circle cx="720" cy="65" r="1" fill="#FFF" opacity="0.6" />
            <circle cx="890" cy="35" r="1.5" fill="#FFF" opacity="0.75" />
            <circle cx="680" cy="45" r="1.2" fill="#FFF" opacity="0.65" />
            <circle cx="630" cy="70" r="1" fill="#FFF" opacity="0.5" />
          </g>
        ) : (
          <g>
            {/* Soft morning sun orb and gentle rays */}
            <circle cx="820" cy="70" r="70" fill="url(#sunMoonGlow)" />
            <circle cx="820" cy="70" r="26" fill="#FFF8EE" opacity="0.9" />
            {/* Birds soaring in morning light */}
            <path d="M 620 45 Q 625 40 630 45 Q 635 40 640 45" stroke="#766C78" strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M 645 52 Q 649 48 653 52 Q 657 48 661 52" stroke="#766C78" strokeWidth="1" fill="none" opacity="0.5" />
          </g>
        )}

        {/* 2. Distant Soft Mountain Ridge */}
        <path d="M 280 145 Q 480 100 680 120 T 1000 105 L 1000 230 L 280 230 Z" fill={mountainColor} opacity="0.55" />
        <path d="M 400 155 Q 560 120 740 135 T 1000 125 L 1000 230 L 400 230 Z" fill={distantBuildingColor} opacity="0.45" />

        {/* 3. Stately Collegiate Gothic Architecture (Right side matching reference) */}
        <g>
          {/* Far Right Hall */}
          <rect x="880" y="115" width="120" height="75" fill={midBuildingColor} />
          <polygon points="875,115 940,85 1000,115" fill={roofColor} />
          {/* Windows on far right hall */}
          {[895, 915, 935, 955, 975].map((x, i) => (
            <g key={i}>
              <path d={`M ${x} 130 A 4 4 0 0 1 ${x + 10} 130 L ${x + 10} 144 L ${x} 144 Z`} fill={windowGlow} opacity={isDark ? "0.9" : "0.75"} />
              <path d={`M ${x} 155 A 4 4 0 0 1 ${x + 10} 155 L ${x + 10} 168 L ${x} 168 Z`} fill={windowGlow} opacity={isDark ? "0.9" : "0.75"} />
            </g>
          ))}

          {/* Central Connecting Wing */}
          <rect x="730" y="125" width="160" height="65" fill={frontBuildingColor} />
          <polygon points="725,125 805,98 885,125" fill={roofColor} />
          {/* Gables & Windows */}
          <polygon points="760,125 775,108 790,125" fill={roofColor} />
          <polygon points="820,125 835,108 850,125" fill={roofColor} />
          {[745, 770, 795, 820, 845, 865].map((x, i) => (
            <path key={i} d={`M ${x} 140 A 4 4 0 0 1 ${x + 9} 140 L ${x + 9} 154 L ${x} 154 Z`} fill={windowGlow} opacity={isDark ? "0.9" : "0.75"} />
          ))}

          {/* Majestic Academic Clock Tower */}
          <rect x="670" y="80" width="55" height="110" fill={frontBuildingColor} />
          {/* Tower Belfry & Arches */}
          <rect x="666" y="70" width="63" height="15" fill={roofColor} />
          {/* Pointed Gothic Steeple */}
          <polygon points="665,70 697.5,15 730,70" fill={roofColor} />
          {/* Spire Rod and Finial */}
          <line x1="697.5" y1="15" x2="697.5" y2="3" stroke={roofColor} strokeWidth="2.5" />
          <circle cx="697.5" cy="3" r="3" fill={nodeColor} />

          {/* Illuminated Clock Face */}
          <circle cx="697.5" cy="105" r="12" fill={isDark ? '#FFF9F1' : '#FFF9F1'} stroke={roofColor} strokeWidth="1.5" />
          <circle cx="697.5" cy="105" r="1.5" fill="#39283F" />
          {/* Clock hands pointing at 10:10 */}
          <line x1="697.5" y1="105" x2="693" y2="100" stroke="#39283F" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="697.5" y1="105" x2="704" y2="101" stroke="#39283F" strokeWidth="1.2" strokeLinecap="round" />

          {/* Gothic arched windows on tower */}
          <path d="M 685 135 A 5 5 0 0 1 695 135 L 695 152 L 685 152 Z" fill={windowGlow} opacity={isDark ? "0.95" : "0.85"} />
          <path d="M 700 135 A 5 5 0 0 1 710 135 L 710 152 L 700 152 Z" fill={windowGlow} opacity={isDark ? "0.95" : "0.85"} />

          {/* Left Wing Library Gable */}
          <rect x="580" y="140" width="95" height="50" fill={midBuildingColor} />
          <polygon points="575,140 625,115 675,140" fill={roofColor} />
          <path d="M 605 152 A 6 6 0 0 1 617 152 L 617 170 L 605 170 Z" fill={windowGlow} opacity={isDark ? "0.9" : "0.75"} />
          <path d="M 630 152 A 6 6 0 0 1 642 152 L 642 170 L 630 170 Z" fill={windowGlow} opacity={isDark ? "0.9" : "0.75"} />
        </g>

        {/* 4. Rolling Quad Lawn and Winding Pathway */}
        <path d="M 0 175 Q 350 148 680 162 T 1000 155 L 1000 230 L 0 230 Z" fill={groundColor} />
        <path d="M 0 198 Q 420 178 750 188 T 1000 180 L 1000 230 L 0 230 Z" fill={groundShadow} opacity="0.6" />

        {/* Winding Campus Stone Pathway */}
        <path
          d="M 520 230 Q 640 215 700 185 T 725 170"
          stroke={pathColor}
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* 5. Campus Trees (Autumn ochre & lush green clusters framing architecture) */}
        {/* Left tree cluster beside tower */}
        <circle cx="560" cy="165" r="28" fill={foliageBack} opacity="0.85" />
        <circle cx="585" cy="170" r="22" fill={foliageMid} opacity="0.9" />
        <circle cx="550" cy="175" r="20" fill={foliageFront} opacity="0.9" />

        {/* Center tree cluster */}
        <circle cx="735" cy="175" r="22" fill={foliageBack} opacity="0.85" />
        <circle cx="750" cy="178" r="18" fill={foliageFront} opacity="0.9" />

        {/* Right lawn trees */}
        <circle cx="860" cy="175" r="25" fill={foliageMid} opacity="0.85" />
        <circle cx="885" cy="180" r="20" fill={foliageFront} opacity="0.9" />

        {/* Traditional Campus Lamp Post */}
        <line x1="640" y1="172" x2="640" y2="200" stroke={isDark ? '#C5B9CE' : '#39283F'} strokeWidth="2" strokeLinecap="round" />
        <circle cx="640" cy="170" r="3" fill={lanternLight} />
        <circle cx="640" cy="170" r="14" fill={lanternLight} opacity={isDark ? "0.35" : "0.2"} />

        {/* 6. Subtle Left Gradient Veil for Crystal Clear Heading Typography */}
        <rect width="600" height="230" fill="url(#textProtector)" />
      </svg>
    </div>
  );
};
