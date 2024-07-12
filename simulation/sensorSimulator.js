const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost"); // Connect to MQTT Mosquitto running on localhost

// Simulated sensor data
const sensors = [
  {
    sensor_type: "position",
    sensor_id: "gps_001",
    data: () => ({
      latitude: 44.40565 + (Math.random() - 0.5) * 0.001,
      longitude: 8.946256 + (Math.random() - 0.5) * 0.001,
      altitude: 5.5 + (Math.random() - 0.5) * 0.1,
    }),
  },
  {
    sensor_type: "acceleration",
    sensor_id: "accel_002",
    data: () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 2,
    }),
  },
  {
    sensor_type: "speed",
    sensor_id: "speed_003",
    data: () => ({
      speed: 1.8 + (Math.random() - 0.5) * 0.1,
    }),
  },
  {
    sensor_type: "vital_parameters",
    sensor_id: "heart_rate_004",
    data: () => ({
      heart_rate: 72 + Math.floor((Math.random() - 0.5) * 10),
      body_temperature: 36.6 + (Math.random() - 0.5) * 0.1,
    }),
  },
];

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  setInterval(() => {
    const sensorData = sensors.map((sensor) => ({
      ...sensor,
      data: sensor.data(),
      timestamp: new Date().toISOString(),
    }));
    sensorData.forEach((data) => {
      client.publish("team/sensors", JSON.stringify(data));
    });
  }, 5000); // Send data every 5 seconds
});

client.on("error", (err) => {
  console.error("Connection error: ", err);
  client.end();
});

client.on("close", () => {
  console.log("Disconnected from MQTT broker");
});
