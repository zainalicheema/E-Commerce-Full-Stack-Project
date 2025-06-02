import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://fooddelivery:fooddelivery123@cluster0.tze40.mongodb.net/food-del')
    .then(()=>console.log("DB Connected"));
}