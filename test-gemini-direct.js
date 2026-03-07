// Direct test of Gemini API
const https = require('https');

const GEMINI_API_KEY = 'AIzaSyADTeUX40absKCqvTRXRJE9A-5MAFh4r-U';
const message = 'how to grow tomato';

const data = JSON.stringify({
  contents: [{
    parts: [{
      text: `You are KrishiMitra AI, an agriculture expert. Answer this farmer's question in 2-3 sentences: ${message}`
    }]
  }]
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🧪 Testing Gemini API directly...\n');

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('\nResponse:');
    
    try {
      const parsed = JSON.parse(responseData);
      if (parsed.candidates && parsed.candidates[0]) {
        const text = parsed.candidates[0].content.parts[0].text;
        console.log('\n✅ SUCCESS! Gemini Response:');
        console.log(text);
      } else {
        console.log('\n❌ Unexpected response format:');
        console.log(JSON.stringify(parsed, null, 2));
      }
    } catch (e) {
      console.log('\n❌ Error parsing response:');
      console.log(responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error);
});

req.write(data);
req.end();
