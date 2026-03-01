import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">About KrishiMitra AI</h1>

          <div className="space-y-8">
            <section className="glass p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
              <p className="text-text/70 leading-relaxed">
                KrishiMitra AI is dedicated to empowering Indian farmers with accessible,
                AI-powered agricultural guidance. We bridge the digital divide by providing
                information through both web and voice interfaces, ensuring that every farmer
                can access the knowledge they need to succeed.
              </p>
            </section>

            <section className="glass p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-semibold text-primary mb-4">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-primary mb-2">🌱 Crop Guidance</h3>
                  <p className="text-sm text-text/70">
                    Expert advice on crop selection, cultivation practices, and best farming techniques.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">🌤️ Weather Intelligence</h3>
                  <p className="text-sm text-text/70">
                    Accurate weather forecasts and alerts tailored to your region.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">🏛️ Government Schemes</h3>
                  <p className="text-sm text-text/70">
                    Information about schemes, eligibility criteria, and application processes.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">💰 Market Insights</h3>
                  <p className="text-sm text-text/70">
                    Current market prices and trends to help you make informed decisions.
                  </p>
                </div>
              </div>
            </section>

            <section className="glass p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-semibold text-primary mb-4">Technology Stack</h2>
              <p className="text-text/70 mb-4">
                Built on cutting-edge AWS cloud infrastructure for reliability and scalability:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-primary">Amazon Bedrock</p>
                  <p className="text-xs text-text/60">AI Foundation Models</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-primary">AWS Lambda</p>
                  <p className="text-xs text-text/60">Serverless Compute</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-primary">DynamoDB</p>
                  <p className="text-xs text-text/60">NoSQL Database</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-primary">API Gateway</p>
                  <p className="text-xs text-text/60">RESTful APIs</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-primary">AWS Amplify</p>
                  <p className="text-xs text-text/60">Web Hosting</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-primary">Amazon Connect</p>
                  <p className="text-xs text-text/60">Voice Helpline</p>
                </div>
              </div>
            </section>

            <section className="glass p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-semibold text-primary mb-4">Target Audience</h2>
              <p className="text-text/70 mb-4">
                We serve Indian farmers with:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Basic mobile phones or smartphones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Limited or no internet connectivity (voice helpline available)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Hindi as primary language (English also supported)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Varying levels of digital literacy</span>
                </li>
              </ul>
            </section>

            <section className="glass p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-semibold text-primary mb-4">Built For</h2>
              <p className="text-text/70">
                This project was created for the <strong>AI For Bharat Hackathon</strong>,
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
