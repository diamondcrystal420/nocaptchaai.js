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
  const hCaptchaResult = await NoCaptchaAIClient.solveHCaptchaImages([
    'BASE64 IMAGE 1',
    'BASE64 IMAGE 2',
    'BASE64 IMAGE 3',
    'BASE64 IMAGE 4',
    'BASE64 IMAGE 5',
    'BASE64 IMAGE 6',
    'BASE64 IMAGE 7',
    'BASE64 IMAGE 8',
    'BASE64 IMAGE 9',
  ], "grid", "Please click each image containing a bee flying near a flower", "en")
  console.log(hCaptchaResult);
}
hCaptchaTask();