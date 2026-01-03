import { Wishlist } from "../Model/wishlistModel.js";


export const getWishlistProducts = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) return res.status(401).json({ message: "Unauthorized user!" });
        let wishlist = await Wishlist.findOne({ id });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found!" });
        }
        res.status(200).json({ message: "wishlist retrieved successfully!", wishlist });
    } catch (error) {
        console.error('Error retrieving wishlist: ', error);
        return res.status(500).json({ message: "Error retrieving wishlist" });
    }
}

export const addToWishlist = async (req, res) => {
    try {
        const { id } = req.user;
        const { product } = req.body;
        if (!id) return res.status(401).json({ message: "Unauthorized user!" });
        if (!product) return res.status(400).json({ message: "Product data is missing!" });
        let wishlist = await Wishlist.findOne({ id });
        const wishlistItem = {
            id: product.id,
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            brand: product.brand,
            stock: product.stock,
            weight: product.weight,
            dimensions: product.dimensions,
            warrantyInformation: product.warrantyInformation,
            shippingInformation: product.shippingInformation,
            availabilityStatus: product.availabilityStatus,
            returnPolicy: product.returnPolicy,
            images: product.images,
            thumbnail: product.thumbnail,
            quantity: product.quantity || 1,
            reviews: product.reviews,
            dimensions: product.dimensions
        };
        if (!wishlist) {
            wishlist = await Wishlist.create({
                id,
                items: [wishlistItem],
            });
            return res.status(201).json({ message: "Wishlist created and product added", wishlist });
        }
        const existingItem = wishlist.items.find(item => item.id === product.id);
        if (!existingItem) {
            wishlist.items.push(wishlistItem);
        }
        await wishlist.save();
        res.status(200).json({ message: "Product added to wishlist successfully!" });
    } catch (error) {
        console.error('Error adding to wishlist: ', error);
        return res.status(500).json({ message: "Error adding to wishlist" });
    }
}

export const removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.user;
        const { productId } = req.body;
        if (!id) return res.status(401).json({ message: "Unauthorized user!" });
        if (!productId) return res.status(400).json({ message: "Product ID is missing!" });
        let wishlist = await Wishlist.findOne({ id });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        wishlist.items = wishlist.items.filter(item => item.id !== productId);
        await wishlist.save();
        return res.status(200).json({ message: "Product removed from wishlist successfully!", wishlist });
    } catch (error) {
        console.error('Error removing from wishlist: ', error);
        return res.status(500).json({ message: "Error removing from wishlist" });
    }
}