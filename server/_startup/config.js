var baseUrl = "http://13.13.13.13/app_dev.php/";
var baseApiUrl = baseUrl + "api/v1/";
var updateInformationUrl = baseApiUrl + "thing/information/update";

config = {
    swot: {
        baseUrl: baseUrl,
        api: {
            baseUrl: baseApiUrl,
            updateInformation: updateInformationUrl
        }
    }
};