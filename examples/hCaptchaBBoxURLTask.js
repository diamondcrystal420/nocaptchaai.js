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
  const hCaptchaResult = await NoCaptchaAIClient.solveHCaptchaImages(["https://imgs.hcaptcha.com/zxiltpccUw06a3N867RdCbD/kHvlB2VD8wz00AtRa1axjsO1QF+bSW0SGU64J2mXmY6VVARKaYCG+2R7oiKjJ5u4sSZ0+2UWnplwj7C2+iwxEjV6fO3+clQ44AqVpKuuhAffqkpYits4NWMyvQixcMHZ9bgbjJqQq7HZBDiNZtPqp5gpJTJjGCmSpCMHewJxXIxkHV2JTEADVoA2qgtu9AaflzxegSHh5I2XfaY8oRNzq7AZsiz4ILgsGWXm"], "bbox", "Please click the center of the owl's head", "en")
  console.log(hCaptchaResult);
}
hCaptchaTask();