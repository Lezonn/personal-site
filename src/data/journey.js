// Career journey, newest stop first. Each stop is one island in the 3D world
// (`scene` picks the diorama builder) and one chapter in the caption bar.
// `glow` marks how the tech shows up in the diorama: 'ai' (gold) or 'code' (mint).
// `brand.logo` is drawn on the island's sign and in the bar; until that file exists
// in public/journey/logos/, both fall back to the brand name as a wordmark.

const LINKEDIN = 'https://www.linkedin.com/in/leonard-zonaphan/'
const GITHUB = 'https://github.com/Lezonn'

const AUTO2000 = { name: 'Auto2000', logo: '/journey/logos/auto2000.png' }

export const stops = [
  {
    id: 'showroom',
    scene: 'showroom',
    glow: 'ai',
    sign: 'SHOWROOM',
    brand: AUTO2000,
    year: '2025',
    railLabel: 'Showroom',
    period: 'Nov 2025 — Present',
    category: 'AI · Product',
    title: 'AI Product Owner — Process Automation',
    company: 'PT Astra International Tbk · TSO Auto2000',
    summary:
      'Own AI and automation initiatives end to end — from pain-point discovery to production — and lead the company AI exploration project, reporting up to C-level.',
    highlight: { value: '4', label: 'GenAI initiatives shipped' },
    points: [
      'AI recruitment screening, AI Virtual Assistant, AI Salesman Live Chat, and AI KV Generator',
      '~15 production-grade RPA solutions serving teams across 127 Auto2000 branches'
    ],
    tags: ['AI Workflow', 'AI Agents', 'RPA', 'UiPath'],
    link: { href: LINKEDIN, label: 'More on LinkedIn' }
  },
  {
    id: 'workshop',
    scene: 'workshop',
    glow: 'ai',
    sign: 'WORKSHOP',
    brand: AUTO2000,
    year: '2024',
    railLabel: 'Workshop',
    period: 'Oct 2024 — Oct 2025',
    category: 'Leadership',
    title: 'Management Trainee',
    company: 'PT Astra International Tbk · TSO Auto2000',
    summary:
      'Final project: end-to-end process improvement, from discovery across four divisions to evaluation.',
    highlight: { value: '68%', label: 'workload cut with automation' },
    points: [
      'Found 6 repetitive activities eating ~1,000 man-hours a month, then automated them with UiPath, macros, and Power BI',
      'Shipped internal websites for HC & General Services: LMS, Innovation System, building maintenance report'
    ],
    tags: ['UiPath', 'Power BI', 'RPA', 'Web Apps']
  },
  {
    id: 'barbershop',
    scene: 'barbershop',
    glow: 'ai',
    sign: 'BARBERSHOP',
    brand: { name: "The Men's Barbershop", logo: '/journey/logos/mens-barbershop.png' },
    year: '2025',
    railLabel: 'Barbershop',
    period: 'May 2025 — Present',
    category: 'Consulting',
    title: 'IT Solution Consultant',
    company: "The Men's Barbershop",
    summary:
      'Built and maintain the point-of-sales system used across every shop — transactions, customer data, stock, and staff performance.',
    highlight: { value: '~90%', label: 'manual reporting automated' },
    points: [
      'Automated daily financial and employee-performance reports',
      'Turned the paper loyalty program into system-based membership'
    ],
    tags: ['POS System', 'Reporting', 'Loyalty Program'],
    link: { href: GITHUB, label: 'Code on GitHub' }
  },
  {
    id: 'ecommerce',
    scene: 'ecommerce',
    glow: 'code',
    sign: 'E-COMMERCE',
    brand: { name: 'Blibli', logo: '/journey/logos/blibli.png' },
    year: '2023',
    railLabel: 'E-commerce',
    period: 'Feb 2023 — Feb 2024',
    category: 'Engineering',
    title: 'Software Development Engineer Intern',
    company: 'Blibli.com',
    summary:
      'Delivered an SEO system with cross-functional agile squads, across backend microservices and component-based frontend.',
    points: [
      'Maintained SEO microservices with reactive Java Spring, JUnit, and Mockito',
      'Built Vue.js components with Vitest and Playwright; schema markup and meta-tag best practices'
    ],
    tags: ['Java Spring', 'Vue.js', 'SEO', 'Microservices'],
    link: { href: GITHUB, label: 'More on GitHub' }
  },
  {
    id: 'it-division',
    scene: 'itDivision',
    glow: 'code',
    sign: 'IT DIVISION',
    brand: { name: 'BINUS IT Division', logo: '/journey/logos/binus-it.png' },
    year: '2021',
    railLabel: 'IT Division',
    period: 'Mar 2021 — Mar 2022',
    category: 'Full-stack',
    title: 'Full Stack Developer',
    company: 'Bina Nusantara IT Division',
    summary:
      'Built the BINUS Square operations portal with .NET and SQL for the staff who run the student residence.',
    highlight: { value: '50+', label: 'tables migrated from the legacy design' },
    points: [
      'Implemented the operations portal used by BINUS Square staff',
      'Wrote the SQL migrations; trained in PHP, .NET, and database systems'
    ],
    tags: ['.NET', 'SQL', 'Laravel', 'Migrations']
  },
  {
    id: 'campus',
    scene: 'campus',
    glow: 'code',
    sign: 'CAMPUS',
    brand: { name: 'BINUS University' },
    year: '2020',
    railLabel: 'Campus',
    period: 'Sep 2020 — Jul 2024',
    category: 'Education',
    title: 'B.Sc. Computer Science',
    company: 'BINUS University',
    summary:
      'Where the ride started: the computer science foundation behind the engineering-to-product path.',
    points: ['Published “Metaverse as A Future of Education: A Systematic Review”'],
    tags: ['EdTech', 'Metaverse', 'Publication']
  }
]
