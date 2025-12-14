'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from './components/Footer';

export default function Home() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      const encodedUrl = encodeURIComponent(url.trim());
      router.push(`/preview?url=${encodedUrl}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Glassmorphic card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              URL Previewer
            </h1>
            <p className="text-lg text-purple-200">
              Paste any URL to see a rich preview before visiting
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg backdrop-blur-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-lg"
            >
              Generate Preview
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-purple-200/70">
              Share the preview link with others to show them what they&apos;re about to visit
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
