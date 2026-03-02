'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import StarRating from './StarRating';
import AIBadge from './AIBadge';

interface ProductCardProps {
  product: {
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
    description?: string;
  };
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Redirect to login with return URL
      router.push(`/auth?redirect=/marketplace`);
      return;
    }
    if (onAddToCart && product.inStock) {
      onAddToCart(product.id);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push(`/auth?redirect=/marketplace`);
      return;
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100">
      <Link href={`/marketplace/${product.id}`}>
        <div className="relative h-56 bg-gray-100 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 animate-pulse" />
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            {product.aiRecommended && (
              <AIBadge size="sm" variant="compact" />
            )}
            <button
              onClick={handleWishlist}
              className="ml-auto bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-md"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </button>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}

          {/* Quick View */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium text-gray-800">
              <Eye className="w-4 h-4" />
              Quick View
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/marketplace/${product.id}`}>
          <div className="mb-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {product.category}
            </p>
            <h3 className="font-semibold text-base text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors min-h-[3rem]">
              {product.name}
            </h3>
          </div>
        </Link>

        <div className="mb-3">
          <StarRating rating={product.rating} reviews={product.reviews} size="sm" />
        </div>

        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
              <span className="text-sm text-gray-500">/{product.unit}</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">by {product.seller}</p>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 group-hover:scale-[1.02]"
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
