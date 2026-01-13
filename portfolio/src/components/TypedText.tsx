import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypedTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypedText({ text, className = '', delay = 0, speed = 40 }: TypedTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      timeout = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          startTyping();
        } else {
          setIsComplete(true);
        }
      }, speed);
    };

    const initialDelay = setTimeout(() => {
      startTyping();
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(initialDelay);
    };
  }, [text, delay, speed]);

  useEffect(() => {
    if (isComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
    }
  }, [isComplete]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        className="inline-block w-0.5 h-[1em] bg-accent ml-1 align-middle"
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </span>
  );
}
