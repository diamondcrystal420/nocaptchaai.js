# NoCaptchaAI.js

A simple TypeScript/JavaScript wrapper for the NoCaptchaAI API. Easy to use and simple to implement.

## noCaptchaAI Dashboard

You can find your API key and manage your account at [NoCaptchaAI](https://dash.nocaptchaai.com/).
- Get **6000** free captcha solves just by sharing noCaptchaAI on your socials.
- Cheapest plans for captcha solving on the market.
- [Chrome Extension](https://github.com/noCaptchaAi/chrome-extension), [Userscripts](https://github.com/noCaptchaAi/hCaptcha-Solver-UserScript) and much more available too.

## New to noCaptchaAI?

No worries! There is a [Getting Started Guide](https://docs.nocaptchaai.com/en/GetStarted/quickstart.html) to help you out.

Join today and solve thousands of captchas with ease and at the lowest price on the market.

**[SIGN UP NOW AND GET 6000 FREE CAPTCHA SOLVES JUST BY SHARING noCaptchaAI ON YOUR SOCIALS](https://dash.nocaptchaai.com/invite/r-djc-wxvbu)**

# USAGE

Import the module
```javascript
const { NoCaptchaAI } = require('nocaptchaai.js');
```

Create a new client with your NoCaptchaAI API key
```javascript
// Create new client without auto balance check
const NoCaptchaAIClient = await NoCaptchaAI.init("YOUR_NOCAPTCHAAI_API_KEY");
```

or

Create a new client with your NoCaptchaAI API key that checks your balance before creating a task
```javascript
// Create new client with auto balance check
const NoCaptchaAIClient = await NoCaptchaAI.init("YOUR_NOCAPTCHAAI_API_KEY", true);
```

Check your balance manually
```javascript
  // Get your current remaining balance from your NoCaptchaAI plan
  const accountBalance = await NoCaptchaAIClient.getBalance();
  // Check if you have enough funds to create a task
  if(accountBalance < 5) return console.log("You don't have enough funds to create a task.");
```

## hCaptcha

Solve a hCaptcha task (basic) | cost: 5 request
```javascript
const capToken = await NoCaptchaAIClient.solveProxylessHCaptcha("example.com", "005814c5-818b-43ee-ba07-fa4c965c7147");
```
Solve a hCaptcha task (with proxy, recommended) | cost: 5 request
```javascript
const capToken = await NoCaptchaAIClient.solveHCaptcha("example.com", "005814c5-818b-43ee-ba07-fa4c965c7147", {
  type: "http",
  ip: "123.123.123.123",
  port: 1111,
  username: "user",
  password: "pw"
});
```

## ProBot OCR Captchas

Solve a OCR captcha by using a base64 encoded image | cost: 1 request
```javascript
  const ocrResult = await NoCaptchaAIClient.solveOCRImage("BASE_64_STRING")
```

or

Solve a OCR captcha by using a URL | cost: 1 request
```javascript
  const ocrResult = await NoCaptchaAIClient.solveOCRImage("https://media.discordapp.net/attachments/886309080099086336/102102717165506560/SomeNiceImage.png")
```

## hCaptcha Image

Solve a hCaptcha grid task by using the image URL or base64 | cost: 1 request
```javascript
  const hCaptchaResult = await NoCaptchaAIClient.solveHCaptchaImages([
    'IMG_URL_1_OR_BASE64',
    'IMG_URL_2_OR_BASE64',
    'IMG_URL_3_OR_BASE64',
    'IMG_URL_4_OR_BASE64',
    'IMG_URL_5_OR_BASE64',
    'IMG_URL_6_OR_BASE64',
    'IMG_URL_7_OR_BASE64',
    'IMG_URL_8_OR_BASE64',
    'IMG_URL_9_OR_BASE64',
  ], "grid", "Target Task", "en")
```

Solve a hCaptcha bounding box task by using the image URL or base64 | cost: 1 request
```javascript
  const hCaptchaResult = await NoCaptchaAIClient.solveHCaptchaImages([
    'IMG_URL_OR_BASE64'
  ], "bbox", "Target Task", "en")
```

Solve a hCaptcha multi select task by using the image URL or base64 | cost: 1 request
```javascript
  const hCaptchaResult = await NoCaptchaAIClient.solveHCaptchaImages([
    'IMG_URL_OR_BASE64'
  ], "multi", "Target Task", "en", ["CHOICE_ONE", "CHOICE_TWO", "CHOICE_THREE"])
```

# Examples

For complete and more examples, check out the examples folder.