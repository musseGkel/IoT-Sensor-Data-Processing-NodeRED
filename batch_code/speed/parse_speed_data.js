var csvData = msg.payload;
var lines = csvData.split('\n');
var selectedTeam = global.get('selectedTeam');

// Initialize an array to hold the processed data
var processedData = [];

// Iterate over each line of the CSV, starting from the second line to skip the header
for (var i = 1; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line === '') continue; // Skip empty lines

    var values = line.split(',');
    var data = {};

    // Assuming the CSV format: timestamp,timestampRegular,sensor_id,sensor_team,speed
    data.timestamp = values[0].trim();
    data.timestampRegular = parseInt(values[1].trim(), 10); // Assuming timestampRegular is an integer
    data.sensor_id = values[2].trim();
    data.sensor_team = values[3].trim();
    data.speed = parseFloat(values[4].trim());

    // Validate the parsed values
    if (!isNaN(data.timestampRegular) && !isNaN(data.speed)) {
        if (selectedTeam !== "all" && selectedTeam != null && selectedTeam != undefined) {
            if (data.sensor_team === selectedTeam) {
                processedData.push(data);
            }
        } else {
            processedData.push(data);
        }
    }
}

// Set the processed data as the message payload
msg.payload = processedData;

return msg;
