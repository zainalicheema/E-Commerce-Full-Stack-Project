import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('Enter Your MongoB URL')
    .then(()=>console.log("DB Connected"));
}
