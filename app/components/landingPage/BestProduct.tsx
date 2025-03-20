'use client'
import { useCallback, useEffect, useState } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types/product';
import Image from 'next/image';

// Definisikan kategori yang tersedia
const CATEGORIES = ['smartphones', 'laptops', 'mobile-accessories'];
const CATEGORY_NAMES = {
  'smartphones': 'Smartphones',
  'laptops': 'Laptops',
  'mobile-accessories': 'Mobile Accessories'
};

export const BestProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>('smartphones');

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);

            // Langsung ambil berdasarkan kategori aktif
            const url = `https://dummyjson.com/products/category/${activeCategory}`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            // Ambil maksimal 8 produk
            setProducts(data.products.slice(0, 8));
            
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [activeCategory]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 lg:pt-72">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Best Products</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Discover our most popular and highly-rated products that customers love
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-gray-100 p-1 rounded-full">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                                    activeCategory === category
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {CATEGORY_NAMES[category as keyof typeof CATEGORY_NAMES]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading state */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    /* Product Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                {/* Product Image */}
                                <div className="relative h-48 bg-gray-200">
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Discount Badge */}
                                    {product.discountPercentage > 0 && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                            {Math.round(product.discountPercentage)}% OFF
                                        </div>
                                    )}
                                    {/* Wishlist Button */}
                                    <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100">
                                        <Heart className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    {/* Category */}
                                    <div className="text-xs text-blue-600 font-medium mb-1">
                                        {product.category}
                                    </div>
                                    
                                    {/* Title */}
                                    <h3 className="font-medium text-gray-900 mb-2 truncate">
                                        {product.title}
                                    </h3>
                                    
                                    {/* Rating */}
                                    <div className="flex items-center mb-2">
                                        <div className="flex text-yellow-400">
                                            <Star className="w-4 h-4 fill-current" />
                                        </div>
                                        <span className="text-sm text-gray-600 ml-1">
                                            {product.rating.toFixed(1)}
                                        </span>
                                    </div>
                                    
                                    {/* Price */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-lg font-bold text-gray-900">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            {product.discountPercentage > 0 && (
                                                <span className="text-sm text-gray-500 line-through ml-2">
                                                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Cart Button */}
                                        <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                                            <ShoppingCart className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};