import axios from "axios";
import {
    createTask as createHCaptchaTokenTask
} from "./tasks/hCaptchaTokenTask";
import {
    getTaskResult as getHCaptchaTokenTaskResult
} from "./tasks/hCaptchaTokenTask";
import {
  createTask as createOCRTask
} from "./tasks/ocrTask";

export class NoCaptchaAI {

    /**
     * Initialize a new NoCaptchaAI object.
     * @param {string} apiKey - Unique API key of your noCaptchaAI.com account.
     * @param {boolean} [autoBalanceCheck=false] - Check account balance automatically before creating a task.
     */
    apiKey: string;
    checkBalance: boolean;
    solveEndpoint: string;
    balanceEndpoint: string;

    private constructor(apiKey: string, solveEndpoint: string, balanceEndpoint: string, autoBalanceCheck: boolean = false) {
        this.apiKey = apiKey;
        this.checkBalance = autoBalanceCheck;
        this.solveEndpoint = solveEndpoint;
        this.balanceEndpoint = balanceEndpoint;
    }

    public static async init(apiKey: string, autoBalanceCheck: boolean = false): Promise < NoCaptchaAI > {
      const { solveEndpoint, balanceEndpoint } = await _getEndpoints(apiKey);
        const instance = new NoCaptchaAI(apiKey, solveEndpoint, balanceEndpoint, autoBalanceCheck);
        return instance;
    }

    async _getBalance(): Promise < number > {
        const result = await axios.get(this.balanceEndpoint, {
            headers: {
                "Content-Type": "application/json",
                "apiKey": this.apiKey,
            },
        });
        if(result.data.Subscription) return result.data.Subscription.remaining;
        return result.data.remaining;
    }

    async _isURL(url: string): Promise < boolean > {
        const pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //port
            "(\\?[;&amp;a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
        return pattern.test(url);
    }

    async _getBase64FromURL(url: string): Promise < string > {
        try {
          const isImage = /(jpeg|jpg|png|gif)$/i.test(url);
          if (!isImage) {
            throw new Error('The provided URL is not an image.');
          }
          const response = await axios.get(url, {
            responseType: 'arraybuffer',
          });
          const buffer = new Uint8Array(response.data);
          const array = Array.from(buffer);
          const base64 = btoa(String.fromCharCode.apply(null, array));
          return base64;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(`Failed to fetch base64 image from URL: ${url}`);
          } else {
            throw error;
          }
        }
    }

    /**
     * Create a new hCaptcha token task.
     * @returns {Promise<Object>} - Promise that resolves to the hCaptcha token.
     * @throws {Error} - Throws an error if the API request fails.
     * @param {string} websiteURL - URL of the website where the hCaptcha is located.
     * @param {string} websiteKey - Site key of the hCaptcha.
     * @param {string} userAgent - User agent of the browser, by default random user agent is used.
     * @param {Object} [proxy] - Proxy configuration.
     * @param {string} [proxy.password] - Proxy password.
     * @param {string} [proxy.username] - Proxy username.
     * @param {string} [proxy.ip] - Proxy ip.
     * @param {number} [proxy.port] - Proxy port.
     * @param {string} [proxy.type] - Proxy type.
     * @param {number} [maxTries=15] - Timeout in milliseconds.
     * @param {number} [retryInterval=5000] - Interval in milliseconds.
     */
    async solveHCaptcha(
        websiteURL: string,
        websiteKey: string,
        proxy: {
            password: string;
            username: string;
            ip: string;
            port: number;
            type: string;
        },
        userAgent ? : string,
        maxTries: number = 15,
        retryInterval: number = 5000
    ): Promise < string > {
        if (this.checkBalance) {
            const balance = await this._getBalance();
            if (balance < 5) throw new Error("[API Error] Your account balance smaller than 5, please add funds to your account/ upgrade your plan.");
        }

        if (userAgent !== undefined && typeof userAgent === "string") {
            const resultURL = await createHCaptchaTokenTask({
                type: "hcaptcha",
                url: websiteURL,
                sitekey: websiteKey,
                useragent: userAgent,
                proxy
            }, "https://token.nocaptchaai.com/token", this.apiKey);
            const tokenResult = await getHCaptchaTokenTaskResult(this.apiKey, resultURL, maxTries, retryInterval);
            return tokenResult;
        } else {
            const resultURL = await createHCaptchaTokenTask({
                type: "hcaptcha",
                url: websiteURL,
                sitekey: websiteKey,
                proxy
            }, "https://token.nocaptchaai.com/token", this.apiKey);
            const tokenResult = await getHCaptchaTokenTaskResult(this.apiKey, resultURL, maxTries, retryInterval);
            return tokenResult;
        }
    }

    /**
     * Create a new hCaptcha token task.
     * @returns {Promise<Object>} - Promise that resolves to the hCaptcha token.
     * @throws {Error} - Throws an error if the API request fails.
     * @param {string} websiteURL - URL of the website where the hCaptcha is located.
     * @param {string} websiteKey - Site key of the hCaptcha.
     * @param {string} userAgent - User agent of the browser, by default random user agent is used.
     * @param {Object} [proxy] - Proxy configuration.
     * @param {string} [proxy.password] - Proxy password.
     * @param {string} [proxy.username] - Proxy username.
     * @param {string} [proxy.ip] - Proxy ip.
     * @param {number} [proxy.port] - Proxy port.
     * @param {string} [proxy.type] - Proxy type.
     * @param {number} [maxTries=15] - Timeout in milliseconds.
     * @param {number} [retryInterval=5000] - Interval in milliseconds.
     */
    async solveProxylessHCaptcha(
        websiteURL: string,
        websiteKey: string,
        userAgent ? : string,
        maxTries: number = 15,
        retryInterval: number = 5000
    ): Promise < string > {
        if (this.checkBalance) {
            const balance = await this._getBalance();
            if (balance < 5) throw new Error("[API Error] Your account balance smaller than 5, please add funds to your account/ upgrade your plan.");
        }
        const proxy = {}
        if (userAgent !== undefined && typeof userAgent === "string") {
            const resultURL = await createHCaptchaTokenTask({
                type: "hcaptcha",
                url: websiteURL,
                sitekey: websiteKey,
                useragent: userAgent,
                proxy
            }, "https://token.nocaptchaai.com/token", this.apiKey);
            const tokenResult = await getHCaptchaTokenTaskResult(this.apiKey, resultURL, maxTries, retryInterval);
            return tokenResult;
        } else {
            const resultURL = await createHCaptchaTokenTask({
                type: "hcaptcha",
                url: websiteURL,
                sitekey: websiteKey,
                proxy
            }, "https://token.nocaptchaai.com/token", this.apiKey);
            const tokenResult = await getHCaptchaTokenTaskResult(this.apiKey, resultURL, maxTries, retryInterval);
            return tokenResult;
        }
    }

    /**
     * Create a new ocr task.
     * @returns {Promise<Object>} - Promise that resolves to the ocr result.
     * @throws {Error} - Throws an error if the API request fails.
     * @param {string} base64Image - base64 of the ocr image.
     */
    async solveOCRImage(
      base64Image: string
  ): Promise < string > {
      if (this.checkBalance) {
          const balance = await this._getBalance();
          if (balance < 5) throw new Error("[API Error] Your account balance smaller than 5, please add funds to your account/ upgrade your plan.");
      }
      if(await this._isURL(base64Image)) {
        base64Image = await this._getBase64FromURL(base64Image);
      }
      const ocrResult = await createOCRTask({
        method: "ocr",
        image: base64Image
      }, "https://free.nocaptchaai.com/solve", this.apiKey);
      return ocrResult;
  }

    /**
     * Get the amount of the balance that is remaining.
     * @returns {Promise<number>} - Promise that resolves to the remaining balance.
     * @throws {Error} - Throws an error if the API request fails.
     */
    async getBalance(): Promise < number > {
        return await this._getBalance();
    }
}

async function _getEndpoints(apiKey: string): Promise < { solveEndpoint: string, balanceEndpoint: string } > {
  const result = await axios.get("https://manage.nocaptchaai.com/api/user/get_endpoint", {
      headers: {
          "Content-Type": "application/json",
          "apiKey": apiKey,
      },
  });
  if(result.data.plan == "free") return { solveEndpoint: "https://free.nocaptchaai.com/solve", balanceEndpoint: "https://free.nocaptchaai.com/balance" };
  return { solveEndpoint: "https://pro.nocaptchaai.com/solve", balanceEndpoint: "https://manage.nocaptchaai.com/balance" };
}