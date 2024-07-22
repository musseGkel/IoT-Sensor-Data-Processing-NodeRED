// Function node for activity recognition (threshold-based)
var data = msg.payload;

// Initialize counters for each activity
var walkingCount = 0;
var runningCount = 0;
var sprintingCount = 0;

// Realistic thresholds based on typical speed ranges (m/s)
var walkingThreshold = 8;  // Speed < 8 m/s for walking
var runningThreshold = 16;  // Speed between 8 and 16 m/s for running

for (var i = 0; i < data.length; i++) {
    var speed = parseFloat(data[i].speed);
    
    // Classify activities based on thresholds
    if (speed < walkingThreshold) {
        data[i].activity = "Walking";
        walkingCount++;
    } else if (speed >= walkingThreshold && speed < runningThreshold) {
        data[i].activity = "Running";
        runningCount++;
    } else {
        data[i].activity = "Sprinting";
        sprintingCount++;
    }
}

// Calculate percentages
var totalCount = walkingCount + runningCount + sprintingCount;
var walkingPercentage = (totalCount > 0) ? (walkingCount / totalCount) * 100 : 0;
var runningPercentage = (totalCount > 0) ? (runningCount / totalCount) * 100 : 0;
var sprintingPercentage = (totalCount > 0) ? (sprintingCount / totalCount) * 100 : 0;

// Add the counts and percentages to the message payload
msg.payload = {
    data: data,
    counts: {
        walking: walkingCount,
        running: runningCount,
        sprinting: sprintingCount
    },
    percentages: {
        walking: walkingPercentage.toFixed(2),
        running: runningPercentage.toFixed(2),
        sprinting: sprintingPercentage.toFixed(2)
    }
};

return msg;
