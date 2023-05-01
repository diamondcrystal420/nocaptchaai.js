import axios from "axios";

interface Payload {
    method: string;
    type: 'grid' | 'bbox' | 'multi';
    images: any;
    ln: string;
    target: string;
    choices ? : string[];
}

/**
 * Create a new hCaptcha image task.
 * @returns {Promise<string>} - Promise that resolves to the result url.
 * @throws {Error} - Throws an error if the API request fails.
 * @param {Payload} imagePayload - Payload of the request.
 * @param {string} solveEndpoint - Endpoint of the API.
 * @param {string} apiKey - API key of the account.
 */
export async function createTask(
    imagePayload: Payload,
    solveEndpoint: string,
    apiKey: string
): Promise < string > {
    imagePayload.images = imagePayload.images.reduce((acc: any, val: any, index: any) => {
        acc[index] = val;
        return acc;
    }, {});
    const response = await axios.post(solveEndpoint, imagePayload, {
        headers: {
            "Content-Type": "application/json",
            "apikey": apiKey
        }
    });
    if (response.data.status !== "solved") {
        throw new Error(`[API Error] Error while creating new task: ${response.data}`);
    }
    if (imagePayload.type == 'grid') return response.data.solution;
    return response.data.answer;
}