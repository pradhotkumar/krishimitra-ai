'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Heart, MapPin, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  image: string;
  aiRecommended: boolean;
  inStock: boolean;
  seller: string;
}

export default function MarketplacePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const categories = [
    'All Products',
    'Seeds',
    'Fertilizers',
    'Pesticides',
    'Tools & Equipment',
    'Irrigation',
    'Organic Products'
  ];

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedName = localStorage.getItem('userName') || 'Guest';
    setIsAuthenticated(authStatus === 'true');
    setUserName(storedName);

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (productId: string) => {
    const newCart = [...cart, productId];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    // Show toast notification
    alert('Added to cart!');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    router.push('/auth');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* E-commerce Header */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        {/* Top Bar */}
        <div className="bg-green-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Deliver to: Bangalore 560001</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/voice-helpline" className="hover:underline">24/7 Helpline</Link>
              <Link href="/about" className="hover:underline">About Us</Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-2xl">🌾</span>
              <div>
                <div className="text-xl font-bold text-green-700">KrishiMitra</div>
                <div className="text-xs text-gray-500">Marketplace</div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for seeds, fertilizers, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2.5 border-2 border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="absolute right-0 top-0 bottom-0 px-6 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* User Account */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Hello,</div>
                      <div className="text-sm font-semibold flex items-center gap-1">
                        {userName}
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border py-2 z-50">
                      <Link
                        href="/dashboard/farmer"
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <div className="font-medium">My Dashboard</div>
                        <div className="text-xs text-gray-500">View crops & advice</div>
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Wishlist
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Hello,</div>
                    <div className="text-sm font-semibold">Sign In</div>
                  </div>
                </Link>
              )}

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Heart className="w-6 h-6" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
                <div className="text-xs font-semibold mt-1">Cart</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-6 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'All Products' ? 'all' : category.toLowerCase())}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === (category === 'All Products' ? 'all' : category.toLowerCase())
                      ? 'bg-green-600 text-white'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb & Results */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Marketplace</span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              <span className="font-semibold">{filteredProducts.length}</span> products found
              {selectedCategory !== 'all' && (
                <span className="ml-2 text-sm">
                  in <span className="font-medium capitalize">{selectedCategory}</span>
                </span>
              )}
            </p>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Sort by: Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md animate-pulse overflow-hidden">
                <div className="h-56 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg font-medium">No products found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
