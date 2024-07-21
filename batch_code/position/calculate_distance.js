var gpsData = msg.payload;
var selectedTeam = global.get('selectedTeam');
var teamDistances = {};
var totalDistance = 0;

// Helper function to calculate distance using Haversine formula
function haversineDistance(lat1, lon1, lat2, lon2) {
    var R = 6371000; // Radius of the Earth in meters
    var phi1 = toRadians(lat1);
    var phi2 = toRadians(lat2);
    var deltaPhi = toRadians(lat2 - lat1);
    var deltaLambda = toRadians(lon2 - lon1);

    var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

// Process distances based on the selected team
if (selectedTeam !== "all") {
    // Calculate distance for the selected team only
    for (var i = 1; i < gpsData.length; i++) {
        var prevPoint = gpsData[i - 1];
        var currPoint = gpsData[i];

        var distance = haversineDistance(prevPoint.latitude, prevPoint.longitude, currPoint.latitude, currPoint.longitude);
        totalDistance += distance;
    }
    totalDistance = totalDistance / 1000; // Convert to kilometers
    msg.payload = totalDistance.toFixed(2) + " km"; // Format the payload as a string with two decimal places

} else {
    // Group data by sensor_team and calculate distances
    gpsData.forEach(function(data) {
        if (!teamDistances[data.sensor_team]) {
            teamDistances[data.sensor_team] = 0;
        }
    });

    for (var team in teamDistances) {
        var teamData = gpsData.filter(point => point.sensor_team === team);
        var teamDistance = 0;

        for (var i = 1; i < teamData.length; i++) {
            var prevPoint = teamData[i - 1];
            var currPoint = teamData[i];

            var distance = haversineDistance(prevPoint.latitude, prevPoint.longitude, currPoint.latitude, currPoint.longitude);
            teamDistance += distance;
        }

        teamDistances[team] = teamDistance / 1000; // Convert to kilometers
        totalDistance += teamDistances[team]; // Sum up the distance for all teams
    }

    msg.payload = totalDistance.toFixed(2) + " km"; // Format as a string with two decimal places
}

return msg;
