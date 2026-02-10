import mongoose from "mongoose";
import { hashing } from "../../Common/Utils/hash.utils.js";
import { gender, role } from "../../index.js";

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^[a-z0-9._%+-]+@(gmail|yahoo|hotmail|outlook)\.(com|net)$/i,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Minimum length of the password must be 8 characters"],
    },
    gender: {
      type: String,
      enum: [gender.male, gender.female],
      default: gender.male,
    },
    role: {
      type: String,
      enum: [role.user, role.admin],
      default: role.user,
    },
    bio:{
      type:String
    }
  },
  {
    collection: "Users",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

schema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hashing(this.password);
});

schema.virtual("username").get(function(){
  return `${this.firstName} ${this.lastName}`;
});

export const usersModel =
  mongoose.models.Users || mongoose.model("Users", schema);
