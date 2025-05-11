import './App.css';
import { Header } from './components/Header';
export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="App">
      <Header />
      {children}
    </div>
  );
}