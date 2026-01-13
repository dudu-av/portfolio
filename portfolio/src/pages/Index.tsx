import { ThemeProvider } from '@/contexts/ThemeContext';
import { Portfolio } from '@/components/Portfolio';

const Index = () => {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
};

export default Index;
