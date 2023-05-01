// Import the NoCaptchaAI module
const { NoCaptchaAI } = require('../dist/index.js');

const ocrTask = async () => {
  // Create a new basic NoCaptchaAI client
  const NoCaptchaAIClient = await NoCaptchaAI.init("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  // or create a new NoCaptchaAI client with auto balance check before creating a task
  // const NoCaptchaAIClient = await NoCaptchaAI.init("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", true);
  
  // Get your current remaining balance from your NoCaptchaAI plan
  const accountBalance = await NoCaptchaAIClient.getBalance();
  // Check if you have enough funds to create a task
  if(accountBalance < 1) return console.log("You don't have enough funds to create a task.");
  const ocrResult = await NoCaptchaAIClient.solveOCRImage("https://media.discordapp.net/attachments/886309080099086336/102102717165506560/SomeNiceImage.png")
  console.log(ocrResult);
}
ocrTask();