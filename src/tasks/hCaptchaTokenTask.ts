import axios from "axios";

interface Payload {
    url: string;
    type: string;
    sitekey: string;
    useragent ? : string;
    proxy ? : {
        password ? : string;
        username ? : string;
        ip ? : string;
        port ? : number;
        type ? : string;
    };
}

/**
 * Create a new hCaptcha token task.
 * @returns {Promise<string>} - Promise that resolves to the hCaptcha token.
 * @throws {Error} - Throws an error if the API request fails.
 * @param {object} tokenPayload - Payload of the token request.
 * @param {string} tokenPayload.url - URL of the website where the hCaptcha is located.
 * @param {string} tokenPayload.sitekey - Site key of the hCaptcha.
 * @param {string} tokenPayload.useragent - User agent of the browser, by default random user agent is used.
 * @param {object} [tokenPayload.proxy] - Proxy configuration.
 * @param {string} [tokenPayload.proxy.password] - Proxy password.
 * @param {string} [tokenPayload.proxy.username] - Proxy username.
 * @param {string} [tokenPayload.proxy.ip] - Proxy ip.
 * @param {number} [tokenPayload.proxy.port] - Proxy port.
 * @param {string} [tokenPayload.proxy.type] - Proxy type.
 * @param {string} solveEndpoint - Endpoint of the API.
 * @param {string} apiKey - API key of the account.
 */
export async function createTask(
    tokenPayload: Payload,
    solveEndpoint: string,
    apiKey: string
): Promise < string > {
    const response = await axios.post(solveEndpoint, tokenPayload, {
        headers: {
            "Content-Type": "application/json",
            "apikey": apiKey
        }
    });
    if (response.data.status !== "created") {
        throw new Error(`[API Error] Error while creating new task: ${response.data}`);
    }
    return response.data.url;
}

/**
 * Get the status of a hCaptcha token task.
 * @returns {Promise<string>} - Promise that resolves to the hCaptcha token.
 * @throws {Error} - Throws an error if the API request fails.
 * @param {string} resultURL - URL of the task.
 * @param {number} [maxTries=15] - Timeout in milliseconds.
 * @param {number} [retryInterval=5000] - Interval in milliseconds.
 */
export async function getTaskResult(
    apiKey: string,
    resultURL: string,
    maxTries: number,
    retryInterval: number,
): Promise < string > {
    const startTime = Date.now();
    let result = await axios.get(resultURL, {
        headers: {
            "Content-Type": "application/json",
            "apikey": apiKey
        }
    });
    while (result.data.status != "processed") {
        if (result.data.status == 'failed') {
            throw new Error(`[API Error] Error while getting task result: ${JSON.stringify(result.data)}`);
        }
        if (Date.now() - startTime > maxTries * retryInterval) {
            throw new Error(`[API Error] Error while getting task result: ${JSON.stringify(result.data)}`);
        }
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
        result = await axios.get(resultURL, {
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKey
            }
        });
    }
    if (result.data.success) {
        return result.data.token;
    }
    throw new Error(`[API Error] Error while getting task result: ${JSON.stringify(result.data)}`);
};