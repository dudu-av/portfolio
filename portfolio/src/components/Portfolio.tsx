import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './Navigation';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { TechnicalSkillsSection } from './sections/TechnicalSkillsSection';
import { ResultsSection } from './sections/ResultsSection';
import { WritingSection } from './sections/WritingSection';
import { SoftSkillsSection } from './sections/SoftSkillsSection';
import { ContactSection } from './sections/ContactSection';

const sections = ['Home', 'Projects', 'Technologies', 'Results', 'Writing', 'Soft Skills', 'Contact'];

const sectionComponents = [
  HeroSection,
  ProjectsSection,
  TechnicalSkillsSection,
  ResultsSection,
  WritingSection,
  SoftSkillsSection,
  ContactSection,
];

export function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateToSection = useCallback((index: number) => {
    if (index === currentSection || isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection(index > currentSection ? 1 : -1);
    setCurrentSection(index);
    
    setTimeout(() => setIsTransitioning(false), 350);
  }, [currentSection, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (currentSection < sections.length - 1) {
          navigateToSection(currentSection + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (currentSection > 0) {
          navigateToSection(currentSection - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isTransitioning, navigateToSection]);

  // Wheel navigation
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout;
    let accumulatedDelta = 0;
    const threshold = 50;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning) return;

      accumulatedDelta += e.deltaY;

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (Math.abs(accumulatedDelta) > threshold) {
          if (accumulatedDelta > 0 && currentSection < sections.length - 1) {
            navigateToSection(currentSection + 1);
          } else if (accumulatedDelta < 0 && currentSection > 0) {
            navigateToSection(currentSection - 1);
          }
        }
        accumulatedDelta = 0;
      }, 50);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [currentSection, isTransitioning, navigateToSection]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '5%' : '-5%',
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-5%' : '5%',
      opacity: 0,
      scale: 0.98,
    }),
  };

  const CurrentSectionComponent = sectionComponents[currentSection];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Ambient background animations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'hsl(var(--accent) / 0.25)' }}
          animate={{
            x: [0, 150, 80, 0],
            y: [0, 80, 150, 0],
            scale: [1, 1.3, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: 'hsl(var(--highlight) / 0.2)' }}
          animate={{
            x: [0, -120, -60, 0],
            y: [0, -80, -140, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'hsl(var(--glow) / 0.18)' }}
          animate={{
            x: [-80, 120, -40, -80],
            y: [0, -60, 80, 0],
            opacity: [0.6, 1, 0.7, 0.6],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: 'hsl(var(--accent) / 0.15)' }}
          animate={{
            x: [0, 100, -60, 0],
            y: [-30, 60, 40, -30],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Navigation */}
      <Navigation
        currentSection={currentSection}
        onNavigate={navigateToSection}
      />

      {/* Sections */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSection}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.25, ease: 'easeInOut' },
            scale: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
          }}
          className="absolute inset-0"
        >
        <CurrentSectionComponent onNavigate={navigateToSection} />
        </motion.div>
      </AnimatePresence>

      {/* Section indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-accent">{String(currentSection + 1).padStart(2, '0')}</span>
        <span className="mx-2">/</span>
        <span>{String(sections.length).padStart(2, '0')}</span>
      </motion.div>
    </div>
  );
}
