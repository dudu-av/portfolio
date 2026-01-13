import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

interface NavigationProps {
  currentSection: number;
  onNavigate: (index: number) => void;
}

// Map navbar items to their target section indices
const navItems = [
  { label: 'Home', targetSection: 0 },
  { label: 'Projects', targetSection: 1 },
  { label: 'Writing', targetSection: 4 },
  { label: 'Soft Skills', targetSection: 5 },
  { label: 'Contact', targetSection: 6 },
];

// Which nav item should be active for each section
const sectionToNavIndex = [0, 1, 1, 1, 2, 3, 4]; // Home, Projects, Tech, Results, Writing, Soft, Contact

export function Navigation({ currentSection, onNavigate }: NavigationProps) {
  const activeNavIndex = sectionToNavIndex[currentSection] ?? 0;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Logo / Name */}
      <motion.div
        className="text-xl font-semibold tracking-tight"
        whileHover={{ scale: 1.02 }}
      >
        <span className="text-foreground">dev</span>
        <span className="text-accent">.</span>
        <span className="text-muted-foreground">edu_avila_vilar</span>
      </motion.div>

      {/* Center navigation links */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            onClick={() => onNavigate(item.targetSection)}
            className={`text-sm font-medium transition-colors duration-300 ${
              activeNavIndex === index
                ? 'text-accent'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
            {activeNavIndex === index && (
              <motion.div
                className="h-0.5 bg-accent mt-1 rounded-full"
                layoutId="nav-underline"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Theme toggle */}
      <ThemeToggle />
    </motion.nav>
  );
}
