import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder, ChevronRight, ChevronDown } from 'lucide-react';

const projects = [
  {
    title: 'AI-Powered Analytics Dashboard',
    description: 'Real-time data visualization platform with ML-driven insights and predictive analytics.',
    tech: ['React', 'Python', 'TensorFlow', 'D3.js'],
    highlights: ['40% faster insights', 'Real-time processing', 'Custom ML models'],
    details: 'Built a comprehensive analytics platform that processes real-time data streams and provides ML-driven insights. Implemented custom TensorFlow models for predictive analytics, resulting in 40% faster business insights for stakeholders.',
  },
  {
    title: 'Automated Testing Framework',
    description: 'End-to-end test automation solution reducing QA time by 60% across multiple platforms.',
    tech: ['Selenium', 'Java', 'Jenkins', 'Docker'],
    highlights: ['60% time reduction', 'CI/CD integrated', 'Cross-platform'],
    details: 'Developed a robust testing framework integrated with CI/CD pipelines. The solution supports cross-platform testing and reduced manual QA effort by 60%, enabling faster release cycles.',
  },
  {
    title: 'Cloud Migration Platform',
    description: 'Enterprise-grade migration tool enabling seamless transition to cloud infrastructure.',
    tech: ['AWS', 'Terraform', 'Python', 'React'],
    highlights: ['Zero downtime', 'Cost optimization', 'Auto-scaling'],
    details: 'Designed and implemented a migration platform that enables seamless transition to AWS with zero downtime. Implemented infrastructure-as-code with Terraform and auto-scaling policies for cost optimization.',
  },
  {
    title: 'Developer Productivity Suite',
    description: 'VS Code extensions and CLI tools boosting team velocity and code quality.',
    tech: ['TypeScript', 'Node.js', 'GraphQL'],
    highlights: ['10k+ installs', 'Open source', 'Active community'],
    details: 'Created a suite of developer tools including VS Code extensions and CLI utilities. The open-source project has garnered over 10k installs and maintains an active community of contributors.',
  },
];

interface ProjectsSectionProps {
  onNavigate?: (index: number) => void;
}

export function ProjectsSection({ onNavigate }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div className="section-container">
      <motion.div
        className="max-w-6xl mx-auto w-full h-full flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            // Featured Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Projects
          </h2>
        </motion.div>

        {/* Master-detail layout */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[400px]"
        >
          {/* Master list */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-4 overflow-hidden">
            <div className="space-y-2">
              {projects.map((project, index) => (
                <motion.button
                  key={project.title}
                  onClick={() => setSelectedProject(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                    selectedProject === index
                      ? 'bg-accent/20 border border-accent/30'
                      : 'hover:bg-muted/50'
                  }`}
                  whileHover={{ x: selectedProject === index ? 0 : 4 }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedProject === index ? 'bg-accent/20' : 'bg-muted'
                  }`}>
                    <Folder className={`w-5 h-5 ${
                      selectedProject === index ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium truncate ${
                      selectedProject === index ? 'text-accent' : 'text-foreground'
                    }`}>
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {project.tech.slice(0, 3).join(' • ')}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    selectedProject === index ? 'text-accent rotate-90' : 'text-muted-foreground'
                  }`} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Detail view */}
          <div className="lg:col-span-3 glass-panel rounded-2xl p-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Folder className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5 text-muted-foreground" />
                    </motion.button>
                    <motion.button
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-5 h-5 text-muted-foreground" />
                    </motion.button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {projects[selectedProject].title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {projects[selectedProject].details}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[selectedProject].highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="mt-auto pt-4 border-t border-border flex flex-wrap gap-3">
                  {projects[selectedProject].tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </motion.div>

      {/* Side navigation arrow to Technologies */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => onNavigate?.(2)}
        className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
        whileHover={{ x: 4 }}
      >
        <span className="text-xs font-medium writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>Technologies</span>
        <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
      </motion.button>
    </div>
  );
}
