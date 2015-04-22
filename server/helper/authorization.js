/**
 * Some helper methods for authentication.
 * has...Access methods check if the token in the request are valid.
 */

var information = ThingStatus.findOne({});
var tokens = information.device.tokens;

var updateInformation = function() {
    information = ThingStatus.findOne({});
    tokens = information.device.tokens;
};

hasReadAccess = function(request) {
    updateInformation();
    return information.device.registered === true && request.headers.accesstoken === tokens.read_token;
};

hasWriteAccess = function(request) {
    updateInformation();
    return information.device.registered === true && request.headers.accesstoken === tokens.write_token;
};

hasOwnerAccess = function(request) {
    updateInformation();
    return information.device.registered === true && request.headers.accesstoken === tokens.owner_token;
};

/**
 * Returns a not authentication response with status code 401 (Unauthorized)
 * @param response
 */
createNotAuthed = function(response) {
    response.statusCode = 401;
    response.end("error: not authorized");
};