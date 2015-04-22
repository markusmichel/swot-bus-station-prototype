var information = ThingStatus.find({}).fetch();

// Database empty -> load initial data
if(information.length < 1) {
    var registerInfo = {
        "device": {
            "id": "SWOTY Prototype",
            "registered": false,
            "classification": "Awesome WoT-Light",
            "url": "http://192.168.178.22:3000/api",
            "api": {
                "deregister": "http://192.168.178.22:3000/api/deregister",
                "function": "http://192.168.178.22:3000/api/functions",
                "status": "http://192.168.178.22:3000/api/status",
                "profileimage": "http://th03.deviantart.net/fs41/PRE/f/2009/029/7/9/Mr__Grimm_aka_The_Thing_by_mwof.jpg"
            },
            "tokens": tokens
        }
    };

    ThingStatus.insert(registerInfo);
}