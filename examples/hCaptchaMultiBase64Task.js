// Import the hCaptchaAI module
const { NoCaptchaAI } = require('../dist/index.js');


const hCaptchaTask = async () => {
  // Create a new basic NoCaptchaAI client
  const NoCaptchaAIClient = await NoCaptchaAI.init("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  // or create a new NoCaptchaAI client with auto balance check before creating a task
  // const NoCaptchaAIClient = await NoCaptchaAI.init("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", true);
  
  // Get your current remaining balance from your NoCaptchaAI plan
  const accountBalance = await NoCaptchaAIClient.getBalance();
  // Check if you have enough funds to create a task
  if(accountBalance < 1) return console.log("You don't have enough funds to create a task.");
  const hCaptchaResult = await NoCaptchaAIClient.solveHCaptchaImages(["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"], "multi", "Select the most accurate description of the image", "en", ["Living room", "Bedroom", "Kitchen"])
  console.log(hCaptchaResult);
}
hCaptchaTask();