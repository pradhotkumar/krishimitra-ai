'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, AlertCircle, CheckCircle } from 'lucide-react';

interface ScanResult {
  disease: string;
  confidence: number;
  severity: string;
  treatment: string[];
  preventiveMeasures: string[];
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
    // Simulate AI analysis
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
        ]
      });
      setScanning(false);
    }, 2500);
  };

  return (
    <div>
      {/* Camera View */}
      {showCamera && (
        <div className="space-y-4">
          <div className="relative bg-gray-900 rounded-xl overflow-hidden">
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
              <div className="absolute inset-4 border-2 border-white/50 rounded-xl flex items-center justify-center">
                <p className="text-white text-sm bg-black/50 px-4 py-2 rounded-lg">
                  Position leaf in frame / पत्ती को फ्रेम में रखें
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={stopCamera}
              className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel / रद्द करें
            </button>
            <button
              onClick={capturePhoto}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Capture / फोटो लें
            </button>
          </div>
        </div>
      )}

      {/* Upload Section */}
      {!selectedImage && !showCamera && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Upload Leaf Photo / पत्ती की फोटो अपलोड करें
            </h3>
            <p className="text-gray-600 text-sm">
              Take a clear photo of the affected leaf for AI analysis
              <br />
              प्रभावित पत्ती की स्पष्ट फोटो लें
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Camera Option */}
            <button
              onClick={startCamera}
              className="border-2 border-dashed border-green-300 rounded-xl p-8 hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <Camera className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-800">Take Photo</p>
              <p className="text-sm text-gray-600">फोटो लें</p>
            </button>

            {/* File Upload Option */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-blue-300 rounded-xl p-8 hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-800">Upload from Device</p>
              <p className="text-sm text-gray-600">डिवाइस से अपलोड करें</p>
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
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Leaf"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                  title="Remove / हटाएं"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={handleScan}
                disabled={scanning}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-semibold"
              >
                {scanning ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing... / विश्लेषण हो रहा है...
                  </span>
                ) : (
                  'Scan for Diseases / रोग की जांच करें'
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={selectedImage!}
                  alt="Scanned Leaf"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>

              {/* Disease Info */}
              <div className={`border-l-4 rounded-xl p-5 ${
                result.severity === 'High' ? 'border-red-500 bg-red-50' :
                result.severity === 'Moderate' ? 'border-orange-500 bg-orange-50' :
                'border-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`w-6 h-6 flex-shrink-0 ${
                    result.severity === 'High' ? 'text-red-600' :
                    result.severity === 'Moderate' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {result.disease}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-medium">
                        Confidence / विश्वास: {result.confidence}%
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        result.severity === 'High' ? 'bg-red-200 text-red-700' :
                        result.severity === 'Moderate' ? 'bg-orange-200 text-orange-700' :
                        'bg-yellow-200 text-yellow-700'
                      }`}>
                        {result.severity} Severity / गंभीरता
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatment */}
              <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Recommended Treatment / अनुशंसित उपचार
                </h4>
                <ul className="space-y-2">
                  {result.treatment.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-3">
                  🛡️ Preventive Measures / रोकथाम के उपाय
                </h4>
                <ul className="space-y-2">
                  {result.preventiveMeasures.map((measure, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-600">•</span>
                      {measure}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setResult(null);
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Scan Another / दूसरी जांच करें
                  </button>
                  <button
                    onClick={() => {
                      alert('Treatment plan saved to your dashboard! / उपचार योजना सहेजी गई!');
                    }}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Save Plan / योजना सहेजें
                  </button>
                </div>

                {/* Expert Consultation Option */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-5 border-2 border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2">
                        Need Expert Help? / विशेषज्ञ सहायता चाहिए?
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Connect with our agricultural experts via video call for personalized consultation
                        <br />
                        व्यक्तिगत परामर्श के लिए वीडियो कॉल पर हमारे कृषि विशेषज्ञों से जुड़ें
                      </p>
                      <button
                        onClick={() => {
                          alert('Connecting you to an expert... Please wait. / विशेषज्ञ से जुड़ रहे हैं... कृपया प्रतीक्षा करें।');
                          // In production, this would open a video call interface
                        }}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Video Call Expert / विशेषज्ञ से वीडियो कॉल करें
                      </button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Available 9 AM - 6 PM / सुबह 9 बजे से शाम 6 बजे तक उपलब्ध
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
    </div>
  );
}
