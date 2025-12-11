import { Metadata } from 'next';
import { fetchMetadata } from '@/lib/fetchMetadata';
import { notFound } from 'next/navigation';
import Footer from '../components/Footer';
import CopyButton from '../components/CopyButton';

interface PreviewPageProps {
    searchParams: Promise<{ url?: string }>;
}

export async function generateMetadata({ searchParams }: PreviewPageProps): Promise<Metadata> {
    const params = await searchParams;
    const url = params.url;

    if (!url) {
        return {
            title: 'URL Preview',
            description: 'Preview any URL before visiting',
        };
    }

    try {
        const metadata = await fetchMetadata(decodeURIComponent(url));

        return {
            title: metadata.title,
            description: metadata.description,
            openGraph: {
                title: metadata.title,
                description: metadata.description,
                images: metadata.image ? [metadata.image] : [],
                url: metadata.url,
                siteName: metadata.siteName,
            },
            twitter: {
                card: 'summary_large_image',
                title: metadata.title,
                description: metadata.description,
                images: metadata.image ? [metadata.image] : [],
            },
        };
    } catch {
        return {
            title: 'Preview Error',
            description: 'Unable to generate preview for this URL',
        };
    }
}

export default async function PreviewPage({ searchParams }: PreviewPageProps) {
    const params = await searchParams;
    const url = params.url;

    if (!url) {
        notFound();
    }

    let metadata;
    let error = null;

    try {
        metadata = await fetchMetadata(decodeURIComponent(url));
    } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to fetch URL metadata';
    }

    if (error || !metadata) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    <div className="backdrop-blur-xl bg-white/10 border border-red-500/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                        <h1 className="text-4xl font-bold text-white mb-4">Error</h1>
                        <p className="text-red-300 mb-6">{error}</p>
                        <a
                            href="/"
                            className="inline-block py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300"
                        >
                            Try Another URL
                        </a>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="mb-6">
                        <h2 className="text-sm font-medium text-purple-300 mb-2">PREVIEW</h2>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            {metadata.title}
                        </h1>
                        {metadata.siteName && (
                            <p className="text-purple-200 text-lg mb-2">{metadata.siteName}</p>
                        )}
                    </div>

                    {metadata.image && (
                        <div className="mb-6 rounded-2xl overflow-hidden border border-white/10">
                            <img
                                src={metadata.image}
                                alt={metadata.title}
                                className="w-full h-auto max-h-96 object-cover"
                            />
                        </div>
                    )}

                    <p className="text-lg text-purple-100 mb-6 leading-relaxed">
                        {metadata.description}
                    </p>

                    <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-sm text-purple-300 mb-1">Destination URL</p>
                        <p className="text-white font-mono text-sm break-all">{metadata.url}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href={metadata.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-center"
                        >
                            Visit Site →
                        </a>
                        <CopyButton url={metadata.url} />
                        <a
                            href="/"
                            className="py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold rounded-2xl transition-all duration-300 text-center"
                        >
                            Preview Another
                        </a>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}
