import React from 'react';

const SeoJsonLd = () => {
  const rawCanonical = process.env.NEXT_PUBLIC_SITE_URL || 'https://osamah-alaini.vercel.app';
  const canonical = rawCanonical.replace(/\/$/, '')
  const image = `${canonical}/Osamah.jpg`;
  const email = 'osamah0alini@gmail.com';
  const linkedin = 'https://linkedin.com/in/engosamah/';
  const siteDescription = 'Official portfolio of Engr. Osamah H. Alaini showcasing software engineering, AI, DevOps, research, education, experience, and contact details.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${canonical}#person`,
        'name': 'Osamah H. Alaini',
        'givenName': 'Osamah',
        'familyName': 'Alaini',
        'alternateName': [
          'Osamah alaini',
          'Osamah al-aini',
          'أسامه العيني',
          'أسامة حسين العيني',
          'Osamah Hussein Alaini',
          'Engr. Osamah H. Alaini'
        ],
        'url': canonical,
        'image': image,
        'description': siteDescription,
        'jobTitle': [
          'Software Engineer',
          'AI Engineer',
          'Founder and Head of Development'
        ],
        'hasOccupation': {
          '@type': 'Occupation',
          'name': 'Software Engineer',
          'occupationLocation': {
            '@type': 'Place',
            'name': 'Lahore, Pakistan'
          },
          'skills': [
            'Full-stack development',
            'Artificial intelligence',
            'DevOps automation',
            'Machine learning',
            'Natural language processing',
            'Computer vision',
            'Cloud infrastructure'
          ]
        },
        'alumniOf': [
          {
            '@type': 'CollegeOrUniversity',
            'name': 'Superior University'
          },
          {
            '@type': 'CollegeOrUniversity',
            'name': 'Trent University'
          }
        ],
        'knowsAbout': [
          'Software engineering',
          'Full-stack development',
          'Artificial intelligence',
          'Machine learning',
          'Natural language processing',
          'Computer vision',
          'DevOps',
          'Cloud infrastructure',
          'Research',
          'Bilingual web applications'
        ],
        'knowsLanguage': ['English', 'Arabic'],
        'email': email,
        'sameAs': [
          'https://arxiv.org/pdf/2604.09683',
          linkedin,
          'https://instagram.com/osama_s7s'
        ],
        'contactPoint': [{
          '@type': 'ContactPoint',
          'contactType': 'professional contact',
          'email': email,
          'availableLanguage': ['English', 'Arabic']
        }],
        'worksFor': {
          '@type': 'Organization',
          'name': 'TrustiveTech'
        },
        'subjectOf': [
          {
            '@type': 'ScholarlyArticle',
            'name': 'A Vision for Context-Aware CI Adoption Decisions',
            'url': 'https://arxiv.org/pdf/2604.09683'
          },
          {
            '@type': 'ScholarlyArticle',
            'name': 'Catching Smells in the Act: A GitHub Actions Workflow Investigation',
            'url': 'https://www.researchgate.net/publication/387244148_Catching_Smells_in_the_Act_A_GitHub_Actions_Workflow_Investigation'
          }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${canonical}#website`,
        'url': canonical,
        'name': 'Osamah H. Alaini Portfolio',
        'description': siteDescription,
        'inLanguage': ['en', 'ar'],
        'publisher': {
          '@id': `${canonical}#person`
        }
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        'url': canonical,
        'name': 'Osamah H. Alaini Portfolio',
        'description': siteDescription,
        'isPartOf': {
          '@id': `${canonical}#website`
        },
        'about': {
          '@id': `${canonical}#person`
        },
        'mainEntity': {
          '@id': `${canonical}#person`
        },
        'primaryImageOfPage': {
          '@type': 'ImageObject',
          'url': image,
          'caption': 'Osamah H. Alaini'
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': canonical
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default SeoJsonLd;
