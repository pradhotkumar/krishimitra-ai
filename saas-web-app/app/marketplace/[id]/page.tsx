'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, ShoppingCart, TrendingUp, Truck, Shield, ArrowLeft } from 'lucide-react';

interface ProductDetail {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  aiRecommended: boolean;
  aiReason: string;
  inStock: boolean;
  seller: string;
  sellerRating: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductDetail();
  }, [params.id]);

  const fetchProductDetail = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();
      setProduct(data.product);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: params.id, quantity })
      });
      alert('Added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => router.push('/marketplace')}
            className="text-green-600 hover:text-green-700"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Marketplace
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <span className="text-9xl">🌾</span>
              </div>
              {product.aiRecommended && (
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  AI Recommended
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
                {product.inStock ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-green-600">₹{product.price}</span>
                <span className="text-xl text-gray-500">/{product.unit}</span>
              </div>

              {product.aiRecommended && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 mb-1">Why AI Recommends This</p>
                      <p className="text-sm text-green-800">{product.aiReason}</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  disabled={!product.inStock}
                  className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                >
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-xs text-gray-600">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-xs text-gray-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <Star className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-xs text-gray-600">Quality Assured</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-lg shadow">
          <div className="border-b">
            <div className="flex gap-8 px-6">
              <button className="py-4 border-b-2 border-green-600 font-medium text-green-600">
                Features
              </button>
              <button className="py-4 text-gray-600 hover:text-gray-900">
                Specifications
              </button>
              <button className="py-4 text-gray-600 hover:text-gray-900">
                Reviews
              </button>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-lg mt-8 mb-4">Specifications</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Seller Information</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-lg">{product.seller}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{product.sellerRating} Seller Rating</span>
              </div>
            </div>
            <button className="text-green-600 hover:text-green-700 font-medium">
              View Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
