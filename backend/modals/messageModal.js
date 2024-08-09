import mongoose, { Mongoose } from "mongoose";

const messageModal = new mongoose.Schema({
  senderId:{
    type:Mongoose.Schema.types.ObjectId,
    ref:"User",
    required:true
  },
  receiverId:{
    type:Mongoose.Schema.types.ObjectId,
    ref:"User",
    required:true
  },
  message:{
    type:String,
    required:true
  }
},{timestamps:true});

export const message = mongoose.modelNames("Message",messageModal);