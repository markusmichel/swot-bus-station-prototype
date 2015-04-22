Meteor.setInterval(function() {
    var arrivals = Arrivals.find({}).fetch();

    var arrival;
    for(var i in arrivals) {
        arrival = arrivals[i];

        var newArrivalDate = moment(arrival.arrivesAt).subtract(1, "minutes").toDate();

        if(newArrivalDate < new Date()) {
            Arrivals.remove(arrival._id);
        } else {
            arrival.arrivesAt = newArrivalDate;
            Arrivals.update(arrival._id, arrival);
        }
    }

    emitInformationUpdated();

}, 10000);