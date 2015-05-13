// For usage with XAMPP use localhost, e.g. :
// http://localhost:8080/swot/web/app_dev.php/
var baseUrl = "http://13.13.13.13/";
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