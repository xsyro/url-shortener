import { Header } from './components/Header';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './hooks/queryClient';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        {children}
      </div>
    </QueryClientProvider>
  );
}