import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://13.233.164.128:3001';

const responses = {
  greeting: {
    hi: 'नमस्ते! मैं कृषिमित्र हूं। मैं आपकी मदद कर सकती हूं:\n\n🌤️ मौसम की जानकारी\n🌱 फसल की सलाह\n💰 बाजार भाव\n🐛 कीट और रोग प्रबंधन\n🌾 उर्वरक की सिफारिशें\n\nआप क्या जानना चाहते हैं?',
    en: 'Hello! I am KrishiMitra. I can help you with:\n\n🌤️ Weather information\n🌱 Crop advice\n💰 Market prices\n🐛 Pest and disease management\n🌾 Fertilizer recommendations\n\nWhat would you like to know?',
    ta: 'வணக்கம்! நான் கிருஷிமித்ரா. நான் உங்களுக்கு உதவ முடியும்:\n\n🌤️ வானிலை தகவல்\n🌱 பயிர் ஆலோசனை\n💰 சந்தை விலைகள்\n🐛 பூச்சி மற்றும் நோய் மேலாண்மை\n🌾 உர பரிந்துரைகள்\n\nநீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?',
    te: 'నమస్కారం! నేను కృషిమిత్ర. నేను మీకు సహాయం చేయగలను:\n\n🌤️ వాతావరణ సమాచారం\n🌱 పంట సలహా\n💰 మార్కెట్ ధరలు\n🐛 చీడపురుగుల మరియు వ్యాధి నిర్వహణ\n🌾 ఎరువుల సిఫార్సులు\n\nమీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?',
    kn: 'ನಮಸ್ಕಾರ! ನಾನು ಕೃಷಿಮಿತ್ರ. ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ:\n\n🌤️ ಹವಾಮಾನ ಮಾಹಿತಿ\n🌱 ಬೆಳೆ ಸಲಹೆ\n💰 ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು\n🐛 ಕೀಟ ಮತ್ತು ರೋಗ ನಿರ್ವಹಣೆ\n🌾 ಗೊಬ್ಬರ ಶಿಫಾರಸುಗಳು\n\nನೀವು ಏನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?',
    ml: 'നമസ്കാരം! ഞാൻ കൃഷിമിത്രയാണ്. എനിക്ക് നിങ്ങളെ സഹായിക്കാം:\n\n🌤️ കാലാവസ്ഥാ വിവരം\n🌱 വിള ഉപദേശം\n💰 വിപണി വിലകൾ\n🐛 കീടനാശിനി, രോഗ നിയന്ത്രണം\n🌾 വളം ശുപാർശകൾ\n\nനിങ്ങൾ എന്താണ് അറിയാൻ ആഗ്രഹിക്കുന്നത്?',
    mr: 'नमस्कार! मी कृषिमित्र आहे. मी तुम्हाला मदत करू शकते:\n\n🌤️ हवामान माहिती\n🌱 पीक सल्ला\n💰 बाजार भाव\n🐛 कीटक आणि रोग व्यवस्थापन\n🌾 खत शिफारसी\n\nतुम्हाला काय जाणून घ्यायचे आहे?',
    gu: 'નમસ્તે! હું કૃષિમિત્ર છું. હું તમને મદદ કરી શકું છું:\n\n🌤️ હવામાન માહિતી\n🌱 પાક સલાહ\n💰 બજાર ભાવ\n🐛 જંતુ અને રોગ વ્યવસ્થાપન\n🌾 ખાતર ભલામણો\n\nતમે શું જાણવા માંગો છો?',
    bn: 'নমস্কার! আমি কৃষিমিত্র। আমি আপনাকে সাহায্য করতে পারি:\n\n🌤️ আবহাওয়ার তথ্য\n🌱 ফসল পরামর্শ\n💰 বাজার মূল্য\n🐛 কীটপতঙ্গ এবং রোগ ব্যবস্থাপনা\n🌾 সার সুপারিশ\n\nআপনি কি জানতে চান?',
    pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਕ੍ਰਿਸ਼ੀਮਿੱਤਰ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ:\n\n🌤️ ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ\n🌱 ਫਸਲ ਸਲਾਹ\n💰 ਮਾਰਕੀਟ ਕੀਮਤਾਂ\n🐛 ਕੀੜੇ ਅਤੇ ਰੋਗ ਪ੍ਰਬੰਧਨ\n🌾 ਖਾਦ ਸਿਫਾਰਸ਼ਾਂ\n\nਤੁਸੀਂ ਕੀ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
    or: 'ନମସ୍କାର! ମୁଁ କୃଷିମିତ୍ର। ମୁଁ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିପାରିବି:\n\n🌤️ ପାଣିପାଗ ସୂଚନା\n🌱 ଫସଲ ପରାମର୍ଶ\n💰 ବଜାର ମୂଲ୍ୟ\n🐛 କୀଟ ଏବଂ ରୋଗ ପରିଚାଳନା\n🌾 ସାର ସୁପାରିଶ\n\nଆପଣ କଣ ଜାଣିବାକୁ ଚାହୁଁଛନ୍ତି?',
    as: 'নমস্কাৰ! মই কৃষিমিত্ৰ। মই আপোনাক সহায় কৰিব পাৰোঁ:\n\n🌤️ বতৰৰ তথ্য\n🌱 শস্যৰ পৰামৰ্শ\n💰 বজাৰৰ মূল্য\n🐛 কীট-পতংগ আৰু ৰোগ ব্যৱস্থাপনা\n🌾 সাৰ পৰামৰ্শ\n\nআপুনি কি জানিব বিচাৰে?'
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, language, sessionId, context } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Call backend API for AI response
    try {
      const backendResponse = await fetch(`${BACKEND_URL}/api/chat/public`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          userId: sessionId || `user_${Date.now()}`
        })
      });

      if (backendResponse.ok) {
        const data = await backendResponse.json();
        return NextResponse.json({
          response: data.aiResponse || data.message || 'No response from AI',
          sessionId: sessionId || `session_${Date.now()}`,
          timestamp: new Date().toISOString(),
          language: language || 'hi',
          classification: data.classification,
          suggestions: data.suggestions
        });
      }
    } catch (backendError) {
      console.error('Backend API error:', backendError);
      // Fall back to local response if backend fails
    }

    // Fallback: Generate intelligent response based on message content
    const response = generateIntelligentResponse(message, language || 'hi', context);

    return NextResponse.json({
      response: response,
      sessionId: sessionId || `session_${Date.now()}`,
      timestamp: new Date().toISOString(),
      language: language || 'hi',
    });
  } catch (error: any) {
    console.error('Chat API route error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

function generateIntelligentResponse(message: string, lang: string, context: any): string {
  // Validate language code and default to Hindi if not supported
  const supportedLanguages = ['hi', 'en', 'ta', 'te', 'kn', 'ml', 'mr', 'gu', 'bn', 'pa', 'or', 'as'];
  const language = supportedLanguages.includes(lang) ? lang : 'hi';
  
  const lowerMessage = message.toLowerCase();

  // Weather-related queries
  if (lowerMessage.includes('weather') || lowerMessage.includes('मौसम') || lowerMessage.includes('வானிலை') || 
      lowerMessage.includes('వాతావరణం') || lowerMessage.includes('ಹವಾಮಾನ') || lowerMessage.includes('കാലാവസ്ഥ')) {
    const weatherResponses: { [key: string]: string } = {
      hi: 'मौसम की जानकारी के लिए, कृपया होमपेज पर "Live Weather Dashboard" देखें। आप अपना क्षेत्र दर्ज करके वर्तमान मौसम देख सकते हैं।',
      en: 'For weather information, please check the "Live Weather Dashboard" on the homepage. You can enter your region to see current weather.',
      ta: 'வானிலை தகவலுக்கு, முகப்புப் பக்கத்தில் "நேரடி வானிலை டாஷ்போர்டை" பார்க்கவும். உங்கள் பகுதியை உள்ளிட்டு தற்போதைய வானிலையைக் காணலாம்.',
      te: 'వాతావరణ సమాచారం కోసం, హోమ్‌పేజీలో "లైవ్ వెదర్ డాష్‌బోర్డ్" చూడండి. మీ ప్రాంతాన్ని నమోదు చేసి ప్రస్తుత వాతావరణాన్ని చూడవచ్చు.',
      kn: 'ಹವಾಮಾನ ಮಾಹಿತಿಗಾಗಿ, ಮುಖಪುಟದಲ್ಲಿ "ಲೈವ್ ವೆದರ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್" ನೋಡಿ. ನಿಮ್ಮ ಪ್ರದೇಶವನ್ನು ನಮೂದಿಸಿ ಪ್ರಸ್ತುತ ಹವಾಮಾನವನ್ನು ನೋಡಬಹುದು.',
      ml: 'കാലാവസ്ഥാ വിവരത്തിന്, ഹോംപേജിൽ "ലൈവ് വെതർ ഡാഷ്ബോർഡ്" കാണുക. നിങ്ങളുടെ പ്രദേശം നൽകി നിലവിലെ കാലാവസ്ഥ കാണാം.',
      mr: 'हवामान माहितीसाठी, मुख्यपृष्ठावर "लाइव्ह वेदर डॅशबोर्ड" पहा. तुमचा प्रदेश एंटर करून सध्याचे हवामान पाहू शकता.',
      gu: 'હવામાન માહિતી માટે, હોમપેજ પર "લાઇવ વેધર ડેશબોર્ડ" જુઓ. તમારો વિસ્તાર દાખલ કરીને વર્તમાન હવામાન જોઈ શકો છો.',
      bn: 'আবহাওয়ার তথ্যের জন্য, হোমপেজে "লাইভ ওয়েদার ড্যাশবোর্ড" দেখুন। আপনার এলাকা প্রবেশ করে বর্তমান আবহাওয়া দেখতে পারেন।',
      pa: 'ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ ਲਈ, ਹੋਮਪੇਜ ਤੇ "ਲਾਈਵ ਵੈਦਰ ਡੈਸ਼ਬੋਰਡ" ਦੇਖੋ। ਤੁਸੀਂ ਆਪਣਾ ਖੇਤਰ ਦਾਖਲ ਕਰਕੇ ਮੌਜੂਦਾ ਮੌਸਮ ਦੇਖ ਸਕਦੇ ਹੋ।',
      or: 'ପାଣିପାଗ ସୂଚନା ପାଇଁ, ହୋମପେଜରେ "ଲାଇଭ ୱେଦର ଡ୍ୟାସବୋର୍ଡ" ଦେଖନ୍ତୁ। ଆପଣ ନିଜ ଅଞ୍ଚଳ ପ୍ରବେଶ କରି ବର୍ତ୍ତମାନର ପାଣିପାଗ ଦେଖିପାରିବେ।',
      as: 'বতৰৰ তথ্যৰ বাবে, হোমপেজত "লাইভ ৱেদাৰ ডেশ্বব\'ৰ্ড" চাওক। আপুনি আপোনাৰ অঞ্চল প্ৰবেশ কৰি বৰ্তমানৰ বতৰ চাব পাৰে।'
    };
    return weatherResponses[language] || weatherResponses['hi'];
  }

  // Crop-related queries
  if (lowerMessage.includes('crop') || lowerMessage.includes('फसल') || lowerMessage.includes('பயிர்') || 
      lowerMessage.includes('పంట') || lowerMessage.includes('ಬೆಳೆ') || lowerMessage.includes('വിള')) {
    const cropResponses: { [key: string]: string } = {
      hi: 'फसल की सलाह के लिए, मुझे बताएं:\n1. आपका क्षेत्र/जिला\n2. मिट्टी का प्रकार\n3. कौन सी फसल उगाना चाहते हैं\n\nमैं आपको बुवाई, सिंचाई और उर्वरक की जानकारी दूंगी।',
      en: 'For crop advice, please tell me:\n1. Your region/district\n2. Soil type\n3. Which crop you want to grow\n\nI will provide information about sowing, irrigation, and fertilizers.',
      ta: 'பயிர் ஆலோசனைக்கு, தயவுசெய்து சொல்லுங்கள்:\n1. உங்கள் பகுதி/மாவட்டம்\n2. மண் வகை\n3. எந்த பயிரை வளர்க்க விரும்புகிறீர்கள்\n\nநான் விதைப்பு, நீர்ப்பாசனம் மற்றும் உரங்கள் பற்றிய தகவல்களை வழங்குவேன்.',
      te: 'పంట సలహా కోసం, దయచేసి చెప్పండి:\n1. మీ ప్రాంతం/జిల్లా\n2. నేల రకం\n3. ఏ పంట పండించాలనుకుంటున్నారు\n\nనేను విత్తనం, నీటిపారుదల మరియు ఎరువుల గురించి సమాచారం అందిస్తాను.',
      kn: 'ಬೆಳೆ ಸಲಹೆಗಾಗಿ, ದಯವಿಟ್ಟು ಹೇಳಿ:\n1. ನಿಮ್ಮ ಪ್ರದೇಶ/ಜಿಲ್ಲೆ\n2. ಮಣ್ಣಿನ ಪ್ರಕಾರ\n3. ಯಾವ ಬೆಳೆ ಬೆಳೆಯಲು ಬಯಸುತ್ತೀರಿ\n\nನಾನು ಬಿತ್ತನೆ, ನೀರಾವರಿ ಮತ್ತು ಗೊಬ್ಬರಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡುತ್ತೇನೆ.',
      ml: 'വിള ഉപദേശത്തിന്, ദയവായി പറയുക:\n1. നിങ്ങളുടെ പ്രദേശം/ജില്ല\n2. മണ്ണിന്റെ തരം\n3. ഏത് വിള വളർത്താൻ ആഗ്രഹിക്കുന്നു\n\nഞാൻ വിതയ്ക്കൽ, ജലസേചനം, വളങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള വിവരങ്ങൾ നൽകും.',
      mr: 'पीक सल्ल्यासाठी, कृपया सांगा:\n1. तुमचा प्रदेश/जिल्हा\n2. मातीचा प्रकार\n3. कोणते पीक पिकवायचे आहे\n\nमी पेरणी, सिंचन आणि खतांबद्दल माहिती देईन.',
      gu: 'પાક સલાહ માટે, કૃપા કરીને કહો:\n1. તમારો વિસ્તાર/જિલ્લો\n2. માટીનો પ્રકાર\n3. કયો પાક ઉગાડવા માંગો છો\n\nહું વાવણી, સિંચાઈ અને ખાતરો વિશે માહિતી આપીશ.',
      bn: 'ফসল পরামর্শের জন্য, দয়া করে বলুন:\n1. আপনার এলাকা/জেলা\n2. মাটির ধরন\n3. কোন ফসল চাষ করতে চান\n\nআমি বপন, সেচ এবং সার সম্পর্কে তথ্য দেব।',
      pa: 'ਫਸਲ ਸਲਾਹ ਲਈ, ਕਿਰਪਾ ਕਰਕੇ ਦੱਸੋ:\n1. ਤੁਹਾਡਾ ਖੇਤਰ/ਜ਼ਿਲ੍ਹਾ\n2. ਮਿੱਟੀ ਦੀ ਕਿਸਮ\n3. ਕਿਹੜੀ ਫਸਲ ਉਗਾਉਣੀ ਚਾਹੁੰਦੇ ਹੋ\n\nਮੈਂ ਬੀਜਣ, ਸਿੰਚਾਈ ਅਤੇ ਖਾਦ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦੇਵਾਂਗੀ।',
      or: 'ଫସଲ ପରାମର୍ଶ ପାଇଁ, ଦୟାକରି କୁହନ୍ତୁ:\n1. ଆପଣଙ୍କ ଅଞ୍ଚଳ/ଜିଲ୍ଲା\n2. ମାଟିର ପ୍ରକାର\n3. କେଉଁ ଫସଲ ଚାଷ କରିବାକୁ ଚାହୁଁଛନ୍ତି\n\nମୁଁ ବୁଣିବା, ଜଳସେଚନ ଏବଂ ସାର ବିଷୟରେ ସୂଚନା ଦେବି।',
      as: 'শস্যৰ পৰামৰ্শৰ বাবে, অনুগ্ৰহ কৰি কওক:\n1. আপোনাৰ অঞ্চল/জিলা\n2. মাটিৰ প্ৰকাৰ\n3. কোন শস্য খেতি কৰিব বিচাৰে\n\nমই সিঁচা, জলসিঞ্চন আৰু সাৰৰ বিষয়ে তথ্য দিম।'
    };
    return cropResponses[language] || cropResponses['hi'];
  }

  // Market price queries
  if (lowerMessage.includes('price') || lowerMessage.includes('market') || lowerMessage.includes('भाव') || 
      lowerMessage.includes('मंडी') || lowerMessage.includes('விலை') || lowerMessage.includes('ధర')) {
    const priceResponses: { [key: string]: string } = {
      hi: 'बाजार भाव की जानकारी के लिए, कृपया होमपेज पर "Live Mandi Prices" देखें। आप अपने क्षेत्र की मंडी के ताजा भाव देख सकते हैं।',
      en: 'For market prices, please check "Live Mandi Prices" on the homepage. You can see the latest prices from your local mandi.',
      ta: 'சந்தை விலைகளுக்கு, முகப்புப் பக்கத்தில் "நேரடி மண்டி விலைகள்" பார்க்கவும். உங்கள் உள்ளூர் மண்டியின் சமீபத்திய விலைகளைக் காணலாம்.',
      te: 'మార్కెట్ ధరల కోసం, హోమ్‌పేజీలో "లైవ్ మండి ధరలు" చూడండి. మీ స్థానిక మండి నుండి తాజా ధరలను చూడవచ్చు.',
      kn: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳಿಗಾಗಿ, ಮುಖಪುಟದಲ್ಲಿ "ಲೈವ್ ಮಂಡಿ ಬೆಲೆಗಳು" ನೋಡಿ. ನಿಮ್ಮ ಸ್ಥಳೀಯ ಮಂಡಿಯಿಂದ ಇತ್ತೀಚಿನ ಬೆಲೆಗಳನ್ನು ನೋಡಬಹುದು.',
      ml: 'വിപണി വിലകൾക്കായി, ഹോംപേജിൽ "ലൈവ് മണ്ടി വിലകൾ" കാണുക. നിങ്ങളുടെ പ്രാദേശിക മണ്ടിയിൽ നിന്നുള്ള ഏറ്റവും പുതിയ വിലകൾ കാണാം.',
      mr: 'बाजार भावासाठी, मुख्यपृष्ठावर "लाइव्ह मंडी भाव" पहा. तुमच्या स्थानिक मंडीतील ताज्या भाव पाहू शकता.',
      gu: 'બજાર ભાવ માટે, હોમપેજ પર "લાઇવ મંડી ભાવ" જુઓ. તમે તમારા સ્થાનિક મંડીના તાજા ભાવ જોઈ શકો છો.',
      bn: 'বাজার মূল্যের জন্য, হোমপেজে "লাইভ মান্ডি মূল্য" দেখুন। আপনার স্থানীয় মান্ডির সর্বশেষ মূল্য দেখতে পারেন।',
      pa: 'ਮਾਰਕੀਟ ਕੀਮਤਾਂ ਲਈ, ਹੋਮਪੇਜ ਤੇ "ਲਾਈਵ ਮੰਡੀ ਕੀਮਤਾਂ" ਦੇਖੋ। ਤੁਸੀਂ ਆਪਣੀ ਸਥਾਨਕ ਮੰਡੀ ਦੀਆਂ ਤਾਜ਼ਾ ਕੀਮਤਾਂ ਦੇਖ ਸਕਦੇ ਹੋ।',
      or: 'ବଜାର ମୂଲ୍ୟ ପାଇଁ, ହୋମପେଜରେ "ଲାଇଭ ମଣ୍ଡି ମୂଲ୍ୟ" ଦେଖନ୍ତୁ। ଆପଣ ନିଜ ସ୍ଥାନୀୟ ମଣ୍ଡିର ସର୍ବଶେଷ ମୂଲ୍ୟ ଦେଖିପାରିବେ।',
      as: 'বজাৰৰ মূল্যৰ বাবে, হোমপেজত "লাইভ মণ্ডি মূল্য" চাওক। আপুনি আপোনাৰ স্থানীয় মণ্ডিৰ সৰ্বশেষ মূল্য চাব পাৰে।'
    };
    return priceResponses[language] || priceResponses['hi'];
  }

  // Default greeting
  return responses.greeting[language] || responses.greeting['hi'];
}
