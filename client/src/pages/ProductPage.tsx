import { useEffect, useState } from "react"
import { ProductCard } from "../components/ProductCard"
import { SearchBar } from "../components/SearchBar"
import { ShimmerCard } from "../components/ShimmerCard"

export type Review = {
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
}

export type Dimention = {
    height: number,
    width: number,
    depth: number
}

export type Product = {
    id: number,
    title: string,
    description: string
    category: string,
    price: number,
    discountPercentage: number,
    rating: number,
    quantity: number,
    stock: number,
    brand: number,
    weight: number,
    warrantyInformation: string,
    shippingInformation: string,
    availabilityStatus: string,
    returnPolicy: string,
    thumbnail: string,
    images: string[],
    dimensions: Dimention | undefined,
    reviews: Review[]
} | undefined;

export const ProductPage = () => {

    const [productsData, setProductsData] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    let limit = 8;
    let totalPages = Math.ceil(195 / limit);

    async function fetchProducts() {
        try {
            let skip = (currentPage - 1) * limit
            setLoading(true);
            let response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
            let data = await response.json();
            setProductsData(data.products);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    return (
        <div>
            <SearchBar />
            {loading && <div className="w-7xl overflow-x-hidden mx-auto py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ShimmerCard key={i} />
                ))}
            </div>}
            <div className="w-7xl mx-auto py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productsData.map(product => (
                    <ProductCard key={product?.id} product={product} />
                ))}
            </div>

            <div className="flex flex-row gap-4 items-center justify-center">
                <button className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-white hover:text-black" onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>Previouse</button>
                <p>Page {currentPage} of {totalPages}</p>
                <button className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-white hover:text-black" onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    )
}