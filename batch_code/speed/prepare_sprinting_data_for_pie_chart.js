// Function node to prepare data for the pie chart
var percentages = msg.payload.percentages;

msg.payload = percentages.sprinting;
msg.topic = "Sprinting";

return msg;
