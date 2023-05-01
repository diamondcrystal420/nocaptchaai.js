// Import the NoCaptchaAI module
const { NoCaptchaAI } = require('../dist/index.js');

const hCaptchaToken = async () => {
  // Create a new basic NoCaptchaAI client
  const NoCaptchaAIClient = await NoCaptchaAI.init("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  // or create a new NoCaptchaAI client with auto balance check before creating a task
  // const NoCaptchaAIClient = await NoCaptchaAI.init("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", true);

  // Get your current remaining balance from your NoCaptchaAI plan
  const accountBalance = await NoCaptchaAIClient.getBalance();
  // Check if you have enough funds to create a task
  if(accountBalance < 5) return console.log("You don't have enough funds to create a task.");
  const capToken = await NoCaptchaAIClient.solveHCaptcha("example.com", "005814c5-818b-43ee-ba07-fa4c965c7147", {
    type: "http",
    ip: "123.123.123.123",
    port: 1111,
    username: "user",
    password: "pw"
  });
  console.log(capToken);
}
hCaptchaToken();