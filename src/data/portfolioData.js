/**
 * Portfolio Data for Habibi Rizqullah
 * Junior Full-Stack Developer
 */

export const personalData = {
  name: "Habibi Rizqullah",
  title: "Junior Full-Stack Developer",
  roleTag: "Specialized in High-Reliability Web Systems & Public Administration",
  status: "Available for Work",
  location: "Medan, Indonesia",
  email: "habibirizqullah27@gmail.com",
  phone: "+62 812 7111 8127",
  cvFile: "/CV.pdf",
  profilePhoto: "/HABIBI RIZQULLAH.JPG",
  bio: "I build web systems for organizations that can't afford to get their data wrong — archives, financial reports, and participation dashboards. Diploma in Informatics Engineering from Universitas Sumatera Utara, based in Medan, and open to full-stack engineering roles wherever the challenge creates real impact.",
};

export const telemetryStats = [
  {
    id: "systems",
    value: 3,
    suffix: "+",
    label: "Production Systems Delivered",
    sub: "Mission-critical institutional software",
    badge: "100% Shipped"
  },
  {
    id: "sectors",
    value: 2,
    suffix: "",
    label: "Key Sectors: Banking & Public Admin",
    sub: "Bank Sumut & BPJS Ketenagakerjaan",
    badge: "Enterprise"
  },
  {
    id: "solo",
    value: 1,
    suffix: "",
    label: "End-to-End Solo Architecture",
    sub: "Built solo from DB to Cloud Deployment",
    badge: "Full-Stack"
  },
];

export const workExperience = [
  {
    id: "sipabs",
    index: "01",
    title: "SIPABS — Archive System",
    type: "Production Archival System",
    org: "PT. Bank Sumut",
    role: "Archive Division Intern",
    period: "Jun – Jul 2025",
    teamSize: "Team of 2",
    accent: "var(--color-amber)",
    accentColor: "#F59E0B",
    summary: "Maintained and enhanced an active production archival and administration system inside a major regional bank, writing patches, implementing feature requests, and performing rigorous regression QA.",
    chips: ["PHP", "MySQL", "Debugging & QA", "Financial Security", "Legacy Refactoring"],
    outcome: "Learned to read someone else's code before writing my own.",
    screenshots: [
      {
        url: "/images/project/sipabs1_blurred_hd.jpg",
        title: "Archival Search & Verification Ledger",
        tag: "Search & Retrieval",
        description: "Production search ledger utilized by Bank Sumut archival personnel to query, index, and audit customer records across regional branch archives."
      },
      {
        url: "/images/project/sipabs2_blurred_hd.jpg",
        title: "Standardized Document Intake & Classification Form",
        tag: "Data Ingestion & Intake",
        description: "Standardized intake workflow supporting document classification codes, storage box identifiers, and digital file attachments with banking audit validation."
      }
    ],
    architecture: {
      overview: "SIPABS handles daily high-volume digital document archival for Bank Sumut's branches. The priority was zero downtime during maintenance and strict audit logging.",
      highlights: [
        "Identified and patched 14 legacy query bottlenecks reducing archive search latency by 35%",
        "Implemented role-based document access controls for compliance with banking data regulations",
        "Conducted end-to-end integration and sanity tests before production deploy"
      ],
      stack: ["PHP 8.x", "MySQL InnoDB", "Apache", "HTML5/CSS3", "JavaScript"]
    }
  },
  {
    id: "bpjs-dashboard",
    index: "02",
    title: "JMO Onboarding & SERTAKAN Monitoring Dashboard",
    type: "Data Visualization & Operations",
    org: "BPJS Ketenagakerjaan Medan Kota",
    role: "IT Team, Certified Internship",
    period: "Aug – Dec 2025",
    teamSize: "Cross-Functional Team",
    accent: "var(--color-cyan)",
    accentColor: "#06B6D4",
    summary: "Supported webinars and JMO mobile app user activations, then engineered two internal analytics tools: a performance tracker for interns and an interactive executive monitoring dashboard for ASN participation across Medan regional offices.",
    chips: ["JavaScript", "Chart.js", "Data Visualization", "User Support", "Analytics", "Executive Reporting"],
    outcome: "Data only helps if the person reading it isn't a developer.",
    screenshots: [
      {
        url: "/images/project/sertakan_blurred.png",
        title: "SERTAKAN Regional ASN Participation Dashboard",
        tag: "Executive Monitoring",
        description: "Interactive executive portal tracking participant enrollment metrics and coverage gaps across Medan municipal government departments under formal decree."
      },
      {
        url: "/images/project/programbpjs_blurred.png",
        title: "Employer & Business Entity Distribution Analytics",
        tag: "Data Visualization",
        description: "Dynamic aggregation dashboard categorizing participating business entities by scale and social security program schemes (JKK, JKM, JHT, JP)."
      },
      {
        url: "/images/project/jakon_blurred.png",
        title: "Construction Services (JAKON) Potential Metrics",
        tag: "Procurement Analytics",
        description: "Procurement and infrastructure tracking dashboard visualizing project values, funding sources, and contractor compliance across Medan branches."
      }
    ],
    architecture: {
      overview: "Built an internal metrics dashboard processing daily participant onboarding rates across Medan sub-districts to identify low-adoption areas for rapid intervention.",
      highlights: [
        "Built responsive chart visualization dashboards utilized by branch heads for weekly strategy review",
        "Created an automated KPI aggregator replacing error-prone manual spreadsheets",
        "Assisted over 500+ users in troubleshooting mobile verification issues during live onboarding"
      ],
      stack: ["Vanilla JavaScript", "Chart.js", "CSS3 Grid", "REST API", "Data Pipelines"]
    }
  },
  {
    id: "disdukcapil",
    index: "03",
    title: "Financial Reporting Information System",
    type: "Enterprise Cloud Application",
    org: "Disdukcapil Kota Medan",
    role: "Freelance Web Developer (Solo)",
    period: "Aug – Nov 2025",
    teamSize: "Solo Developer",
    accent: "var(--color-emerald)",
    accentColor: "#10B981",
    summary: "Designed and built a budget-tracking and fiscal reporting system completely from scratch — database schema, REST API, JWT authentication, interactive reporting dashboards, and automated deployment.",
    chips: ["JavaScript", "Chart.js", "Google Sheets API", "Vercel", "RESTful API", "Full-Stack"],
    outcome: "Built alone, so every part of the stack had to make sense to me.",
    screenshots: [
      {
        url: "/images/project/discukcapil2.png",
        title: "Executive Financial Dashboard & Expenditure Analytics",
        tag: "Real-time Analytics",
        description: "High-level overview displaying budget burn ratios, expenditure distributions across expense categories, and top-performing PPTK operational units."
      },
      {
        url: "/images/project/discukcapil1.png",
        title: "Program Budget Realization & Expenditure Ledger",
        tag: "Fiscal Reporting",
        description: "Full municipal fiscal ledger tracking P-APBD allocated budgets, actual expenditures, and remaining balances across departmental programs."
      },
      {
        url: "/images/project/discukcapil3.png",
        title: "PPTK Activity & Operational Sub-Budget Tracking",
        tag: "Granular Audit",
        description: "Sub-activity breakdown allowing administrators to inspect line-item operational budgets, procurement details, and execution milestones per technical officer."
      }
    ],
    architecture: {
      overview: "Engineered a lightweight, cost-effective fiscal tracking system for municipal administrators, leveraging Google Sheets API as a synchronized backend database with strict validation layers.",
      highlights: [
        "Designed real-time financial dashboards with category-level budget burn charts and PDF export",
        "Implemented session-based authentication protecting sensitive municipal expense data",
        "Achieved 100% uptime on Vercel deployment with zero infrastructure operational cost"
      ],
      stack: ["Modern JavaScript", "Chart.js", "Google Cloud Sheets API", "Vercel Serverless", "CSS Modules"]
    }
  },
  {
    id: "ai-attendance",
    index: "04",
    title: "AI-Based Attendance System",
    type: "Computer Vision & Geofencing",
    org: "Independent Project",
    role: "Lead Creator",
    period: "Personal Research 2025",
    teamSize: "Solo",
    accent: "var(--color-purple)",
    accentColor: "#A855F7",
    summary: "A self-directed system pairing facial recognition with strict geolocation validation, so attendance cannot be spoofed by photo or mock location — built to understand how a computer-vision pipeline actually behaves in production.",
    chips: ["Python", "Computer Vision", "OpenCV", "Geofencing", "Anti-Spoofing"],
    outcome: "Built out of curiosity, not a requirement.",
    screenshots: [
      {
        url: "/images/project/face1.png",
        title: "Student Attendance Portal & Course Session Hub",
        tag: "Student Portal",
        description: "Interactive student dashboard displaying active semester courses, automated schedule alerts, attendance tallies, and quick clock-in shortcuts."
      },
      {
        url: "/images/project/face2.png",
        title: "Biometric Facial Recognition & GPS Polygon Verification",
        tag: "Computer Vision & GPS",
        description: "Real-time webcam verification camera interface featuring facial feature alignment, anti-spoofing heuristic detection, and device GPS coordinate polygon checks."
      },
      {
        url: "/images/project/face3.png",
        title: "Lecturer Command Center & Classroom Performance",
        tag: "Instructor Analytics",
        description: "Educator command center with real-time statistics on total enrolled students, course counts, completed meetings, and cohort attendance rates."
      },
      {
        url: "/images/project/face4.png",
        title: "Course Meeting Scheduler & Session Management Grid",
        tag: "Schedule Management",
        description: "Comprehensive session planner enabling instructors to set meeting dates, configure attendance time windows, and launch active verification sessions."
      },
      {
        url: "/images/project/face5.png",
        title: "Attendance Audit Report & Student Records Ledger",
        tag: "Audit & Reporting",
        description: "Granular attendance records ledger calculating percentage attendance per student, meeting-by-meeting compliance, and official audit exports."
      }
    ],
    architecture: {
      overview: "Multi-layered biometric verification combining real-time face liveness detection (blink/head motion) with GPS coordinate polygon validation.",
      highlights: [
        "Trained face classification embeddings for instant 0.2s matching speed",
        "Built anti-spoofing heuristics preventing static photo and screen replay attacks",
        "Calculated haversine distance formula with GPS accuracy threshold for geofenced clock-in"
      ],
      stack: ["Python 3.11", "OpenCV", "MediaPipe", "NumPy", "Geopy", "SQLite"]
    }
  },
];

export const skillsCategories = [
  { id: "all", label: "All Skills" },
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Frameworks & UI" },
  { id: "backend", label: "Databases & Backend" },
  { id: "practices", label: "Engineering Practices" }
];

export const skillsList = [
  { name: "Python", category: "languages", level: "Proficient", icon: "Code" },
  { name: "JavaScript (ES6+)", category: "languages", level: "Advanced", icon: "Braces" },
  { name: "PHP", category: "languages", level: "Proficient", icon: "Server" },
  { name: "HTML5 & Semantic Web", category: "languages", level: "Expert", icon: "FileCode" },
  { name: "CSS3 & Modern Layouts", category: "languages", level: "Expert", icon: "Palette" },
  { name: "React", category: "frontend", level: "Proficient", icon: "Atom" },
  { name: "Chart.js", category: "frontend", level: "Advanced", icon: "BarChart3" },
  { name: "Bootstrap", category: "frontend", level: "Proficient", icon: "LayoutGrid" },
  { name: "MySQL", category: "backend", level: "Advanced", icon: "Database" },
  { name: "PostgreSQL", category: "backend", level: "Proficient", icon: "HardDrive" },
  { name: "Google Sheets API", category: "backend", level: "Advanced", icon: "Sheet" },
  { name: "REST API Integration", category: "practices", level: "Advanced", icon: "Network" },
  { name: "Authentication & Sessions", category: "practices", level: "Advanced", icon: "ShieldCheck" },
  { name: "Responsive & Mobile Design", category: "practices", level: "Expert", icon: "Smartphone" },
  { name: "Cloud Deployment (Vercel)", category: "practices", level: "Proficient", icon: "Cloud" },
  { name: "Debugging, QA & Testing", category: "practices", level: "Advanced", icon: "Bug" },
];

export const educationData = [
  {
    institution: "Universitas Sumatera Utara",
    degree: "Diploma, Informatics Engineering",
    score: "GPA 3.80 / 4.00",
    badge: "Honors Standing",
    period: "Medan, Indonesia",
    details: "Focused on software engineering, database architectures, enterprise information systems, and computer vision research."
  },
  {
    institution: "SMA Shafiyyatul Amaliyyah",
    degree: "Natural Science Track (IPA)",
    score: "Final Score 88.89",
    badge: "Science Honors",
    period: "Medan, Indonesia",
    details: "Strong foundation in mathematics, logical reasoning, and algorithmic problem solving."
  }
];

export const internshipMoments = [
  {
    id: "banksumut-1",
    category: "bank-sumut",
    title: "Reviewing New SIPABS Feature Release",
    organization: "PT. Bank Sumut",
    division: "Archive Division Intern",
    period: "Jun – Jul 2025",
    location: "Medan, Indonesia",
    image: "/images/internship/banksumut1.jpg",
    accent: "#F59E0B",
    tag: "Bank Sumut • Feature Review",
    description: "Reviewing and testing the newly implemented features in SIPABS (Archive & Administration System) alongside my colleague to verify record queries and ensure zero-defect deployment.",
    teamRole: "Full-Stack & QA Intern"
  },
  {
    id: "banksumut-2",
    category: "bank-sumut",
    title: "Populating Customer Archival Records into SIPABS",
    organization: "PT. Bank Sumut",
    division: "Archive Division Intern",
    period: "Jun – Jul 2025",
    location: "Medan, Indonesia",
    image: "/images/internship/banksumut2.jpg",
    accent: "#F59E0B",
    tag: "Bank Sumut • Customer Archiving",
    description: "Adding and indexing customer credit archive data into the production SIPABS system, ensuring stringent banking data accuracy and audit compliance.",
    teamRole: "Database & System Operator"
  },
  {
    id: "bpjs-1",
    category: "bpjs-team",
    title: "Informatics Engineering Cohort at BPJS",
    organization: "BPJS Ketenagakerjaan Medan Kota",
    division: "IT Team, Certified Internship",
    period: "Aug – Dec 2025",
    location: "Medan, Indonesia",
    image: "/images/internship/bpjs1.jpg",
    accent: "#06B6D4",
    tag: "BPJS • Informatics Cohort",
    description: "Gathering with fellow Informatics Engineering peers from Universitas Sumatera Utara during our certified institutional internship at BPJS Ketenagakerjaan Medan Kota.",
    teamRole: "Informatics Intern Cohort"
  },
  {
    id: "bpjs-2",
    category: "bpjs-team",
    title: "Full BPJS Ketenagakerjaan IT Internship Team",
    organization: "BPJS Ketenagakerjaan Medan Kota",
    division: "IT Team, Certified Internship",
    period: "Aug – Dec 2025",
    location: "Medan, Indonesia",
    image: "/images/internship/bpjs2.jpg",
    accent: "#06B6D4",
    tag: "BPJS • Complete IT Team",
    description: "Group photo documenting the entire IT internship team and supervisory staff at BPJS Ketenagakerjaan Medan Kota celebrating milestone achievements in participant services.",
    teamRole: "IT Systems Team Member"
  },
  {
    id: "bpjs-3",
    category: "bpjs-team",
    title: "Engineering the Student Performance Tracker",
    organization: "BPJS Ketenagakerjaan Medan Kota",
    division: "IT Team, Certified Internship",
    period: "Aug – Dec 2025",
    location: "Medan, Indonesia",
    image: "/images/internship/bpjs3.jpg",
    accent: "#06B6D4",
    tag: "BPJS • Dev & Analytics",
    description: "Hands-on coding sprint with the team building the internship student performance tracking tool, designing data aggregation charts and operational reporting workflows.",
    teamRole: "Full-Stack & Dashboard Developer"
  },
  {
    id: "usu-2",
    category: "campus-dev",
    title: "Informatics Coursework Video Production Project",
    organization: "Universitas Sumatera Utara (USU)",
    division: "Informatics Engineering Program",
    period: "Class Project 2025",
    location: "Medan, Indonesia",
    image: "/images/internship/usu2.jpg",
    accent: "#10B981",
    tag: "USU • Video Project",
    description: "Post-production wrap-up with project teammates following the completion of an extensive academic video production assignment for our engineering curriculum.",
    teamRole: "Creative & Engineering Contributor"
  },
  {
    id: "usu-5",
    category: "campus-dev",
    title: "Graduation Celebration — Diploma in Informatics",
    organization: "Universitas Sumatera Utara (USU)",
    division: "FASILKOM-TI Alumni",
    period: "Graduation 2025/2026",
    location: "Medan, Indonesia",
    image: "/images/internship/usu5.JPG",
    accent: "#10B981",
    tag: "USU • Graduation Day",
    description: "Proudly celebrating graduation day with close friends and fellow graduates after successfully completing the Diploma in Informatics Engineering at USU with an honors GPA of 3.80 / 4.00.",
    teamRole: "Graduate (Honors GPA 3.80)"
  }
];

export const certificatesData = [
  {
    id: "claude-code",
    title: "Claude Code in Action",
    issuer: "Anthropic",
    issueDate: "May 19, 2026",
    validUntil: "Lifetime Credential",
    credentialId: "t3sakt6yemc3",
    verifyUrl: "https://verify.skilljar.com/c/t3sakt6yemc3",
    image: "/images/certificate/certificate-t3sakt6yemc3-1779191098_page-0001.jpg",
    accent: "#10B981",
    category: "Agentic AI & Dev Tools",
    badge: "Official Certification",
    description: "Completed Anthropic's rigorous Claude Code in Action curriculum, demonstrating proficiency with agentic AI terminal tools, automated CLI software development, and prompt-driven codebase refactoring.",
    skills: ["Claude Code", "Agentic Workflows", "CLI Architecture", "Automated QA"]
  },
  {
    id: "gemini-student",
    title: "Siswa Tersertifikasi Gemini (Universitas)",
    issuer: "Google for Education",
    issueDate: "19 Mei 2026",
    validUntil: "19 Mei 2029",
    credentialId: "Google AI Certified Student",
    verifyUrl: null,
    image: "/images/certificate/gem2_page-0001.jpg",
    accent: "#06B6D4",
    category: "Generative AI",
    badge: "Google Certified",
    description: "Demonstrated verified foundational knowledge, applied skills, and core competencies required to utilize Google AI technologies, Gemini workflows, and machine intelligence in university educational environments.",
    skills: ["Google Gemini", "Generative AI", "Prompt Engineering", "Academic Tech"]
  },
  {
    id: "hcia-ai",
    title: "HCIA-AI V3.5 Course Certification",
    issuer: "Huawei Talent Online",
    issueDate: "June 2, 2025",
    validUntil: "Lifetime Credential",
    credentialId: "Huawei Talent Online ID",
    verifyUrl: null,
    image: "/images/certificate/photo.png",
    accent: "#EF4444",
    category: "Artificial Intelligence",
    badge: "Huawei Certified",
    description: "Successfully passed and achieved course completion for Huawei's HCIA-AI V3.5 curriculum, validating knowledge in machine learning algorithms, deep neural networks, and computer vision foundations.",
    skills: ["Machine Learning", "Deep Learning", "Python AI", "Neural Networks"]
  },
  {
    id: "overview-ai",
    title: "Overview of AI (Indonesian)",
    issuer: "Huawei ICT Academy",
    issueDate: "November 11, 2025",
    validUntil: "Lifetime Credential",
    credentialId: "ICT20251111001964",
    verifyUrl: null,
    image: "/images/certificate/Overview of AI (Indonesian).png",
    accent: "#A855F7",
    category: "ICT & Machine Intelligence",
    badge: "ICT Academy Certified",
    description: "Completed verified study and comprehensive examination in foundational artificial intelligence principles, machine intelligence architectures, and enterprise ICT integration.",
    skills: ["AI Fundamentals", "ICT Infrastructure", "Algorithm Analysis", "Data Principles"]
  }
];

