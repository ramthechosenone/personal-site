"use client";

import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";

type CaseStudy = {
  title: string;
  tech: string;
  problem: string;
  approach: string[];
  outcome: string;
};

const caseStudies: CaseStudy[] = [
  {
    title: "VoterVoice Integration Platform",
    tech: "C#, Azure Functions, iMIS REST API, VoterVoice API",
    problem:
      "Ten association clients needed their iMIS membership data synchronized with VoterVoice, a grassroots advocacy platform. Consultants were fielding manual data requests, and clients had stale contact records — advocacy campaigns were reaching the wrong people or missing members entirely.",
    approach: [
      "Designed a multi-tenant architecture on a single Azure Function App, with tenant configuration in app settings for credential isolation without deployment overhead.",
      "Built bidirectional sync: contacts, addresses, and demographics flowing to VoterVoice nightly via timer-triggered delta queries; advocacy actions and district data flowing back via on-demand HTTP triggers.",
      "Implemented chunking via iMIS IQAs to handle bulk loads of thousands of contacts without API throttling, with detailed request/response logging for operational observability.",
      "Chose a scheduled batch approach (24-hour delta window) over event-driven or CDC — trading latency for dramatic simplicity, which was the right call for advocacy use cases where legislative contacts don't change minute to minute.",
    ],
    outcome:
      "All ten tenants running from a single deployment with nightly delta syncs. Consultants eliminated manual data transfers. One client went from 2,500 to 8,000 synced contacts, significantly improving advocacy campaign participation. Onboarding a new tenant takes under an hour of configuration.",
  },
  {
    title: "BrightSpace LMS Integration",
    tech: "C#, Azure Functions, BrightSpace API, iMIS REST API",
    problem:
      "An association client needed course completions from BrightSpace LMS reflected in iMIS as EXAM and CEU activity records within 15 minutes, so members could track continuing education credits for professional certifications. BrightSpace had no webhook support, and members were experiencing delays of days or missing credits entirely.",
    approach: [
      "Designed a timer-triggered Azure Function with a poll-transform-write pipeline — polling BrightSpace for completions, applying business rules (pass = EXAM + CEU, fail = EXAM only), and writing to iMIS.",
      "Built deduplication by enforcing uniqueness checks on contact ID + course identifier + completion date, handling the edge case where BrightSpace returns the same completion across multiple polling windows.",
      "Implemented chunking via iMIS IQAs to stay within Azure Function execution limits, with a continue-on-error pattern so single record failures don't block entire batches.",
      "Coordinated directly with BrightSpace's technical team, internal consulting, and the client to map the full member journey from course completion to credit visibility.",
    ],
    outcome:
      "System processing hundreds to thousands of records per run within the 15-minute SLA from day one. Zero full-run failures in the first quarter. Member complaints about missing or delayed CEU credits dropped dramatically, and association staff were freed from manual reconciliation.",
  },
  {
    title: "Kiosk Xpress — Event Check-In Product",
    tech: "C#, ASP.NET, iMIS, Kiosk Hardware",
    problem:
      "Association conferences suffered from long attendee check-in lines, creating poor first impressions and requiring significant staffing overhead. The manual badge-printing and registration verification process was slow and error-prone.",
    approach: [
      "Led end-to-end delivery: scoping, architecture, development, testing, and deployment across multiple client events.",
      "Built a self-service kiosk system integrated with iMIS registration data, enabling attendees to check in and print badges without staff assistance.",
      "Designed for reliability in event environments — handling intermittent connectivity, printer failures, and high-volume bursts during peak registration windows.",
    ],
    outcome:
      "Cut attendee check-in times by 70% and generated cost savings of $20K–$30K per event by reducing staffing needs. Became a flagship product offered across association conference clients.",
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CaseStudies() {
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
          Case Studies
        </motion.h1>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {caseStudies.map((study, i) => (
            <motion.section
              key={i}
              variants={fadeUp}
              className="border border-border bg-elevated p-6 space-y-4"
            >
              <div>
                <h2 className="text-lg font-medium text-text-primary">
                  {study.title}
                </h2>
                <p className="text-text-subtle text-xs mt-1">{study.tech}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-text-primary mb-1">
                  Problem
                </h3>
                <p className="text-text-subtle text-sm leading-relaxed">
                  {study.problem}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-text-primary mb-1">
                  Approach
                </h3>
                <ul className="space-y-2">
                  {study.approach.map((point, j) => (
                    <li
                      key={j}
                      className="text-text-subtle text-sm leading-relaxed pl-4 border-l-2 border-border"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-text-primary mb-1">
                  Outcome
                </h3>
                <p className="text-text-subtle text-sm leading-relaxed">
                  {study.outcome}
                </p>
              </div>
            </motion.section>
          ))}
        </motion.div>
      </div>
    </SiteShell>
  );
}
