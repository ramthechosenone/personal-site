"use client";

import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";

const roles = [
  {
    title: "Software Engineer",
    org: "enSYNC Corporation",
    location: "Fort Worth, TX",
    period: "Aug 2015 – Present",
    summary:
      "Backend engineer building production-grade systems for non-profits and associations using C#/.NET and Azure. End-to-end ownership across architecture, CI/CD, and audit-ready financial workflows.",
    highlights: [
      {
        area: "Cloud Architecture & System Design",
        bullets: [
          "Architected distributed integration services processing 100K+ daily transactions using ASP.NET Core, Azure Functions, and Node.js, decoupling workflows and cutting latency by 40%.",
          "Designed a high-throughput iMIS registrant API in .NET 8 with canonical record handling, reducing import failures and eliminating manual data cleanup efforts.",
          "Built a multi-tenant VoterVoice integration platform on Azure Functions serving 10+ association clients from a single deployment, with bidirectional data sync handling contacts, addresses, district attribution, and advocacy actions.",
          "Engineered a BrightSpace LMS-to-iMIS integration with timer-triggered polling, processing hundreds to thousands of course completions per run within a 15-minute SLA.",
        ],
      },
      {
        area: "Engineering Leadership & DevOps",
        bullets: [
          "Led end-to-end delivery of \"Kiosk Xpress,\" a flagship event check-in product for association conferences that cut attendee wait times by 70% and generated cost savings of $20K–$30K per event.",
          "Spearheaded CI/CD transformation across multi-client environments, implementing Azure DevOps pipelines that reduced release deployment times by 50%.",
          "Proactively identified and resolved production degradation trends before they became incidents, building trust with leadership through transparent technical communication.",
        ],
      },
      {
        area: "Financial Systems & Core Product",
        bullets: [
          "Engineered ACH and installment billing workflows with automated validation and settlement tracking to ensure audit-ready processing.",
          "Optimized recurring billing engines using C# and the Payflow Pro SDK, improving payment reliability and reducing manual reconciliation overhead.",
        ],
      },
      {
        area: "Data Integration & ETL Pipelines",
        bullets: [
          "Built bidirectional data sync pipelines between webinar platforms and CRM systems, handling contact resolution, deduplication, and automated activity recording with daily batch processing.",
          "Developed configurable import services supporting bulk data ingestion from Excel and third-party APIs, with validation, error reporting, and HTML email summaries via SendGrid.",
          "Designed salary survey data collection pipelines and membership attribute batch update tools processing thousands of records with detailed audit logging.",
        ],
      },
      {
        area: "Certification & Compliance Systems",
        bullets: [
          "Implemented professional certification tracking workflows managing CEU credits, CMO categories, and multi-tier credential maintenance (Basic, Advanced, Emeritus) with hour-based progression rules.",
          "Built course completion synchronization between LMS platforms and membership systems, including certificate number generation, duplicate award prevention, and multi-department support.",
        ],
      },
    ],
  },
];

const education = [
  {
    school: "The University of Texas at Arlington",
    degree: "Masters in Computer Science",
    location: "Arlington, TX",
    period: "Aug 2013 – May 2015",
  },
  {
    school: "Visvesvaraya Technological University",
    degree: "Bachelors in Electronics and Communications",
    location: "Bengaluru, India",
    period: "Aug 2007 – May 2011",
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
    <SiteShell backdrop>
      <BackButton circular to="/work" />
      <div className="page-panel">
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
                  {role.org} &middot; {role.location}
                </p>
                <p className="text-text-subtle text-xs mt-0.5">{role.period}</p>
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

          {/* Education */}
          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-lg font-medium text-text-primary">
              Education
            </h2>
            {education.map((ed, i) => (
              <div key={i}>
                <h3 className="text-sm font-medium text-text-primary">
                  {ed.school}
                </h3>
                <p className="text-text-subtle text-sm">{ed.degree}</p>
                <p className="text-text-subtle text-xs">
                  {ed.location} &middot; {ed.period}
                </p>
              </div>
            ))}
          </motion.section>
        </motion.div>
      </div>
    </SiteShell>
  );
}
