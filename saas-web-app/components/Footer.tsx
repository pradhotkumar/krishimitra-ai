import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="glass-tier-3 border-t border-white/10 mt-20 relative z-30 pb-[env(safe-area-inset-bottom)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-text-primary text-vibrancy mb-4 flex items-center gap-2">
              <span className="text-2xl drop-shadow-md">🌾</span> KrishiMitra AI
            </h3>
            <p className="text-body text-text-secondary max-w-sm leading-relaxed">
              The next-generation agricultural assistant providing crop guidance, hyper-local weather intelligence,
              and seamless market integration for modern Indian farmers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-label text-text-tertiary mb-6 tracking-widest font-semibold">QUICK LINKS</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-body text-text-secondary hover:text-text-primary transition-colors hover:text-vibrancy inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-body text-text-secondary hover:text-text-primary transition-colors hover:text-vibrancy inline-block">
                  AI Hub
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-body text-text-secondary hover:text-text-primary transition-colors hover:text-vibrancy inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-body text-text-secondary hover:text-text-primary transition-colors hover:text-vibrancy inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Powered By */}
          <div>
            <h3 className="text-label text-text-tertiary mb-6 tracking-widest font-semibold">SYSTEM INFRASTRUCTURE</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Amazon Bedrock', 'AWS Lambda', 'DynamoDB', 'AWS Amplify'
              ].map((tech) => (
                <span key={tech} className="px-3 py-1.5 glass-tier-2 rounded-pill text-xs text-text-primary glass-specular transition-all hover:scale-105 cursor-default font-medium">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-xs text-text-tertiary mt-6 font-medium">
              Engineered for AI For Bharat
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-text-tertiary">
          <p className="font-medium tracking-wide">&copy; {new Date().getFullYear()} KrishiMitra AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-text-secondary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
