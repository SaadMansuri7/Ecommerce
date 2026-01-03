import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema({
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
        reviews: Array,
        discountPercentage: Number,
        stock: Number,
        weight: Number,
        warrantyInformation: String,
        shippingInformation: String,
        availabilityStatus: String,
        returnPolicy: String,
        thumbnail: String,
        images: [String],
        quantity: {
            type: Number,
            default: 1
        },
        dimensions: {
            height: Number,
            width: Number,
            depth: Number
        },
    }],
}, { timestamps: true });

export const Wishlist = mongoose.model('Wishlist', wishlistSchema);