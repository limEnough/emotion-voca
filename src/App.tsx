import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { HomePage } from '@/pages/HomePage';
import { DiarySamplesPage } from '@/pages/DiarySamplesPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-grey-50">
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
    <footer className="border-t border-grey-100 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-8 flex items-center justify-between flex-wrap gap-3">
        <p className="text-[13px] font-semibold text-grey-500 tracking-tight">
          © Inkwell
        </p>
        <p className="text-[13px] font-medium text-grey-400 tracking-tight">
          Write what you feel, in English.
        </p>
      </div>
    </footer>
  );
}
