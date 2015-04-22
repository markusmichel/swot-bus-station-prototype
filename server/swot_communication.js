/**
 * Helper method:
 * Makes a request to the SWOT Server.
 * Calls .../api/v1/thing/information/update to inform the server that the thing (bus-station) has changed
 * (no need to send the new information, just tells the server that SOMETHING has changed, SWOT will get the information itself through REST).
 *
 * Append the network access token to the request headers.
 */
emitInformationUpdated = function() {

    var information = ThingStatus.findOne({});

    var options = {
        headers: {
            "accesstoken": information.networkAccessToken
        }
    };

    HTTP.call("POST", config.swot.api.updateInformation, options, function(res) {});
};