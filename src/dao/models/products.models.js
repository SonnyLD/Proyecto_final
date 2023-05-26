import mongoose from "mongoose";
import pagination from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
import UserModel from "./users.models.js"

const schema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  description:{
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
    min: 0,
  },
  thumbnail:{
    type: String,
    required: true,
  },
  stock:{
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  code:{
    type: String,
    required: true,
    unique: true,
  },
  category:{
    type: String,
    required: true,
  },
  status:{
    type: Boolean,
    required: true,
    default: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Referencia al modelo de usuario
    validate: {
      validator: async function(userId) {
        // Validar que el usuario tenga rol "premium"
        const user = await UserModel.findById(userId);
        return user && user.role === "premium";
      },
      message: "El propietario del producto debe ser un usuario premium"
    }
  },
},
{
  timestamps: true,
},
);

schema.plugin(mongooseDelete, { deletedAt: true });

schema.plugin(pagination);

const ProductModel = mongoose.model("Products", schema);

export default ProductModel;
