// Import the NoCaptchaAI module
const { NoCaptchaAI } = require('../dist/index.js');

const hCaptchaToken = async () => {
  // Create a new NoCaptchaAI client with auto balance check before creating a task
  const NoCaptchaAIClient = await NoCaptchaAI.init("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", true);
  
  const capToken = await NoCaptchaAIClient.solveProxylessHCaptcha("example.com", "005814c5-818b-43ee-ba07-fa4c965c7147");
  console.log(capToken);
}
hCaptchaToken();