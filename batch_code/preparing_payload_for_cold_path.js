var sensorData = msg.payload;

// Initialize context.headersWritten if it doesn't exist
context.headersWritten = context.headersWritten || {};

switch (sensorData.sensor_type) {
  case "position":
    msg.filename =
      "/home/musse/Documents/Class/IOT/Final Project/IoT-Sensor-Data-Processing-NodeRED/batch/gps_data.csv";
    if (!context.headersWritten.gps) {
      msg.payload = `timestamp,timestampRegular,sensor_id,sensor_team,latitude,longitude\n${sensorData.timestamp},${sensorData.timestampRegular},${sensorData.sensor_id},${sensorData.sensor_team},${sensorData.data.latitude},${sensorData.data.longitude}`;
      context.headersWritten.gps = true;
    } else {
      msg.payload = `${sensorData.timestamp},${sensorData.timestampRegular},${sensorData.sensor_id},${sensorData.sensor_team},${sensorData.data.latitude},${sensorData.data.longitude}`;
    }
    break;
  case "acceleration":
    msg.filename =
      "/home/musse/Documents/Class/IOT/Final Project/IoT-Sensor-Data-Processing-NodeRED/batch/accel_data.csv";
    if (!context.headersWritten.acceleration) {
      msg.payload = `timestamp,timestampRegular,sensor_id,sensor_team,x,y,z\n${sensorData.timestamp},${sensorData.timestampRegular},${sensorData.sensor_id},${sensorData.sensor_team},${sensorData.data.x},${sensorData.data.y},${sensorData.data.z}`;
      context.headersWritten.acceleration = true;
    } else {
      msg.payload = `${sensorData.timestamp},${sensorData.timestampRegular},${sensorData.sensor_id},${sensorData.sensor_team},${sensorData.data.x},${sensorData.data.y},${sensorData.data.z}`;
    }
    break;
  case "speed":
    msg.filename =
      "/home/musse/Documents/Class/IOT/Final Project/IoT-Sensor-Data-Processing-NodeRED/batch/speed_data.csv";
    if (!context.headersWritten.speed) {
      msg.payload = `timestamp,timestampRegular,sensor_id,sensor_team,speed\n${sensorData.timestamp},${sensorData.timestampRegular},${sensorData.sensor_id},${sensorData.sensor_team},${sensorData.data.speed}`;
      context.headersWritten.speed = true;
    } else {
      msg.payload = `${sensorData.timestamp},${sensorData.timestampRegular},${sensorData.sensor_id},${sensorData.sensor_team},${sensorData.data.speed}`;
    }
    break;
  case "vital_parameters":
    msg.filename =
      "/home/musse/Documents/Class/IOT/Final Project/IoT-Sensor-Data-Processing-NodeRED/batch/vital_data.csv";
    if (!context.headersWritten.vital_parameters) {
      msg.payload = `timestamp,timestampRegular,sensor_id,sensor_team,heart_rate,body_temperature\n${sensorData.timestamp},${sensorData.timestampRegular},${sensorData.sensor_id},${sensorData.sensor_team},${sensorData.data.heart_rate},${sensorData.data.body_temperature}`;
      context.headersWritten.vital_parameters = true;
    } else {
      msg.payload = `${sensorData.timestamp},${sensorData.timestampRegular},${sensorData.sensor_id},${sensorData.sensor_team},${sensorData.data.heart_rate},${sensorData.data.body_temperature}`;
    }
    break;
  default:
    return null; // Ignore unknown sensor types
}

return msg;
