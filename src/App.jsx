import React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/projects-section.css";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* Add a `live` URL to any project once it is deployed. The "Live      */
/* demo" button only renders when `live` is set.                       */
/* ------------------------------------------------------------------ */
const projects = [
  {
    id: "jobtrack",
    title: "JobTrack",
    type: "Full-stack job application platform",
    intro:
      "A full-stack application for organizing job applications, tracking their progress and keeping job-search details in one place.",
    stack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "Spring Data JPA",
      "PostgreSQL",
      "React",
    ],
    stats: ["JWT authentication", "Application pipeline", "User-specific data"],
    bullets: [
      "Built REST APIs with Spring Boot to manage job applications and related tracking details.",
      "Implemented registration and login with Spring Security, JWT authentication and BCrypt password hashing.",
      "Connected a React frontend to a PostgreSQL-backed API, with authenticated access to each user's application data.",
    ],
    github: "https://github.com/uttejkaramala/JobTrack",
    live: null,
    images: [
      ["/projects/JobTrack-Dashboard.png", "JobTrack dashboard"],
      [
        "/projects/JobTrack-Application-tracking.png",
        "JobTrack application tracking",
      ],
      ["/projects/JobTrack-Register.png", "JobTrack Register screen"],
    ],
  },
  {
    id: "connecthub",
    title: "ConnectHub",
    type: "Java web application",
    intro:
      "A Java web application for connections, friendships and one-to-one messaging.",
    stack: ["Java", "Servlets", "JSP", "JDBC", "PostgreSQL", "Maven"],
    stats: ["Session-based auth", "1:1 messaging", "Friend workflows"],
    bullets: [
      "Implemented registration, login, logout, session management and account controls.",
      "Built friend-request workflows, notifications and profile management.",
      "Designed a Controller → DAO → Database flow using Servlets, JDBC and PostgreSQL.",
    ],
    github: "https://github.com/uttejkaramala/ConnectHub",
    live: null,
    images: [
      ["/projects/connecthub-home.png", "ConnectHub home dashboard"],
      ["/projects/connecthub-chat.png", "ConnectHub conversation screen"],
      ["/projects/connecthub-profile.png", "ConnectHub profile screen"],
    ],
  },
  {
    id: "nl2db",
    title: "Gemini NL2DB Query Engine",
    type: "Generative AI · database application",
    intro:
      "An AI-powered interface that lets users interact with databases using natural language instead of manually writing SQL.",
    stack: [
      "Gemini",
      "LangChain",
      "Streamlit",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
    ],
    stats: ["3 databases", "Schema introspection", "Natural language"],
    bullets: [
      "Integrated Gemini and LangChain for natural-language query generation and database interaction.",
      "Supports MySQL, PostgreSQL and MongoDB through the same interface.",
      "Built database schema inspection and database-specific query workflows.",
    ],
    github:
      "https://github.com/uttejkaramala/natural-language-to-query-generation",
    live: null,
    images: [
      ["/projects/nl2db-main.png", "NL2DB main interface"],
      ["/projects/nl2db-execution.png", "NL2DB query execution"],
      [
        "/projects/nl2db-query-result-sanitized.png",
        "NL2DB sanitized query result",
      ],
    ],
  },
  {
    id: "recipemaster",
    title: "RecipeMaster",
    type: "Generative AI application",
    intro:
      "A Streamlit application combining Gemini-powered recipe generation with practical food-content workflows.",
    stack: ["Python", "Streamlit", "Gemini", "Generative AI"],
    stats: ["Recipe generation", "Image input", "AI content"],
    bullets: [
      "Built the application independently from interface to AI integration.",
      "Generated recipes and blog-style content with Gemini.",
      "Added image and ingredient-based workflows for a practical user experience.",
    ],
    github:
      "https://github.com/uttejkaramala/Flavour-Fusion-AI--Driven-Recipe-Blogging",
    live: null,
    images: [
      ["/projects/recipe-generator.png", "RecipeMaster generation interface"],
      ["/projects/recipe-output.png", "Generated recipe blog"],
      ["/projects/recipe-suggestions.png", "Recipe suggestions"],
    ],
  },
  {
    id: "underwater",
    title: "Underwater Object Detection",
    type: "Computer vision · academic team project",
    intro:
      "An underwater vision pipeline combining YOLOv11 fine-tuning, image enhancement, Grad-CAM and an AI chatbot.",
    stack: ["YOLOv11", "PyTorch", "GMAN", "Grad-CAM", "Streamlit"],
    stats: ["22 classes", "YOLOv11", "Explainable detection"],
    bullets: [
      "Fine-tuned an existing YOLOv11 model on an underwater object dataset.",
      "Integrated image dehazing and Grad-CAM visualization to improve and explain detections.",
      "Contributed project documentation and chatbot integration.",
    ],
    github:
      "https://github.com/uttejkaramala/Underwater-Object-Detection-Using-Deep-Learning",
    live: null,
    images: [
      ["/projects/underwater-dehaze.png", "Underwater image enhancement"],
      ["/projects/underwater-gradcam.png", "Underwater Grad-CAM"],
      ["/projects/underwater-metrics.png", "Underwater metrics"],
    ],
  },
];

const skillGroups = [
  [
    "Backend",
    [
      "Core Java",
      "Collections",
      "Servlets",
      "Spring Core",
      "Spring Boot",
      "REST APIs",
      "Spring Security",
      "JWT",
      "OAuth2",
    ],
  ],
  ["Data", ["JDBC", "Hibernate / JPA", "SQL", "PostgreSQL"]],
  ["Frontend", ["React.js", "HTML / CSS", "Figma"]],
  ["Tools", ["Git", "Maven"]],
];

const pipeline = [
  "React",
  "Spring Security + JWT",
  "REST controller",
  "Spring Data JPA",
  "PostgreSQL",
];

/* Edit this to match what you are actually learning next. */
const learning = ["Docker", "Cloud deployment", "Microservices", "SpringAI"];

/* Name variants for the typewriter effect: English, Hindi, Telugu, Tamil */
const nameVariants = [
  "Uttej\nKaramala",
  "उत्तेज\nकरमाला",
  "ఉత్తేజ్\nకరమాల",
  "உத்தேஜ்\nகரமலா",
];

/* ------------------------------------------------------------------ */
/* PROJECT CARD                                                        */
/* ------------------------------------------------------------------ */
function Project({ p, index, onOpen }) {
  const [active, setActive] = useState(0);
  const [src, alt] = p.images[active];

  return (
    <article
      id={p.id}
      className={`project${index % 2 ? " project--flip" : ""}`}
      data-project={p.id}
    >
      <div className="project__visual">
        <button
          className="project__shot"
          onClick={() => onOpen(p.images[active])}
          aria-label={`Open ${p.title} screenshot full size`}
        >
          <img src={src} alt={alt} loading="lazy" decoding="async" />
          <span className="project__zoom">
            Full size <ArrowUpRight size={14} />
          </span>
        </button>

        <div
          className="project__thumbs"
          role="group"
          aria-label={`${p.title} screenshots`}
        >
          {p.images.map(([thumb, thumbAlt], i) => (
            <button
              key={thumb}
              className={
                i === active ? "project__thumb is-active" : "project__thumb"
              }
              onClick={() => setActive(i)}
              aria-label={`Show screenshot ${i + 1}: ${thumbAlt}`}
              aria-pressed={i === active}
            >
              <img src={thumb} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>

      <div className="project__body">
        <p className="project__type">{p.type}</p>
        <h3>{p.title}</h3>
        <p className="project__intro">{p.intro}</p>

        <ul className="chips" aria-label="Highlights">
          {p.stats.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <h4>What I built</h4>
        <ul className="project__bullets">
          {p.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <h4>Tech stack</h4>
        <ul className="project__stack">
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <div className="project__links">
          {p.live && (
            <a
              className="btn btn--solid btn--sm"
              href={p.live}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={15} /> Live demo
            </a>
          )}
          <a
            className={`btn btn--sm ${p.live ? "btn--ghost" : "btn--solid"}`}
            href={p.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${p.title} source code on GitHub`}
          >
            <Github size={15} /> Source code
          </a>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* APP                                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
  const root = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(projects[0].id);
  const [typedName, setTypedName] = useState(nameVariants[0]);
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      /* storage unavailable */
    }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  /* Theme */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  /* Typewriter effect cycling through multiple languages: English, Hindi, Telugu, Tamil */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedName(nameVariants[0]);
      return;
    }

    let langIndex = 0;
    let charIndex = nameVariants[0].length;
    let isDeleting = false;
    let timeoutId;

    const tick = () => {
      const currentFullText = nameVariants[langIndex];

      if (isDeleting) {
        charIndex -= 1;
        setTypedName(currentFullText.slice(0, charIndex));
        if (charIndex <= 0) {
          isDeleting = false;
          langIndex = (langIndex + 1) % nameVariants.length;
          timeoutId = setTimeout(tick, 350);
          return;
        }
        timeoutId = setTimeout(tick, 45);
      } else {
        charIndex += 1;
        setTypedName(currentFullText.slice(0, charIndex));
        if (charIndex >= currentFullText.length) {
          isDeleting = true;
          timeoutId = setTimeout(tick, 2200); // hold full text
          return;
        }
        timeoutId = setTimeout(tick, 90);
      }
    };

    // Initial pause before deleting first text
    timeoutId = setTimeout(() => {
      isDeleting = true;
      tick();
    }, 2400);

    return () => clearTimeout(timeoutId);
  }, []);

  /* Close mobile menu on scroll */
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  /* Scroll-spy for the project index */
  useEffect(() => {
    const cards = document.querySelectorAll(".project[data-project]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && setActiveProject(e.target.dataset.project),
        ),
      { rootMargin: "-40% 0px -50% 0px" },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  /* Animations (skipped when the visitor prefers reduced motion) */
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-copy > *", {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
        })
        .from(".terminal", { y: 36, opacity: 0, duration: 0.8 }, 0.2)
        .from(
          ".terminal__line",
          { opacity: 0, x: -8, duration: 0.3, stagger: 0.05 },
          0.7,
        );

      gsap.utils.toArray(".reveal").forEach((el) =>
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }),
      );
    }, root);
    return () => ctx.revert();
  }, []);

  /* Lightbox: Escape + scroll lock */
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    ["work", "Work"],
    ["stack", "Stack"],
    ["experience", "Experience"],
    ["about", "About"],
    ["contact", "Contact"],
  ];

  return (
    <div ref={root}>
      <header className="nav">
        <button
          className="brand"
          onClick={() => go("top")}
          aria-label="Back to top"
        >
          <b>UK</b>
          <span>Uttej Karamala</span>
        </button>

        <nav className={menuOpen ? "open" : ""} aria-label="Primary">
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className={`mobile-menu${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="status">
              <i aria-hidden="true" /> Open to work · Available immediately
            </p>
            <h1 className="typewriter" aria-label="Uttej Karamala">
              {typedName}
              <span className="typewriter__cursor" aria-hidden="true" />
            </h1>
            <h2>Java Full Stack Developer</h2>
            <p className="lead">
              I build practical software with Java, Spring Boot, REST APIs,
              databases and React, with an AI/ML background that helps me
              explore intelligent applications.
            </p>
            <div className="actions">
              <button className="btn btn--solid" onClick={() => go("work")}>
                See my projects <ArrowDown size={17} />
              </button>
              <a
                className="btn btn--ghost"
                href="/Karamal-Uttej-Java-Developer.pdf"
                download
              >
                <Download size={17} /> Download resume
              </a>
            </div>
          </div>

          <div className="terminal" aria-hidden="true">
            <div className="terminal__bar">
              <span />
              <span />
              <span />
              <em>ApplicationController.java</em>
            </div>
            <pre className="terminal__code">
              <code>
                <span className="terminal__line">
                  <b className="k">@RestController</b>
                </span>
                <span className="terminal__line">
                  <b className="k">@RequestMapping</b>(
                  <b className="s">"/api/applications"</b>)
                </span>
                <span className="terminal__line">
                  <b className="k">class</b>{" "}
                  <b className="t">ApplicationController</b> {"{"}
                </span>
                <span className="terminal__line">{"  "}</span>
                <span className="terminal__line">
                  {"  "}
                  <b className="k">@GetMapping</b>
                </span>
                <span className="terminal__line">
                  {"  "}
                  <b className="t">List</b>&lt;<b className="t">Application</b>
                  &gt; <b className="f">mine</b>(<b className="t">Principal</b>{" "}
                  user) {"{"}
                </span>
                <span className="terminal__line">
                  {"    "}
                  <b className="k">return</b> service.
                  <b className="f">findByUser</b>(
                </span>
                <span className="terminal__line">
                  {"      "}user.<b className="f">getName</b>());
                </span>
                <span className="terminal__line">{"  }"}</span>
                <span className="terminal__line">{"}"}</span>
              </code>
            </pre>
            <div className="terminal__flow">
              {pipeline.map((step, i) => (
                <span key={step}>
                  {step}
                  {i < pipeline.length - 1 && <i>›</i>}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="work" className="work">
          <div className="wrap">
            <div className="work__intro reveal">
              <h2>Projects built to solve real problems.</h2>
              <p>
                Applications, integrations and the technical decisions behind
                them. Four are independent builds; Underwater Object Detection
                was a team project.
              </p>
            </div>

            <div className="work__layout">
              <nav className="project-index" aria-label="Projects">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    className={activeProject === p.id ? "is-active" : ""}
                    onClick={() => go(p.id)}
                    aria-current={activeProject === p.id ? "true" : undefined}
                  >
                    {p.title}
                  </button>
                ))}
              </nav>

              <div className="project-list">
                {projects.map((p, i) => (
                  <Project key={p.id} p={p} index={i} onOpen={setLightbox} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="band stack">
          <div className="wrap reveal">
            <h2>From application logic to the interface.</h2>
            <div className="stack-flow">
              {[
                "Java",
                "Spring Boot",
                "REST APIs",
                "PostgreSQL",
                "Spring Security",
                "React",
              ].map((x, i, arr) => (
                <div key={x}>
                  <b>{x}</b>
                  {i < arr.length - 1 && <i aria-hidden="true">→</i>}
                </div>
              ))}
            </div>
            <div className="skill-groups">
              {skillGroups.map(([group, items]) => (
                <div key={group}>
                  <h3>{group}</h3>
                  <ul>
                    {items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="experience wrap reveal">
          <h2>Practical development experience.</h2>
          <div className="experience-row">
            <div>
              <em>May 2025 – Jul 2025</em>
              <h3>Full Stack Development Intern</h3>
              <b>SPYtech</b>
            </div>
            <div>
              <p>
                Worked with a team on an LMS platform using React.js and Figma,
                supporting learning content, video classes and student–professor
                communication.
              </p>
              <ul className="tags">
                <li>React.js</li>
                <li>Figma</li>
                <li>LMS</li>
              </ul>
            </div>
          </div>
          <div className="experience-row">
            <div>
              <em>2025 – 2026</em>
              <h3>Generative AI Program / Internship</h3>
              <b>SmartBridge</b>
            </div>
            <div>
              <p>
                Built a Streamlit application using Google Gemini for recipe
                generation and image-based food workflows as part of a
                structured Generative AI program.
              </p>
              <ul className="tags">
                <li>Streamlit</li>
                <li>Google Gemini</li>
                <li>Generative AI</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ABOUT + EDUCATION */}
        <section id="about" className="about">
          <div className="wrap reveal about__grid">
            <div>
              <h2>
                I like building from the backend outward: application logic,
                data, APIs and interfaces that work together.
              </h2>
              <p>
                My strongest development focus is Java and Spring Boot. My AI/ML
                background gives me hands-on experience with Generative AI and
                computer vision applications.
              </p>
            </div>
            <aside className="edu">
              <h3>Education</h3>
              <p className="edu__school">
                Sri Venkateswara College of Engineering, Tirupati
              </p>
              <p>
                B.Tech, Computer Science & Engineering (AI & ML) · 2022–2026
              </p>
              <strong>
                9.38 <i>CGPA</i>
              </strong>
            </aside>
          </div>
        </section>

        {/* LEARNING */}
        <section className="band learning">
          <div className="wrap reveal">
            <h2>Currently learning</h2>
            <ul>
              {learning.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact wrap reveal">
          <h2>
            Looking for opportunities in Java, Spring Boot and Full Stack
            Development.
          </h2>
          <p>Bangalore · Hyderabad · Chennai · Remote</p>
          <div className="actions actions--left">
            <a className="btn btn--solid" href="mailto:karamalauttej@gmail.com">
              <Mail size={17} /> Email me
            </a>
            <a
              className="btn btn--ghost"
              href="https://github.com/uttejkaramala"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} /> GitHub
            </a>
            <a
              className="btn btn--ghost"
              href="https://www.linkedin.com/in/uttejkaramala"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={17} /> LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Uttej Karamala</span>
        <span>Java · Spring Boot · Full Stack</span>
      </footer>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
          onMouseDown={(e) => e.target === e.currentTarget && setLightbox(null)}
        >
          <button onClick={() => setLightbox(null)} aria-label="Close preview">
            <X />
          </button>
          <img src={lightbox[0]} alt={lightbox[1]} />
        </div>
      )}
    </div>
  );
}
