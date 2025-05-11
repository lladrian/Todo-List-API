import mongoose from "mongoose";

const TodoListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }, 
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  created_at: {
    type: Date,
    default: null
  },
});


export default mongoose.model('TodoList', TodoListSchema);