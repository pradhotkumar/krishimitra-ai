'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, AlertCircle, CheckCircle } from 'lucide-react';

interface ScanResult {
  disease: string;
  confidence: number;
  severity: string;
  treatment: string[];
  preventiveMeasures: string[];
  pestInfo?: {
    name: string;
    description: string;
    control: string[];
  };
  soilRecommendation?: {
    ph: string;
    nutrients: string[];
    amendments: string[];
  };
}

export default function LeafScanner() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cleanup camera when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      setStream(mediaStream);
      setShowCamera(true);

      // Wait for next tick to ensure video element is rendered
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(err => {
            console.error('Error playing video:', err);
          });
        }
      }, 100);
    } catch (error) {
      alert('Camera access denied. Please allow camera permission. / कैमरा एक्सेस अस्वीकृत। कृपया कैमरा अनुमति दें।');
      console.error('Camera error:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setSelectedImage(imageData);
        setResult(null);
        stopCamera();
      }
    }
  };

  const handleScan = () => {
    if (!selectedImage) return;

    setScanning(true);
    // Simulate AI analysis with enhanced results
    setTimeout(() => {
      setResult({
        disease: 'Leaf Blight - पत्ती झुलसा रोग',
        confidence: 87,
        severity: 'Moderate',
        treatment: [
          'Remove affected leaves immediately / प्रभावित पत्तियों को तुरंत हटा दें',
          'Apply copper-based fungicide (Bordeaux mixture) / तांबा आधारित फफूंदनाशक लगाएं',
          'Ensure proper drainage in the field / खेत में उचित जल निकासी सुनिश्चित करें',
          'Reduce watering frequency / पानी देने की आवृत्ति कम करें'
        ],
        preventiveMeasures: [
          'Maintain proper plant spacing (30-45 cm) / उचित पौधों की दूरी बनाए रखें',
          'Apply neem oil spray weekly / साप्ताहिक नीम तेल का छिड़काव करें',
          'Avoid overhead watering / ऊपर से पानी देने से बचें',
          'Use disease-resistant varieties / रोग प्रतिरोधी किस्मों का उपयोग करें'
        ],
        pestInfo: {
          name: 'Aphids detected / एफिड्स का पता चला',
          description: 'Small sap-sucking insects that can spread diseases / छोटे रस चूसने वाले कीड़े जो रोग फैला सकते हैं',
          control: [
            'Spray neem oil solution (5ml per liter) / नीम तेल का घोल छिड़कें',
            'Introduce ladybugs as natural predators / प्राकृतिक शिकारी के रूप में लेडीबग्स लाएं',
            'Use yellow sticky traps / पीले चिपचिपे जाल का उपयोग करें'
          ]
        },
        soilRecommendation: {
          ph: '6.5-7.0 (Slightly acidic to neutral / थोड़ा अम्लीय से तटस्थ)',
          nutrients: [
            'Nitrogen (N): Medium / नाइट्रोजन: मध्यम',
            'Phosphorus (P): High / फास्फोरस: उच्च',
            'Potassium (K): Medium / पोटेशियम: मध्यम'
          ],
          amendments: [
            'Add compost 2-3 kg per plant / प्रति पौधा 2-3 किलो खाद डालें',
            'Apply bone meal for phosphorus / फास्फोरस के लिए हड्डी का चूर्ण डालें',
            'Use wood ash for potassium / पोटेशियम के लिए लकड़ी की राख का उपयोग करें'
          ]
        }
      });
      setScanning(false);
    }, 2500);
  };

  return (
    <div>
      {/* Camera View */}
      {showCamera && (
        <div className="space-y-4 animate-glass-reveal">
          <div className="relative glass-tier-1 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-96 object-cover"
              onLoadedMetadata={(e) => {
                const video = e.target as HTMLVideoElement;
                video.play();
              }}
            />
            <canvas ref={canvasRef} className="hidden" />

            {/* Camera overlay guide */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-6 border-2 border-dashed border-green-500/50 rounded-3xl flex items-center justify-center transition-all group-hover:border-green-400">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/30 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <p className="text-white text-sm font-semibold backdrop-blur-xl bg-black/40 px-6 py-3 rounded-full border border-white/10 shadow-lg">
                    Position leaf in frame / पत्ती को फ्रेम में रखें
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={stopCamera}
              className="flex-1 glass-tier-2 text-text-primary px-6 py-4 rounded-2xl interactive-glass transition-all font-semibold active:scale-95 apple-focus"
            >
              Cancel / रद्द करें
            </button>
            <button
              onClick={capturePhoto}
              className="flex-1 glass-tier-3 text-white px-6 py-4 rounded-2xl interactive-glass glass-specular transition-all font-semibold flex items-center justify-center gap-3 active:scale-95 apple-focus shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <Camera className="w-5 h-5" />
              Capture / फोटो लें
            </button>
          </div>
        </div>
      )}

      {/* Upload Section */}
      {!selectedImage && !showCamera && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-3 text-vibrancy">
              Upload Leaf Photo / पत्ती की फोटो अपलोड करें
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed max-w-md mx-auto">
              Take a clear photo of the affected leaf for AI analysis
              <br />
              प्रभावित पत्ती की स्पष्ट फोटो लें
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Camera Option */}
            <button
              onClick={startCamera}
              className="group border border-dashed border-green-500/30 rounded-3xl p-10 interactive-glass hover:glass-tier-2 hover:border-green-400/50 transition-all text-center apple-focus"
            >
              <div className="bg-green-500/10 w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Camera className="w-10 h-10 text-green-400 group-hover:text-green-300 transition-colors" />
              </div>
              <p className="font-bold text-lg text-text-primary mb-1 text-vibrancy">Take Photo</p>
              <p className="text-sm text-text-secondary font-medium">फोटो लें</p>
            </button>

            {/* File Upload Option */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="group border border-dashed border-blue-500/30 rounded-3xl p-10 interactive-glass hover:glass-tier-2 hover:border-blue-400/50 transition-all text-center apple-focus"
            >
              <div className="bg-blue-500/10 w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition-colors" />
              </div>
              <p className="font-bold text-lg text-text-primary mb-1 text-vibrancy">Upload from Device</p>
              <p className="text-sm text-text-secondary font-medium">डिवाइस से अपलोड करें</p>
            </button>
          </div>

          {/* Hidden Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      )}

      {/* Image Preview */}
      {selectedImage && !result && (
        <div className="space-y-6 animate-glass-reveal">
          <div className="relative glass-tier-1 rounded-[32px] p-2 border border-white/5">
            <img
              src={selectedImage}
              alt="Leaf"
              className="w-full h-80 object-cover rounded-[28px]"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 glass-tier-3 rounded-xl interactive-glass text-text-primary hover:text-red-400 active:scale-95 transition-all shadow-xl border border-white/10 apple-focus"
              title="Remove / हटाएं"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleScan}
            disabled={scanning}
            className="w-full py-5 glass-tier-3 rounded-2xl interactive-glass glass-specular text-text-primary text-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:translate-y-0 apple-focus shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            {scanning ? (
              <span className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white/80"></div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-mint-300 to-green-300 animate-pulse">
                  Analyzing Leaf Patterns...
                </span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <div className="bg-white/10 p-1.5 rounded-lg border border-white/20">
                  <Camera className="w-5 h-5" />
                </div>
                Scan for Diseases / रोग की जांच करें
              </span>
            )}
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-glass-reveal delay-100">
          <div className="relative glass-tier-1 p-2 rounded-[32px] border border-white/5">
            <img
              src={selectedImage!}
              alt="Scanned Leaf"
              className="w-full h-64 object-cover rounded-[28px]"
            />
          </div>

          {/* Disease Info */}
          <div className={`rounded-[28px] p-6 border transition-all ${result.severity === 'High' ? 'glass-tier-2 border-red-500/30 bg-red-500/5 hover:bg-red-500/10' :
              result.severity === 'Moderate' ? 'glass-tier-2 border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10' :
                'glass-tier-2 border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10'
            }`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl backdrop-blur-md border ${result.severity === 'High' ? 'bg-red-500/20 border-red-500/40 text-red-400' :
                  result.severity === 'Moderate' ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' :
                    'bg-yellow-500/20 border-yellow-500/40 text-yellow-400'
                }`}>
                <AlertCircle className="w-8 h-8 flex-shrink-0" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-text-primary mb-2 text-vibrancy">
                  {result.disease}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="font-semibold text-text-secondary bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                    Confidence / विश्वास: <span className="text-text-primary">{result.confidence}%</span>
                  </span>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider backdrop-blur-md uppercase border ${result.severity === 'High' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                      result.severity === 'Moderate' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                        'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                    }`}>
                    {result.severity} Severity / गंभीरता
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Treatment */}
          <div className="glass-tier-1 rounded-[28px] p-8 border border-green-500/20 shadow-[0_0_30px_rgba(74,222,128,0.05)]">
            <h4 className="font-bold text-xl text-text-primary mb-5 flex items-center gap-3 text-vibrancy">
              <span className="bg-green-500/20 p-2 rounded-xl border border-green-500/30">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </span>
              Recommended Treatment / अनुशंसित उपचार
            </h4>
            <ul className="space-y-4">
              {result.treatment.map((step, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 glass-tier-3 rounded-2xl border border-white/5 interactive-glass text-text-primary">
                  <span className="bg-green-500/20 text-green-300 border border-green-500/30 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="pt-1 leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prevention */}
          <div className="glass-tier-2 rounded-[32px] p-8 border border-blue-500/20">
            <h4 className="font-bold text-xl text-text-primary mb-5 flex items-center gap-3 text-vibrancy">
              <span className="text-2xl">🛡️</span>
              Preventive Measures / रोकथाम के उपाय
            </h4>
            <ul className="space-y-3">
              {result.preventiveMeasures.map((measure, idx) => (
                <li key={idx} className="flex items-start gap-4 text-sm text-text-secondary p-3 glass-tier-1 rounded-2xl interactive-glass">
                  <span className="text-blue-400 font-bold bg-blue-500/10 p-1 rounded-md text-lg leading-none mt-0.5">•</span>
                  <span className="pt-1">{measure}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedImage(null);
                setResult(null);
              }}
              className="w-full glass-tier-2 text-text-primary px-6 py-4 rounded-2xl interactive-glass transition-all font-semibold flex items-center justify-center gap-3 active:scale-95 apple-focus border border-white/5 hover:border-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back / वापस जाएं
            </button>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setResult(null);
                }}
                className="flex-1 glass-tier-2 text-text-primary px-6 py-4 rounded-2xl interactive-glass transition-all font-semibold flex items-center justify-center gap-3 active:scale-95 apple-focus border border-blue-500/20 hover:border-blue-400/30 hover:bg-blue-500/5 group"
              >
                <Camera className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                Scan Another / दूसरी जांच
              </button>
              <button
                onClick={() => {
                  alert('Treatment plan saved to your dashboard! / उपचार योजना सहेजी गई!');
                }}
                className="flex-1 glass-tier-3 text-text-primary border border-white/10 px-6 py-4 rounded-2xl interactive-glass glass-specular transition-all font-semibold flex items-center justify-center gap-3 active:scale-95 apple-focus shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-1 group"
              >
                <svg className="w-5 h-5 text-green-400 group-hover:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save / सहेजें
              </button>
            </div>

            {/* Expert Consultation Option */}
            <div className="glass-tier-1 rounded-[32px] p-8 mt-4 border border-purple-500/30 bg-purple-500/5 shadow-[0_0_40px_rgba(168,85,247,0.1)] relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-start gap-6 relative z-10">
                <div className="bg-purple-500/20 p-4 rounded-2xl flex-shrink-0 border border-purple-500/30 shadow-inner">
                  <svg className="w-8 h-8 text-purple-300 transform -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl text-text-primary mb-3 flex items-center gap-3 text-vibrancy">
                    <span className="text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">👨‍🌾</span>
                    Need Expert Help? / विशेषज्ञ सहायता चाहिए?
                  </h4>
                  <p className="text-sm text-text-secondary mb-6 leading-relaxed max-w-lg">
                    Connect with our agricultural experts via video call for personalized consultation
                    <br />
                    व्यक्तिगत परामर्श के लिए वीडियो कॉल पर हमारे कृषि विशेषज्ञों से जुड़ें
                  </p>
                  <button
                    onClick={() => {
                      alert('Connecting you to an expert... Please wait.\n\nविशेषज्ञ से जुड़ रहे हैं... कृपया प्रतीक्षा करें।\n\nYou will receive a call within 5 minutes.\nआपको 5 मिनट में कॉल आएगी।');
                    }}
                    className="w-full glass-tier-3 border border-purple-500/40 text-text-primary px-8 py-5 rounded-2xl interactive-glass transition-all font-bold flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:-translate-y-1 active:translate-y-0 apple-focus"
                  >
                    <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200">
                      Consult Expert Now / अभी विशेषज्ञ से परामर्श करें
                    </span>
                  </button>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5 text-xs text-text-tertiary font-medium">
                    <span className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      Available 9 AM - 6 PM
                    </span>
                    <span className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                      <span className="text-lg">✨</span>
                      Free Consultation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
