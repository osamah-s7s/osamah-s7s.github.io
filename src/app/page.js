"use client"

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/locales'
import LoadingScreen from '@/components/LoadingScreen'
import Hero from '@/components/Hero'
import Academics from '@/components/Academics'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Achievements from '@/components/Achievements'
import Contact from '@/components/Contact'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { language, isArabic } = useLanguage()
  const t = getTranslation(language)

  // Show the loading screen on client mount only so server-rendered HTML contains main content
  useEffect(() => {
    setIsLoading(true)
  }, [])

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      
      <div className={`min-h-screen ${isArabic ? 'font-arabic' : 'font-sans'}`}>
        {/* Hero Section */}
        <section id="home" className="scroll-mt-20">
          <Hero />
        </section>

        {/* Academics Section */}
        <section id="academics" className="scroll-mt-20">
          <Academics />
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-20">
          <Experience />
        </section>

        {/* Skills & Interests Section */}
        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>
         
        <section id="achievements" className="scroll-mt-20">
          <Achievements/>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </div>
    </>
  )
}

export default Home
