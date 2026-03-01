import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary/5 border-t border-primary/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">About KrishiMitra AI</h3>
            <p className="text-sm text-text/70">
              AI-powered agricultural assistant providing crop guidance, weather intelligence,
              and government schemes information to Indian farmers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-text/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-sm text-text/70 hover:text-primary transition-colors">
                  Chat Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-text/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Powered By */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Powered By</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white rounded-full text-xs text-text/70 shadow-soft">
                AWS Bedrock
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-xs text-text/70 shadow-soft">
                AWS Lambda
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-xs text-text/70 shadow-soft">
                DynamoDB
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-xs text-text/70 shadow-soft">
                AWS Amplify
              </span>
            </div>
            <p className="text-xs text-text/50 mt-4">
              Built for AI For Bharat Hackathon
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/10 text-center text-sm text-text/50">
          <p>&copy; {new Date().getFullYear()} KrishiMitra AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
