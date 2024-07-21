var csvData = msg.payload;
var lines = csvData.split('\n');
var selectedTeam = global.get('selectedTeam');

// Initialize an array to hold the processed data
var processedData = [];

// Iterate over each line of the CSV
for (var i = 1; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line === '') continue; // Skip empty lines

    var values = line.split(',');
    var data = {};

    // Assuming the CSV format: timestamp,timestampRegular,sensor_id,sensor_team,x,y,z
    data.timestamp = values[0].trim();
    data.timestampRegular = parseInt(values[1].trim(), 10); // Assuming timestampRegular is an integer
    data.sensor_id = values[2].trim();
    data.sensor_team = values[3].trim();
    data.x = parseFloat(values[4].trim());
    data.y = parseFloat(values[5].trim());
    data.z = parseFloat(values[6].trim());

    // Check for valid x, y, z values
    if (!isNaN(data.x) && !isNaN(data.y) && !isNaN(data.z)) {
        // Calculate magnitude
        data.magnitude = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);

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
