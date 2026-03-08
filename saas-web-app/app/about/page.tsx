import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col pt-[52px]">
      <Header />

      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto delay-1 animate-glass-reveal opacity-0">
          <h1 className="text-display text-text-primary mb-12 text-4xl md:text-5xl text-vibrancy tracking-tight">About KrishiMitra AI</h1>

          <div className="space-y-8">
            <section className="glass-tier-1 p-8 md:p-10 rounded-[28px] glass-specular interactive-glass delay-2 animate-glass-reveal opacity-0">
              <h2 className="text-title text-3xl text-text-primary mb-6 text-vibrancy">Our Mission</h2>
              <p className="text-body text-text-secondary leading-relaxed text-lg">
                KrishiMitra AI is dedicated to empowering Indian farmers with accessible,
                AI-powered agricultural guidance. We bridge the digital divide by providing
                information through both web and voice interfaces, ensuring that every farmer
                can access the knowledge they need to succeed.
              </p>
            </section>

            <section className="glass-tier-1 p-8 md:p-10 rounded-[28px] glass-specular interactive-glass delay-3 animate-glass-reveal opacity-0">
              <h2 className="text-title text-3xl text-text-primary mb-8 text-vibrancy">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-tier-2 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all card-hover">
                  <h3 className="font-semibold text-text-primary text-xl mb-3 flex items-center gap-3">
                    <span className="text-glassTint-mint text-2xl drop-shadow-[0_0_8px_rgba(48,209,88,0.5)]">🌱</span> Crop Guidance
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    Expert advice on crop selection, cultivation practices, and best farming techniques.
                  </p>
                </div>
                <div className="glass-tier-2 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all card-hover">
                  <h3 className="font-semibold text-text-primary text-xl mb-3 flex items-center gap-3">
                    <span className="text-glassTint-blue text-2xl drop-shadow-[0_0_8px_rgba(10,132,255,0.5)]">🌤️</span> Weather Intelligence
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    Accurate weather forecasts and alerts tailored to your region.
                  </p>
                </div>
                <div className="glass-tier-2 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all card-hover">
                  <h3 className="font-semibold text-text-primary text-xl mb-3 flex items-center gap-3">
                    <span className="text-glassTint-purple text-2xl drop-shadow-[0_0_8px_rgba(94,92,230,0.5)]">🏛️</span> Government Schemes
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    Information about schemes, eligibility criteria, and application processes.
                  </p>
                </div>
                <div className="glass-tier-2 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all card-hover">
                  <h3 className="font-semibold text-text-primary text-xl mb-3 flex items-center gap-3">
                    <span className="text-glassTint-amber text-2xl drop-shadow-[0_0_8px_rgba(255,214,10,0.5)]">💰</span> Market Insights
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    Current market prices and trends to help you make informed decisions.
                  </p>
                </div>
              </div>
            </section>

            <section className="glass-tier-1 p-8 md:p-10 rounded-[28px] glass-specular interactive-glass delay-1 animate-glass-reveal opacity-0">
              <h2 className="text-title text-3xl text-text-primary mb-6 text-vibrancy">Technology Stack</h2>
              <p className="text-body text-text-secondary mb-8 text-lg">
                Built on cutting-edge AWS cloud infrastructure for reliability and scalability:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="glass-tier-2 p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all text-center group">
                  <p className="font-semibold text-text-primary mb-1 group-hover:text-glassTint-blue transition-colors">Amazon Bedrock</p>
                  <p className="text-sm text-text-secondary">AI Foundation Models</p>
                </div>
                <div className="glass-tier-2 p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all text-center group">
                  <p className="font-semibold text-text-primary mb-1 group-hover:text-glassTint-mint transition-colors">AWS Lambda</p>
                  <p className="text-sm text-text-secondary">Serverless Compute</p>
                </div>
                <div className="glass-tier-2 p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all text-center group">
                  <p className="font-semibold text-text-primary mb-1 group-hover:text-glassTint-purple transition-colors">DynamoDB</p>
                  <p className="text-sm text-text-secondary">NoSQL Database</p>
                </div>
                <div className="glass-tier-2 p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all text-center group">
                  <p className="font-semibold text-text-primary mb-1 group-hover:text-glassTint-pink transition-colors">API Gateway</p>
                  <p className="text-sm text-text-secondary">RESTful APIs</p>
                </div>
                <div className="glass-tier-2 p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all text-center group">
                  <p className="font-semibold text-text-primary mb-1 group-hover:text-glassTint-amber transition-colors">AWS Amplify</p>
                  <p className="text-sm text-text-secondary">Web Hosting</p>
                </div>
                <div className="glass-tier-2 p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all text-center group">
                  <p className="font-semibold text-text-primary mb-1 group-hover:text-glassTint-blue transition-colors">Amazon Connect</p>
                  <p className="text-sm text-text-secondary">Voice Helpline</p>
                </div>
              </div>
            </section>

            <section className="glass-tier-1 p-8 md:p-10 rounded-[28px] glass-specular interactive-glass delay-2 animate-glass-reveal opacity-0">
              <h2 className="text-title text-3xl text-text-primary mb-6 text-vibrancy">Target Audience</h2>
              <p className="text-body text-text-secondary mb-6 text-lg">
                We serve Indian farmers with:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="text-glassTint-mint text-xl shrink-0 mt-0.5 shadow-[0_0_10px_rgba(48,209,88,0.3)] rounded-full bg-glassTint-mint/10 p-1">✓</span>
                  <span className="text-text-primary text-lg">Basic mobile phones or smartphones</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-glassTint-mint text-xl shrink-0 mt-0.5 shadow-[0_0_10px_rgba(48,209,88,0.3)] rounded-full bg-glassTint-mint/10 p-1">✓</span>
                  <span className="text-text-primary text-lg">Limited or no internet connectivity (voice helpline available)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-glassTint-mint text-xl shrink-0 mt-0.5 shadow-[0_0_10px_rgba(48,209,88,0.3)] rounded-full bg-glassTint-mint/10 p-1">✓</span>
                  <span className="text-text-primary text-lg">Hindi as primary language (English also supported)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-glassTint-mint text-xl shrink-0 mt-0.5 shadow-[0_0_10px_rgba(48,209,88,0.3)] rounded-full bg-glassTint-mint/10 p-1">✓</span>
                  <span className="text-text-primary text-lg">Varying levels of digital literacy</span>
                </li>
              </ul>
            </section>

            <section className="glass-tier-1 p-8 md:p-10 rounded-[28px] glass-specular interactive-glass delay-3 animate-glass-reveal opacity-0 glass-tint-blue border-glassTint-blue/30 shadow-[0_0_30px_rgba(10,132,255,0.15)]">
              <h2 className="text-title text-3xl text-text-primary mb-4 text-vibrancy">Built For</h2>
              <p className="text-body text-text-secondary text-lg leading-relaxed">
                This project was created for the <strong className="text-text-primary px-1 py-0.5 rounded-md glass-tier-2 mx-1 tracking-wide">AI For Bharat Hackathon</strong>,
                demonstrating how AI technology can empower rural communities and bridge
                the digital divide in Indian agriculture.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
