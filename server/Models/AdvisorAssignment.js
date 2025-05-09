import mongoose from 'mongoose';

const advisorAssignmentSchema = new mongoose.Schema({
  AdvisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  advisorName: {
    type: String,
    required: true,
  },
  advisorEmail: {
    type: String,
    required: true,
  },
  advisorstatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
    },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {  
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  studentStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
    },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // admin
    required: true,
  },
  assign: { type: Boolean, default: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
}, { timestamps: true });



const AdvisorAssignment = mongoose.model('AdvisorAssignment', advisorAssignmentSchema);

export default AdvisorAssignment;
