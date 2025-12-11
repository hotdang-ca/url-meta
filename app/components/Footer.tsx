import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="mt-8 text-center">
            <a
                href="https://www.fourandahalfgiraffes.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
                <Image
                    src="/logo-sm.png"
                    alt="Four And A Half Giraffes Logo"
                    width={32}
                    height={32}
                    className="rounded-lg group-hover:scale-110 transition-transform duration-300"
                />
                <div className="text-left">
                    <p className="text-xs text-purple-200/90 leading-tight">
                        Another small project built with ❤️ by{' '}
                        <span className="font-semibold text-purple-100">James Robert Perih</span>
                    </p>
                    <p className="text-xs text-purple-300/70 leading-tight">
                        Four And A Half Giraffes, Ltd. · I Build Small, Useful Things for Your Business.
                    </p>
                </div>
            </a>
        </footer>
    );
}
