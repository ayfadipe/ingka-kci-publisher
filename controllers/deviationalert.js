const { publishMessage,SubscriberToTopic} = require('../repositories/pubsub');

module.exports = {
  deviationalerts: (req, res) => {
      return res.status(200).json({
          success: true,
          message: "deviation alert route confirmed :)",
      })
  },

  
receiveDeviation: async (req, res) => {
    try {
      await SubscriberToMessages(process.env.TOPIC_NAME, process.env.SUBSCRIPTION_NAME, process.env.TIME_OUT);            
   } catch (error) {
       return res.status(500).json({
           success: false,
           message: "Couldn't recieve deviation alert :)",
           data: error
       })                        
   }
  }


};



