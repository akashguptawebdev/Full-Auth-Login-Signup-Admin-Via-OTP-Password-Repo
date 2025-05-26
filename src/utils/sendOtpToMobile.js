// import axios from "axios";
// import twilio from "twilio";
// Function to send OTP to mobile using Fast2SMS
export const sendOtpToMobile = async (phoneNumber, otp) => {

  // const OtpMessage = `Your OTP is ${otp}`;
  // const accountSid = ""; // from console
  // const authToken = "";   // from console
  // const twilioPhone = "";           // your Twilio trial number
  
  // const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      // body: OtpMessage,
      // from: twilioPhone,
      // to: phoneNumber, // e.g., "+91xxxxxxxxxx"
    });

    console.log("OTP sent successfully:", message.sid);
    return "OTP sent successfully!";
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    throw new Error("Failed to send OTP.");
  }
};
