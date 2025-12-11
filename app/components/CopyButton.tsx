'use client';

import { useState } from 'react';

interface CopyButtonProps {
    url: string;
}

export default function CopyButton({ url }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            // Get the full preview URL
            const previewUrl = `${window.location.origin}/preview?url=${encodeURIComponent(url)}`;
            await navigator.clipboard.writeText(previewUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold rounded-2xl transition-all duration-300 text-center relative overflow-hidden group"
        >
            <span className={`transition-all duration-300 ${copied ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                📋 Copy Preview Link
            </span>
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                ✓ Copied!
            </span>
        </button>
    );
}
