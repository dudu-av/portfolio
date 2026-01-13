import { motion } from 'framer-motion';
import { TypedText } from '../TypedText';
import { ArrowRight, Terminal } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (index: number) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div className="section-container px-8">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Prompt indicator */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-muted-foreground mb-8"
        >
          <Terminal className="w-4 h-4 text-accent" />
          <span>software_engineer.init()</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-foreground">Building </span>
          <span className="text-gradient">elegant</span>
          <br />
          <span className="text-foreground">solutions with </span>
          <span className="text-accent">code</span>
        </motion.h1>

        {/* Typed subtitle */}
        <motion.div
          variants={itemVariants}
          className="text-xl md:text-2xl text-muted-foreground mb-12 h-8"
        >
          <TypedText
            text="Developer • Problem Solver • Creative Thinker"
            delay={1200}
            speed={50}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          I craft thoughtful digital experiences where technical precision meets creative vision.
          Calm approach, clear communication, impactful results.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => onNavigate(1)}
            className="group flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium hover-lift"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            onClick={() => onNavigate(4)}
            className="flex items-center gap-2 px-6 py-3 glass-panel rounded-full font-medium hover-lift"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch
          </motion.button>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 left-16 w-20 h-20 rounded-full bg-accent/10 blur-2xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-16 w-32 h-32 rounded-full bg-highlight/10 blur-2xl"
          animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
