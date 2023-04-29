import axios from "axios";
import {
    createTask as createHCaptchaTokenTask
} from "./tasks/hCaptchaTokenTask";
import {
    getTaskResult as getHCaptchaTokenTaskResult
} from "./tasks/hCaptchaTokenTask";

export class NoCaptchaAI {

    /**
     * Initialize a new NoCaptchaAI object.
     * @param {string} apiKey - Unique API key of your noCaptchaAI.com account.
     * @param {boolean} [autoBalanceCheck=false] - Check account balance automatically before creating a task.
     */
    apiKey: string;
    checkBalance: boolean;
    solveEndpoint: string;

    constructor(apiKey: string, autoBalanceCheck: boolean = false) {
        this.apiKey = apiKey;
        this.checkBalance = autoBalanceCheck;
        this.solveEndpoint = "https://token.nocaptchaai.com/token";
    }

    async _getBalance(): Promise < number > {
        const result = await axios.get("https://manage.nocaptchaai.com/api/user/get_balance", {
            headers: {
                "Content-Type": "application/json",
                "apiKey": this.apiKey,
            },
        });
        return result.data.Subscription.remaining;
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
            }, this.solveEndpoint, this.apiKey);
            const tokenResult = await getHCaptchaTokenTaskResult(this.apiKey, resultURL, maxTries, retryInterval);
            return tokenResult;
        } else {
            const resultURL = await createHCaptchaTokenTask({
                type: "hcaptcha",
                url: websiteURL,
                sitekey: websiteKey,
                proxy
            }, this.solveEndpoint, this.apiKey);
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
            }, this.solveEndpoint, this.apiKey);
            const tokenResult = await getHCaptchaTokenTaskResult(this.apiKey, resultURL, maxTries, retryInterval);
            return tokenResult;
        } else {
            const resultURL = await createHCaptchaTokenTask({
                type: "hcaptcha",
                url: websiteURL,
                sitekey: websiteKey,
                proxy
            }, this.solveEndpoint, this.apiKey);
            const tokenResult = await getHCaptchaTokenTaskResult(this.apiKey, resultURL, maxTries, retryInterval);
            return tokenResult;
        }
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