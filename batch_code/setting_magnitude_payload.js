var processedData = msg.payload;

// Initialize an array to hold the data for the chart
var chartData = [];

// Iterate over the processed data to extract timestamp and magnitude
for (var i = 0; i < processedData.length; i++) {
  var data = processedData[i];

  // Only process entries with calculated magnitude
  if (data.magnitude !== undefined) {
    chartData.push({
      x: new Date(data.timestamp),
      y: data.magnitude,
    });
  }
}

// Set the processed data for the chart as the message payload
msg.payload = [
  {
    series: ["Magnitude"],
    data: [chartData],
    labels: [""],
  },
];

return msg;
