const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost"); // Connect to MQTT Mosquitto running on localhost
const path = require("./coordinates"); // Adjust the path to your actual file location

let currentIndexTeam1 = 0;
let currentIndexTeam2 = 0;
let currentIndexTeam3 = 0;
let team = 1;
// Simulated sensor data

const sensorsTeams = [
  {
    team: 1,
    sensors: [
      {
        sensor_team: "team_1",
        sensor_type: "position",
        sensor_id: "gps_001",
        data: () => {
          // Get current position from path array and increment index
          const currentPosition = path[currentIndexTeam1];
          currentIndexTeam1 = (currentIndexTeam1 + 1) % path.length; // Wrap around using modulo
          return {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          };
        },
      },
      {
        sensor_team: "team_1",
        sensor_type: "acceleration",
        sensor_id: "accel_002",
        data: () => ({
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * 2,
        }),
      },
      {
        sensor_team: "team_1",
        sensor_type: "speed",
        sensor_id: "speed_003",
        data: () => ({
          speed: parseFloat(4 + (Math.random() - 0.5) * 0.5).toFixed(1),
        }),
      },
      {
        sensor_team: "team_1",
        sensor_type: "vital_parameters",
        sensor_id: "heart_rate_004",
        data: () => ({
          heart_rate: 72 + Math.floor((Math.random() - 0.5) * 10),
          body_temperature: parseFloat(
            (36.6 + (Math.random() - 0.5) * 0.5).toFixed(1)
          ),
        }),
      },
    ],
  },
  {
    team: 2,
    sensors: [
      {
        sensor_team: "team_2",
        sensor_type: "position",
        sensor_id: "gps_001",
        data: () => {
          // Get current position from path array and increment index
          const currentPosition = path[currentIndexTeam2];
          currentIndexTeam2 = currentIndexTeam2 + 2;
          if (currentIndexTeam2 >= path.length - 1) {
            currentIndexTeam2 = 0; // Wrap around to the beginning if at the end
          }

          return {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          };
        },
      },
      {
        sensor_team: "team_2",
        sensor_type: "acceleration",
        sensor_id: "accel_002",
        data: () => ({
          x: (Math.random() - 1) * 4,
          y: (Math.random() - 1) * 4,
          z: (Math.random() - 1) * 4,
        }),
      },
      {
        sensor_team: "team_2",
        sensor_type: "speed",
        sensor_id: "speed_003",
        data: () => ({
          speed: parseFloat(8 + (Math.random() - 0.5) * 1).toFixed(1),
        }),
      },
      {
        sensor_team: "team_2",
        sensor_type: "vital_parameters",
        sensor_id: "heart_rate_004",
        data: () => ({
          heart_rate: 100 + Math.floor((Math.random() - 0.5) * 15),
          body_temperature: parseFloat(
            (37.0 + (Math.random() - 0.5) * 0.5).toFixed(1)
          ),
        }),
      },
    ],
  },
  {
    team: 3,
    sensors: [
      {
        sensor_team: "team_3",
        sensor_type: "position",
        sensor_id: "gps_001",
        data: () => {
          // Get current position from path array and increment index
          const currentPosition = path[currentIndexTeam3];
          currentIndexTeam3 = currentIndexTeam3 + 4;
          if (currentIndexTeam3 >= path.length - 1) {
            currentIndexTeam3 = 0; // Wrap around to the beginning if at the end
          }
          return {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          };
        },
      },
      {
        sensor_team: "team_3",
        sensor_type: "acceleration",
        sensor_id: "accel_002",
        data: () => ({
          x: (Math.random() - 1) * 4,
          y: (Math.random() - 1) * 4,
          z: (Math.random() - 1) * 4,
        }),
      },
      {
        sensor_team: "team_3",
        sensor_type: "speed",
        sensor_id: "speed_003",
        data: () => ({
          speed: parseFloat(16 + (Math.random() - 0.5) * 1).toFixed(1),
        }),
      },
      {
        sensor_team: "team_3",
        sensor_type: "vital_parameters",
        sensor_id: "heart_rate_004",
        data: () => ({
          heart_rate: 120 + Math.floor((Math.random() - 0.7) * 15),
          body_temperature: parseFloat(
            (37.5 + (Math.random() - 0.5) * 0.5).toFixed(1)
          ),
        }),
      },
    ],
  },
];

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  setInterval(() => {
    sensorsTeams.forEach((teamSensors) => {
      const sensorData = teamSensors.sensors.map((sensor) => ({
        ...sensor,
        data: sensor.data(),
        timestamp: new Date().toISOString(),
        timestampRegular: Math.floor(Date.now() / 1000),
        team: teamSensors.team,
      }));
      sensorData.forEach((data) => {
        client.publish("team/sensors", JSON.stringify(data));
      });
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
