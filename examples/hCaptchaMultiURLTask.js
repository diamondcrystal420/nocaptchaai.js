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
  const hCaptchaResult = await NoCaptchaAIClient.solveHCaptchaImages(["https://imgs.hcaptcha.com/Cdlb7/mZ65V7uRTBtFJ3tlUEZ73xbOQGgmES2EW0whdOzuEoWsyKPGcerXqx7BPV2ehVdUU2boCSFPzsIwpalwMtkdS1+xpwmI9zANpcD6Cy20KgrljOMQ2OiCUMNmgx+VgiykoVcQ/VhquE8Z9KMxoVvSf5EG+Uvry+Z1mRmhJiQNRBgVRtUFHoD9mYhdVyM/LvS3SnP+GT0tbpQC25E1IX/F6oMZ4vhHBgcImJfwNlYxomY/Z59/YiBvi+pf6FSdU=AyKhnpoYzjjgiV3g"], "multi", "Select the most accurate description of the image", "en", ["Living room", "Bedroom", "Kitchen"])
  console.log(hCaptchaResult);
}
hCaptchaTask();