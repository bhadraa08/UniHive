import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface StorybookCampusLandscapeProps {
  className?: string;
  variant?: 'intro' | 'auth' | 'full';
  height?: number | string;
}

export const StorybookCampusLandscape: React.FC<StorybookCampusLandscapeProps> = ({
  className = '',
  variant: _variant = 'intro',
  height
}) => {
  const { isDark } = useTheme();

  // Colors carefully tuned to the UniHive Dreamy Editorial Design System:
  // Light: Warm Ivory, Dusty Lavender, Peach, Blush Pink, Muted Sage, Warm Gold
  // Dark: Deep Plum, Midnight Violet, Dusty Purple, Muted Mauve, Glowing Amber
  const skyGradMid = isDark ? '#261836' : '#F6E6DE';
  const skyGradEnd = isDark ? '#321D44' : '#EBD5E4';
  const mistColor = isDark ? '#3F2753' : '#EFE0E9';

  const mountainFar = isDark ? '#221631' : '#DFCEE0';
  const mountainMid = isDark ? '#2A1C3C' : '#D1BED5';
  const mountainNear = isDark ? '#34224A' : '#C4ACC8';

  const wallStone = isDark ? '#3E2A52' : '#E6D3C8';
  const wallBrick = isDark ? '#4D3460' : '#C88E7D';
  const wallDarkShadow = isDark ? '#2A1C39' : '#BAA195';
  const roofSlate = isDark ? '#2A1D3A' : '#64516F';
  const roofTrim = isDark ? '#402E54' : '#7D6A8A';

  const windowGlow = isDark ? '#FAD08E' : '#FFF6E5';
  const windowGlowBright = isDark ? '#FFE4A0' : '#FFFFFF';
  const windowFrame = isDark ? '#271B35' : '#927C72';

  const clockFace = '#FFF9F2';
  const clockHands = isDark ? '#251733' : '#39283F';
  const spireFinial = isDark ? '#FAD08E' : '#D69C72';

  const lawnFar = isDark ? '#1C1526' : '#CAD7BF';
  const lawnMid = isDark ? '#181121' : '#B8C9AC';
  const lawnFront = isDark ? '#130E1B' : '#A7BA98';

  const pathBase = isDark ? '#2E223D' : '#EFE4D6';
  const pathEdge = isDark ? '#21182D' : '#DCCBB9';

  const lampPost = isDark ? '#5A436D' : '#3E3245';
  const lanternGlow = isDark ? '#FBD99B' : '#F6C176';

  const trunkColor = isDark ? '#26192D' : '#4E3A36';
  const blossom1 = isDark ? '#AD91D0' : '#F7CED4';
  const blossom2 = isDark ? '#C5A9E4' : '#EDBEC6';
  const blossom3 = isDark ? '#9877BE' : '#DEC0EC';
  const blossomLight = isDark ? '#E5D6F5' : '#FFF2F4';

  const weedStem = isDark ? '#3B294C' : '#7D936F';
  const flowerPetal1 = isDark ? '#C7A3E6' : '#E7A08E';
  const flowerPetal2 = isDark ? '#F6CA8B' : '#E4C379';
  const flowerPetal3 = isDark ? '#E8B1C3' : '#8FA882';

  return (
    <div
      className={`relative w-full h-full select-none pointer-events-none overflow-hidden ${className}`}
      style={{
        height: height || '100%',
        // Seamless top gradient blend mask: completely eliminates any harsh line
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, rgba(0,0,0,0.85) 38%, black 65%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, rgba(0,0,0,0.85) 38%, black 65%)'
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1400 430"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="storybookSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDark ? '#191522' : '#F6F0E7'} stopOpacity="0" />
            <stop offset="25%" stopColor={isDark ? '#1E162A' : '#F7ECE5'} stopOpacity="0.6" />
            <stop offset="60%" stopColor={skyGradMid} stopOpacity="0.9" />
            <stop offset="100%" stopColor={skyGradEnd} stopOpacity="1" />
          </linearGradient>

          {/* Ethereal Mist Gradient */}
          <radialGradient id="mistRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={mistColor} stopOpacity={isDark ? "0.45" : "0.55"} />
            <stop offset="60%" stopColor={mistColor} stopOpacity={isDark ? "0.18" : "0.22"} />
            <stop offset="100%" stopColor={mistColor} stopOpacity="0" />
          </radialGradient>

          {/* Lantern Light Glow */}
          <radialGradient id="lanternAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={lanternGlow} stopOpacity={isDark ? "0.95" : "0.85"} />
            <stop offset="40%" stopColor={lanternGlow} stopOpacity={isDark ? "0.45" : "0.35"} />
            <stop offset="100%" stopColor={lanternGlow} stopOpacity="0" />
          </radialGradient>

          {/* Firefly Glow */}
          <radialGradient id="fireflyAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
            <stop offset="35%" stopColor="#FDE68A" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>

          {/* Soft Window Interior Glow */}
          <linearGradient id="archWindowGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={windowGlowBright} />
            <stop offset="40%" stopColor={windowGlow} />
            <stop offset="100%" stopColor={isDark ? '#F5B864' : '#FCE2B8'} />
          </linearGradient>

          {/* Pathway Texture Gradient */}
          <linearGradient id="pathGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={pathBase} />
            <stop offset="100%" stopColor={pathEdge} />
          </linearGradient>

          {/* Cloud linear gradient */}
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={mistColor} stopOpacity="0" />
            <stop offset="50%" stopColor={mistColor} stopOpacity={isDark ? "0.35" : "0.45"} />
            <stop offset="100%" stopColor={mistColor} stopOpacity="0" />
          </linearGradient>

          {/* Embedded Styles for smooth animations */}
          <style>{`
            @keyframes starTwinkle {
              0%, 100% { opacity: 0.25; transform: scale(0.85); }
              50% { opacity: 0.95; transform: scale(1.15); }
            }
            @keyframes fireflyDance {
              0% { transform: translate(0px, 0px) scale(0.9); opacity: 0.3; }
              30% { transform: translate(14px, -18px) scale(1.15); opacity: 0.95; }
              65% { transform: translate(-8px, -32px) scale(0.85); opacity: 0.7; }
              85% { transform: translate(-16px, -14px) scale(1.05); opacity: 0.9; }
              100% { transform: translate(0px, 0px) scale(0.9); opacity: 0.3; }
            }
            @keyframes cloudDriftSlow {
              0% { transform: translateX(-40px); }
              50% { transform: translateX(40px); }
              100% { transform: translateX(-40px); }
            }
            @keyframes branchSwaySoft {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(1.2deg); }
            }
            @keyframes weedSwaySoft {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(2.2deg); }
            }
            @keyframes mistBreatheSoft {
              0%, 100% { transform: scaleX(1) scaleY(1); opacity: 0.5; }
              50% { transform: scaleX(1.08) scaleY(1.04); opacity: 0.75; }
            }

            .star-twinkle-1 { animation: starTwinkle 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .star-twinkle-2 { animation: starTwinkle 4.5s ease-in-out infinite 1.4s; transform-box: fill-box; transform-origin: center; }
            .star-twinkle-3 { animation: starTwinkle 3.8s ease-in-out infinite 0.7s; transform-box: fill-box; transform-origin: center; }
            .star-twinkle-4 { animation: starTwinkle 5.1s ease-in-out infinite 2.2s; transform-box: fill-box; transform-origin: center; }

            .firefly-1 { animation: fireflyDance 8.5s ease-in-out infinite; }
            .firefly-2 { animation: fireflyDance 10.2s ease-in-out infinite 1.8s; }
            .firefly-3 { animation: fireflyDance 9.1s ease-in-out infinite 3.5s; }
            .firefly-4 { animation: fireflyDance 11.4s ease-in-out infinite 0.8s; }
            .firefly-5 { animation: fireflyDance 8.8s ease-in-out infinite 4.2s; }
            .firefly-6 { animation: fireflyDance 9.7s ease-in-out infinite 2.6s; }

            .cloud-drift-1 { animation: cloudDriftSlow 48s ease-in-out infinite; }
            .cloud-drift-2 { animation: cloudDriftSlow 62s ease-in-out infinite reverse; }

            .branch-sway-left { animation: branchSwaySoft 9s ease-in-out infinite; transform-box: fill-box; transform-origin: bottom left; }
            .branch-sway-right { animation: branchSwaySoft 10.5s ease-in-out infinite 1s; transform-box: fill-box; transform-origin: bottom right; }

            .weed-sway-left { animation: weedSwaySoft 6.5s ease-in-out infinite; transform-box: fill-box; transform-origin: bottom center; }
            .weed-sway-right { animation: weedSwaySoft 7.2s ease-in-out infinite 0.9s; transform-box: fill-box; transform-origin: bottom center; }

            .mist-breathe { animation: mistBreatheSoft 14s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }

            @media (prefers-reduced-motion: reduce) {
              .star-twinkle-1, .star-twinkle-2, .star-twinkle-3, .star-twinkle-4,
              .firefly-1, .firefly-2, .firefly-3, .firefly-4, .firefly-5, .firefly-6,
              .cloud-drift-1, .cloud-drift-2,
              .branch-sway-left, .branch-sway-right,
              .weed-sway-left, .weed-sway-right,
              .mist-breathe {
                animation: none !important;
              }
            }
          `}</style>
        </defs>

        {/* =========================================================
            LAYER 1: SKY & TWILIGHT STARS
           ========================================================= */}
        <rect width="1400" height="430" fill="url(#storybookSky)" />

        {/* Twinkling Stars in upper sky */}
        <g opacity={isDark ? "0.9" : "0.6"}>
          {/* Subtle 4-point twinkling stars */}
          <g className="star-twinkle-1" style={{ transformOrigin: '180px 75px' }}>
            <circle cx="180" cy="75" r="1.5" fill={isDark ? '#FFF' : '#F6E1C8'} />
          </g>
          <g className="star-twinkle-2" style={{ transformOrigin: '340px 50px' }}>
            <circle cx="340" cy="50" r="1.8" fill={isDark ? '#FFF' : '#F6E1C8'} />
          </g>
          <g className="star-twinkle-3" style={{ transformOrigin: '520px 85px' }}>
            <circle cx="520" cy="85" r="1.3" fill={isDark ? '#FFF' : '#F6E1C8'} />
          </g>
          <g className="star-twinkle-4" style={{ transformOrigin: '760px 45px' }}>
            <circle cx="760" cy="45" r="2.0" fill={isDark ? '#FFF' : '#F6E1C8'} />
          </g>
          <g className="star-twinkle-1" style={{ transformOrigin: '940px 65px' }}>
            <circle cx="940" cy="65" r="1.6" fill={isDark ? '#FFF' : '#F6E1C8'} />
          </g>
          <g className="star-twinkle-3" style={{ transformOrigin: '1120px 55px' }}>
            <circle cx="1120" cy="55" r="1.8" fill={isDark ? '#FFF' : '#F6E1C8'} />
          </g>
          <g className="star-twinkle-2" style={{ transformOrigin: '1260px 80px' }}>
            <circle cx="1260" cy="80" r="1.4" fill={isDark ? '#FFF' : '#F6E1C8'} />
          </g>
          <g className="star-twinkle-4" style={{ transformOrigin: '640px 60px' }}>
            <circle cx="640" cy="60" r="1.2" fill={isDark ? '#FFF' : '#F6E1C8'} />
          </g>
        </g>

        {/* Gentle drifting cloud wisps in upper atmosphere */}
        <g className="cloud-drift-1" opacity="0.75">
          <path
            d="M 120 70 Q 220 55 340 65 Q 460 75 560 62 Q 440 85 300 80 Q 180 82 120 70 Z"
            fill="url(#cloudGrad)"
          />
        </g>
        <g className="cloud-drift-2" opacity="0.65">
          <path
            d="M 850 78 Q 980 64 1120 72 Q 1240 82 1340 70 Q 1210 92 1060 88 Q 930 90 850 78 Z"
            fill="url(#cloudGrad)"
          />
        </g>

        {/* =========================================================
            LAYER 2: DISTANT LAVENDER MOUNTAINS & VALLEY MIST
           ========================================================= */}
        {/* Mountain Ridge 1 (Far peaks) */}
        <path
          d="M 0 215 Q 110 165 240 135 Q 360 108 490 145 Q 610 180 720 125 Q 850 65 980 115 Q 1110 165 1250 130 Q 1340 110 1400 128 L 1400 430 L 0 430 Z"
          fill={mountainFar}
          opacity="0.65"
        />

        {/* Mountain Mist Band 1 */}
        <ellipse cx="700" cy="180" rx="480" ry="26" fill="url(#mistRadial)" className="mist-breathe" />

        {/* Mountain Ridge 2 (Mid-distance rolling peaks) */}
        <path
          d="M 0 240 Q 160 190 320 210 Q 480 230 630 185 Q 760 145 890 175 Q 1020 205 1180 165 Q 1310 135 1400 152 L 1400 430 L 0 430 Z"
          fill={mountainMid}
          opacity="0.78"
        />

        {/* Mountain Ridge 3 (Foothills framing the campus) */}
        <path
          d="M 0 265 Q 180 220 370 240 Q 560 260 740 215 Q 910 175 1080 210 Q 1260 245 1400 200 L 1400 430 L 0 430 Z"
          fill={mountainNear}
          opacity="0.88"
        />

        {/* Gentle atmospheric mist hovering above quad terrace */}
        <ellipse cx="620" cy="245" rx="550" ry="24" fill="url(#mistRadial)" opacity="0.6" />

        {/* =========================================================
            LAYER 3: DISTANT CAMPUS SPIRES & TOWERS SILHOUETTES
           ========================================================= */}
        {/* Distant Left Turrets */}
        <g opacity="0.75" fill={mountainNear}>
          <polygon points="190,240 200,185 210,240" />
          <rect x="193" y="240" width="14" height="40" />
          <polygon points="230,245 242,170 254,245" />
          <rect x="234" y="245" width="16" height="40" />
        </g>
        {/* Distant Right Turrets */}
        <g opacity="0.75" fill={mountainNear}>
          <polygon points="1180,240 1192,180 1204,240" />
          <rect x="1184" y="240" width="16" height="40" />
          <polygon points="1230,245 1240,195 1250,245" />
          <rect x="1233" y="245" width="14" height="40" />
        </g>

        {/* =========================================================
            LAYER 4: STORYBOOK COLLEGIATE GOTHIC ARCHITECTURE
           ========================================================= */}
        {/* ---------------------------------------------------------
            4A: GRAND LIBRARY & FELLOWS' HALL (Left Wing)
           --------------------------------------------------------- */}
        <g id="greatHallLeft">
          {/* Main Hall Base */}
          <rect x="350" y="200" width="190" height="95" fill={wallStone} />
          {/* Base shadow cornice */}
          <rect x="345" y="292" width="200" height="6" fill={wallDarkShadow} />

          {/* Stepped Central Gable */}
          <polygon points="390,200 445,135 500,200" fill={wallBrick} />
          {/* Gable Stone Trim & Finial */}
          <line x1="445" y1="135" x2="445" y2="120" stroke={spireFinial} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="445" cy="118" r="2.5" fill={spireFinial} />

          {/* Main Slate Roof */}
          <polygon points="340,202 445,133 550,202" fill={roofSlate} opacity="0.9" />
          <polygon points="340,200 445,133 550,200" stroke={roofTrim} strokeWidth="2" fill="none" />

          {/* Roof Dormers */}
          <polygon points="365,185 375,172 385,185" fill={roofTrim} />
          <polygon points="505,185 515,172 525,185" fill={roofTrim} />

          {/* Grand Cathedral Tracery Window in Gable */}
          <path
            d="M 425 195 L 425 168 A 20 20 0 0 1 465 168 L 465 195 Z"
            fill="url(#archWindowGlow)"
          />
          {/* Window gothic stone mullions & tracery */}
          <path
            d="M 445 152 L 445 195 M 435 170 L 435 195 M 455 170 L 455 195"
            stroke={windowFrame}
            strokeWidth="1.6"
            fill="none"
          />
          <circle cx="445" cy="162" r="5" stroke={windowFrame} strokeWidth="1.4" fill="none" />

          {/* Library Lower Arched Windows (Row of 4 warm glowing bays) */}
          {[365, 395, 475, 505].map((x, i) => (
            <g key={`libWin-${i}`}>
              <path
                d={`M ${x} 248 L ${x} 222 A 10 10 0 0 1 ${x + 20} 222 L ${x + 20} 248 Z`}
                fill="url(#archWindowGlow)"
              />
              {/* Window grid */}
              <line x1={x + 10} y1="214" x2={x + 10} y2="248" stroke={windowFrame} strokeWidth="1.2" />
              <line x1={x} y1="234" x2={x + 20} y2="234" stroke={windowFrame} strokeWidth="1" />
            </g>
          ))}

          {/* Ground Cloister Archways (Walkway visible with warm light) */}
          {[375, 415, 465, 505].map((x, i) => (
            <path
              key={`cloister-${i}`}
              d={`M ${x} 295 L ${x} 268 A 12 12 0 0 1 ${x + 24} 268 L ${x + 24} 295 Z`}
              fill={isDark ? '#231733' : '#6A4D42'}
            />
          ))}
          {/* Buttresses dividing bays */}
          <rect x="350" y="200" width="8" height="95" fill={wallDarkShadow} />
          <rect x="441" y="200" width="8" height="95" fill={wallDarkShadow} />
          <rect x="532" y="200" width="8" height="95" fill={wallDarkShadow} />
        </g>

        {/* ---------------------------------------------------------
            4B: CONNECTING CLOISTER GALLERY (Between Hall & Tower)
           --------------------------------------------------------- */}
        <g id="connectingGallery">
          <rect x="540" y="225" width="110" height="70" fill={wallBrick} />
          <polygon points="535,225 595,202 655,225" fill={roofSlate} />
          {/* Gallery windows */}
          {[555, 585, 615].map((x, i) => (
            <path
              key={`galWin-${i}`}
              d={`M ${x} 260 L ${x} 240 A 8 8 0 0 1 ${x + 16} 240 L ${x + 16} 260 Z`}
              fill="url(#archWindowGlow)"
            />
          ))}
        </g>

        {/* ---------------------------------------------------------
            4C: STATELY ACADEMIC CLOCK TOWER & BELFRY (Center-Right)
           --------------------------------------------------------- */}
        <g id="academicClockTower">
          {/* Main Tower Masonry Shaft */}
          <rect x="645" y="145" width="85" height="155" fill={wallStone} />
          {/* Corner stone quoins */}
          <rect x="640" y="145" width="8" height="155" fill={wallDarkShadow} />
          <rect x="727" y="145" width="8" height="155" fill={wallDarkShadow} />

          {/* Tower Belfry Arcade Level */}
          <rect x="640" y="115" width="95" height="32" fill={wallBrick} />
          <rect x="635" y="143" width="105" height="5" fill={roofTrim} />
          {/* Belfry Lancet Arches (revealing bells/shadows inside) */}
          <path d="M 654 140 L 654 125 A 6 6 0 0 1 666 125 L 666 140 Z" fill={isDark ? '#1C1226' : '#4E3A36'} />
          <path d="M 677 140 L 677 122 A 8 8 0 0 1 693 122 L 693 140 Z" fill={isDark ? '#1C1226' : '#4E3A36'} />
          <path d="M 704 140 L 704 125 A 6 6 0 0 1 716 125 L 716 140 Z" fill={isDark ? '#1C1226' : '#4E3A36'} />

          {/* Belfry Balcony / Cornice */}
          <rect x="635" y="112" width="105" height="5" fill={roofTrim} />

          {/* Pointed Gothic Steeple Spire */}
          <polygon points="636,112 687.5,18 739,112" fill={roofSlate} />
          {/* Spire ridge highlights */}
          <line x1="687.5" y1="18" x2="687.5" y2="112" stroke={roofTrim} strokeWidth="2" />
          {/* Steeple Finial Needle & Weather-vane */}
          <line x1="687.5" y1="18" x2="687.5" y2="4" stroke={spireFinial} strokeWidth="3" strokeLinecap="round" />
          <circle cx="687.5" cy="4" r="3.5" fill={spireFinial} />
          {/* Subtle star gleam atop the tower */}
          <polygon
            points="687.5,0 689,3.5 692.5,4 689,4.5 687.5,8 686,4.5 682.5,4 686,3.5"
            fill={windowGlowBright}
          />

          {/* Illuminated Tower Clock Face */}
          <circle cx="687.5" cy="180" r="17" fill={clockFace} stroke={roofTrim} strokeWidth="2.5" />
          {/* Outer ring tick marks */}
          <circle cx="687.5" cy="180" r="14" stroke={isDark ? '#E5D6F5' : '#D0BEAE'} strokeWidth="1" strokeDasharray="1 3" fill="none" />
          {/* Clock Center & Hands (pointing at 10:10) */}
          <circle cx="687.5" cy="180" r="2.2" fill={clockHands} />
          <line x1="687.5" y1="180" x2="681" y2="173" stroke={clockHands} strokeWidth="2" strokeLinecap="round" />
          <line x1="687.5" y1="180" x2="697" y2="175" stroke={clockHands} strokeWidth="1.6" strokeLinecap="round" />

          {/* Tower Mid Gothic Lancet Windows */}
          <g>
            <path d="M 664 235 L 664 212 A 7 7 0 0 1 678 212 L 678 235 Z" fill="url(#archWindowGlow)" />
            <line x1="671" y1="206" x2="671" y2="235" stroke={windowFrame} strokeWidth="1.2" />
            <path d="M 697 235 L 697 212 A 7 7 0 0 1 711 212 L 711 235 Z" fill="url(#archWindowGlow)" />
            <line x1="704" y1="206" x2="704" y2="235" stroke={windowFrame} strokeWidth="1.2" />
          </g>

          {/* Tower Lower Arched Entry Portal with Lantern */}
          <path d="M 672 298 L 672 268 A 15 15 0 0 1 703 268 L 703 298 Z" fill={isDark ? '#1C1226' : '#5E433B'} />
          <circle cx="687.5" cy="265" r="4" fill={lanternGlow} />
          <circle cx="687.5" cy="265" r="16" fill="url(#lanternAura)" />
        </g>

        {/* ---------------------------------------------------------
            4D: OBSERVATORY ROTUNDA & EAST HALL (Right Wing)
           --------------------------------------------------------- */}
        <g id="observatoryRight">
          {/* East Wing Base */}
          <rect x="730" y="215" width="220" height="85" fill={wallStone} />
          <rect x="725" y="295" width="230" height="5" fill={wallDarkShadow} />

          {/* Rotunda Pavilion with Dome */}
          <rect x="770" y="190" width="100" height="30" fill={wallBrick} />
          {/* Classical Dome */}
          <path
            d="M 770 190 A 50 50 0 0 1 870 190 Z"
            fill={roofSlate}
            opacity="0.95"
          />
          {/* Dome ribs */}
          <path d="M 820 140 L 820 190" stroke={roofTrim} strokeWidth="2" fill="none" />
          <path d="M 820 140 Q 795 160 788 190" stroke={roofTrim} strokeWidth="1.5" fill="none" />
          <path d="M 820 140 Q 845 160 852 190" stroke={roofTrim} strokeWidth="1.5" fill="none" />
          {/* Dome Lantern Cupola */}
          <rect x="814" y="132" width="12" height="10" fill={spireFinial} />
          <circle cx="820" cy="128" r="4" fill={spireFinial} />

          {/* Rotunda Arched Windows */}
          {[780, 805, 835, 855].map((x, i) => (
            <path
              key={`rotWin-${i}`}
              d={`M ${x} 215 L ${x} 198 A 5 5 0 0 1 ${x + 10} 198 L ${x + 10} 215 Z`}
              fill="url(#archWindowGlow)"
            />
          ))}

          {/* East Hall Roof & Gables */}
          <polygon points="860,215 915,178 970,215" fill={roofSlate} />
          <polygon points="900,215 915,198 930,215" fill={roofTrim} />

          {/* East Hall Arched Windows (Row of 5) */}
          {[750, 790, 830, 875, 915].map((x, i) => (
            <g key={`eastWin-${i}`}>
              <path
                d={`M ${x} 265 L ${x} 238 A 9 9 0 0 1 ${x + 18} 238 L ${x + 18} 265 Z`}
                fill="url(#archWindowGlow)"
              />
              <line x1={x + 9} y1="230" x2={x + 9} y2="265" stroke={windowFrame} strokeWidth="1.2" />
              <line x1={x} y1="250" x2={x + 18} y2="250" stroke={windowFrame} strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* =========================================================
            LAYER 5: QUAD TERRACE, LAWN SLOPES & WINDING PATHWAY
           ========================================================= */}
        {/* Far Lawn Slope */}
        <path
          d="M 0 295 Q 380 270 700 282 T 1400 278 L 1400 430 L 0 430 Z"
          fill={lawnFar}
        />

        {/* Mid Lawn Slope with organic contours */}
        <path
          d="M 0 325 Q 340 300 680 312 Q 1020 324 1400 305 L 1400 430 L 0 430 Z"
          fill={lawnMid}
        />

        {/* Winding Campus Pathway sweeping from foreground up to clock tower & hall */}
        <g id="campusPath">
          <path
            d="M 820 430 Q 760 380 690 350 Q 640 328 620 315 Q 600 305 580 298"
            stroke="url(#pathGradient)"
            strokeWidth="38"
            fill="none"
            strokeLinecap="round"
          />
          {/* Path edge shadow definition */}
          <path
            d="M 839 430 Q 778 380 707 350 Q 656 328 636 315"
            stroke={pathEdge}
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />
          {/* Subtle flagstone stepping lines across the path */}
          <g stroke={pathEdge} strokeWidth="1.5" opacity="0.6">
            <line x1="770" y1="392" x2="800" y2="402" />
            <line x1="720" y1="365" x2="748" y2="375" />
            <line x1="668" y1="340" x2="692" y2="348" />
            <line x1="625" y1="322" x2="646" y2="328" />
          </g>
        </g>

        {/* Foreground Lawn Slope */}
        <path
          d="M 0 365 Q 420 340 760 355 T 1400 348 L 1400 430 L 0 430 Z"
          fill={lawnFront}
          opacity="0.95"
        />

        {/* =========================================================
            LAYER 6: CAMPUS VICTORIAN LAMP POSTS (Warm beacons)
           ========================================================= */}
        {/* Lamp Post 1 (Beside the winding pathway) */}
        <g id="lampPost1">
          <line x1="615" y1="315" x2="615" y2="355" stroke={lampPost} strokeWidth="3" strokeLinecap="round" />
          <line x1="608" y1="320" x2="622" y2="320" stroke={lampPost} strokeWidth="2" />
          {/* Lantern Glass & Fixture */}
          <polygon points="610,317 615,308 620,317" fill={lampPost} />
          <circle cx="615" cy="315" r="4.5" fill={lanternGlow} />
          {/* Warm Ambient Lantern Aura */}
          <circle cx="615" cy="315" r="26" fill="url(#lanternAura)" />
        </g>

        {/* Lamp Post 2 (Near Great Hall terrace) */}
        <g id="lampPost2">
          <line x1="380" y1="305" x2="380" y2="340" stroke={lampPost} strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="376,307 380,300 384,307" fill={lampPost} />
          <circle cx="380" cy="305" r="4" fill={lanternGlow} />
          <circle cx="380" cy="305" r="22" fill="url(#lanternAura)" />
        </g>

        {/* Lamp Post 3 (Near East Pavilion) */}
        <g id="lampPost3">
          <line x1="965" y1="305" x2="965" y2="340" stroke={lampPost} strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="961,307 965,300 969,307" fill={lampPost} />
          <circle cx="965" cy="305" r="4" fill={lanternGlow} />
          <circle cx="965" cy="305" r="22" fill="url(#lanternAura)" />
        </g>

        {/* =========================================================
            LAYER 7: FLOWERING JACARANDA & CHERRY TREES (Framing)
           ========================================================= */}
        {/* ---------------------------------------------------------
            7A: LEFT FLOWERING TREE (Gracefully arching over the quad)
           --------------------------------------------------------- */}
        <g id="floweringTreeLeft" className="branch-sway-left">
          {/* Trunk & Main Branches */}
          <path
            d="M 60 430 Q 80 360 110 310 Q 130 270 170 230"
            stroke={trunkColor}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 110 310 Q 150 280 210 260"
            stroke={trunkColor}
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 130 270 Q 110 220 135 180"
            stroke={trunkColor}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 170 230 Q 230 210 280 225"
            stroke={trunkColor}
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 135 180 Q 180 160 230 175"
            stroke={trunkColor}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Blossom Petal Clusters (Delicate, organic impressionist florets) */}
          {/* Cluster 1 (Upper Left) */}
          <circle cx="130" cy="175" r="32" fill={blossom1} opacity="0.9" />
          <circle cx="155" cy="165" r="26" fill={blossom2} opacity="0.9" />
          <circle cx="145" cy="188" r="22" fill={blossom3} opacity="0.85" />
          <circle cx="125" cy="162" r="14" fill={blossomLight} opacity="0.9" />
          <circle cx="150" cy="155" r="12" fill={blossomLight} opacity="0.95" />

          {/* Cluster 2 (Upper Reach over campus) */}
          <circle cx="220" cy="170" r="30" fill={blossom2} opacity="0.9" />
          <circle cx="245" cy="185" r="24" fill={blossom1} opacity="0.9" />
          <circle cx="205" cy="180" r="20" fill={blossom3} opacity="0.85" />
          <circle cx="230" cy="165" r="14" fill={blossomLight} opacity="0.9" />

          {/* Cluster 3 (Mid Left) */}
          <circle cx="170" cy="225" r="34" fill={blossom1} opacity="0.9" />
          <circle cx="205" cy="235" r="28" fill={blossom2} opacity="0.9" />
          <circle cx="185" cy="250" r="22" fill={blossom3} opacity="0.85" />
          <circle cx="195" cy="220" r="15" fill={blossomLight} opacity="0.9" />

          {/* Cluster 4 (Far Reach) */}
          <circle cx="275" cy="225" r="26" fill={blossom2} opacity="0.88" />
          <circle cx="295" cy="238" r="20" fill={blossom1} opacity="0.88" />
          <circle cx="270" cy="242" r="16" fill={blossom3} opacity="0.85" />

          {/* Cluster 5 (Lower Canopy) */}
          <circle cx="85" cy="245" r="35" fill={blossom3} opacity="0.9" />
          <circle cx="65" cy="225" r="28" fill={blossom1} opacity="0.9" />
          <circle cx="95" cy="210" r="24" fill={blossom2} opacity="0.9" />
          <circle cx="75" cy="205" r="14" fill={blossomLight} opacity="0.9" />
        </g>

        {/* ---------------------------------------------------------
            7B: RIGHT FLOWERING TREE (Framing upper right)
           --------------------------------------------------------- */}
        <g id="floweringTreeRight" className="branch-sway-right">
          {/* Trunk & Main Branches */}
          <path
            d="M 1340 430 Q 1315 350 1280 295 Q 1250 250 1210 215"
            stroke={trunkColor}
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 1280 295 Q 1230 275 1170 265"
            stroke={trunkColor}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 1250 250 Q 1265 200 1240 165"
            stroke={trunkColor}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 1210 215 Q 1150 200 1100 215"
            stroke={trunkColor}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Blossom Petal Clusters */}
          {/* Cluster 1 */}
          <circle cx="1245" cy="165" r="32" fill={blossom2} opacity="0.9" />
          <circle cx="1220" cy="155" r="25" fill={blossom1} opacity="0.9" />
          <circle cx="1235" cy="180" r="22" fill={blossom3} opacity="0.85" />
          <circle cx="1225" cy="150" r="14" fill={blossomLight} opacity="0.95" />

          {/* Cluster 2 */}
          <circle cx="1165" cy="195" r="30" fill={blossom1} opacity="0.9" />
          <circle cx="1135" cy="210" r="24" fill={blossom2} opacity="0.9" />
          <circle cx="1175" cy="225" r="22" fill={blossom3} opacity="0.85" />
          <circle cx="1150" cy="188" r="14" fill={blossomLight} opacity="0.9" />

          {/* Cluster 3 */}
          <circle cx="1215" cy="235" r="34" fill={blossom2} opacity="0.9" />
          <circle cx="1185" cy="255" r="26" fill={blossom1} opacity="0.9" />
          <circle cx="1235" cy="260" r="22" fill={blossom3} opacity="0.85" />

          {/* Cluster 4 (Outer Right Canopy) */}
          <circle cx="1310" cy="235" r="36" fill={blossom3} opacity="0.9" />
          <circle cx="1335" cy="215" r="28" fill={blossom1} opacity="0.9" />
          <circle cx="1295" cy="205" r="24" fill={blossom2} opacity="0.9" />
          <circle cx="1320" cy="200" r="14" fill={blossomLight} opacity="0.9" />
        </g>

        {/* =========================================================
            LAYER 8: WILDFLOWER CLUSTERS FRAMING LOWER CORNERS
           ========================================================= */}
        {/* Left Corner Wildflowers */}
        <g id="wildflowersLeft" className="weed-sway-left">
          {/* Stems */}
          <path d="M 20 430 Q 30 380 40 345" stroke={weedStem} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 45 430 Q 55 375 75 330" stroke={weedStem} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M 70 430 Q 85 385 105 350" stroke={weedStem} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 95 430 Q 120 395 145 365" stroke={weedStem} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 125 430 Q 155 405 180 385" stroke={weedStem} strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Leaves */}
          <path d="M 32 390 Q 18 380 26 372 Q 36 378 32 390 Z" fill={weedStem} opacity="0.8" />
          <path d="M 58 375 Q 75 362 68 355 Q 56 362 58 375 Z" fill={weedStem} opacity="0.8" />
          <path d="M 88 385 Q 105 375 98 368 Q 85 375 88 385 Z" fill={weedStem} opacity="0.8" />

          {/* Botanical Blooms */}
          {/* Main tall bellflower */}
          <circle cx="75" cy="328" r="5" fill={flowerPetal1} />
          <circle cx="70" cy="323" r="4" fill={flowerPetal2} />
          <circle cx="80" cy="323" r="4" fill={flowerPetal3} />
          <circle cx="75" cy="318" r="3.5" fill={blossomLight} />

          {/* Secondary bloom */}
          <circle cx="40" cy="343" r="4.5" fill={flowerPetal3} />
          <circle cx="36" cy="339" r="3.5" fill={flowerPetal1} />
          <circle cx="44" cy="339" r="3.5" fill={flowerPetal2} />

          {/* Third bloom */}
          <circle cx="105" cy="348" r="4.5" fill={flowerPetal2} />
          <circle cx="101" cy="344" r="3.5" fill={flowerPetal1} />
          <circle cx="109" cy="344" r="3.5" fill={flowerPetal3} />

          {/* Wild buds */}
          <circle cx="145" cy="363" r="3.5" fill={flowerPetal1} />
          <circle cx="180" cy="383" r="3" fill={flowerPetal2} />
        </g>

        {/* Right Corner Wildflowers */}
        <g id="wildflowersRight" className="weed-sway-right">
          {/* Stems */}
          <path d="M 1370 430 Q 1355 375 1335 330" stroke={weedStem} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M 1340 430 Q 1325 380 1300 345" stroke={weedStem} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 1305 430 Q 1285 385 1260 350" stroke={weedStem} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 1270 430 Q 1245 395 1220 365" stroke={weedStem} strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* Leaves */}
          <path d="M 1352 385 Q 1368 375 1360 368 Q 1348 375 1352 385 Z" fill={weedStem} opacity="0.8" />
          <path d="M 1320 375 Q 1302 362 1310 355 Q 1322 362 1320 375 Z" fill={weedStem} opacity="0.8" />

          {/* Blooms */}
          <circle cx="1335" cy="328" r="5" fill={flowerPetal2} />
          <circle cx="1330" cy="323" r="4" fill={flowerPetal1} />
          <circle cx="1340" cy="323" r="4" fill={flowerPetal3} />
          <circle cx="1335" cy="318" r="3.5" fill={blossomLight} />

          <circle cx="1300" cy="343" r="4.5" fill={flowerPetal1} />
          <circle cx="1260" cy="348" r="4" fill={flowerPetal3} />
          <circle cx="1220" cy="363" r="3.5" fill={flowerPetal2} />
        </g>

        {/* =========================================================
            LAYER 9: ENCHANTING GOLDEN FIREFLIES DANCING OVER QUAD
           ========================================================= */}
        <g id="fireflies">
          {/* Firefly 1 (Floating over lawn left of tower) */}
          <g className="firefly-1">
            <circle cx="490" cy="325" r="1.8" fill="#FFFBEB" />
            <circle cx="490" cy="325" r="9" fill="url(#fireflyAura)" />
          </g>

          {/* Firefly 2 (Drifting along the winding path) */}
          <g className="firefly-2">
            <circle cx="670" cy="360" r="2.2" fill="#FFFBEB" />
            <circle cx="670" cy="360" r="11" fill="url(#fireflyAura)" />
          </g>

          {/* Firefly 3 (Near the blooming jacaranda canopy) */}
          <g className="firefly-3">
            <circle cx="270" cy="285" r="2.0" fill="#FFFBEB" />
            <circle cx="270" cy="285" r="10" fill="url(#fireflyAura)" />
          </g>

          {/* Firefly 4 (Near the clock tower entrance) */}
          <g className="firefly-4">
            <circle cx="730" cy="310" r="1.7" fill="#FFFBEB" />
            <circle cx="730" cy="310" r="8" fill="url(#fireflyAura)" />
          </g>

          {/* Firefly 5 (Floating over right quad) */}
          <g className="firefly-5">
            <circle cx="890" cy="345" r="2.0" fill="#FFFBEB" />
            <circle cx="890" cy="345" r="10" fill="url(#fireflyAura)" />
          </g>

          {/* Firefly 6 (Near the right flowering tree) */}
          <g className="firefly-6">
            <circle cx="1080" cy="300" r="1.8" fill="#FFFBEB" />
            <circle cx="1080" cy="300" r="9" fill="url(#fireflyAura)" />
          </g>
        </g>
      </svg>
    </div>
  );
};
