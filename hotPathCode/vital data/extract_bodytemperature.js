const body_temperature = msg.payload.body_temperature;
msg.payload = body_temperature;
return msg;