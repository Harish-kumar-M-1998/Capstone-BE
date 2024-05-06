const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  tasks: [
    {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
      },
      dueDate: {
        type: Date,
        default: null
      },
      completed: {
        type: Boolean,
        default: false
      }
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Checklist = mongoose.model('Checklist', checklistSchema);

module.exports = Checklist;
