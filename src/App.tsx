import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { HomePage } from '@/pages/HomePage';
import { DiarySamplesPage } from '@/pages/DiarySamplesPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diary-samples" element={<DiarySamplesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between flex-wrap gap-3 text-xs text-ink-500">
        <p className="font-mono">© Inkwell · diary emotion vocabulary</p>
        <p className="font-display italic">Write what you feel, in English.</p>
      </div>
    </footer>
  );
}
