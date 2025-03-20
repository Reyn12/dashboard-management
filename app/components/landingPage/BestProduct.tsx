'use client'
import { useCallback, useEffect, useState } from 'react';
import { Star, ShoppingCart, Heart, Search, ChevronDown } from 'lucide-react';
import { Product } from '@/types/product';
import Image from 'next/image';

// Definisikan kategori yang tersedia
const CATEGORIES = ['smartphones', 'laptops', 'mobile-accessories'];
const CATEGORY_NAMES = {
    'smartphones': 'Smartphones',
    'laptops': 'Laptops',
    'mobile-accessories': 'Mobile Accessories'
};

// Opsi sorting
const SORT_OPTIONS = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Highest Rated' }
];

export const BestProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>('smartphones');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [cart, setCart] = useState<{ id: number, quantity: number }[]>([]);

    // Fetch products from API
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);

            // Langsung ambil berdasarkan kategori aktif
            const url = `https://dummyjson.com/products/category/${activeCategory}`;

            const response = await fetch(url);
            const data = await response.json();

            // Ambil maksimal 12 produk
            setProducts(data.products.slice(0, 12));

        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [activeCategory]);

    // Apply search and sorting
    useEffect(() => {
        let result = [...products];

        // Apply search filter
        if (searchQuery) {
            result = result.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply sorting
        switch (sortOption) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Keep default order
                break;
        }

        setFilteredProducts(result);
    }, [products, searchQuery, sortOption]);

    // Initial fetch
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Add to cart function
    const addToCart = (productId: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productId);

            if (existingItem) {
                // Increment quantity if already in cart
                return prevCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item to cart
                return [...prevCart, { id: productId, quantity: 1 }];
            }
        });
    };

    // Get cart count
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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

                {/* Search and Filter Bar */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    {/* Search Input */}
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative w-full md:w-48">
                        <select
                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            {SORT_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </div>

                    {/* Cart Button with Counter */}
                    <div className="relative">
                        <button className="bg-white border border-gray-300 rounded-lg py-2 px-4 flex items-center gap-2 hover:bg-gray-50">
                            <ShoppingCart className="h-5 w-5 text-gray-700" />
                            <span className="text-gray-700">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-gray-100 p-1 rounded-full">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
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
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                    </div>
                ) : (
                    /* Product Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                {/* Product Image */}
                                <div
                                    className="relative h-48 bg-gray-200 cursor-pointer"
                                    onClick={() => window.location.href = `/products/${product.title}`}
                                >
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
                                    <button
                                        className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Mencegah event click sampai ke parent
                                            // Logic untuk wishlist
                                        }}
                                    >
                                        <Heart className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    {/* Category */}
                                    <div className="text-xs text-blue-600 font-medium mb-1">
                                        {product.category}
                                    </div>

                                    {/* Title - Bisa diklik untuk ke halaman detail */}
                                    <h3
                                        className="font-medium text-gray-900 mb-2 truncate cursor-pointer hover:text-blue-600"
                                        onClick={() => window.location.href = `/products/${product.title}`}
                                    >
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

                                    {/* Price and Actions */}
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

                                        <div className="flex space-x-2">

                                            {/* Cart Button */}
                                            <button
                                                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Mencegah event click sampai ke parent
                                                    addToCart(product.id);
                                                }}
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                            </button>
                                        </div>
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