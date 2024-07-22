// Function node to prepare data for the pie chart
var percentages = msg.payload.percentages;

msg.payload = percentages.walking;
msg.topic = "Walking";

return msg;
