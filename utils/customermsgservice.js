const axios = require("axios");

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function getIamToken(){
    try {
      const signin = await axios({
        method: "POST",
        url: process.env.IAMTOKEN_URL,
        headers: { "content-type": "application/json" },
        data: JSON.stringify({
            client_id: process.env.Client_id,
            client_secret: process.env.Client_secret,
            audience: process.env.Audience,
            grant_type: "client_credentials"
        })
      });
  
      console.log("We got: ", JSON.stringify(signin.data, null, 2));
      return signin.data.access_token;
  
    } catch (error) {
      console.log("Error in getIamToken(): ", error.message);
      console.log("Response from getIamToken(): ", error.response.data);
      console.error(error.response.data);
    }
}

module.exports = {
    sendEmail: async (emailAddress) =>{
        try {
          console.log("Sendin email...");
          console.log(`IamToken: ${iamToken}`);
      
          if (!validateEmail(emailAddress)){
            throw({message:"emailAddress is not valid."});
          };
      
          const payload = {
            messageType: "email",
            templateName: "IKEA_CM_202007_BOOKA_Sample_Campaign",
            recipients: [
              {
                country: "GB", //Notice, if you are testing against PRODUCTION you need to use TE here
                language: "EN", //And you need to use LANGUAGE-COUNTRY combination here. eg. EN-GB
                customerId: "IKEA PARTYUID", //When in Prod. This is the PARTYUID
                emailAddress: emailAddress,
                messageData: {
                  FIRST_NAME: "IKEA",
                  LAST_NAME: "Customer",
                  MEMBERSHIP_CARD_NUMBER: "IKEA CARD NUMBER",
                  PROFILE_TYPE: "FAMILY"
                },
              },
            ],
          };
      
          const iamToken = await getIamToken();
          const response = await axios({
            method: "POST",
            url: process.env.MSG_URL,
            headers: {
              Authorization: `Bearer ${iamToken}`,
              "content-type": "application/json",
              "X-Client-Id": process.env.X_Client_Id,
            },
            data: payload,
          });
      
          return response.data;
        } catch (error) {
          console.error("Error in sendEmail(iamToken):", error.message);
          if (error.response && error.response.status == 429) {
            console.log( "Error: Your ratelimit is hit - Please handle your limit per minute");
          }
          if(error.response){
            return error.response.data;
          }else{
            return error;
          }
        }
      }
   
}