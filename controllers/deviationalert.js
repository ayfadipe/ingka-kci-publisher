const { publishMessage,SubscriberToTopic} = require('../repositories/pubsub');
const deviationTopicName = process.env.TOPIC_NAME;

module.exports = {
  deviationalerts: (req, res) => {
      return res.status(200).json({
          success: true,
          message: "deviation alert route confirmed :)",
      })
  },

  
  createDeviation: async (req, res) => {
    const messageId = await publishMessage(deviationTopicName,req.body);
    res.status(200).json({
      success: true,
      data: `Message ${messageId} published `
    });
  },

};



