export interface ClassBatch {
  id: string;
  grade: string;
  category: "foundation" | "boards" | "senior";
  title: string;
  badge: string;
  description: string;
  subjects: string[];
  features: string[];
  batchTiming: string;
  batchSize: string;
  curriculum: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  qualification: string;
  experience: string;
  subjects: string[];
  bio: string;
  highlight: string;
}

export interface Testimonial {
  id: string;
  name: string;
  grade: string;
  school: string;
  score: string;
  quote: string;
  parentName?: string;
  year: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const INSTITUTE_DETAILS = {
  name: "Genius Tuition Classes",
  shortName: "Genius Classes",
  tagline: "Better Learning • Brighter Future",
  motto: "Quality education. Personal attention. Real progress.",
  contactPerson: "AKRAM SIR",
  roleTitle: "Founder & Lead Educator",
  phone: "+91 91756 91457",
  phoneRaw: "919175691457",
  whatsappUrl: "https://wa.me/919175691457?text=Hello%20Akram%20Sir%2C%20I%20would%20like%20to%20inquire%20about%20admissions%20at%20Genius%20Tuition%20Classes.",
  address: "Near Koradi Devi Temple Road / Koradi Power Station Colony, Koradi, Nagpur, Maharashtra - 441111",
  landmark: "Koradi, Nagpur, Maharashtra",
  city: "Nagpur, Maharashtra",
  visitingHours: {
    morning: "8:00 AM - 12:30 PM",
    evening: "4:00 PM - 8:30 PM",
    days: "Monday to Saturday (Sunday by Appointment)",
  },
  highlights: [
    {
      title: "Expert Guidance",
      description: "Learn from experienced and dedicated teachers led by Akram Sir.",
      icon: "GraduationCap",
    },
    {
      title: "Small Batches",
      description: "More attention, better results. Limited to 15-20 students per batch.",
      icon: "Users",
    },
    {
      title: "Regular Assessments",
      description: "Track progress and improve faster with weekly mock tests.",
      icon: "TrendingUp",
    },
    {
      title: "Better Results",
      description: "Building strong foundations for your board exams and future.",
      icon: "Award",
    },
  ],
  stats: [
    { label: "Successful Students", value: "850+" },
    { label: "Years of Excellence", value: "10+" },
    { label: "Batch Average Score", value: "88%" },
    { label: "Max Students / Batch", value: "18" },
  ],
};

export const CLASSES_DATA: ClassBatch[] = [
  {
    id: "class-5-8",
    grade: "Class 5th - 8th",
    category: "foundation",
    title: "Middle School Foundation Program",
    badge: "Strong Basics",
    description:
      "Nurturing early interest and deep fundamental clarity in core subjects so students never fear Maths or Science in higher classes.",
    subjects: ["Mathematics", "General Science", "English Grammar", "Social Studies"],
    features: [
      "Concept building from grassroot level",
      "Interactive mental math and problem solving",
      "Regular homework monitoring & daily doubt clear",
      "School syllabus synced with early preparation",
    ],
    batchTiming: "Evening 4:30 PM - 6:30 PM",
    batchSize: "Max 15 Students",
    curriculum: "State Board & CBSE",
  },
  {
    id: "class-9",
    grade: "Class 9th",
    category: "boards",
    title: "Pre-Board Accelerator Batch",
    badge: "Pre-Board Mastery",
    description:
      "A decisive transitional year bridging foundation concepts with rigorous 10th standard board requirements.",
    subjects: ["Mathematics", "Science (Phy/Chem/Bio)", "English", "Social Science"],
    features: [
      "Extensive theorem and numerical practice",
      "Chapter-wise unit tests every Saturday",
      "Step-by-step presentation technique guidance",
      "Individual weak-area mentoring by Akram Sir",
    ],
    batchTiming: "Morning 7:00 AM - 9:00 AM or Evening 5:30 PM - 7:30 PM",
    batchSize: "Max 18 Students",
    curriculum: "State Board & CBSE",
  },
  {
    id: "class-10",
    grade: "Class 10th",
    category: "boards",
    title: "Target 95%+ Board Exam Masterclass",
    badge: "Flagship Batch",
    description:
      "Comprehensive board exam syllabus coverage, 10-year question bank analysis, time management tricks, and personalized answer sheet evaluation.",
    subjects: ["Advanced Maths", "Science (Complete)", "English", "Social Science"],
    features: [
      "Full syllabus completion 2 months before exams",
      "Minimum 12 full-length simulated board prelims",
      "Special formula memory tricks by Akram Sir",
      "Parent-Teacher regular progress briefings",
    ],
    batchTiming: "Morning 6:45 AM - 8:45 AM or Evening 6:00 PM - 8:00 PM",
    batchSize: "Limited to 18 Students",
    curriculum: "Maharashtra State Board (SSC) & CBSE",
  },
  {
    id: "class-11-12",
    grade: "Class 11th & 12th",
    category: "senior",
    title: "Senior Secondary Board & Foundation",
    badge: "Specialized Guidance",
    description:
      "Dedicated focus on critical concepts, board scoring methodologies, and strengthening fundamental problem solving.",
    subjects: ["Mathematics", "Physics", "Chemistry", "Commerce Basics"],
    features: [
      "Focus on scoring derivations and numerical mastery",
      "Formula books and concise revision notes",
      "Chapter-end rigorous subjective test series",
      "Career counseling & entrance guidance",
    ],
    batchTiming: "Morning / Evening Flexible Batches",
    batchSize: "Small Group Batches",
    curriculum: "State Board (HSC) & CBSE",
  },
];

export const TEACHERS_DATA: Teacher[] = [
  {
    id: "akram-sir",
    name: "AKRAM SIR",
    role: "Founder, Director & Lead Educator",
    qualification: "M.Sc. / B.Ed. Specialist",
    experience: "10+ Years Teaching Experience",
    subjects: ["Mathematics", "Science", "Mental Ability"],
    bio: "Renowned in Koradi and North Nagpur for his high-energy, crystal-clear teaching methodology. Akram Sir believes every student has the potential to excel when taught with patience, personalized attention, and disciplined practice.",
    highlight: "Mentored over 850+ students with multiple 95%+ board toppers in Koradi.",
  },
  {
    id: "teacher-science",
    name: "Science & Physics Faculty",
    role: "Senior Science Educator",
    qualification: "M.Sc. Physics with Honors",
    experience: "7+ Years Experience",
    subjects: ["Physics", "Chemistry", "General Science"],
    bio: "Specializes in turning abstract textbook definitions into everyday real-world examples. Conducts weekly conceptual check-ins and experimental demonstrations.",
    highlight: "Specialist in scoring 100/100 in Board Science theory & numericals.",
  },
  {
    id: "teacher-english-social",
    name: "Languages & Humanities Faculty",
    role: "Senior English & Social Science Specialist",
    qualification: "M.A. English, B.Ed.",
    experience: "8+ Years Experience",
    subjects: ["English Grammar & Writing", "Social Studies (History/Civics/Geography)"],
    bio: "Expert at refining student writing flair, grammar rules, map-pointing accuracy, and high-scoring point-wise answers required by board examiners.",
    highlight: "Helps average students leap from 60s to 85%+ in board languages.",
  },
  {
    id: "teacher-doubt-mentor",
    name: "Student Care & Doubt Resolution Mentor",
    role: "Associate Teacher & Homework Supervisor",
    qualification: "B.Sc. Mathematics",
    experience: "5+ Years Experience",
    subjects: ["Daily Doubt Clearing", "Homework Verification", "Revision Sessions"],
    bio: "Available before and after regular lecture hours so no student returns home with unresolved doubts or incomplete classroom concepts.",
    highlight: "Dedicated 1-on-1 time for every hesitant student.",
  },
];

export const RESULTS_DATA: Testimonial[] = [
  {
    id: "res-1",
    name: "Rohan M.",
    grade: "Class 10th Board",
    school: "Koradi School, Nagpur",
    score: "96.4%",
    quote:
      "Before joining Akram Sir's classes, I was always nervous in Maths geometry and Science numericals. Akram Sir gave personal attention to each of my doubts. His weekly Sunday tests took away all my exam fear!",
    year: "2024 Batch",
  },
  {
    id: "res-2",
    name: "Ananya Deshmukh",
    grade: "Class 10th SSC",
    school: "Nagpur District School",
    score: "94.8% (Maths 98/100)",
    quote:
      "The small batch size makes a huge difference. You can't hide in the back row! Akram Sir knows every student's weak points and makes sure you solve problems on the board until you're confident.",
    year: "2024 Batch",
  },
  {
    id: "res-3",
    name: "Mrs. Sunita Verma",
    grade: "Parent of Ayush (Class 9th)",
    school: "Nagpur Parent",
    score: "Grade Jump from 62% to 89%",
    quote:
      "Offline coaching with Akram Sir brought discipline back into my son's routine. In today's digital distraction age, having a dedicated physical classroom with strict attendance and caring teachers is a blessing.",
    parentName: "Parent",
    year: "2024",
  },
  {
    id: "res-4",
    name: "Sameer Sheikh",
    grade: "Class 8th Foundation",
    school: "Koradi Central",
    score: "Top Rank in School",
    quote:
      "Genius Tuition Classes made Science my favorite subject. The study material is short, clear, and very easy to revise before examinations.",
    year: "2024 Batch",
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: "faq-1",
    question: "Is Genius Tuition Classes offline or online?",
    answer:
      "We are strictly an OFFLINE coaching institute located in Koradi, Nagpur. We believe real learning, discipline, and conceptual depth happen when teachers and students interact directly face-to-face in a distraction-free classroom environment.",
    category: "General",
  },
  {
    id: "faq-2",
    question: "Where exactly is the institute located in Koradi?",
    answer:
      "We are centrally located in Koradi, Nagpur, Maharashtra, easily accessible from the Koradi Devi Temple road and Koradi Power Station colony. Students can safely commute by bicycle or local transit.",
    category: "Location",
  },
  {
    id: "faq-3",
    question: "What is the batch size at Genius Tuition Classes?",
    answer:
      "We strictly limit each batch to 15 to 18 students. Unlike overcrowded coaching factories with 60-80 students where backbenchers are ignored, Akram Sir personally tracks the notebook and progress of every single student.",
    category: "Batches",
  },
  {
    id: "faq-4",
    question: "Can prospective students attend a demo class before admission?",
    answer:
      "Yes! We offer a 2-day free offline trial/demo class so both students and parents can experience our teaching quality, classroom environment, and Akram Sir's mentoring style before finalizing admission.",
    category: "Admission",
  },
  {
    id: "faq-5",
    question: "How are parents informed about their child's attendance and test marks?",
    answer:
      "We maintain a direct WhatsApp communication group with parents. Weekly test scores, answer sheet remarks, and attendance updates are shared regularly, followed by periodic one-on-one Parent-Teacher meetings.",
    category: "Academics",
  },
  {
    id: "faq-6",
    question: "How can I contact Akram Sir or visit the coaching?",
    answer:
      "You can directly call or WhatsApp Akram Sir at +91 91756 91457. You are also welcome to visit our Koradi center during our visiting hours (Morning 8:00 AM - 12:30 PM or Evening 4:00 PM - 8:30 PM).",
    category: "Contact",
  },
];
