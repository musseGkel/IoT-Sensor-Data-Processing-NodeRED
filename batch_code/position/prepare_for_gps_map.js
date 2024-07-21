// Iterate over each GPS data point
for (var i = 0; i < msg.payload.length; i++) {
    var data = {
        name:msg.payload[i].sensor_team +  " point " + (i + 1),     // Unique name for each point
        lat: msg.payload[i].latitude, // Latitude of the point
        lon: msg.payload[i].longitude // Longitude of the point
        // Optionally, you can add more properties like icon and layer
    };

    // Emit each data point individually to the Worldmap node
    node.send({
        payload: data
    });
}

return null; // Return null to suppress the original message
