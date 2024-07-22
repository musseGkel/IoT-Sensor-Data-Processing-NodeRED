var processedData = msg.payload;

// Initialize an array to hold the data for the speed chart
var speedData = [];

// Iterate over the processed data to extract timestamp and speed
for (var i = 0; i < processedData.length; i++) {
    var data = processedData[i];

    // Prepare data for speed chart
    speedData.push({
        x: new Date(data.timestamp),
        y: data.speed
    });
}

// Set the processed speed data as the message payload
msg.payload = [{
    series: ["Speed"],
    data: [speedData],
    labels: [""]
}];

return msg;
