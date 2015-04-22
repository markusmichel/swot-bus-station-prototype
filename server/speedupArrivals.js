/**
 * Simulates updating of bus arrival times.
 * Every bus will arrive one minute earlier each iteration so that we will se progress on the SWOT server.
 * Swot server will be informed after each iteration.
 */
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

    // tell the SWOT server that local information (arrival times) have changed
    emitInformationUpdated();

}, 3000);