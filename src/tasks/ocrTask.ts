import axios from "axios";

interface Payload {
  method: string;
  image: string;
}

/**
 * Create a new OCR task.
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
    const response = await axios.post(solveEndpoint, imagePayload, {
        headers: {
            "Content-Type": "application/json",
            "apikey": apiKey
        }
    });
    if (response.data.status !== "solved") {
        throw new Error(`[API Error] Error while creating new task: ${response.data}`);
    }
    return response.data.solution;
}