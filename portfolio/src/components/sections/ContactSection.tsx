import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Terminal } from 'lucide-react';
import { useState } from 'react';

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:hello@developer.com' },
];

interface ContactSectionProps {
  onNavigate?: (index: number) => void;
}

export function ContactSection({ onNavigate }: ContactSectionProps) {
  const [prompt, setPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setPrompt('');
    }, 1500);
  };

  return (
    <div className="section-container px-8 py-24">
      <motion.div
        className="max-w-3xl mx-auto w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section header */}
        <motion.div variants={itemVariants}>
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            // Let's Connect
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-foreground">
            Send a Prompt
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Ready to collaborate? Drop me a message and let's create something great together.
          </p>
        </motion.div>

        {/* Prompt-style input */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="mt-12"
        >
          <div className="glass-panel rounded-2xl p-2 flex items-center gap-2">
            <div className="flex items-center gap-2 px-4 text-muted-foreground">
              <Terminal className="w-5 h-5 text-accent" />
              <span className="text-sm font-mono hidden sm:inline">$</span>
            </div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 py-4 font-mono text-sm"
            />
            <motion.button
              type="submit"
              disabled={isSubmitting || !prompt.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <motion.div
                  className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 my-12"
        >
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">or find me on</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="w-14 h-14 glass-panel rounded-xl flex items-center justify-center group hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={itemVariants}
          className="mt-16 text-sm text-muted-foreground"
        >
          Built with{' '}
          <motion.span
            className="text-highlight inline-block"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ♥
          </motion.span>
          {' '}and a lot of caffeine
        </motion.p>
      </motion.div>
    </div>
  );
}
