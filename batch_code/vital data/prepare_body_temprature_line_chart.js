var processedData = msg.payload;

// Initialize array to hold the data for the body temperature chart
var bodyTemperatureData = [];

// Iterate over the processed data to extract timestamp and body temperature
for (var i = 0; i < processedData.length; i++) {
  var data = processedData[i];

  // Prepare data for body temperature chart
  bodyTemperatureData.push({
    x: new Date(data.timestamp),
    y: data.body_temperature,
  });
}

// Set the processed body temperature data as the message payload
msg.payload = [
  {
    series: ["Body Temperature"],
    data: [bodyTemperatureData],
    labels: [""],
  },
];

return msg;
