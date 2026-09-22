import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "ConnectHub",
    type: "Java Web Application",
    intro:
      "A Java web application for connections, friendships and one-to-one messaging.",
    stack: "Java · Servlets · JSP · JDBC · PostgreSQL · Maven",
    stats: ["Session-based auth", "1:1 messaging", "Friend workflows"],
    bullets: [
      "Implemented registration, login, logout, session management and account controls.",
      "Built friend-request workflows, notifications and profile management.",
      "Designed a Controller → DAO → Database flow using Servlets, JDBC and PostgreSQL.",
    ],
    github: "https://github.com/uttejkaramala/ConnectHub",
    images: [
      ["/projects/connecthub-home.png", "ConnectHub home dashboard"],
      ["/projects/connecthub-chat.png", "ConnectHub conversation screen"],
      ["/projects/connecthub-profile.png", "ConnectHub profile screen"],
    ],
  },
  {
    number: "02",
    title: "Gemini NL2DB Query Engine",
    type: "Generative AI · Database Application",
    intro:
      "An AI-powered interface that lets users interact with databases using natural language instead of manually writing SQL.",
    stack: "Gemini · LangChain · Streamlit · MySQL · PostgreSQL · MongoDB",
    stats: ["3 databases", "Schema introspection", "Natural language"],
    bullets: [
      "Integrated Gemini and LangChain for natural-language query generation and database interaction.",
      "Supports MySQL, PostgreSQL and MongoDB through the same interface.",
      "Built database schema inspection and database-specific query workflows.",
    ],
    github:
      "https://github.com/uttejkaramala/natural-language-to-query-generation",
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
    number: "03",
    title: "RecipeMaster",
    type: "Generative AI Application",
    intro:
      "A Streamlit application combining Gemini-powered recipe generation with practical food-content workflows.",
    stack: "Python · Streamlit · Gemini · Generative AI",
    stats: ["Recipe generation", "Image input", "AI content"],
    bullets: [
      "Built the application independently from interface to AI integration.",
      "Generated recipes and blog-style content with Gemini.",
      "Added image and ingredient-based workflows for a practical user experience.",
    ],
    github:
      "https://github.com/uttejkaramala/Flavour-Fusion-AI--Driven-Recipe-Blogging",
    images: [
      ["/projects/recipe-generator.png", "RecipeMaster generation interface"],
      ["/projects/recipe-output.png", "Generated recipe blog"],
      ["/projects/recipe-suggestions.png", "Recipe suggestions"],
    ],
  },
  {
    number: "04",
    title: "Underwater Object Detection",
    type: "Computer Vision · Academic Project",
    intro:
      "An underwater vision pipeline combining YOLOv11 fine-tuning, image enhancement, Grad-CAM and an AI chatbot.",
    stack: "YOLOv11 · PyTorch · GMAN · Grad-CAM · Streamlit",
    stats: ["22 classes", "YOLOv11", "Explainable detection"],
    bullets: [
      "Fine-tuned an existing YOLOv11 model on an underwater object dataset.",
      "Integrated image dehazing and Grad-CAM visualization to improve and explain detections.",
      "Contributed project documentation and chatbot integration.",
    ],
    github:
      "https://github.com/uttejkaramala/Underwater-Object-Detection-Using-Deep-Learning",
    images: [
      ["/projects/underwater-dehaze.png", "Underwater image enhancement"],
      ["/projects/underwater-gradcam.png", "Underwater Grad-CAM"],
      ["/projects/underwater-metrics.png", "Underwater metrics"],
    ],
  },
];

const skills = [
  "Core Java",
  "Collections",
  "JDBC",
  "Servlets",
  "Spring Core",
  "Spring Boot",
  "REST APIs",
  "Hibernate / JPA",
  "SQL",
  "PostgreSQL",
  "React.js",
  "Git",
  "Maven",
];

function Project({ p, onOpen }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = document.querySelector(
      `[data-project="${p.number}"] .project-image img`,
    );
    if (!el) return;
    gsap.fromTo(
      el,
      { scale: 1.035 },
      {
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "bottom 35%",
          scrub: 1,
        },
      },
    );
  }, []);
  return (
    <article className="project" data-project={p.number}>
      <div className="project-meta">
        <span>{p.number}</span>
        <span>{p.type}</span>
      </div>
      <div className="project-title-row">
        <div>
          <h3>{p.title}</h3>
          <p>{p.intro}</p>
        </div>
        <a
          className="github-link"
          href={p.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ArrowUpRight size={16} />
        </a>
      </div>
      <button
        className="project-image"
        onClick={() => onOpen(p.images[active])}
      >
        <img src={p.images[active][0]} alt={p.images[active][1]} />
        <span>View image</span>
      </button>
      <div className="thumbs">
        {p.images.map(([src, alt], i) => (
          <button
            className={i === active ? "thumb active" : "thumb"}
            key={src}
            onClick={() => setActive(i)}
          >
            <img src={src} alt="" />
          </button>
        ))}
      </div>
      <div className="project-grid">
        <div>
          <small>BUILT WITH</small>
          <strong>{p.stack}</strong>
          <div className="stats">
            {p.stats.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
        <div>
          <small>TECHNICAL STORY</small>
          <ul>
            {p.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [lightbox, setLightbox] = useState(null);
  const [menu, setMenu] = useState(false);
  const hero = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
      });
      gsap.utils.toArray(".reveal").forEach((el) =>
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 84%" },
        }),
      );
    }, hero);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    const key = (e) => e.key === "Escape" && setLightbox(null);
    document.addEventListener("keydown", key);
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [lightbox]);
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };
  return (
    <div ref={hero}>
      <header className="nav">
        <button className="brand" onClick={() => go("top")}>
          <b>UK</b>
          <span>Uttej Karamala</span>
        </button>
        <button className="mobile-menu" onClick={() => setMenu(!menu)}>
          MENU
        </button>
        <nav className={menu ? "open" : ""}>
          <button onClick={() => go("work")}>Work</button>
          <button onClick={() => go("about")}>About</button>
          <button onClick={() => go("experience")}>Experience</button>
          <button onClick={() => go("contact")}>Contact</button>
        </nav>
      </header>
      <main id="top">
        <section className="hero wrap">
          <div className="hero-copy">
            <small>JAVA · SPRING BOOT · FULL STACK</small>
            <h1>
              <span>Uttej</span>
              <br />
              Karamala
            </h1>
            <h2>Java Full Stack Developer</h2>
            <p>
              I build practical software with Java, Spring Boot, REST APIs,
              databases and React — with an AI/ML background that helps me
              explore intelligent applications.
            </p>
            <div className="actions">
              <button className="dark-btn" onClick={() => go("work")}>
                Explore my work <ArrowDown size={17} />
              </button>
              <a
                className="light-btn"
                href="/Karamal-Uttej-Java-Developer.pdf"
                download
              >
                <Download size={17} /> Download resume
              </a>
            </div>
          </div>
        </section>
        <section id="about" className="statement wrap reveal">
          <small>ABOUT</small>
          <h2>
            I like building from the backend outward — application logic, data,
            APIs and interfaces that work together.
          </h2>
          <p>
            B.Tech graduate in Computer Science & Engineering (AI & ML), 9.38
            CGPA. My strongest development focus is Java and Spring Boot, while
            my AI/ML background gives me experience with Generative AI and
            computer vision applications.
          </p>
        </section>
        <section className="stack">
          <div className="wrap reveal">
            <small>MY STACK</small>
            <h2>From application logic to the interface.</h2>
            <div className="stack-flow">
              {["Java", "Spring Boot", "REST APIs", "PostgreSQL", "React"].map(
                (x, i) => (
                  <div key={x}>
                    <b>{x}</b>
                    {i < 4 && <i>→</i>}
                  </div>
                ),
              )}
            </div>
            <div className="skill-cloud">
              {skills.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </section>
        <section id="work" className="work">
          <div className="wrap work-intro reveal">
            <small>SELECTED WORK</small>
            <h2>Projects that show how I build.</h2>
            <p>
              Each project is a small technical story — what it does, what I
              built, and the tools behind it.
            </p>
          </div>
          {projects.map((p) => (
            <Project key={p.number} p={p} onOpen={setLightbox} />
          ))}
        </section>
        <section id="experience" className="experience wrap reveal">
          <small>EXPERIENCE</small>
          <h2>Practical development experience.</h2>
          <div className="experience-row">
            <div>
              <em>MAY 2025 — JUL 2025</em>
              <h3>Full Stack Development Intern</h3>
              <b>SPYtech</b>
            </div>
            <div>
              <p>
                Worked with a team on an LMS platform using React.js and Figma,
                supporting learning content, video classes and student–professor
                communication.
              </p>
              <span>React.js</span>
              <span>Figma</span>
              <span>LMS</span>
            </div>
          </div>
          <div className="experience-row">
            <div>
              <em>2025 — 2026</em>
              <h3>Generative AI Program / Internship</h3>
              <b>SmartBridge</b>
            </div>
            <div>
              <p>
                Built a Streamlit application using Google Gemini for recipe
                generation and image-based food workflows as part of a
                structured Generative AI program.
              </p>
              <span>Streamlit</span>
              <span>Google Gemini</span>
              <span>Generative AI</span>
            </div>
          </div>
        </section>
        <section className="education reveal">
          <div className="wrap">
            <small>EDUCATION</small>
            <h2>Sri Venkateswara College of Engineering, Tirupati</h2>
            <p>
              B.Tech — Computer Science & Engineering (Artificial Intelligence &
              Machine Learning) · 2022–2026
            </p>
            <strong>
              9.38 <i>CGPA</i>
            </strong>
          </div>
        </section>
        <section className="independent wrap reveal">
          <small>BUILT INDEPENDENTLY</small>
          <div className="numbers">
            <div>
              <b>3</b>
              <span>independent applications</span>
            </div>
            <div>
              <b>Java</b>
              <span>full-stack foundation</span>
            </div>
            <div>
              <b>AI</b>
              <span>LLM & computer vision</span>
            </div>
          </div>
          <p>
            ConnectHub, NL2DB and RecipeMaster were developed independently
            across application logic, interface and integration. Underwater
            Object Detection was an academic team project where I contributed
            model fine-tuning, visualization, chatbot integration and
            documentation.
          </p>
        </section>
        <section className="learning">
          <div className="wrap">
            <small>CURRENTLY EXPLORING</small>
            <div>
              {[
                "Spring Boot",
                "Spring Data JPA",
                "Spring Security",
                "REST API design",
              ].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="contact wrap reveal">
          <small>LET'S BUILD SOMETHING</small>
          <h2>
            Looking for opportunities in Java, Spring Boot and Full Stack
            Development.
          </h2>
          <p>Bangalore · Hyderabad · Chennai · Remote</p>
          <div className="actions">
            <a className="dark-btn" href="mailto:karamalauttej@gmail.com">
              <Mail size={17} /> Email me
            </a>
            <a
              className="light-btn"
              href="https://github.com/uttejkaramala"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} /> GitHub
            </a>
            <a
              className="light-btn"
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
          onMouseDown={(e) => e.target === e.currentTarget && setLightbox(null)}
        >
          <button onClick={() => setLightbox(null)}>
            <X />
          </button>
          <img src={lightbox[0]} alt={lightbox[1]} />
        </div>
      )}
    </div>
  );
}
