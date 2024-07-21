// Function node for statistical analysis
var data = msg.payload;

// Helper function to calculate median
function median(values) {
  if (values.length === 0) return 0;
  values.sort(function (a, b) {
    return a - b;
  });
  var half = Math.floor(values.length / 2);
  if (values.length % 2) {
    return values[half];
  } else {
    return (values[half - 1] + values[half]) / 2.0;
  }
}

// Initialize arrays to hold values for each axis and magnitude
var xValues = [];
var yValues = [];
var zValues = [];
var magnitudeValues = [];

// Populate arrays with data
for (var i = 0; i < data.length; i++) {
  xValues.push(data[i].x);
  yValues.push(data[i].y);
  zValues.push(data[i].z);
  magnitudeValues.push(data[i].magnitude);
}

// Function to calculate mean
function mean(values) {
  var sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}

// Function to calculate variance
function variance(values, meanValue) {
  return (
    values.reduce((a, b) => a + Math.pow(b - meanValue, 2), 0) / values.length
  );
}

// Calculate statistics for each axis and magnitude
var meanX = mean(xValues);
var meanY = mean(yValues);
var meanZ = mean(zValues);
var meanMagnitude = mean(magnitudeValues);

var varianceX = variance(xValues, meanX);
var varianceY = variance(yValues, meanY);
var varianceZ = variance(zValues, meanZ);
var varianceMagnitude = variance(magnitudeValues, meanMagnitude);

var stdDevX = Math.sqrt(varianceX);
var stdDevY = Math.sqrt(varianceY);
var stdDevZ = Math.sqrt(varianceZ);
var stdDevMagnitude = Math.sqrt(varianceMagnitude);

var medianX = median(xValues);
var medianY = median(yValues);
var medianZ = median(zValues);
var medianMagnitude = median(magnitudeValues);

// Add statistics to the message payload
msg.payload = {
  mean: {
    x: meanX.toFixed(2),
    y: meanY.toFixed(2),
    z: meanZ.toFixed(2),
    magnitude: meanMagnitude.toFixed(2),
  },
  median: {
    x: medianX.toFixed(2),
    y: medianY.toFixed(2),
    z: medianZ.toFixed(2),
    magnitude: medianMagnitude.toFixed(2),
  },
  variance: {
    x: varianceX.toFixed(2),
    y: varianceY.toFixed(2),
    z: varianceZ.toFixed(2),
    magnitude: varianceMagnitude.toFixed(2),
  },
  stdDev: {
    x: stdDevX.toFixed(2),
    y: stdDevY.toFixed(2),
    z: stdDevZ.toFixed(2),
    magnitude: stdDevMagnitude.toFixed(2),
  },
};

return msg;
