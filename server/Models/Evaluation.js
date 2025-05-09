import mongoose from 'mongoose';

const EvaluationSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weekStartDate: {
    type: Date,
    required: true
  },
  weekEndDate: {
    type: Date,
    required: true
  },
  weeklyPerformance: {
    teamwork: { type: Number, min: 0, max: 10, required: true },
    initiative: { type: Number, min: 0, max: 10, required: true },
    focus: { type: Number, min: 0, max: 10, required: true },
    reporting: { type: Number, min: 0, max: 10, required: true },
    communication: { type: Number, min: 0, max: 10, required: true },
    punctuality: { type: Number, min: 0, max: 10, required: true },
    discipline: { type: Number, min: 0, max: 10, required: true },
    growth: { type: Number, min: 0, max: 10, required: true }
  },
  projectEvaluation: {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ['created', 'ongoing', 'submitted', 'approved'],
      default: 'created',
      required: true
    },
    progress: { type: Number, min: 0, max: 100, required: true },
    deadline: { type: Date, required: true },
    remarks: String
  },
  overallGrade: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Evaluation', EvaluationSchema);