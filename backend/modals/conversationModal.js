import mongoose from "mongoose";

const conversationModal = new mongoose.Schema({

  participants:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  message:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Message" 
  }]

},{timestamps:true});
export const conversation = mongoose.model("Conversation",conversationModal);