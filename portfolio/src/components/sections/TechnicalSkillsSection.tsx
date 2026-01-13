import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
const technicalCategories = [
  {
    name: 'Languages',
    skills: [
      { name: 'Python', context: 'backend APIs, ETL, automation' },
      { name: 'SQL', context: 'PostgreSQL, schema design' },
      { name: 'JavaScript', context: 'frontend integration' },
      { name: 'TypeScript', context: 'type-safe React apps' },
    ],
  },
  {
    name: 'Backend & APIs',
    skills: [
      { name: 'FastAPI', context: 'REST APIs, async endpoints' },
      { name: 'Flask', context: 'internal services' },
      { name: 'REST', context: 'auth, pagination' },
      { name: 'Node.js', context: 'server-side JS' },
    ],
  },
  {
    name: 'Data & Automation',
    skills: [
      { name: 'Pandas', context: 'data transformation' },
      { name: 'Selenium', context: 'web scraping' },
      { name: 'ETL Pipelines', context: 'ingestion, validation' },
    ],
  },
  {
    name: 'Infrastructure',
    skills: [
      { name: 'Git & GitHub', context: 'version control' },
      { name: 'Docker', context: 'containerization' },
      { name: 'CI/CD', context: 'automated pipelines' },
    ],
  },
];

interface TechnicalSkillsSectionProps {
  onNavigate?: (index: number) => void;
}

export function TechnicalSkillsSection({ onNavigate }: TechnicalSkillsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div className="section-container">
      <motion.div
        className="max-w-4xl mx-auto w-full h-full flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            // Technical Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            Technologies
          </h2>
        </motion.div>

        {/* Simple 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technicalCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="glass-panel rounded-2xl p-5"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {category.name}
              </h3>

              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="group"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {skill.context}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>

      {/* Side navigation arrow to Projects (left) */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => onNavigate?.(1)}
        className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
        whileHover={{ x: -4 }}
      >
        <ChevronUp className="w-5 h-5 rotate-90" />
        <span className="text-xs font-medium" style={{ writingMode: 'vertical-rl' }}>Projects</span>
      </motion.button>

      {/* Side navigation arrow to Results (right) */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => onNavigate?.(3)}
        className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
        whileHover={{ x: 4 }}
      >
        <span className="text-xs font-medium rotate-180" style={{ writingMode: 'vertical-rl' }}>Results</span>
        <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
      </motion.button>
    </div>
  );
}