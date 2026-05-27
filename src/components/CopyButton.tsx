import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { useToast } from './Toast';

type Props = {
  text: string;
  label?: string;
  variant?: 'icon' | 'pill';
  className?: string;
};

export function CopyButton({ text, label = '복사', variant = 'icon', className = '' }: Props) {
  const { showToast } = useToast();
  const [justCopied, setJustCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const ok = await copyToClipboard(text);
    if (ok) {
      setJustCopied(true);
      showToast('복사 완료!', 'success');
      setTimeout(() => setJustCopied(false), 1500);
    } else {
      showToast('복사 실패', 'error');
    }
  };

  if (variant === 'pill') {
    return (
      <button
        onClick={handleClick}
        className={`focus-ring inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border border-ink-200 hover:bg-ink-100 transition-colors text-ink-700 ${className}`}
        aria-label={label}
      >
        {justCopied ? <CheckIcon /> : <CopyIcon />}
        <span>{justCopied ? '복사됨' : label}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`focus-ring inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-ink-100 transition-colors text-ink-500 hover:text-ink-900 ${className}`}
      aria-label={label}
      title={label}
    >
      {justCopied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
