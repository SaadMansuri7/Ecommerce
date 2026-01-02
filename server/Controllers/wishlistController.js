import { Wishlist } from "../Model/wishlistModel";


export const addToWishlist = async (req, res) => {
    try {
        const { id } = req.user;
        const { product } = req.body;
        if (!id) return res.status(401).json({ message: "Unauthorized user!" });
        if (!product) return res.status(400).json({ message: "Product data is missing!" });
        let wishlist = await Wishlist.findOne({ id });
        if (!wishlist) {
            wishlist = new Wishlist({ id, items: [] });
        }
        const existingItem = wishlist.items.find(item => item.id === product.id);
        if (!existingItem) {
            wishlist.items.push(product);
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
        const { product } = req.body;
        if (!id) return res.status(401).json({ message: "Unauthorized user!" });
        if (!product) return res.status(400).json({ message: "Product data is missing!" });
        let wishlist = await Wishlist.findOne({ id });
        if (!wishlist) {
            wishlist = new Wishlist({ id, items: [] });
        }
        const existingItem = wishlist.items.find(item => item.id === product.id);
        if (existingItem) {
            wishlist.items = wishlist.items.filter(item => item.id !== product.id);
        }
        await wishlist.save();
        res.status(200).json({ message: "Product removed from wishlist successfully!" });
    } catch (error) {
        console.error('Error removing from wishlist: ', error);
        return res.status(500).json({ message: "Error removing from wishlist" });
    }
}