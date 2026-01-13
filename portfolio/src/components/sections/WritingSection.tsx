import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';

const posts = [
  {
    title: 'Building Scalable Data Pipelines',
    excerpt: 'Lessons learned from designing ETL systems that process millions of records daily without breaking a sweat.',
    date: 'Dec 2024',
    readTime: '8 min read',
  },
  {
    title: 'The Art of Technical Leadership',
    excerpt: 'How to balance hands-on coding with mentoring your team and making strategic decisions.',
    date: 'Nov 2024',
    readTime: '6 min read',
  },
  {
    title: 'From Monolith to Microservices',
    excerpt: 'A practical guide to breaking down legacy systems without disrupting business operations.',
    date: 'Oct 2024',
    readTime: '10 min read',
  },
  {
    title: 'Python Best Practices for Data Engineers',
    excerpt: 'Writing clean, maintainable code that your future self will thank you for.',
    date: 'Sep 2024',
    readTime: '5 min read',
  },
  {
    title: 'The Power of Automation',
    excerpt: 'Why automating repetitive tasks is the best investment you can make in your workflow.',
    date: 'Aug 2024',
    readTime: '4 min read',
  },
  {
    title: 'Database Optimization Techniques',
    excerpt: 'Simple yet effective strategies to speed up your queries by orders of magnitude.',
    date: 'Jul 2024',
    readTime: '7 min read',
  },
  {
    title: 'Cloud Architecture Patterns',
    excerpt: 'Exploring the most effective design patterns for building resilient cloud-native applications.',
    date: 'Jun 2024',
    readTime: '9 min read',
  },
  {
    title: 'Effective Code Reviews',
    excerpt: 'How to give and receive feedback that actually improves code quality and team dynamics.',
    date: 'May 2024',
    readTime: '5 min read',
  },
  {
    title: 'Data Quality at Scale',
    excerpt: 'Strategies for maintaining data integrity when dealing with billions of records across distributed systems.',
    date: 'Apr 2024',
    readTime: '8 min read',
  },
];

interface WritingSectionProps {
  onNavigate?: (index: number) => void;
}

export function WritingSection({ onNavigate }: WritingSectionProps) {
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setCanScrollUp(scrollTop > 10);
    setCanScrollDown(scrollTop < scrollHeight - clientHeight - 10);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
        className="max-w-4xl mx-auto w-full h-full flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-6 shrink-0">
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            // Thoughts & Ideas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            Writing
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">
            Articles and insights on technology, leadership, and software engineering.
          </p>
        </motion.div>

        {/* Scrollable container */}
        <motion.div 
          variants={itemVariants}
          className="relative flex-1 min-h-0"
        >
          {/* Scroll up indicator */}
          {canScrollUp && (
            <div className="absolute top-2 left-0 right-0 z-10 pointer-events-none flex justify-center">
              <ChevronUp className="w-5 h-5 text-muted-foreground/50" />
            </div>
          )}

          {/* Scrollable content with dynamic mask */}
          <div 
            ref={scrollRef}
            className="h-full overflow-y-auto scrollbar-hide px-1 py-2"
            style={{
              maskImage: `linear-gradient(to bottom, ${canScrollUp ? 'transparent 0%, black 8%' : 'black 0%'}, black ${canScrollDown ? '85%' : '100%'}, ${canScrollDown ? 'transparent 100%' : 'black 100%'})`,
              WebkitMaskImage: `linear-gradient(to bottom, ${canScrollUp ? 'transparent 0%, black 8%' : 'black 0%'}, black ${canScrollDown ? '85%' : '100%'}, ${canScrollDown ? 'transparent 100%' : 'black 100%'})`,
            }}
            onWheel={(e) => e.stopPropagation()}
            onScroll={handleScroll}
          >
            <div className="space-y-4">
              {posts.map((post, index) => (
                <motion.article
                  key={post.title}
                  className="glass-panel rounded-xl p-5 cursor-pointer group border-border/30"
                  style={{ boxShadow: 'none' }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-accent font-medium">{post.date}</span>
                      <p className="text-xs text-muted-foreground mt-1">{post.readTime}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Scroll down indicator */}
          {canScrollDown && (
            <div className="absolute bottom-2 left-0 right-0 z-10 pointer-events-none flex justify-center">
              <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
