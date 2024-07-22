var teamId = global.get("selectedTeam");


if (msg.payload.sensor_type === "vital_parameters") {

if(msg.payload.sensor_team === teamId && teamId !== "all"){

    const { heart_rate, body_temperature } = msg.payload.data;
    var average = calculateAverage(body_temperature);
    
    if (heart_rate > 100 || body_temperature > 37.5) {
        node.warn("Anomaly detected:"+ msg.payload);
     msg.payload = {
            status: "critical",
            body_temperature: body_temperature,
            average: average
        };   return msg;
    }else{
        msg.payload = {
            status: "normal",
            body_temperature: body_temperature,
            average : average
        };   return msg;
    }
    
} else if (teamId === "all") {
    let body_temperature1 = context.get('BRTeam1') || 0;
    let body_temperature2 = context.get('BRTeam2') || 0;
    let body_temperature3 = context.get('BRTeam3') || 0;

    if (msg.payload.sensor_team === "team_1") {
        body_temperature1 = msg.payload.data.body_temperature;
        context.set('BRTeam1', body_temperature1);
    }
    if (msg.payload.sensor_team === "team_2") {
        body_temperature2 = msg.payload.data.body_temperature;
        context.set('BRTeam2', body_temperature2);
    }
    if (msg.payload.sensor_team === "team_3") {
        body_temperature3 = msg.payload.data.body_temperature;
        context.set('BRTeam3', body_temperature3);

    }

    const body_temperature = ((body_temperature1 + body_temperature2 + body_temperature3) / 3).toFixed(2);
    var average = calculateAverage(body_temperature);
    msg.payload = {
        status: "combined values",
        body_temperature: body_temperature,
        average: average
    };
    return msg;
}

function calculateAverage(body_temperature){
    var values = context.get('values') || [];
    var sum = context.get('sum') || 0;

    var value = parseFloat(body_temperature);

    if (!isNaN(value)) {
        values.push(value)
        sum += value;

        if (values.length > 10) {
            var removedValue = values.shift();
            sum -= removedValue;
        }

        var average = (sum / values.length).toFixed(2);

        context.set('values', values);
        context.set('sum', sum);
        return average;
    }

}
}
