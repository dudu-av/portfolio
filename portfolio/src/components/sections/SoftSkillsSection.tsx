import { motion } from 'framer-motion';
import { MessageCircle, Lightbulb, Users, Zap, Globe, Clock } from 'lucide-react';

const softSkills = [
  {
    icon: Users,
    title: 'Team Leadership',
    description: 'Managed a team of 5 developers, coordinating sprints and deliverables.',
  },
  {
    icon: MessageCircle,
    title: 'Clear Communication',
    description: 'Translating technical concepts into human-friendly language.',
  },
  {
    icon: Lightbulb,
    title: 'Creative Problem-Solving',
    description: 'Finding elegant solutions to complex challenges.',
  },
  {
    icon: Zap,
    title: 'Adaptability',
    description: 'Quick to learn, eager to evolve with new technologies.',
  },
  {
    icon: Globe,
    title: 'Languages',
    description: 'Portuguese (Native), English (C1), Spanish (A2).',
  },
  {
    icon: Clock,
    title: 'Time Management',
    description: 'Prioritizing tasks effectively to meet deadlines consistently.',
  },
];

interface SoftSkillsSectionProps {
  onNavigate?: (index: number) => void;
}

export function SoftSkillsSection({ onNavigate }: SoftSkillsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div className="section-container">
      <motion.div
        className="max-w-4xl mx-auto w-full flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section header */}
        <motion.div variants={cardVariants} className="text-center mb-6">
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            // Beyond The Code
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            Soft Skills
          </h2>
        </motion.div>

        {/* 6 Cards Grid - 3x2 */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          variants={containerVariants}
        >
          {softSkills.map((skill) => (
            <motion.div
              key={skill.title}
              variants={cardVariants}
              className="group glass-panel rounded-xl p-4 hover-lift"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                <skill.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {skill.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
