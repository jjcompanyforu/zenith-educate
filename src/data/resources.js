// Free study resources, carried over from the original site's
// free-resources.php page. PDFs live in /public/assets/pdf/ using the same
// paths as the original site, so old links keep working once uploaded.
//
// To add a PDF: drop the file into public/assets/pdf/ and add an entry below.
// Items without a `file` (or with `soon: true`) show as "Coming soon".

export const RESOURCE_CATEGORIES = [
  {
    id: 'study',
    label: 'Study PDFs',
    title: 'Current Affairs & Study Sets',
    text: 'Downloadable PDFs: monthly current affairs, the banking capsule and SSC quant practice.',
  },
  {
    id: 'gk',
    label: 'GK & Current Affairs',
    title: 'Stay updated daily',
    text: 'Daily GK, weekly current-affairs PDFs and a monthly static GK digest.',
  },
  {
    id: 'mock',
    label: 'Mock Tests',
    title: 'Practice exams for IBPS, SSC & CUET',
    text: 'Timed test simulations for major competitive exams with unlimited attempts.',
  },
  {
    id: 'blog',
    label: 'Exam Tips',
    title: 'Exam tips & strategy',
    text: 'Preparation strategy articles written by Zenith faculty.',
  },
];

export const RESOURCES = [
  {
    id: 'current-affairs-july-2025',
    category: 'study',
    kind: 'pdf',
    title: 'Current Affairs – July 2025',
    text: 'Month-wise round-up of national, international, economy and banking news for July 2025.',
    exams: ['Banking', 'SSC', 'Railway'],
    file: '/assets/pdf/Current_Affairs_July2025.pdf',
    updated: 'Jul 2025',
  },
  {
    id: 'banking-awareness-capsule',
    category: 'study',
    kind: 'pdf',
    title: 'Banking Awareness Capsule',
    text: 'Key banking terms, RBI functions, financial institutions and recent banking updates in one capsule.',
    exams: ['IBPS', 'SBI', 'RBI'],
    file: '/assets/pdf/Banking_Capsule.pdf',
    updated: 'Jul 2025',
  },
  {
    id: 'ssc-quant-practice-set',
    category: 'study',
    kind: 'pdf',
    title: 'SSC Quant Practice Set',
    text: 'Quantitative aptitude practice questions modelled on SSC CGL and CHSL patterns.',
    exams: ['SSC CGL', 'SSC CHSL'],
    file: '/assets/pdf/SSC_Quant_Set.pdf',
    updated: 'Jul 2025',
  },
  {
    id: 'daily-gk-9-july-2025',
    category: 'gk',
    kind: 'pdf',
    title: 'Daily GK – 9 July 2025',
    text: 'One-page daily general knowledge and current-affairs update.',
    exams: ['All exams'],
    file: '/assets/pdf/Daily_GK_July9.pdf',
    updated: 'Jul 9, 2025',
  },
  {
    id: 'weekly-current-affairs',
    category: 'gk',
    kind: 'pdf',
    title: 'Weekly Current Affairs',
    text: 'The week’s most important current affairs, compiled for quick revision.',
    exams: ['All exams'],
    file: '/assets/pdf/Weekly_CA.pdf',
    updated: 'Jul 2025',
  },
  {
    id: 'monthly-static-gk-digest',
    category: 'gk',
    kind: 'pdf',
    title: 'Monthly Static GK Digest',
    text: 'Static GK essentials: history, geography, polity, awards, important days and more.',
    exams: ['All exams'],
    file: '/assets/pdf/Static_GK.pdf',
    updated: 'Jul 2025',
  },
  {
    id: 'ibps-po-prelims-mock',
    category: 'mock',
    kind: 'test',
    title: 'IBPS PO Prelims Mock Test',
    text: 'Full-length prelims simulation: English, quantitative aptitude and reasoning.',
    exams: ['IBPS PO'],
    soon: true,
  },
  {
    id: 'ssc-cgl-tier-1-mock',
    category: 'mock',
    kind: 'test',
    title: 'SSC CGL Tier 1 Mock Test',
    text: 'Tier 1 pattern test covering reasoning, GK, quant and English.',
    exams: ['SSC CGL'],
    soon: true,
  },
  {
    id: 'cuet-general-test-demo',
    category: 'mock',
    kind: 'test',
    title: 'CUET General Test – Demo',
    text: 'Demo of the CUET general test with sample questions.',
    exams: ['CUET'],
    soon: true,
  },
  {
    id: 'tips-crack-bank-exams',
    category: 'blog',
    kind: 'article',
    title: 'Top 10 Tips to Crack Bank Exams in First Attempt',
    text: 'Practical study habits and exam-day tactics for banking aspirants.',
    exams: ['Banking'],
    soon: true,
  },
  {
    id: 'cuet-preparation-strategy',
    category: 'blog',
    kind: 'article',
    title: 'CUET Preparation Strategy – Subject Wise',
    text: 'How to plan your CUET preparation subject by subject.',
    exams: ['CUET'],
    soon: true,
  },
  {
    id: 'ssc-cgl-tier-wise-strategy',
    category: 'blog',
    kind: 'article',
    title: 'SSC CGL Tier-Wise Strategy for Beginners',
    text: 'A beginner-friendly roadmap through each tier of SSC CGL.',
    exams: ['SSC CGL'],
    soon: true,
  },
];

export const isAvailable = (r) => Boolean(r.file) && !r.soon;
export const findResource = (id) => RESOURCES.find((r) => r.id === id && isAvailable(r));
