import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users, Zap, ChevronUp } from 'lucide-react';
const results = [
  {
    icon: TrendingUp,
    metric: '40%',
    label: 'Efficiency Gains',
    description: 'Improved data pipeline throughput through automation and optimization.',
  },
  {
    icon: Clock,
    metric: '60%',
    label: 'Time Saved',
    description: 'Reduced manual processes with custom ETL solutions and scripts.',
  },
  {
    icon: Users,
    metric: '5+',
    label: 'Team Size Managed',
    description: 'Led development teams, coordinating sprints and technical decisions.',
  },
  {
    icon: Zap,
    metric: '10+',
    label: 'Projects Delivered',
    description: 'Successfully shipped applications from concept to production.',
  },
];

interface ResultsSectionProps {
  onNavigate?: (index: number) => void;
}

export function ResultsSection({ onNavigate }: ResultsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div className="section-container">
      <motion.div
        className="max-w-5xl mx-auto w-full h-full flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            // Impact & Outcomes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            Results
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
            Measurable outcomes from projects and initiatives I've led.
          </p>
        </motion.div>

        {/* Results grid - simple 2x2 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              variants={itemVariants}
              className="glass-panel rounded-2xl p-6 flex items-start gap-5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <result.icon className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-accent">{result.metric}</span>
                  <span className="text-lg font-semibold text-foreground">{result.label}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>

      {/* Side navigation arrow to Technologies (left) */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => onNavigate?.(2)}
        className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
        whileHover={{ x: -4 }}
      >
        <ChevronUp className="w-5 h-5 rotate-90" />
        <span className="text-xs font-medium" style={{ writingMode: 'vertical-rl' }}>Technologies</span>
      </motion.button>
    </div>
  );
}
