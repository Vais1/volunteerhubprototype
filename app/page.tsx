"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Waves from "@/components/Waves";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  Layers,
  AlertTriangle,
  Lightbulb,
  Target,
  GitBranch,
  Calendar,
  Users,
  ShieldAlert,
  Check,
  X,
  DollarSign,
  Clock,
  User,
  ChevronUp,
  ChevronDown,
  Menu,
  Building2,
  CalendarDays,
  FileText,
  Database,
  BarChart3,
  Smartphone,
  Bot,
  CreditCard,
  AlertCircle,
  TrendingUp,
  Maximize2,
  Minimize2,
} from "lucide-react";

// Slide data
const slides = [
  {
    id: 1,
    title: "Project Overview",
    icon: Layers,
    content: "overview",
  },
  {
    id: 2,
    title: "Problem & Solution",
    icon: Lightbulb,
    content: "problem-solution",
  },
  {
    id: 3,
    title: "Scope Definition",
    icon: Target,
    content: "scope",
  },
  {
    id: 4,
    title: "Work Breakdown",
    icon: GitBranch,
    content: "wbs",
  },
  {
    id: 5,
    title: "Project Schedule",
    icon: Calendar,
    content: "schedule",
  },
  {
    id: 6,
    title: "Project Team",
    icon: Users,
    content: "team",
  },
  {
    id: 7,
    title: "Risk Management",
    icon: ShieldAlert,
    content: "risk",
  },
];

const teamMembers = [
  {
    name: "Aaryan Emir",
    role: "Project Manager",
    initials: "AE",
    avatar: "/avatars/aaryan.jpeg",
    responsibilities: "Overall coordination, stakeholder management",
  },
  {
    name: "Awais Ghaffar",
    role: "Business Analyst",
    initials: "AG",
    avatar: "/avatars/awais.png",
    responsibilities: "Requirements, documentation, UI/UX",
  },
  {
    name: "Kelvin Kan",
    role: "Lead Developer",
    initials: "KK",
    avatar: "/avatars/kevin.jpeg",
    responsibilities: "Architecture, backend development",
  },
  {
    name: "Martin Tan",
    role: "Developer",
    initials: "MT",
    avatar: "/avatars/martin.jpeg",
    responsibilities: "Frontend, testing, support",
  },
  {
    name: "Daniel Lee",
    role: "Business Sponsor",
    initials: "DL",
    avatar: "/avatars/daniel.png",
    responsibilities: "Executive oversight, funding, strategic alignment",
  },
];

const wbsPhases = [
  { phase: "1.0", name: "Initiation", tasks: "Charter approval, stakeholder alignment" },
  { phase: "2.0", name: "Planning & Design", tasks: "WBS, schedule, solution design, risk plan" },
  { phase: "3.0", name: "Execution", tasks: "Development, integration, data preparation" },
  { phase: "4.0", name: "Test & Launch", tasks: "UAT, training, go-live, handover" },
];

const risks = [
  {
    id: 1,
    risk: "Scope Creep",
    probability: "High",
    impact: "High",
    mitigation: "Formal change control process with 48-hour sign-off windows",
    color: "bg-rose-50 border-rose-200 text-rose-800",
  },
  {
    id: 2,
    risk: "Technical Complexity",
    probability: "Medium",
    impact: "High",
    mitigation: "Proof of concept for critical components, regular technical reviews",
    color: "bg-amber-50 border-amber-200 text-amber-800",
  },
  {
    id: 3,
    risk: "Resource Availability",
    probability: "Medium",
    impact: "Medium",
    mitigation: "Cross-training team members, documented knowledge base",
    color: "bg-brand-cream border-brand-muted/30 text-brand-navy",
  },
];

// Reusable ChartImage component with lightbox
function ChartImage({
  src,
  alt,
  fallbackIcon,
  fallbackText,
  fallbackPath,
  aspectRatio = "aspect-[16/9]",
}: {
  src: string;
  alt: string;
  fallbackIcon: React.ReactNode;
  fallbackText: string;
  fallbackPath: string;
  aspectRatio?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div
        className={`${aspectRatio} bg-white rounded-lg flex items-center justify-center border border-brand-muted/20 overflow-hidden relative group cursor-pointer`}
        onClick={() => !imageError && setIsOpen(true)}
      >
        {!imageError ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-full max-w-full object-contain"
              onError={() => setImageError(true)}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-brand-navy" />
                <span className="text-sm text-brand-navy font-medium">Click to preview</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center p-6">
            {fallbackIcon}
            <p className="text-brand-muted text-sm">{fallbackText}</p>
            <p className="text-xs text-brand-muted/70 mt-1">Place at {fallbackPath}</p>
          </div>
        )}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={[{ src }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}

function Counter({ from, to, duration = 2, prefix = "", suffix = "" }: { from: number; to: number; duration?: number; prefix?: string; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        const formatted = Math.round(value).toLocaleString();
        node.textContent = `${prefix}${formatted}${suffix}`;
      },
      ease: "easeOut"
    });

    return () => controls.stop();
  }, [from, to, duration, prefix, suffix]);

  return <span ref={nodeRef} />;
}

// Slide content components
function OverviewSlide() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <Badge className="bg-brand-cream-dark text-brand-navy border-brand-muted/30 hover:bg-brand-cream-dark">
          Centralized Volunteer Management System
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">
          VolunteerHub
        </h2>
        <p className="text-brand-muted text-base max-w-lg mx-auto">
          A web-based platform to streamline volunteer registration, scheduling, and reporting for organizations
        </p>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-brand-cream p-5 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-brand-muted" />
            <span className="text-xs font-medium text-brand-muted uppercase tracking-wide">Budget</span>
          </div>
          <p className="text-xl font-semibold text-brand-dark">
            <Counter from={0} to={120000} prefix="RM " />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-brand-cream p-5 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="w-4 h-4 text-brand-muted" />
            <span className="text-xs font-medium text-brand-muted uppercase tracking-wide">Duration</span>
          </div>
          <p className="text-xl font-semibold text-brand-dark">
            <Counter from={0} to={6} suffix=" Months" />
          </p>
          <p className="text-xs text-brand-muted mt-1">Jun – Dec 2025</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-brand-cream p-5 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-brand-muted" />
            <span className="text-xs font-medium text-brand-muted uppercase tracking-wide">Sponsor</span>
          </div>
          <p className="text-xl font-semibold text-brand-dark">Daniel Lee</p>
          <p className="text-xs text-brand-muted mt-1">Business Sponsor</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-brand-cream p-5 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-brand-muted" />
            <span className="text-xs font-medium text-brand-muted uppercase tracking-wide">Deadline</span>
          </div>
          <p className="text-xl font-semibold text-brand-dark">Dec 3, 2025</p>
          <p className="text-xs text-brand-muted mt-1">Final delivery</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-brand-dark text-white p-5 rounded-xl mt-4 shadow-lg"
      >
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Project Objective
        </h4>
        <p className="text-brand-muted text-sm leading-relaxed">
          Develop and deploy a comprehensive volunteer management system that centralizes 
          volunteer data, automates registration processes, and provides real-time reporting 
          capabilities to reduce administrative overhead by 30%.
        </p>
      </motion.div>
    </div>
  );
}

function ProblemSolutionSlide() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-brand-dark">The Challenge & Our Solution</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-rose-50 p-5 rounded-lg border border-rose-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-rose-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="text-lg font-semibold text-rose-800">Current Problems</h3>
          </div>
          <ul className="space-y-3">
            {[
              "Fragmented data across multiple spreadsheets",
              "Manual registration process prone to errors",
              "No centralized communication channel",
              "Limited reporting and analytics capabilities",
              "40% of admin time spent on data entry",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="flex items-start gap-2 text-sm text-rose-700"
              >
                <X className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-teal-50 p-5 rounded-lg border border-teal-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Lightbulb className="w-5 h-5 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-teal-800">Our Solution</h3>
          </div>
          <ul className="space-y-3">
            {[
              "Unified database for all volunteer information",
              "Self-service online registration portal",
              "Automated email notifications & reminders",
              "Real-time dashboard with analytics",
              "30% projected efficiency improvement",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-start gap-2 text-sm text-teal-700"
              >
                <Check className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-brand-cream p-4 rounded-lg border border-brand-muted/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <span className="font-medium text-brand-navy">Expected Impact</span>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <p className="font-bold text-teal-600 text-lg">30%</p>
              <p className="text-brand-muted text-xs">Time Saved</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-teal-600 text-lg">100%</p>
              <p className="text-brand-muted text-xs">Data Centralized</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-teal-600 text-lg">24/7</p>
              <p className="text-brand-muted text-xs">Registration Access</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ScopeSlide() {
  const inScope = [
    { icon: FileText, title: "Admin Dashboard", desc: "Volunteer management, event scheduling, approvals" },
    { icon: Users, title: "Volunteer Portal", desc: "Self-registration, profile management, history" },
    { icon: BarChart3, title: "Reporting Module", desc: "Analytics, exports, custom reports" },
    { icon: Database, title: "Central Database", desc: "Secure storage, data backup, audit trails" },
  ];

  const outOfScope = [
    { icon: Smartphone, title: "Mobile Applications", desc: "Native iOS/Android apps" },
    { icon: Bot, title: "AI-Powered Matching", desc: "ML-based volunteer-event matching" },
    { icon: CreditCard, title: "Payment Processing", desc: "Donation or payment handling" },
  ];

  return (
    <div className="space-y-5">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-brand-dark">Project Scope</h2>
        <p className="text-brand-muted text-sm mt-1">Clear boundaries for successful delivery</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-teal-50 p-5 rounded-lg border border-teal-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-teal-500 rounded">
              <Check className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-teal-800">In Scope</h3>
          </div>
          <div className="space-y-3">
            {inScope.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                className="flex items-start gap-3 bg-white p-3 rounded-lg border border-teal-100"
              >
                <item.icon className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-brand-dark text-sm">{item.title}</p>
                  <p className="text-xs text-brand-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-brand-cream p-5 rounded-lg border border-brand-muted/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-brand-muted rounded">
              <X className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-brand-navy">Out of Scope</h3>
          </div>
          <div className="space-y-3">
            {outOfScope.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                className="flex items-start gap-3 bg-white p-3 rounded-lg border border-brand-muted/20"
              >
                <item.icon className="w-5 h-5 text-brand-muted mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-brand-navy text-sm">{item.title}</p>
                  <p className="text-xs text-brand-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-brand-muted mt-4 italic">
            * May be considered for future phases
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function WBSSlide() {
  return (
    <div className="space-y-5">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-brand-dark">Work Breakdown Structure</h2>
        <p className="text-brand-muted text-sm mt-1">7-Phase delivery approach</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {wbsPhases.map((phase, index) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white p-4 rounded-lg border border-brand-muted/20 hover:border-brand-muted/50 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-white bg-brand-dark px-2 py-1 rounded">
                {phase.phase}
              </span>
              <h4 className="font-semibold text-brand-dark text-sm">{phase.name}</h4>
            </div>
            <p className="text-xs text-brand-muted">{phase.tasks}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-brand-cream p-4 rounded-lg border border-brand-muted/30 mt-4"
      >
        <ChartImage
          src="/charts/wbs.png"
          alt="WBS Tree Diagram"
          fallbackIcon={<GitBranch className="w-10 h-10 mx-auto text-brand-muted mb-2" />}
          fallbackText="WBS Diagram"
          fallbackPath="/public/charts/wbs.png"
          aspectRatio="aspect-[16/7]"
        />
        <p className="text-center text-xs text-brand-muted mt-2 italic">
          Figure 1: Work Breakdown Structure Hierarchy
        </p>
      </motion.div>
    </div>
  );
}

function ScheduleSlide() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const milestones = [
    { date: "Jun 2025", milestone: "Project Kickoff", status: "complete" },
    { date: "Jul 2025", milestone: "Requirements Finalized", status: "complete" },
    { date: "Aug 2025", milestone: "Design Approval", status: "current" },
    { date: "Sep 2025", milestone: "Development Complete", status: "upcoming" },
    { date: "Nov 2025", milestone: "UAT Complete", status: "upcoming" },
    { date: "Dec 2025", milestone: "Go-Live", status: "upcoming" },
  ];

  return (
    <div className="space-y-5">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-brand-dark">Project Schedule</h2>
        <p className="text-brand-muted text-sm mt-1">June 2025 – December 2025</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {milestones.map((item, index) => (
          <motion.div
            key={item.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: hoveredIndex === index ? 1.05 : 1,
              boxShadow: hoveredIndex === index ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none"
            }}
            transition={{ delay: 0.1 + index * 0.05 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`p-3 rounded-lg border text-center cursor-pointer relative transition-colors ${
              item.status === "complete"
                ? "bg-teal-50 border-teal-200"
                : item.status === "current"
                ? "bg-brand-navy/10 border-brand-navy ring-2 ring-brand-navy/20"
                : "bg-brand-cream border-brand-muted/30"
            }`}
          >
            <p className={`text-xs font-medium ${
              item.status === "complete" ? "text-teal-600" :
              item.status === "current" ? "text-brand-navy" : "text-brand-muted"
            }`}>
              {item.date}
            </p>
            <p className={`text-xs mt-1 ${
              item.status === "complete" ? "text-teal-700" :
              item.status === "current" ? "text-brand-dark font-medium" : "text-brand-navy"
            }`}>
              {item.milestone}
            </p>
            {item.status === "complete" && (
              <Check className="w-4 h-4 text-teal-500 mx-auto mt-1" />
            )}
            {item.status === "current" && (
              <div className="w-2 h-2 bg-brand-navy rounded-full mx-auto mt-2 animate-pulse" />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-brand-cream p-4 rounded-lg border border-brand-muted/30"
      >
        <ChartImage
          src="/charts/gantt.png"
          alt="Project Gantt Chart"
          fallbackIcon={<Calendar className="w-10 h-10 mx-auto text-brand-muted mb-2" />}
          fallbackText="Gantt Chart"
          fallbackPath="/public/charts/gantt.png"
          aspectRatio="aspect-[16/6]"
        />
        <p className="text-center text-xs text-brand-muted mt-2 italic">
          Figure 2: Project Timeline with Critical Path
        </p>
      </motion.div>
    </div>
  );
}

function TeamSlide() {
  return (
    <div className="space-y-5">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-brand-dark">Project Team</h2>
        <p className="text-brand-muted text-sm mt-1">Dedicated professionals delivering VolunteerHub</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08 }}
            className="flex items-start gap-4 p-4 rounded-lg bg-white border border-brand-muted/20 hover:border-brand-muted/50 hover:shadow-sm transition-all"
          >
            <Avatar className="w-12 h-12 shrink-0">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-brand-dark text-white font-semibold text-sm">
                {member.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-brand-dark">{member.name}</h4>
              <Badge variant="secondary" className="mt-1 text-xs bg-brand-cream-dark text-brand-navy hover:bg-brand-cream-dark">
                {member.role}
              </Badge>
              <p className="text-xs text-brand-muted mt-2">{member.responsibilities}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-brand-cream p-4 rounded-lg border border-brand-muted/30"
      >
        <h4 className="font-semibold text-brand-navy mb-3 text-sm">Key Stakeholders</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="text-center p-3 bg-white rounded border border-brand-muted/20">
            <p className="font-medium text-brand-navy">Daniel Lee</p>
            <p className="text-xs text-brand-muted">Business Sponsor</p>
          </div>
          <div className="text-center p-3 bg-white rounded border border-brand-muted/20">
            <p className="font-medium text-brand-navy">IT Department</p>
            <p className="text-xs text-brand-muted">Infrastructure</p>
          </div>
          <div className="text-center p-3 bg-white rounded border border-brand-muted/20">
            <p className="font-medium text-brand-navy">Volunteer Coordinators</p>
            <p className="text-xs text-brand-muted">End Users</p>
          </div>
          <div className="text-center p-3 bg-white rounded border border-brand-muted/20">
            <p className="font-medium text-brand-navy">Volunteers</p>
            <p className="text-xs text-brand-muted">Portal Users</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function RiskSlide() {
  return (
    <div className="space-y-5">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-brand-dark">Risk Management</h2>
        <p className="text-brand-muted text-sm mt-1">Identified risks and mitigation strategies</p>
      </div>

      <div className="space-y-3">
        {risks.map((risk, index) => (
          <motion.div
            key={risk.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`p-4 rounded-lg border ${risk.color}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold">{risk.risk}</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs border-current">
                        P: {risk.probability}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-current">
                        I: {risk.impact}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm mt-2 opacity-90">
                    <span className="font-medium">Mitigation:</span> {risk.mitigation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-brand-dark text-white p-4 rounded-lg"
      >
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          Risk Response Strategy
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="bg-brand-navy/50 p-3 rounded">
            <p className="font-medium text-brand-cream">Weekly Risk Reviews</p>
            <p className="text-brand-muted text-xs mt-1">Regular assessment in team meetings</p>
          </div>
          <div className="bg-brand-navy/50 p-3 rounded">
            <p className="font-medium text-brand-cream">Contingency Reserve</p>
            <p className="text-brand-muted text-xs mt-1">10% budget buffer for unknowns</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Main component
export default function PitchDeck() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const changeSlide = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= slides.length) return;
    setDirection(newIndex > activeSlide ? 1 : -1);
    setActiveSlide(newIndex);
  }, [activeSlide]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        changeSlide(activeSlide - 1);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        changeSlide(activeSlide + 1);
      }
    },
    [activeSlide, changeSlide]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const renderSlideContent = () => {
    const currentSlide = slides[activeSlide];
    switch (currentSlide.content) {
      case "overview":
        return <OverviewSlide />;
      case "problem-solution":
        return <ProblemSolutionSlide />;
      case "scope":
        return <ScopeSlide />;
      case "wbs":
        return <WBSSlide />;
      case "schedule":
        return <ScheduleSlide />;
      case "team":
        return <TeamSlide />;
      case "risk":
        return <RiskSlide />;
      default:
        return <OverviewSlide />;
    }
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div ref={containerRef} className="h-screen w-full bg-brand-cream overflow-hidden relative">
      {/* Waves Background */}
      <Waves
        lineColor="rgba(57, 72, 103, 0.2)"
        backgroundColor="transparent"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        xGap={12}
        yGap={36}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        className="z-0"
      />
      <div className="h-full max-w-7xl mx-auto flex flex-col lg:flex-row p-2 lg:p-4 gap-3 relative z-10">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
          <h1 className="text-lg font-bold text-brand-dark">
            VolunteerHub
          </h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="h-8 w-8"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-8 w-8"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Timeline Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="flex gap-2 overflow-x-auto pb-2 px-1 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                {slides.map((slide, index) => {
                  const Icon = slide.icon;
                  const isActive = index === activeSlide;
                  return (
                    <Button
                      key={slide.id}
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`shrink-0 ${isActive ? "bg-brand-dark" : ""}`}
                      onClick={() => {
                        changeSlide(index);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon className="w-4 h-4 mr-1" />
                      {slide.title}
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Timeline Sidebar */}
        <div className="hidden lg:flex flex-col items-center w-56 shrink-0 bg-white/80 backdrop-blur-sm rounded-xl p-3">
          <div className="relative flex flex-col items-center py-4 h-full justify-center">
            {/* Vertical line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-brand-muted/30" />

            {/* Timeline nodes */}
            {slides.map((slide, index) => {
              const Icon = slide.icon;
              const isActive = index === activeSlide;
              const isPast = index < activeSlide;

              return (
                <motion.button
                  key={slide.id}
                  onClick={() => changeSlide(index)}
                  className="relative z-10 flex items-center gap-3 my-2 group w-full"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Node circle */}
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      border-2 transition-all duration-200
                      ${
                        isActive
                          ? "bg-brand-dark border-brand-dark shadow-md"
                          : isPast
                          ? "bg-brand-cream-dark border-brand-muted"
                          : "bg-white border-brand-muted group-hover:border-brand-navy"
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-white"
                          : isPast
                          ? "text-brand-navy"
                          : "text-brand-muted group-hover:text-brand-navy"
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`
                      text-sm font-medium text-left
                      transition-colors duration-200
                      ${
                        isActive
                          ? "text-brand-dark"
                          : isPast
                          ? "text-brand-navy"
                          : "text-brand-muted group-hover:text-brand-navy"
                      }
                    `}
                  >
                    {slide.title}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Navigation hint */}
          <div className="mt-auto flex items-center gap-1 text-xs text-brand-muted">
            <kbd className="px-1.5 py-0.5 bg-brand-cream rounded text-brand-navy">
              ↑
            </kbd>
            <kbd className="px-1.5 py-0.5 bg-brand-cream rounded text-brand-navy">
              ↓
            </kbd>
            <span className="ml-1">navigate</span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="flex-1 flex flex-col min-h-0">
          <Card className="flex-1 overflow-hidden shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="border-b border-brand-cream-dark/50 bg-brand-cream/80 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-dark rounded-lg">
                    {(() => {
                      const Icon = slides[activeSlide].icon;
                      return <Icon className="w-4 h-4 text-white" />;
                    })()}
                  </div>
                  <div>
                    <CardTitle className="text-lg text-brand-dark">
                      {slides[activeSlide].title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {activeSlide + 1} of {slides.length}
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hidden lg:flex"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => changeSlide(activeSlide - 1)}
                    disabled={activeSlide === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => changeSlide(activeSlide + 1)}
                    disabled={activeSlide === slides.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-auto p-5 lg:p-6">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeSlide}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="h-full"
                >
                  {renderSlideContent()}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Progress indicator */}
          <div className="mt-2 flex justify-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 mx-auto w-fit">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className={`
                  h-1.5 rounded-full transition-all duration-200
                  ${
                    index === activeSlide
                      ? "w-6 bg-brand-dark"
                      : "w-1.5 bg-brand-muted/40 hover:bg-brand-muted"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
