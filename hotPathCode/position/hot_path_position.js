// retrieve the teamId from the global context
var teamId = global.get("selectedTeam");
var previousTeamId = context.get("previousTeamId");

var deletePayloads = [];
var updatePayload = null;

// function to add a deletion message
function addDeletePayload(name) {
    deletePayloads.push({
        name: name,
        deleted: true
    });
}

// handle incoming payload
if (msg.payload.sensor_type === "position") {
    // handle the case where 'all' was previously selected
    if (previousTeamId === "all" && teamId !== "all") {
        // if switching from "all" to a specific team, delete all previous team markers
        ["team_1", "team_2", "team_3"].forEach(team => {
            if (team !== teamId) {
                addDeletePayload(team);
            }
        });
    }
    // handle the case where 'all' is currently selected
    if (teamId === "all") {
        // add/update markers for all teams
        updatePayload = {
            name: msg.payload.sensor_team,
            lat: msg.payload.data.latitude,
            lon: msg.payload.data.longitude
        };
    } else if (teamId !== "all" && msg.payload.sensor_team === teamId) {
        // add/update marker for the selected team
        updatePayload = {
            name: teamId,
            lat: msg.payload.data.latitude,
            lon: msg.payload.data.longitude,
            altitude: msg.payload.data.altitude
        };
    }
}
// handle the case where switching from a specific team to another
if (previousTeamId !== "all" && previousTeamId !== teamId && teamId !== "all") {
    addDeletePayload(previousTeamId);
}
// update the context with the current teamId
context.set("previousTeamId", teamId);

msg.payload = deletePayloads;
if (updatePayload) {
    msg.payload.push(updatePayload);
}
return msg;