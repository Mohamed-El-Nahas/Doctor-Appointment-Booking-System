// 1- import mongoose package
import mongoose from "mongoose";

// 2- create Schema for doctors data
const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    // date is for acc creation date.
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },

    // to store empty object in any data add {minimize:false} like below to make the empty object as default value
  },
  { minimize: false }
);

// 3- create model
// note : we make model as we see below becuase it will be used for multiple times.
const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

// 4- export model
export default doctorModel;
