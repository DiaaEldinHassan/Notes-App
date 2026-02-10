import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  iv: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: contentSchema,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref:"Users",
      required: true,
    },
    endDate: {
      type: Date,
      default:new Date()
    },
    checked: {
      type: Boolean,
      default: false,
    },
    deleted:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
    collection: "Notes",
  },
);

export const notesModel =
  mongoose.models.Notes || mongoose.model("Notes", schema);
