function generateSuccessResponse() {
    let response = {
        "success": true,
        "message": "",
        "status": 200
    }
    return response
}
function generateFailureResponse() {
    let response = {
        "success": false,
        "message": "",
        "status": 400
    }
    return response
}
module.exports.generateSuccessResponse = generateSuccessResponse
module.exports.generateFailureResponse = generateFailureResponse