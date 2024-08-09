import { Conversation } from "../modals/conversationModal.js";
import { Message } from "../modals/messageModal.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    await gotConversation.save();

    return res.status(201).json({
      message: "Message send Successfully!!!",
    });

    //SOCKET IO
  } catch (error) {
    console.log(error.message);
  }
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({
      participants:{$all:[senderId,receiverId]}
    }).populate("messages")
    console.log(conversation);
  } catch (error) {
    console.log(error.message);
  }
};
