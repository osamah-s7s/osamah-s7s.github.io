export interface TechStack {
    id: string;
    icons: string;
    name: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    location: string;
    logo: string;
    responsibilities: Responsibility[];
}

export interface Responsibility {
    id: string;
    icon: string;
    title: string;
    description: string;
    gradientClass: string;
}

export interface Project {
    id: string;
    title: string;
    emoji: string;
    description: string;
    technologies: string[];
    image: string;
    images?: string[]; // Array of images for slideshow
    isUnderDevelopment?: boolean;
    previewUrl?: string;
}

export interface ContactInfo {
    id: string;
    icon: string;
    label: string;
    value: string;
    iconClass: string;
}

export interface SocialLink {
    id: string;
    name: string;
    url: string;
    iconClass: string;
    icon?: string;
}

export interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}


