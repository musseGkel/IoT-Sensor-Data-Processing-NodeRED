var teamId = global.get("selectedTeam");
var anomaly = global.get("anomaly");

if (msg.payload.sensor_type === "vital_parameters") {

if(msg.payload.sensor_team === teamId && teamId !== "all"){
    let { heart_rate, body_temperature } = msg.payload.data;
    if(anomaly === true){
        heart_rate = heart_rate + 50;
    }
    var average = calculateAverage(heart_rate);

    if (heart_rate > 100 || body_temperature > 37.5) {
        node.warn("Heart Rate: critical, value: "+ heart_rate);
        msg.payload = {
            status: "high",
            heart_rate: heart_rate,
            average : average
        };   return msg;
    }else{
        msg.payload = {
            status: "normal",
            heart_rate: heart_rate,
            average : average
        };  return msg;
    }
}else if(teamId === "all"){
   let heart_rate1 = context.get('HRTeam1') || 0;
   let heart_rate2 = context.get('HRTeam2') || 0;
   let heart_rate3 = context.get('HRTeam3') || 0;

    if(msg.payload.sensor_team === "team_1"){
        heart_rate1 = msg.payload.data.heart_rate;
        context.set('HRTeam1', heart_rate1);
    }
    if(msg.payload.sensor_team === "team_2"){
        heart_rate2 = msg.payload.data.heart_rate;
        context.set('HRTeam2', heart_rate2);
    }
    if(msg.payload.sensor_team === "team_3"){
        heart_rate3 = msg.payload.data.heart_rate;
        context.set('HRTeam3', heart_rate3);

    }

    const heart_rate = ((heart_rate1 +  heart_rate2 + heart_rate3)/3).toFixed(2);
    var average = calculateAverage(heart_rate);
    msg.payload = {
        status : "combined values",
        heart_rate : heart_rate,
        average : average,
        };
    return msg;
}

function calculateAverage(heart_rate){
    var values = context.get('values') || [];
     var sum = context.get('sum') || 0;
 
var value = parseFloat(heart_rate);

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


