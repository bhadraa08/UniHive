# UniHive — Dreamy, Editorial Student Community Platform

> **Tagline:** Your campus. Your people. Your hive.  
> **Creative Direction:** Dreamy Editorial  
> **Color System:** Velvet Lavender  

UniHive is an interactive college student community platform built for UI/UX competition evaluation. It connects university peers to resolve academic questions through the **Help Loop**, share verified student study guides, form multidisciplinary hackathon teams, and recover misplaced campus essentials.

---

## 🎨 Creative Direction & Visual Identity

UniHive merges the illustrated charm of a storybook with the sophistication of an editorial periodical and the usability of a modern web application:

- **Geometric Brandmark:** Connected hexagonal nodes motif representing decentralized campus collaboration (no cartoon bees). Works as an app icon, navbar mark, and animated hero mark.
- **Velvet Lavender Palette:**
  - **Warm parchment** (`#F3E8D8` / `#FFF9F1`): Light theme background and off-white cards, reminiscent of warm printed paper.
  - **Dusty lavender** (`#B7A4D4`): Primary navigation selection, secondary interactive highlights, and badge accents.
  - **Muted terracotta** (`#D58D78`): Focal callouts, karma points, urgency cues, and warm lantern glows.
  - **Deep plum** (`#39283F`): Editorial typography, primary action buttons, and architectural silhouettes.
  - **Dark plum background** (`#211C29` / `#2B2334` / `#342A3E`): Dusk theme background with twilight campus atmosphere.
  - **Success accent** (`#92B99A`): Resolved help loop indicators, team completion states.
  - **Error accent** (`#C87878`): Form validation and urgent deadlines.
- **Illustrated Campus Landscapes:**
  - Dynamic vector panorama transitioning between **Dawn (Light)** and **Twilight (Dark)**.
  - Stately clock towers, gothic library arches, laboratory spires, botanical trees, and glowing quad street lanterns.
  - Hexagonal community constellation nodes connecting campus landmarks.

---

## 🚀 Complete User Journey

The application enforces the required journey:

1. **Website Opens → Dedicated Animated Introduction:**
   - Soft campus landscape reveal.
   - Geometric nodes and hexagonal connection lines animate into place.
   - UniHive brandmark and wordmark reveal.
   - Tagline reveal: *"Your campus. Your people. Your hive."*
   - Refined *"Enter UniHive"* action or *"Skip Intro"* option.
2. **Authentication Experience (Split Desktop / Dedicated Mobile):**
   - **Desktop:** Intentional split layout with campus artwork and live community impact stats on the left; clean validating form on the right.
   - **One-Click Judge Demo Access:** Instant access with pre-configured persona **Alex Chen** (3rd Year CS & Design).
   - **Registration:** Validates full name, university email, password matching, college, department, and graduation year; creates local profile with +50 welcome bonus points.
   - **Session Persistence:** Remembers session in `localStorage`; includes logout and intro replay.
3. **Discover Dashboard:**
   - Editorial welcome banner with campus vector illustration.
   - 4 purposeful Quick Actions (Ask for Help, Share Resource, Find Teammates, Lost & Found).
   - **Live Community Pulse:** Computed live from the sample dataset (Open requests, Shared guides, Team openings, Resolved loops).
   - Filterable campus activity feed with sorting (Latest, Urgent, Most Active).
4. **The Help Loop (Signature Interaction):**
   - Step 1: Student creates an academic help request (e.g. SQL joins, recursive DP).
   - Step 2: Peer discovers it and selects **Offer Help** (+20 Hive Points awarded).
   - Step 3: Requester reviews offer in the Post Details discussion thread.
   - Step 4: Requester clicks **Mark as Resolved** (triggers celebratory confetti, attaches resolution note, awards +35 Hive Points, updates resolution rate).
5. **Academic Resources Vault:**
   - Filter by format (PDF, Figma, Code, Cheatsheet, Slides) and department.
   - Simulated preview and instant download feedback.
6. **Find Teammates:**
   - Hackathon and capstone roster discovery with skill filters and applicant management.
7. **Lost & Found Desk:**
   - Verified drop-off desk tracking, categorized by item type (IDs, Electronics, Keys).
8. **My Activity & Profile:**
   - Track personal posts, responses given to peers, bookmarks, and shared guides.
   - Edit student profile, badges earned, and competition controls (Replay Intro, Reset Demo Data, Sign Out).

---

## 🛠️ Tech Stack & Setup

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + Custom CSS Variables (Velvet Lavender Design System)
- **Icons:** Lucide React
- **Celebrations:** Canvas Confetti
- **State & Persistence:** React Context + `localStorage` / `sessionStorage`

### Running the Project

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
