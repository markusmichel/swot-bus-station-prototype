Router.route('/', function () {
    this.render('arrival-list');
});

Router.route('/edit/:_id', {
    name: "arrival.edit",
    template: 'arrival.edit',
    data: function() {
        return Arrivals.findOne({_id: this.params._id});
    }
});

Router.route('/add', {
    name: "arrival.add",
    template: 'arrival.add'
});

if (Meteor.isClient) {

    Template.arrivalList.helpers({
        arrivals: function() {
            return Arrivals.find({}, {sort: {arrivesAt: 1}});
        },

        isRegistered: function() {
            var status = ThingStatus.findOne({});
            if(!status) return "";
            return status.device.registered === true ? "true" : "false";
        }
    });

    Template.arrivalList.events({
        "click #is-registered": function() {
            console.log("update");
            var status = ThingStatus.findOne({});
            status.device.registered = !status.device.registered;
            ThingStatus.update(status._id, status);
        }
    });

    Template.arrivalEdit.onRendered(function() {
        this.$('#datetimepicker').datetimepicker();
    });

    Template.arrivalAdd.onRendered(function() {
        this.$('#datetimepicker').datetimepicker();
    });

    Template.arrivalEdit.events({
        "submit #arrival-edit-form": function(event) {
            event.preventDefault();

            var line = $(event.target).find(".bus-line").val();
            var arrival = new Date($(event.target).find(".bus-arrival").val());

            this.arrivesAt = arrival;
            this.line = line;

            Arrivals.update(this._id, this);

            Router.go("/");
        }
    });

    Template.arrivalAdd.events({
        "submit #arrival-edit-form": function(event) {
            event.preventDefault();

            var line = $(event.target).find(".bus-line").val();
            var arrival = new Date($(event.target).find(".bus-arrival").val());

            var arrival = {
                arrivesAt: arrival,
                line: line
            };

            Arrivals.insert(arrival);

            Router.go("/");
        }
    });
}

if (Meteor.isServer) {

    Meteor.startup(function () {

        Router
            .route('/api/information', {where: 'server'})
            .get(function() {
                console.log("information called");
                if(!hasOwnerAccess(this.request) && !hasReadAccess(this.request) && !hasWriteAccess(this.request)) {
                    createNotAuthed(this.response);
                }

                var arrivals = Arrivals.find(
                {
                    "arrivesAt": {
                        $gte: new Date()
                    }
                },
                {
                    fields: {
                        _id : 0,
                        line : 1,
                        arrivesAt : 1
                    }
                }
                ).fetch();

                var res = {
                    status: "success",
                    information: {
                        type: "table",
                        value: {
                            header: ["line", "arrives at"],
                            data: arrivals
                        }
                    }
                };

                this.response.setHeader("Content-Type", "application/json");
                this.response.end(JSON.stringify(res));
            });

        Router
            .route('/api/functions', {where: 'server'})
            .get(function() {
                if(!hasOwnerAccess(this.request) && !hasWriteAccess(this.request) && !hasReadAccess(this.request)) {
                    console.log("functions not auth");
                    createNotAuthed(this.response);
                }

                this.response.end(JSON.stringify({
                    functions: []
                }));
            });

        Router
            .route('/api/register', {where: 'server'})
            .get(function() {

                var accessToken = this.request.query.access_token;
                var networkToken = this.request.headers.networktoken;

                var registerInfo = ThingStatus.findOne({});

                if(registerInfo.device.registered === true) {
                    this.response.statusCode = 423;
                    this.response.end("error: device is already registered");

                } else if (registerToken !== accessToken) {
                    this.response.statusCode = 401;
                    this.response.end("error: register token is invalid");

                } else {
                    registerInfo.device.registered = true;
                    registerInfo.networkAccessToken = networkToken;
                    ThingStatus.update(registerInfo._id, registerInfo);

                    this.response.setHeader("Content-Type", "application/json");
                    this.response.statusCode = 200;
                    this.response.end(JSON.stringify(registerInfo));
                }
            });

        Router
            .route('/api/deregister', {where: 'server'})
            .get(function() {
                console.log("deregister: called");
                if(!hasOwnerAccess(this.request)) {
                    console.log("deregister: access denied");
                    createNotAuthed(this.response);
                }

                console.log("deregister: access granted");
                var registerInfo = ThingStatus.findOne({});

                registerInfo.device.registered = false;
                ThingStatus.update(registerInfo._id, registerInfo);

                this.response.setHeader("Content-Type", "application/json");
                this.response.end(JSON.stringify({ message: "device deregistered" }));
            });
    });
}
