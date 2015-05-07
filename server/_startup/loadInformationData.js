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
            "profileimage": "http://th03.deviantart.net/fs41/PRE/f/2009/029/7/9/Mr__Grimm_aka_The_Thing_by_mwof.jpg",
            "api": {
                "url": "http://192.168.178.22:3000/api"
            },
            "tokens": tokens
        }
    };

    ThingStatus.insert(registerInfo);
}