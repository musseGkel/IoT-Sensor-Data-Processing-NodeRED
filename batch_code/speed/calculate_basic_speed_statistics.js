var speedData = msg.payload;

// Initialize variables for calculations
var sumSpeed = 0;
var maxSpeed = -Infinity;
var minSpeed = Infinity;
var speedValues = [];

// Iterate over speed data to collect statistics
for (var i = 0; i < speedData.length; i++) {
    var speed = speedData[i].speed;

    // Sum for average calculation
    sumSpeed += speed;

    // Check for max speed
    if (speed > maxSpeed) {
        maxSpeed = speed;
    }

    // Check for min speed
    if (speed < minSpeed) {
        minSpeed = speed;
    }

    // Collect speeds for standard deviation calculation
    speedValues.push(speed);
}

// Calculate average speed
var averageSpeed = sumSpeed / speedData.length;

// Calculate standard deviation
var mean = averageSpeed;
var sumSquaredDiffs = speedValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
var standardDeviation = Math.sqrt(sumSquaredDiffs / speedValues.length);

// Prepare the payload with calculated statistics
msg.payload = {
    averageSpeed: averageSpeed.toFixed(2),
    maxSpeed: maxSpeed.toFixed(2),
    minSpeed: minSpeed.toFixed(2),
    standardDeviation: standardDeviation.toFixed(2)
};

return msg;
