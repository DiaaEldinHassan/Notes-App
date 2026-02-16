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
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
      minlength: [8, "Minimum length of the password must be 8 characters"],
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    image: {
      type: String,
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
    bio: {
      type: String,
    },
  },
  {
    collection: "Users",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.pre("save", async function () {
  if (this.provider === "google") return;
  if (!this.isModified("password")) return;
  this.password = await hashing(this.password);
});


schema.virtual("username").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export const usersModel = mongoose.models.Users || mongoose.model("Users", schema);
