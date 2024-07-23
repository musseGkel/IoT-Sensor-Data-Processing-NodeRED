var teamId = global.get("selectedTeam");
if(teamId === 1){
    msg.payload = "Team 1";
}else if(teamId === 2){
    msg.payload = "Team 2";
}else if(teamId === 3){
    msg.payload = "Team 3";
}
return msg;