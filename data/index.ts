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
    {
        id: 'flutter',
        icons: '/flutter.svg',
        name: 'Flutter/Dart'
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
        title: 'Rawabet Real-estate',
        emoji: '',
        description: 'Rawabet Real Estate is a full-stack, bilingual real estate platform designed for lead generation and property showcasing. It features a sleek UI built with Next.js App Router, a powerful Express.js backend, an RAG-powered chatbot for client interaction, and seamless email lead forwarding via MailerSend.',
        technologies: [
            'Next.js 14 (App Router)',
            'Tailwind CSS',
            'Framer Motion',
            'TypeScript',
            'React Hook Form',
            'Zod',
            'Express.js',
            'MongoDB & Mongoose',
            'RAG System',
            'ChromaDB & Embeddings',
            'MailerSend API',
            'Cloudinary',
            'Multilingual (English/Arabic)'
        ],
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIHJ4PSIyMCIgZmlsbD0iI2Y4ZjlmYSIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjM2MCIgaGVpZ2h0PSIyNjAiIHJ4PSIxNSIgZmlsbD0iIzM0MzY0OCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlJhd2FiZXQ8L3RleHQ+PC9zdmc+',
        images: [
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIHJ4PSIyMCIgZmlsbD0iI2Y4ZjlmYSIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjM2MCIgaGVpZ2h0PSIyNjAiIHJ4PSIxNSIgZmlsbD0iIzM0MzY0OCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlJhd2FiZXQ8L3RleHQ+PC9zdmc+',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIHJ4PSIyMCIgZmlsbD0iI2Y4ZjlmYSIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjM2MCIgaGVpZ2h0PSIyNjAiIHJ4PSIxNSIgZmlsbD0iIzM0MzY0OCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiPkRhc2hib2FyZDwvdGV4dD48L3N2Zz4=',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIHJ4PSIyMCIgZmlsbD0iI2Y4ZjlmYSIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjM2MCIgaGVpZ2h0PSIyNjAiIHJ4PSIxNSIgZmlsbD0iIzM0MzY0OCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiPkNoYXRib3Q8L3RleHQ+PC9zdmc+',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIHJ4PSIyMCIgZmlsbD0iI2Y4ZjlmYSIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjM2MCIgaGVpZ2h0PSIyNjAiIHJ4PSIxNSIgZmlsbD0iIzM0MzY0OCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiPk1vYmlsZTwvdGV4dD48L3N2Zz4='
        ],
        previewUrl: 'https://rawabet-realestate.com/'
    },
    {
        id: '2',
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
    },
    {
        id: '3',
        title: 'Portfolio Website',
        emoji: '',
        description: 'A modern, responsive portfolio website showcasing projects and skills with smooth animations and SEO optimization.',
        technologies: ['React', 'TypeScript', 'Styled Components', 'Framer Motion'],
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIHJ4PSIyMCIgZmlsbD0iI2Y4ZjlmYSIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjM2MCIgaGVpZ2h0PSIyNjAiIHJ4PSIxNSIgZmlsbD0iIzM0MzY0OCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlBvcnRmb2xpbyB3ZWJzaXRlPC90ZXh0Pjwvc3ZnPg==',
        previewUrl: '#'
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
        value: 'Osamah@example.com',
        iconClass: 'email-icon'
    }
];

export const socialLinks: SocialLink[] = [
    {
        id: '1',
        name: 'GitHub',
        url: 'https://github.com/osamah-hussein',
        iconClass: 'github',
        icon: '/Github.svg'
    },
    {
        id: '2',
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/osamah-hussein',
        iconClass: 'linkedin',
        icon: '/Linkedin.svg'
    },
    {
        id: '3',
        name: 'Upwork',
        url: '',
        iconClass: 'upwork'
    }
];
