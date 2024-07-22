var average = msg.payload.average;  
var activitySpeed = flow.get("dataSpeed").activity;  
let statusAnomaly;

if(average >= 110 && activitySpeed === "walking"){
    statusAnomaly = "Heart anomaly detected";
}else if(average >= 130 && activitySpeed === "running"){
    statusAnomaly = "Heart anomaly detected";
}else if(average >= 160 && activitySpeed === "sprinting"){
    statusAnomaly = "Heart anomaly detected";
}else{
    statusAnomaly = "no anomaly detected";
}
msg.payload = statusAnomaly;

return msg;