var processedData = msg.payload;

// Initialize arrays to hold the data for the heart rate chart
var heartRateData = [];

// Iterate over the processed data to extract timestamp and heart rate
for (var i = 0; i < processedData.length; i++) {
  var data = processedData[i];

  // Prepare data for heart rate chart
  heartRateData.push({
    x: new Date(data.timestamp),
    y: data.heart_rate,
  });
}

// Set the processed heart rate data as the message payload
msg.payload = [
  {
    series: ["Heart Rate"],
    data: [heartRateData],
    labels: [""],
  },
];

return msg;
