"use client";

import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";

const roles = [
  {
    title: "Software Engineer",
    org: "Association & Non-Profit Sector",
    period: "2015 – Present · 10 years",
    summary:
      "Backend engineer building production-grade systems for non-profits and associations using C#/.NET and Azure. End-to-end ownership across architecture, CI/CD, and audit-ready financial workflows.",
    highlights: [
      {
        area: "Distributed Systems & Integration",
        bullets: [
          "Architected distributed integration services processing 100K+ daily transactions using ASP.NET Core, Azure Functions, and Node.js, decoupling workflows and cutting latency by 40%.",
          "Designed a high-throughput iMIS registrant API in .NET 8 with canonical record handling, reducing import failures and eliminating manual data cleanup efforts.",
        ],
      },
      {
        area: "Engineering Leadership & DevOps",
        bullets: [
          "Led end-to-end delivery of \"Kiosk Xpress,\" a flagship event check-in product for association conferences that cut attendee wait times by 70% and generated cost savings of $20K–$30K per event.",
          "Spearheaded CI/CD transformation across multi-client environments, implementing Azure DevOps pipelines that reduced release deployment times by 50%.",
        ],
      },
      {
        area: "Financial Systems & Core Product",
        bullets: [
          "Engineered ACH and installment billing workflows with automated validation and settlement tracking to ensure audit-ready processing.",
          "Optimized recurring billing engines using C# and the Payflow Pro SDK, improving payment reliability and reducing manual reconciliation overhead.",
        ],
      },
    ],
  },
];

const projects = [
  {
    title: "Fantasy Premier League Data Pipeline",
    tech: "Python, Pandas, Matplotlib",
    bullets: [
      "Engineered an end-to-end data ingestion pipeline consuming FPL APIs to filter active players and clean historical datasets.",
      "Developed ranking algorithms and custom features to automate team selection decisions using Pandas for high-volume data manipulation.",
    ],
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Experience() {
  return (
    <SiteShell>
      <BackButton circular to="/work" />
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-text-primary text-center mb-10"
        >
          Experience
        </motion.h1>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {roles.map((role, i) => (
            <motion.section key={i} variants={fadeUp} className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-text-primary">
                  {role.title}
                </h2>
                <p className="text-text-subtle text-sm">
                  {role.org} &middot; {role.period}
                </p>
                <p className="text-text-subtle text-sm mt-3 leading-relaxed">
                  {role.summary}
                </p>
              </div>

              {role.highlights.map((section, j) => (
                <motion.div key={j} variants={fadeUp}>
                  <h3 className="text-sm font-medium text-text-primary mb-2">
                    {section.area}
                  </h3>
                  <ul className="space-y-2">
                    {section.bullets.map((bullet, k) => (
                      <li
                        key={k}
                        className="text-text-subtle text-sm leading-relaxed pl-4 border-l-2 border-border"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.section>
          ))}

          {/* Side projects */}
          <motion.section variants={fadeUp} className="space-y-6">
            <h2 className="text-lg font-medium text-text-primary">
              Side Projects
            </h2>
            {projects.map((project, i) => (
              <div key={i}>
                <h3 className="text-sm font-medium text-text-primary">
                  {project.title}
                </h3>
                <p className="text-text-subtle text-xs mb-2">{project.tech}</p>
                <ul className="space-y-2">
                  {project.bullets.map((bullet, k) => (
                    <li
                      key={k}
                      className="text-text-subtle text-sm leading-relaxed pl-4 border-l-2 border-border"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.section>
        </motion.div>
      </div>
    </SiteShell>
  );
}
