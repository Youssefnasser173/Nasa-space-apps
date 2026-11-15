# NORELIS — Personalized Human Health Intelligence

**Platform:** NORELIS  
**Focus:** Spaceflight Physiological Monitoring, Anatomical Intelligence & Dual-Path Health Assessment  
**Environment:** React 18, TypeScript, Vite, Tailwind CSS, Three.js, React Three Fiber, Framer Motion, Recharts

---

## Key Differentiators & Features

1. **Anatomy-Connected Health Intelligence**
   - Full-body 3D human anatomy visualization with continuous automatic MRI-style scanning beam.
   - Male and Female anatomical visualization models with calibrated proportions.
   - Interactive 3D mesh raycasting on hover and click selection for Brain, Heart, Lungs, Liver, Kidneys, Stomach, Intestines, and Musculoskeletal structures.
   - True 360-degree focused organ exploration with multi-axis OrbitControls, smooth damping, zoom controls, and natural biological tissue shaders.

2. **Dual-Path Health Assessment**
   - **Option A (Medical File Upload):** Drag-and-drop intake supporting PDF, DOCX, CSV, XLSX, and medical image scans. Real client-side parsing using PDF.js, Mammoth, and SheetJS. Includes structured extracted review, editable parameters, transparent document source provenance, conflict resolution across multi-file uploads, and targeted missing-information completion.
   - **Option B (Guided Health Assessment):** 10-step guided questionnaire covering anthropometrics, clinical history, organ-specific vitals, psychomotor readiness, and provenance tagging.
   - **Unified Health Profile:** Both methods converge into a single shared data model with a completeness indicator and clear scientific disclaimers.

3. **Individualized Earth Baseline vs. Predicted Space Baseline**
   - **Dedicated Earth Baseline (`/earth-baseline`):** 180-day pre-flight longitudinal reference with personal averages, standard deviations, variability percentages, min/max, and objective data counts.
   - **Dedicated Predicted Space Baseline (`/predicted-space-baseline`):** Clearly separated from Earth ground-truth. Explicitly distinguishes Earth baseline, simulated projections, and actual space measurements with mandatory "SIMULATED PROJECTION — NOT A CLINICAL FORECAST" labeling.
   - Handles insufficient data honestly (e.g. for AG-003: "INSUFFICIENT DATA FOR INDIVIDUALIZED PROJECTION").

4. **Integrated Spaceflight Monitoring & NASA Five Hazards**
   - **Space Monitoring (`/space-monitoring`):** Live in-flight telemetry deviations against individual baselines, ECLSS environmental telemetry (cabin O2, CO2, pressure, temp, noise, radiation rate).
   - **NASA Five Hazards (`/hazards`):** Interactive deep-dives into Space Radiation, Isolation/Confinement, Distance from Earth, Gravity Fields, and Hostile/Closed Environments with operational context and hazard synergy mapping.
   - **Alerts & Printable Reports (`/alerts`, `/reports`):** Severity-coded notifications (Green, Yellow, Red) and browser-printable medical flight dossiers.

5. **Astronaut & Flight Surgeon (Admin) Portals**
   - **Astronaut Portal:** Overview dashboard, Vital Readings 3D anatomy, Baselines, Monitoring, Hazards, Alerts, Reports, and Profile settings.
   - **Admin Flight Surgeon Console (`/admin`):** Separate authenticated login, fleet overview, Astronaut Directory with search, filtering, and sorting, plus Individual Astronaut Profiles featuring the same interactive 3D anatomical viewer.

---

## Getting Started

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

The application runs on Vite (default port `5173`).
