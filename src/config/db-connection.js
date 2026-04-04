import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // await connect(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI2);
    console.log("Conexión a la base de datos establecida");
  } catch (error) {
    throw new Error(`Error al conectar a la base de datos: ${error.message}`);
  }
};
