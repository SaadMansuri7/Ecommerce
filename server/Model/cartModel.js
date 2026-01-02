import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        id: {
            type: Number,
            required: true
        },
        title: String,
        description: String,
        category: String,
        price: Number,
        rating: Number,
        brand: String,
        warrantyInformation: String,
        shippingInformation: String,
        availabilityStatus: String,
        returnPolicy: String,
        images: [String],
        quantity: {
            type: Number,
            default: 1
        },
        thumbnail: String,
    }],
}, { timestamps: true });

export const Cart = mongoose.model('Cart', cartSchema);