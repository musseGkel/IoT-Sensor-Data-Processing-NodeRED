var speedData = msg.payload;
var hourlySpeeds = {};

// Aggregate speeds by hour
for (var i = 0; i < speedData.length; i++) {
  var timestamp = new Date(speedData[i].timestamp);
  var hour = timestamp.getUTCHours();
  if (!hourlySpeeds[hour]) {
    hourlySpeeds[hour] = { sumSpeed: 0, count: 0 };
  }
  hourlySpeeds[hour].sumSpeed += speedData[i].speed;
  hourlySpeeds[hour].count += 1;
}

// Calculate average speed for each hour
var averageHourlySpeeds = [];
for (var hourStr in hourlySpeeds) {
  var hour = parseInt(hourStr); // Ensure hour is treated as a number
  var avgSpeed = hourlySpeeds[hour].sumSpeed / hourlySpeeds[hour].count;
  averageHourlySpeeds.push({ hour: hour, averageSpeed: avgSpeed.toFixed(2) });
}

// Set the average hourly speeds as the message payload
msg.payload = averageHourlySpeeds;

return msg;
