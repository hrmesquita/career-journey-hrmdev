import { useEffect, useRef } from "react";
import { createTimeline } from "animejs";

const experiences = [
  {
    company: "MaioLabs",
    role: "Software & AI Engineer",
    period: "Jun 2026 - Present",
    highlights: [
      "Own backend and platform development within a three-engineer team for a production AI project, from client requirements and architecture through implementation and delivery.",
      "Work directly with the client to understand business needs, clarify requirements, evaluate technical trade-offs, and help define priorities and next steps.",
      "Design multi-tenant architecture where data models, queries, authentication, authorization, permissions, and logging enforce explicit tenant boundaries.",
      "Design IAM and permission models for multiple user roles and external identity providers, with security, sensitive-data handling, tenant isolation, auditability, reliability, and maintainability treated as architectural requirements.",
    ],
  },
  {
    company: "Indra via CodeWin",
    role: "Software Engineer",
    period: "Jun 2024 - Jun 2026",
    highlights: [
      "Built Java and Spring Boot backend services for a port logistics management platform, integrating external client APIs and exposing REST endpoints.",
      "Implemented end-to-end backend workflows covering data ingestion, transformation, persistence, and API design.",
      "Supported frequent QA-driven release cycles while maintaining >85% automated test coverage and collaborating with analysts and client teams on integrations and data handling.",
    ],
  },
  {
    company: "Critical TechWorks",
    role: "Software Engineer",
    period: "Mar 2023 - Mar 2024",
    highlights: [
      "Designed and implemented a high-throughput Quarkus microservice for inter-service communication within a distributed platform.",
      "Designed a nested-set tree data model for hierarchical JSON structures, optimizing complex subtree queries and downstream processing.",
      "Built JSON ingestion, validation, and persistence flows for deeply nested data structures, using asynchronous processing to reduce blocking operations and improve responsiveness.",
      "Benchmarked JSON deserialization approaches and identified a ~32% performance difference, using the results to inform implementation and architecture decisions.",
      "Built and maintained CI/CD pipelines with Docker and Jenkins while maintaining >85% automated unit and integration test coverage.",
      "Deployed and operated services across Kubernetes test, integration, and production environments, working with QA, product management, and UX throughout delivery.",
    ],
  },
];

const Experience = () => {
  const timelineRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-experience-item]"));
    if (!items.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      items.forEach((item) => {
        const line = item.querySelector<HTMLElement>("[data-experience-line]");
        const dot = item.querySelector<HTMLElement>("[data-experience-dot]");
        const content = item.querySelector<HTMLElement>("[data-experience-content]");

        if (line) {
          line.style.opacity = "1";
          line.style.transform = "scaleY(1)";
        }
        if (dot) {
          dot.style.opacity = "1";
        }
        if (content) {
          content.style.opacity = "1";
          content.style.transform = "none";
        }
      });
      return;
    }

    const tl = createTimeline({
      defaults: { duration: 450, easing: "out(2)" },
      autoplay: false,
    });

    tl.label("start");

    items.forEach((item, index) => {
      const line = item.querySelector<HTMLElement>("[data-experience-line]");
      const dot = item.querySelector<HTMLElement>("[data-experience-dot]");
      const content = item.querySelector<HTMLElement>("[data-experience-content]");
      const startAt = index === 0 ? "start" : "<+=50";

      if (line) {
        tl.add(
          line,
          { opacity: [0, 1], scaleY: [0, 1], transformOrigin: "top center" },
          startAt
        );
      }

      if (dot) {
        tl.add(dot, { opacity: [0, 1] }, "<+=50");
      }

      if (content) {
        tl.add(content, { opacity: [0, 1], translateY: [16, 0] }, "<+=30");
      }
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      tl.pause();
    };
  }, []);

  return (
    <section id="experience" className="section-padding bg-card" ref={timelineRef}>
      <div className="container-narrow">
        <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4 opacity-0 animate-fade-in">
          <span className="text-primary">Experience</span>
        </h2>
        <p
          className="text-muted-foreground mb-12 max-w-2xl opacity-0 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          Where I've been shaping systems and shipping code.
        </p>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 pb-12 last:pb-0" data-experience-item>
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div
                  className="absolute left-[7px] top-3 bottom-0 w-px bg-timeline-line origin-top scale-y-0 opacity-0"
                  data-experience-line
                />
              )}

              {/* Timeline dot */}
              <div
                className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-timeline-dot border-4 border-background transition-transform duration-300 hover:scale-125 opacity-0"
                data-experience-dot
              />

              <div className="opacity-0 translate-y-4" data-experience-content>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="font-sans text-lg font-semibold text-heading">{exp.role}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">{exp.period}</span>
                </div>

                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex items-start gap-3 text-muted-foreground text-sm">
                      <span className="text-primary mt-1.5 text-xs">-</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
