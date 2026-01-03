import { Cart } from "../Model/cartModel.js";


export const addToCart = async (req, res) => {
    try {
        let { id } = req.user;
        let { product } = req.body;

        if (!product) return res.status(400).json({ message: "Product is missing!" });
        if (!id) return res.status(401).json({ message: "Unauthorized user!" });

        let cart = await Cart.findOne({ id });
        const cartItem = {
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
            warrantyInformation: product.warrantyInformation,
            shippingInformation: product.shippingInformation,
            availabilityStatus: product.availabilityStatus,
            returnPolicy: product.returnPolicy,
            images: product.images,
            thumbnail: product.thumbnail,
            quantity: product.quantity || 1,
            reviews: product.reviews
        };
        if (!cart) {
            cart = await Cart.create({
                id,
                items: [cartItem],
            });
            return res.status(201).json({ message: "Cart created and product added", cart });
        }

        let isItemExist = cart.items.find(item => item.id === product.id);
        if (isItemExist) {
            isItemExist.quantity += 1;
        } else {
            cart.items.push(cartItem);
        }

        await cart.save();
        return res.json({ message: "Product added to cart", cart });
    } catch (error) {
        console.error('Error adding to cart: ', error);
        return res.status(500).json({ message: "Error adding to cart" });
    }
}

export const getCartProducts = async (req, res) => {
    try {
        let { id } = req.user;
        if (!id) return res.status(401).json({ message: "Unauthorized user!" });

        let cart = await Cart.findOne({ id });
        if (!cart) {
            return res.status(404).json({ message: "Product not found!" });
        }
        return res.json({ message: "Cart products retrieved successfully", cart });
    } catch (error) {
        console.error('Error retrieving cart products: ', error);
        return res.status(500).json({ message: "Error retrieving cart products" });
    }
}

export const decreaseQnt = async (req, res) => {
    try {
        let { id } = req.user;
        let { productId } = req.body;
        if (!id) return res.status(401).json({ message: "Unauthorized user!" });
        if (!productId) return res.status(400).json({ message: "Product ID is missing!" });

        let cart = await Cart.findOne({ id });
        if (!cart) {
            return res.status(404).json({ message: "Product not found!" });
        }

        let item = cart.items.find(item => item.id === productId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart.items = cart.items.filter(i => i.id !== productId);
            }
            await cart.save();
            return res.json({ message: "Product quantity decreased", cart });
        } else {
            return res.status(404).json({ message: "Product not found in cart!" });
        }

    } catch (error) {
        console.error('Error retrieving cart products: ', error);
        return res.status(500).json({ message: "Error retrieving cart products" });
    }
}