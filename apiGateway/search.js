import {
    success,
    failure
} from "../lib/response";
import search from "../lib/spotify";


export async function main(event, context, callback) {
    const body = JSON.parse(event.body);
    let response;
    try {
        let {query, type, offset} = body;
        response = await search(query, type, offset);
        callback(null, success(response));
    } catch (e) {
        console.log(e);
        callback(null, failure({status: false, error: e}));
    }
}

