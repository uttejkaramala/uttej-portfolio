# Uttej Karamala — Developer Portfolio

A minimal, Apple-inspired developer portfolio built with React, Vite and GSAP/ScrollTrigger. The portfolio is positioned around Java, Spring Boot and full-stack development while keeping AI/ML as a differentiator.

## Included

- Hero / positioning section with highlighted personal name
- UK monogram favicon and larger branded navigation
- About and technical foundation
- Selected work with real application screenshots
- Experience
- Education
- Contact / GitHub / LinkedIn
- Resume download
- Responsive layout
- GSAP scroll reveals and project-image motion
- No gradients

## Project screenshots

The following real screenshots are wired into the project:

1. ConnectHub — Java / Servlets / JSP / JDBC / PostgreSQL
2. Gemini NL2DB Query Engine — Gemini / LangChain / Streamlit / databases
3. RecipeMaster — Gemini-powered recipe/blog generation
4. Underwater Object Detection — YOLOv11 / dehazing / Grad-CAM / Gemini

The NL2DB screenshot that contained a visible database credential has been sanitized before being added to the public portfolio.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

This project is ready for Vercel or another Vite-compatible static hosting service.

## Structure

```text
public/
  resume.pdf
  projects/
    connecthub-home.png
    connecthub-chat.png
    connecthub-profile.png
    nl2db-main.png
    nl2db-execution.png
    nl2db-query-result-sanitized.png
    recipe-generator.png
    recipe-output.png
    recipe-suggestions.png
    underwater-dehaze.png
    underwater-gradcam.png
    underwater-metrics.png
src/
  App.jsx
  main.jsx
  styles/globals.css
```


## Personal profile photo

The current portfolio intentionally does not invent or substitute a profile photo. For a job-search portfolio, add a real professional headshot when ready. An animated/avatar image can be used as a secondary visual, but the real photo is recommended for the primary professional identity.
