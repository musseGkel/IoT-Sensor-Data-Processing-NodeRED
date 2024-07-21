var processedData = msg.payload;

// Initialize arrays to hold heart rate and body temperature data
var heartRates = [];
var bodyTemperatures = [];

// Iterate over processed data to extract heart rates and body temperatures
for (var i = 0; i < processedData.length; i++) {
  var data = processedData[i];

  // Check if heart_rate is a valid number before collecting it
  if (!isNaN(data.heart_rate)) {
    heartRates.push(data.heart_rate);
  }

  // Check if body_temperature is a valid number before collecting it
  if (!isNaN(data.body_temperature)) {
    bodyTemperatures.push(data.body_temperature);
  }
}

// Calculate average heart rate if the array is not empty
var averageHeartRate =
  heartRates.length > 0
    ? (
        heartRates.reduce((acc, val) => acc + val, 0) / heartRates.length
      ).toFixed(2)
    : "N/A";

// Calculate maximum and minimum heart rate if the array is not empty
var maxHeartRate = heartRates.length > 0 ? Math.max(...heartRates) : "N/A";
var minHeartRate = heartRates.length > 0 ? Math.min(...heartRates) : "N/A";

// Calculate average body temperature if the array is not empty
var averageBodyTemperature =
  bodyTemperatures.length > 0
    ? (
        bodyTemperatures.reduce((acc, val) => acc + val, 0) /
        bodyTemperatures.length
      ).toFixed(2)
    : "N/A";

// Calculate maximum and minimum body temperature if the array is not empty
var maxBodyTemperature =
  bodyTemperatures.length > 0
    ? Math.max(...bodyTemperatures).toFixed(2)
    : "N/A";
var minBodyTemperature =
  bodyTemperatures.length > 0
    ? Math.min(...bodyTemperatures).toFixed(2)
    : "N/A";

// Prepare the payload with calculated statistics
msg.payload = {
  averageHeartRate: averageHeartRate,
  maxHeartRate: maxHeartRate,
  minHeartRate: minHeartRate,
  averageBodyTemperature: averageBodyTemperature,
  maxBodyTemperature: maxBodyTemperature,
  minBodyTemperature: minBodyTemperature,
};

return msg;
