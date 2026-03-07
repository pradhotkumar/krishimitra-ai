// Simple Bedrock Test - Run this on EC2 to diagnose the issue
const { BedrockRuntimeClient, ConverseCommand } = require('@aws-sdk/client-bedrock-runtime');

async function testBedrock() {
  console.log('🧪 Testing AWS Bedrock Connection...\n');

  const client = new BedrockRuntimeClient({
    region: 'ap-south-1'
  });

  const modelId = 'arn:aws:bedrock:ap-south-1:268582879394:inference-profile/global.anthropic.claude-sonnet-4-6';

  try {
    console.log('📡 Calling Bedrock with model:', modelId);
    
    const command = new ConverseCommand({
      modelId: modelId,
      messages: [
        {
          role: "user",
          content: [{ text: "Say hello in one sentence" }]
        }
      ],
      inferenceConfig: {
        maxTokens: 100,
        temperature: 0.7
      }
    });

    const response = await client.send(command);
    const message = response.output?.message?.content?.[0]?.text;

    console.log('\n✅ SUCCESS! Bedrock is working!');
    console.log('📝 Response:', message);
    console.log('\n🎉 Your Bedrock integration is configured correctly!');
    
  } catch (error) {
    console.log('\n❌ FAILED! Bedrock is not working.');
    console.log('Error type:', error.name);
    console.log('Error message:', error.message);
    console.log('\nCommon issues:');
    console.log('1. AccessDeniedException → IAM role missing Bedrock permissions');
    console.log('2. ResourceNotFoundException → Model ID is wrong or not available');
    console.log('3. ValidationException → Invalid parameters');
    console.log('4. Module not found → Run: npm install @aws-sdk/client-bedrock-runtime');
    console.log('\nFull error:', error);
  }
}

testBedrock();
