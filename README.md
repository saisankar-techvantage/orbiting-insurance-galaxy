# 🌌 Insurance OS Interactive Booth — "The Intelligent Universe for Insurance"

An immersive, 3D-inspired landing page designed for **expo display** to visually represent the **Insurance OS ecosystem** — an interconnected galaxy of AI-driven insurance products orbiting around a central intelligent core.

---

## 🪐 Overview

The **Insurance OS Interactive Booth** visualizes the complete AI product ecosystem as a **living solar system**.  
At the center lies the glowing **Insurance OS orb**, surrounded by 10 intelligent satellites — each representing a unique AI capability in the insurance lifecycle.

The experience is designed for **touch-screen and kiosk interaction (55” display or iPad Pro)**, allowing users to explore each satellite, view interactive product flows, and scan a QR code to book live demos.

---

## ✨ Core Concept

**Central Orb (The Sun):**

- Label: `Insurance OS – Powered by <Partner Name> + Zentis + Go-Do`
- Subtext: _“The Invisible Intelligence Layer for Insurance”_
- Animation: Gentle pulsating glow with orbiting brand logos (AAI + Zentis)

**Satellite Nodes (Planets):**

- 10 circular product nodes orbiting in a **3D oval path**.
- Each contains:
  - Product Name
  - Animated Icon
  - Soft neon glow (non-rotating while orbiting)
- Smooth, layered orbital motion — nodes remain upright and readable.
- Hero nodes are slightly larger and glow brighter.

---

## 🛰️ Product Satellites

| No. | Product Name                       | Icon Concept | Type     |
| --- | ---------------------------------- | ------------ | -------- |
| 1   | Underwriting AI                    | ✒️🛡️         | Core     |
| 2   | Quote & Buy AI                     | 🛍️📄         | Core     |
| 3   | Customer Onboarding AI             | 🪪🌀          | Core     |
| 4   | Claims Optimization AI             | ⚡📁         | **Hero** |
| 5   | Claims Intake AI                   | 📨🧾         | Core     |
| 6   | Internal Audit AI                  | 🔍📋         | Core     |
| 7   | Claims Audit AI                    | 🧾✅         | Core     |
| 8   | Customer Support AI                | 💬🎧         | **Hero** |
| 9   | Go-Do Voice/WhatsApp AI            | 📞🌐         | **Hero** |
| 10  | High-Value Risk AI (Marine/Energy) | 🚢📡         | **Hero** |

---

## 🧭 Interaction Design

**Idle State:**

- Satellites orbit smoothly in 3D space.
- Subtle background stars and particles move slowly.
- Center orb emits soft pulses.

**On Hover/Touch:**

- Node enlarges slightly.
- Orbit line glows brighter.
- Label and icon emphasize readability.

**On Tap/Click:**

- Zooms into the selected product.
- Displays a **mini-journey storyboard**:
  1. Input → 2. AI Processing → 3. Outcome
- Example:
  - _Claims Optimization_: “Claim Card → AI → Optimized Outcome Metrics”
  - _Customer Support_: “Query → AI → Multi-language Response”

**Back Interaction:**

- Floating button: “Return to Insurance OS”
- Smooth zoom-out to restore galaxy view.

---

## 🧩 Technical Blueprint

**Frontend Stack (recommended):**

- **React.js + Three.js** or **React Three Fiber** for 3D orbit visuals.
- **Framer Motion** for smooth transitions.
- **TailwindCSS** for responsive, modern styling.
- **Vite** or **Next.js** for optimized build and deployment.
- **React Query / Zustand** for state management (if dynamic data included).

**Assets:**

- SVG / Lottie icons for each product.
- Galaxy background (gradient + star field).
- Optional ambient sound design (“AI hum” + whoosh effects).

---

## 🖥️ Hardware & Deployment

| Environment        | Setup                                            |
| ------------------ | ------------------------------------------------ |
| **Expo Booth**     | Touchscreen display (55”) or iPad Pro            |
| **Hosting**        | Vercel / Netlify / GitHub Pages                  |
| **Mode**           | Kiosk Mode (Full screen, no scroll)              |
| **QR Integration** | Each product page displays a QR for demo booking |

---

## 🧠 Visual & UX Guidelines

- **Theme:** Futuristic, cosmic, intelligent.
- **Color Palette:**
  - Deep navy `#0a0f1f`
  - Indigo `#1b2550`
  - Cyan `#00e5ff`
  - Magenta `#ff47d0`
  - White text overlays with soft glows.
- **Typography:** `Orbitron`, `Poppins`, or `Inter`.
- **3D Feel:** Depth via gradients, shadows, parallax motion.

---

## 🚀 Setup Instructions

1. **Clone the Repo**
   ```bash
   git clone https://github.com/<your-org>/insurance-os-interactive-booth.git
   cd insurance-os-interactive-booth
   ```
