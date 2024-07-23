var teamId = global.get("selectedTeam");


var totalDistanceTeam1 = context.get('totalDistanceTeam1') || 0;
let latArrayTeam1 = context.get('previous_latArrayTeam1') || [];
let lonArrayTeam1 = context.get('previous_lonArrayTeam1') || [];
var totalDistanceTeam2 = context.get('totalDistanceTeam2') || 0;
let latArrayTeam2 = context.get('previous_latArrayTeam2') || [];
let lonArrayTeam2 = context.get('previous_lonArrayTeam2') || [];
var totalDistanceTeam3 = context.get('totalDistanceTeam3') || 0;
let latArrayTeam3 = context.get('previous_latArrayTeam3') || [];
let lonArrayTeam3 = context.get('previous_lonArrayTeam3') || [];






if(msg.payload.sensor_type === "position"){
    if(msg.payload.sensor_team === "team_1"){
        const { latitude, longitude, altitude } = msg.payload.data;
        latArrayTeam1.push(latitude);
          if(latArrayTeam1.length > 2){
             latArrayTeam1.shift();
           }
          lonArrayTeam1.push(longitude);
          if(lonArrayTeam1.length > 2){
             lonArrayTeam1.shift();
}

        if(latArrayTeam1.length == 2){    
    var distanceCalc = haversineDistance(latArrayTeam1[0], lonArrayTeam1[0], latArrayTeam1[1], lonArrayTeam1[1]);
    totalDistanceTeam1 += distanceCalc;

}
context.set('totalDistance', totalDistanceTeam1);
context.set('totalDistanceTeam1', totalDistanceTeam1);

context.set('previous_latArrayTeam1', latArrayTeam1);
context.set('previous_lonArrayTeam1', lonArrayTeam1);

}
    if (msg.payload.sensor_team === "team_2"){
        const { latitude, longitude, altitude } = msg.payload.data;
        latArrayTeam2.push(latitude);
          if(latArrayTeam2.length > 2){
             latArrayTeam2.shift();
           }
          lonArrayTeam2.push(longitude);
          if(lonArrayTeam2.length > 2){
             lonArrayTeam2.shift();
}

        if(latArrayTeam2.length == 2){
    
    var distanceCalc = haversineDistance(latArrayTeam2[0], lonArrayTeam2[0], latArrayTeam2[1], lonArrayTeam2[1]);
    totalDistanceTeam2 += distanceCalc;

}
context.set('totalDistance', totalDistanceTeam1);
context.set('totalDistanceTeam2', totalDistanceTeam2);

//totalDistanceTeam2 = totalDistanceTeam2 / 1000; // Convert to kilometers
context.set('previous_latArrayTeam2', latArrayTeam2);
context.set('previous_lonArrayTeam2', lonArrayTeam2);


    }
    if (msg.payload.sensor_team === "team_3"){
        const { latitude, longitude, altitude } = msg.payload.data;
        latArrayTeam3.push(latitude);
          if(latArrayTeam3.length > 2){
             latArrayTeam3.shift();
           }
          lonArrayTeam3.push(longitude);
          if(lonArrayTeam3.length > 2){
             lonArrayTeam3.shift();
}

        if(latArrayTeam3.length == 2){
    
    var distanceCalc = haversineDistance(latArrayTeam3[0], lonArrayTeam3[0], latArrayTeam3[1], lonArrayTeam3[1]);
    totalDistanceTeam3 += distanceCalc;

}
context.set('totalDistance', totalDistanceTeam3);
context.set('totalDistanceTeam3', totalDistanceTeam3);

context.set('previous_latArrayTeam3', latArrayTeam3);
context.set('previous_lonArrayTeam3', lonArrayTeam3);

    }
    function haversineDistance(lat1, lon1, lat2, lon2) {
        var R = 6371000; // Radius of the Earth in meters
        var phi1 = toRadians(lat1);
        var phi2 = toRadians(lat2);
        var deltaPhi = toRadians(lat2 - lat1);
        var deltaLambda = toRadians(lon2 - lon1);

        var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var distance = R * c;
        return distance;
    }

    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }



    

    if (teamId === "team_1"){
         msg.payload = (totalDistanceTeam1 / 1000).toFixed(2);

    }else if(teamId === "team_2"){
        msg.payload = (totalDistanceTeam2 / 1000).toFixed(2);
    }else if(teamId === "team_3"){
        msg.payload = (totalDistanceTeam3 / 1000).toFixed(2);
    }else if(teamId === "all"){
        msg.payload = ((totalDistanceTeam1 + totalDistanceTeam2 + totalDistanceTeam3)/1000).toFixed(2);
    }
    return msg;
}
