import mongoose from "mongoose";

//CONEXION A BASE DE DATOS MONGOOSE
const conectarDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `CONECTADO A MONGODB EN SERVER: ${connection.connection.host} - EN PUERTO: ${connection.connection.port}`;
    console.log(url);
  } catch (error) {
    console.log(`${error.message}`);
    process.exit(1);
  }
};

export default conectarDB;