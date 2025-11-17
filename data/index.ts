import { TechStack, Experience, Project, ContactInfo, SocialLink } from '@/types';

export const techStack: TechStack[] = [
    {
        id: 'ai-ml',
        icons: '/AI.svg',
        name: 'AI/ML (TensorFlow, PyTorch, OpenCV)'
    },
    {
        id: 'devops',
        icons: '/Dev OPS.svg',
        name: 'DevOps (Nginx, PM2, GitHub Actions)'
    },
    {
        id: 'react-next',
        icons: '/react.svg',
        name: 'React/Next.js'
    },
    {
        id: 'mongo-express',
        icons: '/mongo.svg',
        name: 'MongoDB/Express'
    },

];

export const experience: Experience = {
    id: '1',
    company: 'Bitlogicx',
    role: 'AI Engineer',
    duration: '2024 - 2025',
    location: 'Lahore, Pakistan',
    logo: 'LOGO',
    responsibilities: [
        {
            id: '1',
            icon: '/developement.svg',
            title: 'AI Development',
            description: 'Built and deployed ML/AI solutions for business applications.',
            gradientClass: 'resp-1'
        },
        {
            id: '2',
            icon: '/Deep learnning.svg',
            title: 'Deep Learning',
            description: 'Worked on NLP and computer vision systems.',
            gradientClass: 'resp-2'
        },
        {
            id: '3',
            icon: '/Research.svg',
            title: 'Research',
            description: 'Integrated advanced AI techniques to boost accuracy.',
            gradientClass: 'resp-3'
        },
        {
            id: '4',
            icon: '/Teamwork.svg',
            title: 'Teamwork',
            description: 'Collaborated with cross-functional teams on AI projects.',
            gradientClass: 'resp-4'
        },
        {
            id: '5',
            icon: '/Performance.svg',
            title: 'Performance',
            description: 'Ensured scalable and optimized AI systems.',
            gradientClass: 'resp-5'
        },
        {
            id: '6',
            icon: '/Learning.svg',
            title: 'Learning',
            description: 'Kept updated with latest AI frameworks and trends.',
            gradientClass: 'resp-6'
        }
    ]
};

export const projects: Project[] = [
    {
        id: '1',
        title: 'Rawabet Real Estate',
        emoji: '',
        description: 'Rawabet Real Estate is a full-stack, bilingual real estate platform designed for lead generation and property showcasing. It features a sleek UI built with Next.js App Router, a powerful Express.js backend, an RAG-powered chatbot for client interaction, and seamless email lead forwarding via MailerSend.',
        technologies: [
            'Next.js 14 (App Router)',
            'Tailwind CSS',
            'Framer Motion',
            'TypeScript',
            'React Hook Form',
            'Express.js',
            'MongoDB & Mongoose',
            'RAG System',
            'ChromaDB & Embeddings',
            'MailerSend API',
            'Cloudinary',
            'Multilingual (English/Arabic)'
        ],
        image: '/rawabet/rsre (1).png',
        images: [
            '/rawabet/rsre (1).png',
            '/rawabet/rsre (2).png',
            '/rawabet/rsre (3).png',
            '/rawabet/rsre (4).png',
            '/rawabet/rsre (5).png',
            '/rawabet/rsre (6).png',
            '/rawabet/rsre (7).png',
            '/rawabet/rsre (8).png',
            '/rawabet/rsre (9).png',
            '/rawabet/rsre (10).png'
        ],
        previewUrl: 'https://rawabet-realestate.com/'
    },
    {
        id: '2',
        title: 'Ajial Altarbwy Center - Educational Platform',
        emoji: '🎓',
        description: 'A sophisticated bilingual educational platform for Ajial Altarbwy Center operating across Qatar and Saudi Arabia. Features program management, educational trips, news/blog system, team profiles, and interactive galleries. Built with Next.js 16, the platform includes multi-region support, full RTL/LTR bilingual interface (Arabic/English), and optimized performance.',
        technologies: [
            'Next.js 16 (App Router)',
            'React 19',
            'TypeScript',
            'Tailwind CSS 4',
            'Framer Motion',
            'Embla Carousel',
            'Swiper',
            'React Icons',
            'Lucide React',
            'React Hook Form',
            'Zod Validation',
            'React Context API',
            'Multi-region Support (Qatar/Saudi)',
            'Bilingual Interface (Arabic/English)',
            'RTL/LTR Support',
            'Custom Typography (Readex Pro, Calibri)',
            'Next.js Image Optimization',
            'Lazy Loading',
            'Code Splitting',
            'Google Maps Integration',
            'Instagram Feed Integration',
            'SEO Optimization'
        ],
        image: '/ajial/1.png',
        images: [
            '/ajial/1.png',
            '/ajial/2.png',
            '/ajial/3.png',
            '/ajial/4.png',
            '/ajial/5.png',
            '/ajial/6.png',
            '/ajial/7.png',
            '/ajial/8.png',
            '/ajial/9.png'
        ],
        previewUrl: 'https://ajial-ecru.vercel.app/'
    },
    {
        id: '3',
        title: 'Faris Al-Maliki Law Firm for Legal Consultations',
        emoji: '⚖️',
        description: `A comprehensive digital ecosystem built for Faris Al-Maliki Law Firm to streamline legal services and consultations. 
        The platform includes a client-facing Flutter mobile app, a lawyer portal, and an admin web panel powered by Next.js. 
        Core features include secure user onboarding, real-time lawyer–client communication via WebSockets, task and case management, 
        and integrated online payment flows (Mada, Apple Pay, Visa/MasterCard) through TAP. The backend is deployed on AWS with 
        scalable architecture and WebSocket support for live updates. The system is designed to handle sensitive legal data securely 
        while delivering a smooth experience across web and mobile.`,
        technologies: [
            'Next.js',
            'Flutter',
            'AWS',
            'WebSockets',
            'Node.js',
            'Express.js',
            'PostgreSQL',
            'Prisma',
            'Tailwind CSS',
            'Payment Integration (TAP, Apple Pay, Mada, Visa/MasterCard)'
        ],
        image: '/alfaris/main.png',
        images: [
            '/alfaris/main.png',
            '/alfaris/1.png',
            '/alfaris/2.png',
            '/alfaris/3.png'
        ],
        isUnderDevelopment: true
    }
];

export const contactInfo: ContactInfo[] = [
    {
        id: '1',
        icon: '📍',
        label: 'Location',
        value: 'Lahore, Pakistan',
        iconClass: 'location-icon'
    },
    {
        id: '2',
        icon: '📧',
        label: 'Email',
        value: 'Osamah0alini@gmail.com',
        iconClass: 'email-icon'
    }
];

export const socialLinks: SocialLink[] = [
    {
        id: '1',
        name: 'GitHub',
        url: 'https://github.com/osamah-s7s',
        iconClass: 'github',
        icon: '/Github.svg'
    },
    {
        id: '2',
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/engosamah/?trk=eml-email_edge_discover_01-header-0-profile_glimmer',
        iconClass: 'linkedin',
        icon: '/Linkedin.svg'
    },
    {
        id: '3',
        name: 'Upwork',
        url: 'https://www.upwork.com/freelancers/~01475b21b8797df1b7',
        iconClass: 'upwork'
    }
];
