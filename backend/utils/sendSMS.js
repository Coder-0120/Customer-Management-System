const twilio = require("twilio");
const client = twilio("AC43da5b02bdd66e350a9e04f7edd5c25f", "03e5e3117ebb696e3c13ede77ab70961");

async function sendSMS(phone, message) {
  await client.messages.create({
    from: "whatsapp:+14155238886",
    to: `whatsapp:+91${phone}`,  // e.g. whatsapp:+918977654321
    body: message,
  });
  console.log("✅ WhatsApp message sent!");
}
module.exports = sendSMS;