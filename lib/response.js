import AWS from "aws-sdk/index";

/**
 * API call success response
 * @param body
 * @returns {{statusCode, headers, body}}
 */
export function success(body) {
    return buildResponse(200, body);
}

/**
 * API call failure response
 * @param body
 * @returns {{statusCode, headers, body}}
 */
export function failure(body) {
    if(body.error){
        body.error = body.error.toString();
    }
    return buildResponse(500, body);
}


/**
 * API call response headers
 * @param statusCode
 * @param body
 * @returns {{statusCode: *, headers: {"Access-Control-Allow-Origin": string, "Access-Control-Allow-Credentials": boolean}, body: string}}
 */
function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(body)
    };
}

