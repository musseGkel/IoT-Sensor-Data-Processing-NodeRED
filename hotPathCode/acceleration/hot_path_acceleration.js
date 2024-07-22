var current_timestamp = msg.payload.timestampRegular;
var previous_velocityTeam1 = context.get('previous_velocityTeam1') || null;
var previous_velocityTeam2 = context.get('previous_velocityTeam2') || null;
var previous_velocityTeam3 = context.get('previous_velocityTeam3') || null;
var previous_timestampTeam1 = context.get('previous_timestampTeam1') || null;
var previous_timestampTeam2 = context.get('previous_timestampTeam2') || null;
var previous_timestampTeam3 = context.get('previous_timestampTeam3') || null;
var accelerationTeam1 = context.get('accelerationTeam3') || null;;
var accelerationTeam2 = context.get('accelerationTeam3') || null;;
var accelerationTeam3 = context.get('accelerationTeam3') || null;;

var teamId = global.get("selectedTeam");
let current_velocityTeam1 = null;
let current_velocityTeam2 = null;
let current_velocityTeam3 = null;


if (msg.payload.sensor_type === "speed") {
     
if(msg.payload.sensor_team === "team_1"){
    current_velocityTeam1 = msg.payload.data.speed;

if (previous_velocityTeam1 !== null && previous_timestampTeam1 !== null) {

    var velocity = current_velocityTeam1 - previous_velocityTeam1;
    var time = current_timestamp - previous_timestampTeam1;

    // Check if delta_t is not zero to avoid division by zero
    if (time !== 0) {
        // Calculate acceleration
        accelerationTeam1 = velocity / time;
        context.set('accelerationTeam1', accelerationTeam1);
        context.set('previous_velocityTeam1', current_velocityTeam1);
        context.set('previous_timestampTeam1', current_timestamp);
    } else {
        return null; // Ignore the message if delta_t is zero
    }
} else {
    // Initialize context variables if they are not set
    context.set('previous_velocityTeam1', current_velocityTeam1);
    context.set('previous_timestampTeam1', current_timestamp);
    return null; // No acceleration can be calculated on the first data point
}
    } 
if (msg.payload.sensor_team === "team_2") {
           current_velocityTeam2 = msg.payload.data.speed;
           
        if (previous_velocityTeam2 !== null && previous_timestampTeam2 !== null) {

            var velocity = current_velocityTeam2 - previous_velocityTeam2;
            var time = current_timestamp - previous_timestampTeam2;
            
            // Check if delta_t is not zero to avoid division by zero
            if (time !== 0) {
                // Calculate acceleration
                accelerationTeam2 = velocity / time;
                context.set('accelerationTeam2', accelerationTeam2);
                context.set('previous_velocityTeam2', current_velocityTeam2);
                context.set('previous_timestamp', current_timestamp);
                
                
            } else {
                return null; // Ignore the message if delta_t is zero
            }
        } else {
            // Initialize context variables if they are not set
            context.set('previous_velocityTeam2', current_velocityTeam2);
            context.set('previous_timestampTeam2', current_timestamp);
            return null; // No acceleration can be calculated on the first data point
        }
    } 
if (msg.payload.sensor_team === "team_3") {
        current_velocityTeam3 = msg.payload.data.speed;

        if (previous_velocityTeam3 !== null && previous_timestampTeam3 !== null) {

            var velocity = current_velocityTeam3 - previous_velocityTeam3;
            var time = current_timestamp - previous_timestampTeam3;

            // Check if delta_t is not zero to avoid division by zero
            if (time !== 0) {
                // Calculate acceleration
                accelerationTeam3 = velocity / time;
                context.set('accelerationTeam3', accelerationTeam3);
                context.set('previous_velocityTeam3', current_velocityTeam3);
                context.set('previous_timestampTeam3', current_timestamp);
            } else {
                return null; // Ignore the message if delta_t is zero
            }
        } else {
            // Initialize context variables if they are not set
            context.set('previous_velocityTeam3', current_velocityTeam3);
            context.set('previous_timestampTeam3', current_timestamp);
            return null; // No acceleration can be calculated on the first data point
        }
    }
    if(teamId === "team_1"){
        var acceleration = accelerationTeam1;
        msg.payload = acceleration;
    }else if(teamId === "team_2"){
        var acceleration = accelerationTeam2;
        msg.payload = acceleration;
    }else if(teamId === "team_3"){
        var acceleration = accelerationTeam3;
        msg.payload = acceleration;
        
    }else {
        
        let acceleration = (accelerationTeam1 + accelerationTeam2 + accelerationTeam3)/3;
        msg.payload = acceleration;
    }
    return msg;
}