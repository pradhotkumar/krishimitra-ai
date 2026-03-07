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
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedName = localStorage.getItem('userName') || 'Guest';
    setIsAuthenticated(authStatus === 'true');
    setUserName(storedName);

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
    // Ideally replace alert with a toast matching liquid glass spec later
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
    <div className="min-h-screen w-full relative z-10 pb-20 lg:pb-0">
      {/* E-commerce Header */}
      <div className="sticky top-0 z-[60] outline-none">
        {/* Top Info Bar */}
        <div className="glass-tier-2 border-b border-white/5 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-[11px] font-medium tracking-wide text-text-tertiary uppercase">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Deliver to: Bangalore 560001</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/voice-helpline" className="hover:text-text-primary transition-colors">24/7 Helpline</Link>
              <Link href="/about" className="hover:text-text-primary transition-colors">About Us</Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="glass-tier-3 glass-specular shadow-2xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 md:py-5">
            <div className="flex items-center gap-4 md:gap-8 flex-wrap md:flex-nowrap">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 flex-shrink-0 apple-focus rounded-xl">
                <span className="text-3xl animate-float-slow select-none">🌾</span>
                <div>
                  <div className="text-xl font-bold text-text-primary text-vibrancy tracking-tight">KrishiMitra</div>
                  <div className="text-[11px] text-text-tertiary font-semibold uppercase tracking-widest leading-none mt-0.5">Marketplace</div>
                </div>
              </Link>

              {/* Search Bar - Takes full width on mobile via order */}
              <div className="flex-1 w-full order-3 md:order-none mt-3 md:mt-0">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search seeds, fertilizers, tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-5 pr-14 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-text-primary text-sm font-medium placeholder:text-text-tertiary focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all shadow-inner"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl text-text-secondary">
                    <Search className="w-5 h-5 opacity-70" />
                  </div>
                </div>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 order-2 md:order-none ml-auto">
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2.5 px-3 py-2 interactive-glass hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/10 apple-focus"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/10 to-white/20 border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
                        <User className="w-4 h-4 text-text-primary" />
                      </div>
                      <div className="text-left hidden lg:block">
                        <div className="text-[10px] uppercase tracking-widest text-text-tertiary font-semibold">Hello,</div>
                        <div className="text-sm font-bold text-text-primary flex items-center gap-1.5 leading-none mt-0.5">
                          {userName}
                          <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                        </div>
                      </div>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-3 w-64 glass-tier-3 glass-specular rounded-3xl border border-white/20 shadow-2xl p-2 z-[100] animate-glass-reveal origin-top-right">
                        <Link
                          href="/dashboard/farmer"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-2xl transition-colors group"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <div className="p-2 glass-tier-1 rounded-xl group-hover:bg-white/10 transition-colors">ðŸŒ</div>
                          <div>
                            <div className="font-semibold text-text-primary text-sm">Farmer Dashboard</div>
                            <div className="text-xs text-text-tertiary mt-0.5">View crops & advice</div>
                          </div>
                        </Link>
                        <div className="h-px w-full bg-white/10 my-1" />
                        <Link
                          href="/orders"
                          className="block px-4 py-2.5 hover:bg-white/5 rounded-xl transition-colors text-sm font-medium text-text-secondary hover:text-text-primary"
                          onClick={() => setShowUserMenu(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          className="block px-4 py-2.5 hover:bg-white/5 rounded-xl transition-colors text-sm font-medium text-text-secondary hover:text-text-primary"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Wishlist
                        </Link>
                        <div className="h-px w-full bg-white/10 my-1" />
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-red-500/10 rounded-xl transition-colors text-sm font-medium text-red-400 hover:text-red-300"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/auth"
                    className="flex items-center gap-3 px-5 py-2.5 glass-tier-2 hover:bg-white/10 border border-white/10 rounded-2xl transition-all interactive-glass apple-focus text-text-primary"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-semibold">Sign In</span>
                  </Link>
                )}

                <Link
                  href="/wishlist"
                  className="relative p-3 interactive-glass hover:bg-white/5 rounded-2xl transition-colors text-text-secondary hover:text-text-primary apple-focus"
                >
                  <Heart className="w-5 h-5" />
                </Link>

                <Link
                  href="/cart"
                  className="relative p-3 interactive-glass hover:bg-white/5 rounded-2xl transition-colors text-text-secondary hover:text-text-primary apple-focus flex items-center gap-2"
                >
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-[#101014]">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 py-2.5">
              <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 -mb-1 scroll-smooth">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === 'All Products' ? 'all' : category.toLowerCase())}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm transition-all apple-focus outline-none ${selectedCategory === (category === 'All Products' ? 'all' : category.toLowerCase())
                        ? 'glass-tier-3 text-text-primary font-semibold glass-specular shadow-md border border-white/30 transform scale-[1.02]'
                        : 'text-text-secondary font-medium hover:text-text-primary hover:bg-white/5 interactive-glass border border-transparent'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Results Info */}
        <div className="mb-8 md:mb-12 glass-tier-1 rounded-3xl p-6 glass-specular border border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary mb-6">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <span className="text-text-primary">Store</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary text-vibrancy mb-1">
                {selectedCategory === 'all' ? 'All Provisions' : categories.find(c => c.toLowerCase() === selectedCategory)}
              </h1>
              <p className="text-sm text-text-secondary mt-2 font-medium">
                Viewing <span className="text-text-primary font-bold px-1">{filteredProducts.length}</span> items
              </p>
            </div>

            <div className="relative group">
              <select className="appearance-none glass-tier-2 border border-white/20 rounded-2xl pl-4 pr-10 py-3 text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-white/30 interactive-glass cursor-pointer">
                <option value="relevance" className="text-black">Sort by: Relevance</option>
                <option value="price-asc" className="text-black">Price: Low to High</option>
                <option value="price-desc" className="text-black">Price: High to Low</option>
                <option value="rating" className="text-black">Top Rated</option>
                <option value="newest" className="text-black">Newest Arrivals</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-tier-1 rounded-[32px] overflow-hidden glass-specular animate-pulse">
                <div className="h-64 bg-white/5" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-white/10 rounded-full w-1/3" />
                  <div className="h-6 bg-white/10 rounded-full w-3/4" />
                  <div className="h-4 bg-white/5 rounded-full w-1/2" />
                  <div className="h-12 bg-white/10 rounded-2xl w-full mt-6" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24 glass-tier-1 rounded-[40px] glass-specular border border-white/10">
            <div className="text-8xl mb-6 animate-float-slow opacity-80 mix-blend-screen text-shadow-vibrancy">🔍</div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">No provisions found</h3>
            <p className="text-text-secondary max-w-sm mx-auto text-sm leading-relaxed">
              We couldn't find anything matching your exact search. Try exploring different categories or clearing filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-8 px-8 py-3.5 glass-tier-3 rounded-2xl text-text-primary font-semibold interactive-glass glass-specular transition-all apple-focus"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div className="animate-glass-reveal">
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
