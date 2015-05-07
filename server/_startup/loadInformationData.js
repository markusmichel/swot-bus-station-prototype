/**
 * Checks the database at server startup.
 * If the database is empty, initially insert some default information.
 */

var information = ThingStatus.find({}).fetch();

// Database empty -> load initial data
if(information.length < 1) {
    var registerInfo = {
        "device": {
            "id": "SWOTY Prototype",
            "registered": false,
            "api": {
                "url": "http://192.168.178.22:3000/api"
            },
            "tokens": tokens
        }
    };

    ThingStatus.insert(registerInfo);
}