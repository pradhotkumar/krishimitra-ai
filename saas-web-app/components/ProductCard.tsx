"use client";

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
    <div className="group glass-tier-1 rounded-2xl glass-specular p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] card-hover relative flex flex-col z-20">
      <Link href={`/marketplace/${product.id}`} className="block relative h-52 overflow-hidden rounded-[14px] glass-tier-2 shadow-inner">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ease-in-out ${imageLoaded ? 'opacity-90 group-hover:scale-105 group-hover:opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
          {product.aiRecommended && (
            <div className="glass-tier-3 rounded-pill glass-specular scale-90 origin-top-left">
              <AIBadge size="sm" variant="compact" />
            </div>
          )}
          <button
            onClick={handleWishlist}
            className="ml-auto glass-tier-3 p-2 rounded-full interactive-glass focus:outline-none apple-focus glass-specular text-text-primary"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-glassTint-pink text-glassTint-pink drop-shadow-[0_0_8px_rgba(255,55,95,0.6)]' : 'text-text-primary'
                }`}
            />
          </button>
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[8px] flex items-center justify-center z-20">
            <span className="text-text-primary font-semibold text-lg drop-shadow-md">Out of Stock</span>
          </div>
        )}

        {/* Quick View */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center z-10 pointer-events-none">
          <div className="glass-tier-3 px-5 py-2.5 rounded-pill flex items-center gap-2 text-sm font-medium text-text-primary glass-specular transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
            <Eye className="w-4 h-4" />
            Quick View
          </div>
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between relative z-20">
        <div>
          <Link href={`/marketplace/${product.id}`} className="block mb-2 group-hover:text-glassTint-mint transition-colors">
            <p className="text-label text-text-tertiary mb-1">
              {product.category}
            </p>
            <h3 className="font-semibold text-base text-text-primary leading-tight min-h-[2.5rem] tracking-tight text-vibrancy">
              {product.name}
            </h3>
          </Link>

          <div className="mb-4">
            <StarRating rating={product.rating} reviews={product.reviews} size="sm" />
          </div>

          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-text-primary text-vibrancy">₹{product.price}</span>
                <span className="text-sm text-text-tertiary">/{product.unit}</span>
              </div>
              <p className="text-xs text-text-tertiary mt-1 font-medium">by <span className="text-text-secondary">{product.seller}</span></p>
            </div>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-3 rounded-pill font-semibold flex items-center justify-center gap-2 interactive-glass transition-all focus:outline-none apple-focus ${product.inStock
              ? 'glass-tier-2 bg-glassTint-blue/20 text-text-primary glass-specular hover:bg-glassTint-blue/40 text-vibrancy'
              : 'glass-tier-1 text-text-secondary opacity-50 cursor-not-allowed'
            }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
