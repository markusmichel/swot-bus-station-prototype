emitInformationUpdated = function() {

    var information = ThingStatus.findOne({});

    var options = {
        headers: {
            "accesstoken": information.networkAccessToken
        }
    };

    HTTP.call("POST", "http://13.13.13.13/web/app_dev.php/api/v1/thing/information/update", options, function(res) {});
};