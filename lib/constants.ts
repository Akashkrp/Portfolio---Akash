// Portfolio data constants

export const PERSONAL_INFO = {
  name: "Akash Kumar Prasad",
  shortName: "AKP",
  title: "Full Stack Developer",
  subtitle: "Building scalable web applications & solving complex algorithmic problems",
  bio: "Pre-final year ECE student at MNNIT Allahabad (2023-2027) with a passion for MERN stack development and Data Structures & Algorithms. I thrive on building innovative solutions and tackling challenging problems.",
  email: "akashkumarprasad9335@gmail.com",
  phone: "+91-7667841789",
  location: "MNNIT Allahabad",
  resumeUrl: "https://drive.google.com/file/d/1ufswY8wL7sTO9OTZzBbNYA8Q2BA-P7I9/view?usp=sharing",
  github: "https://github.com/Akashkrp",
  linkedin: "https://www.linkedin.com/in/akash-kumar-prasad-519638283/",
};

export const TYPING_ROLES = [
  "Full Stack Developer",
  "Competitive Programmer",
  "Problem Solver",
  "MERN Stack Enthusiast",
];

export const EDUCATION = {
  institution: "Motilal Nehru National Institute of Technology, Allahabad",
  degree: "Bachelor of Technology in Electronics and Communication Engineering",
  duration: "2023 - 2027",
};

export const SKILLS = {
  "Languages": ["C++", "C", "JavaScript"],
  "Web Technologies": ["React.js", "Node.js", "Express.js", "HTML", "CSS"],
  "Databases": ["MongoDB", "MySQL"],
  "Tools": ["Git", "GitHub", "Postman", "VS Code"],
  "Core": ["DSA", "OOP", "DBMS", "OS"],
};

export const PROJECTS = [
  {
    id: 1,
    title: "Clinico",
    description: "Secure digital healthcare platform with real-time appointment booking and payment processing",
    tech: ["Node.js", "Express", "MongoDB", "React", "Stripe", "Razorpay"],
    features: [
      "Idempotent payment APIs ensuring zero duplicate transactions",
      "JWT-based role authentication (doctor/patient/admin)",
      "Indexed MongoDB queries achieving 40% faster response times",
      "Secure transaction handling with fraud checks and backend recovery"
    ],
    github: "https://github.com/satyamgitsat2944/Clinico",
    demo: "https://github.com/satyamgitsat2944/Clinico",
    date: "February 2025"
  },
  {
    id: 2,
    title: "Medidose",
    description: "AI-driven medication adherence platform with intelligent risk analysis",
    tech: ["MERN", "Groq SDK", "Node-cron", "Twilio", "WhatsApp API"],
    features: [
      "AI-powered risk analysis using Groq SDK for accurate predictions",
      "Fault-tolerant schedulers with node-cron for reliable timers",
      "Multi-channel alerts via SMS and WhatsApp",
      "Automated patient monitoring and adherence tracking"
    ],
    github: "https://github.com/Akashkrp/MediDose",
    demo: "https://www.youtube.com/watch?v=QyM6PM0NbXg",
    date: "October 2025"
  },
  {
    id: 3,
    title: "Hirebotix",
    description: "Scalable recruitment management platform for employers and job seekers",
    tech: ["MERN", "Cloudinary", "Redux Toolkit", "Nodemailer"],
    features: [
      "Profile management with Cloudinary integration",
      "Redux Toolkit reducing redundant API calls by 25%",
      "Real-time job application tracking",
      "Clean, accessible UI with optimized REST APIs"
    ],
    github: "https://github.com/Akashkrp/HIREBOTIX",
    demo: "https://hirebotix-frontend.onrender.com/",
    date: "November 2024"
  }
];

export const CODING_PROFILES = [
  {
    platform: "LeetCode",
    username: "Akp_23",
    tier: "Knight",
    rating: 1887,
    problemsSolved: "700+",
    url: "https://leetcode.com/u/Akp_23/",
    color: "neon-cyan",
    icon: "Trophy"
  },
  {
    platform: "Codeforces",
    username: "Akash_krp",
    tier: "Pupil",
    rating: 1390,
    problemsSolved: "300+",
    url: "https://codeforces.com/profile/Akash_krp",
    color: "electric-purple",
    icon: "Award"
  }
];

export const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Flipkart Grid 7.0",
    description: "Qualified for Round 2, placing in the top 10% out of 1.6 lakh+ participants",
    date: "July 2025",
    icon: "Star"
  },
  {
    id: 2,
    title: "LeetCode Biweekly Contest",
    description: "Achieved Global Rank 705 out of 31,000+ participants",
    date: "July 2024",
    icon: "Medal"
  },
  {
    id: 3,
    title: "Advitiya Hackathon (IIT Ropar)",
    description: "Secured 4th position out of 130+ teams as finalist",
    date: "February 2025",
    icon: "Trophy"
  },
  {
    id: 4,
    title: "Smart India Hackathon",
    description: "Pre-finalist among top 3 teams in internal hackathon",
    date: "September 2025",
    icon: "Award"
  }
];

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];
