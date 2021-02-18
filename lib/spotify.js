import axios from "axios";
const searchUrl = process.env.SPOTIFY_SEARCH_URL;
const clientTokenUrl = process.env.SPOTIFY_TOKEN_URL;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export async function search(query, type, offset) {
    let token = await fetchToken(clientId, clientSecret);

    const params = new URLSearchParams()
    params.append('q', query);
    params.append('type', type);
    params.append('offset', offset);

    const config = {
        params,
        headers: {
            'Authorization': 'Bearer  ' + token
        }
    }
    let response = await axios.get(searchUrl, config);
    return response.data;

}


/**
 * Request a bearer token from spotify.
 * This token has a timeout, and would ideally be cached until it was invalid
 * @param clientId
 * @param clientSecret
 */
async function fetchToken(clientId, clientSecret) {
    let buff = new Buffer.from(clientId + ':' + clientSecret),
        authorization = buff.toString('base64');

    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + authorization
        }
    }

    let response = await axios.post(clientTokenUrl, params, config);
    return response.data.access_token;
}
