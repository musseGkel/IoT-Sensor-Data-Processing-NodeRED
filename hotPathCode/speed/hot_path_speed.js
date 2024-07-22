var teamId = global.get("selectedTeam");

if (msg.payload.sensor_type === "speed") {
if (msg.payload.sensor_team === teamId && teamId !== "all") {


const speed = msg.payload.data.speed;
    var averageSpeed = calculateAverage(speed);
         
    if (speed <= 7) {
        msg.payload = {
            activity: "walking",
            speed: speed,
            averageSpeed: averageSpeed
        };
        flow.set("dataWalking", msg.payload);

         //return msg;
    } else if(speed > 7 && speed < 14) {
        msg.payload = {
            activity: "running",
            speed: speed,
            averageSpeed: averageSpeed
        }; //return msg;
    }else{
        msg.payload = {
            activity: "sprinting",
            speed : speed,
            averageSpeed: averageSpeed
        }; //return msg;
    }
    flow.set("dataSpeed", msg.payload);
    return msg;
    
    }  else if (teamId === "all") {
    let speed1 = context.get('speedTeam1') || 0;
    let speed2 = context.get('speedTeam2') || 0;
    let speed3 = context.get('speedTeam3') || 0;

    if (msg.payload.sensor_team === "team_1") {
        speed1 = parseFloat(msg.payload.data.speed);
        context.set('speedTeam1', speed1);
    }
    if (msg.payload.sensor_team === "team_2") {
        speed2 = parseFloat(msg.payload.data.speed);
        context.set('speedTeam2', speed2);
    }
    if (msg.payload.sensor_team === "team_3") {
        speed3 = parseFloat(msg.payload.data.speed);
        context.set('speedTeam3', speed3);

    }

    var speed = ((speed1 + speed2 + speed3) / 3).toFixed(2);
    var averageSpeed = calculateAverage(speed);
    msg.payload = {
        activity: "combined activities",
        speed: speed,
        averageSpeed: averageSpeed,
        speed1 : speed1,
        speed2: speed2,
        speed3: speed3
    };
    return msg;
}
    function calculateAverage(speed){
        var values = context.get('values') || [];
        var sum = context.get('sum') || 0;

        var value = parseFloat(speed);

        if (!isNaN(value)) {
            values.push(value)
            sum += value;

            if (values.length > 10) {
                var removedValue = values.shift();
                sum -= removedValue;
            }

            var averageSpeed = (sum / values.length).toFixed(2);

            context.set('values', values);
            context.set('sum', sum);
            return averageSpeed;
        }
    }
}
