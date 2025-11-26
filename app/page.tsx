'use client';

import { useState } from 'react';

// ============================================================================
// Types
// ============================================================================

type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  unit: string;
  discount?: number;
  badge?: string;
  stock: number;
};

type Subcategory = {
  id: string;
  name: string;
  icon: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
  products: Product[];
};

// ============================================================================
// Mock Data
// ============================================================================

const categories: Category[] = [
  {
    id: 'fish-boxes',
    name: 'Fish Boxes',
    icon: '📦',
    subcategories: [
      { id: 'classic', name: 'Classic Fish Box', icon: '🐟' },
      { id: 'family', name: 'Family Favourites', icon: '👨‍👩‍👧‍👦' },
      { id: 'bbq', name: 'BBQ Grill Box', icon: '🔥' },
      { id: 'premium', name: 'Premium Selection', icon: '⭐' },
      { id: 'sustainable', name: 'Sustainable Catch', icon: '🌊' },
      { id: 'budget', name: 'Budget Box', icon: '💰' },
    ],
    products: [
      {
        id: 'p1',
        name: 'Classic Family Fish Box',
        category: 'Serves 4-6',
        image: '',
        originalPrice: 45.99,
        salePrice: 38.99,
        unit: '/ box',
        discount: 15,
        badge: 'POPULAR',
        stock: 75,
      },
      {
        id: 'p2',
        name: 'Premium Seafood Selection',
        category: 'Serves 2-3',
        image: '',
        originalPrice: 62.00,
        salePrice: 52.70,
        unit: '/ box',
        discount: 15,
        stock: 60,
      },
      {
        id: 'p3',
        name: 'BBQ Grill Box',
        category: 'Perfect for Grilling',
        image: '',
        originalPrice: 39.99,
        salePrice: 35.99,
        unit: '/ box',
        discount: 10,
        badge: 'HOT',
        stock: 85,
      },
      {
        id: 'p4',
        name: 'Sustainable Catch Box',
        category: 'MSC Certified',
        image: '',
        originalPrice: 48.00,
        salePrice: 43.20,
        unit: '/ box',
        discount: 10,
        stock: 90,
      },
      {
        id: 'p5',
        name: 'Budget Fish Box',
        category: 'Great Value',
        image: '',
        originalPrice: 29.99,
        salePrice: 24.99,
        unit: '/ box',
        discount: 17,
        badge: 'SALE',
        stock: 70,
      },
    ],
  },
  {
    id: 'fresh-fish',
    name: 'Fresh Fish',
    icon: '🐟',
    subcategories: [
      { id: 'white-fish', name: 'White Fish', icon: '🐠' },
      { id: 'salmon', name: 'Salmon & Trout', icon: '🍣' },
      { id: 'premium', name: 'Premium Cuts', icon: '✨' },
      { id: 'whole', name: 'Whole Fish', icon: '🐟' },
    ],
    products: [
      {
        id: 'p6',
        name: 'Fresh Cornish Cod Fillet',
        category: 'Line Caught',
        image: '',
        originalPrice: 18.99,
        salePrice: 15.99,
        unit: '/ kg',
        discount: 16,
        stock: 80,
      },
      {
        id: 'p7',
        name: 'Scottish Sea Bass',
        category: 'Farmed',
        image: '',
        originalPrice: 24.99,
        salePrice: 21.99,
        unit: '/ kg',
        discount: 12,
        badge: 'FRESH',
        stock: 65,
      },
      {
        id: 'p8',
        name: 'Wild Salmon Fillet',
        category: 'Alaskan',
        image: '',
        originalPrice: 32.99,
        salePrice: 28.99,
        unit: '/ kg',
        discount: 12,
        stock: 55,
      },
      {
        id: 'p9',
        name: 'Plaice Fillet',
        category: 'Day Boat',
        image: '',
        originalPrice: 16.99,
        salePrice: 14.49,
        unit: '/ kg',
        discount: 15,
        stock: 75,
      },
    ],
  },
  {
    id: 'smoked-cured',
    name: 'Smoked & Cured',
    icon: '🔥',
    subcategories: [
      { id: 'smoked-salmon', name: 'Smoked Salmon', icon: '🥩' },
      { id: 'smoked-fish', name: 'Smoked Fish', icon: '🐟' },
      { id: 'cured', name: 'Cured & Pickled', icon: '🥒' },
    ],
    products: [
      {
        id: 'p10',
        name: 'Oak Smoked Salmon',
        category: 'Hand Sliced',
        image: '',
        originalPrice: 22.99,
        salePrice: 19.99,
        unit: '/ 200g',
        discount: 13,
        badge: 'ARTISAN',
        stock: 70,
      },
      {
        id: 'p11',
        name: 'Smoked Mackerel Fillets',
        category: 'Peppercorn',
        image: '',
        originalPrice: 8.99,
        salePrice: 7.49,
        unit: '/ pack',
        discount: 17,
        stock: 85,
      },
      {
        id: 'p12',
        name: 'Gravadlax Salmon',
        category: 'Dill & Mustard',
        image: '',
        originalPrice: 19.99,
        salePrice: 16.99,
        unit: '/ 180g',
        discount: 15,
        stock: 60,
      },
    ],
  },
  {
    id: 'shellfish',
    name: 'Shellfish',
    icon: '🦞',
    subcategories: [
      { id: 'prawns', name: 'Prawns & Shrimp', icon: '🦐' },
      { id: 'crab', name: 'Crab & Lobster', icon: '🦀' },
      { id: 'mussels', name: 'Mussels & Clams', icon: '🦪' },
      { id: 'oysters', name: 'Oysters', icon: '🦪' },
    ],
    products: [
      {
        id: 'p13',
        name: 'Cornish Crab Meat',
        category: 'Hand Picked White',
        image: '',
        originalPrice: 24.99,
        salePrice: 21.99,
        unit: '/ 200g',
        discount: 12,
        badge: 'LOCAL',
        stock: 45,
      },
      {
        id: 'p14',
        name: 'King Prawns',
        category: 'Raw, Shell On',
        image: '',
        originalPrice: 16.99,
        salePrice: 13.99,
        unit: '/ 500g',
        discount: 18,
        stock: 80,
      },
      {
        id: 'p15',
        name: 'Live Mussels',
        category: 'Scottish Rope Grown',
        image: '',
        originalPrice: 6.99,
        salePrice: 5.49,
        unit: '/ kg',
        discount: 21,
        stock: 95,
      },
      {
        id: 'p16',
        name: 'Rock Oysters',
        category: 'West Country',
        image: '',
        originalPrice: 18.00,
        salePrice: 15.00,
        unit: '/ 6 pack',
        discount: 17,
        badge: 'FRESH',
        stock: 50,
      },
    ],
  },
  {
    id: 'weekly-offers',
    name: 'Weekly Offers',
    icon: '🏷️',
    subcategories: [
      { id: 'clearance', name: 'Clearance', icon: '💥' },
      { id: 'seasonal', name: 'Seasonal Specials', icon: '🌟' },
    ],
    products: [
      {
        id: 'p17',
        name: 'Catch of the Week Box',
        category: 'Mixed Selection',
        image: '',
        originalPrice: 35.99,
        salePrice: 25.99,
        unit: '/ box',
        discount: 28,
        badge: 'DEAL',
        stock: 65,
      },
      {
        id: 'p18',
        name: 'Scallops',
        category: 'Hand Dived',
        image: '',
        originalPrice: 28.99,
        salePrice: 22.99,
        unit: '/ 10 pack',
        discount: 21,
        badge: 'HOT',
        stock: 40,
      },
      {
        id: 'p19',
        name: 'Fisherman\'s Bundle',
        category: 'Ultimate Selection',
        image: '',
        originalPrice: 89.99,
        salePrice: 64.99,
        unit: '/ box',
        discount: 28,
        badge: 'SAVE £25',
        stock: 55,
      },
    ],
  },
];

// ============================================================================
// Components
// ============================================================================

function Header() {
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(7);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1B6CA8] to-[#63B7AF] rounded-lg flex items-center justify-center text-white text-xl">
              🎣
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#071827] leading-tight">
                Down The Cove
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                UK Coastal Provisioners
              </span>
            </div>
          </div>

          {/* Center: Categories + Search */}
          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-3xl">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#F5EEE3] text-[#071827] rounded-full font-medium hover:bg-[#1B6CA8] hover:text-white transition-colors duration-200">
              <span className="text-sm">☰</span>
              <span>All Categories</span>
              <span className="text-xs">▼</span>
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for seafood, boxes, recipes…"
                className="w-full px-6 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#1B6CA8] text-white rounded-full flex items-center justify-center hover:bg-[#063d66] transition-colors">
                🔍
              </button>
            </div>
          </div>

          {/* Right: Links + Icons */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-[#071827] hover:text-[#1B6CA8] transition-colors"
            >
              Promotions
            </a>
            <a
              href="#"
              className="text-sm text-[#071827] hover:text-[#1B6CA8] transition-colors"
            >
              Catch of the Week
            </a>
            <a
              href="#"
              className="text-sm text-[#071827] hover:text-[#1B6CA8] transition-colors"
            >
              Recipe Ideas
            </a>
            <a
              href="#"
              className="text-sm text-[#071827] hover:text-[#1B6CA8] transition-colors font-medium"
            >
              Weekly Offers
            </a>

            <div className="flex items-center gap-4 ml-2">
              <button className="relative group">
                <div className="text-2xl text-[#071827] group-hover:text-[#1B6CA8] transition-colors">
                  ♡
                </div>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#63B7AF] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button className="relative group">
                <div className="text-2xl text-[#071827] group-hover:text-[#1B6CA8] transition-colors">
                  🛒
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1B6CA8] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-2xl text-[#071827]">☰</button>
        </div>
      </div>
    </header>
  );
}

function Sidebar() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showFlyout, setShowFlyout] = useState(false);

  const sidebarCategories = [
    { id: 'fish', icon: '🐟', label: 'Fish' },
    { id: 'meat', icon: '🥩', label: 'Smoked' },
    { id: 'shellfish', icon: '🦞', label: 'Shellfish' },
    { id: 'dairy', icon: '🧈', label: 'Dairy' },
    { id: 'bakery', icon: '🥖', label: 'Bakery' },
    { id: 'beverages', icon: '🍷', label: 'Drinks' },
    { id: 'offers', icon: '🏷️', label: 'Offers' },
  ];

  const handleMouseEnter = (categoryId: string) => {
    setHoveredCategory(categoryId);
    setShowFlyout(true);
  };

  const handleMouseLeave = () => {
    setShowFlyout(false);
    setHoveredCategory(null);
  };

  return (
    <div
      className="hidden md:block fixed left-0 top-[73px] bottom-0 z-40"
      onMouseLeave={handleMouseLeave}
    >
      {/* Collapsed Sidebar */}
      <aside className="w-[72px] h-full bg-[#F5EEE3] shadow-lg flex flex-col items-center py-6 gap-3">
        {sidebarCategories.map((cat) => (
          <button
            key={cat.id}
            onMouseEnter={() => handleMouseEnter(cat.id)}
            className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 ${
              hoveredCategory === cat.id
                ? 'bg-[#1B6CA8] shadow-lg scale-110'
                : 'bg-white hover:bg-[#1B6CA8] hover:shadow-md'
            }`}
            aria-label={cat.label}
          >
            <span className={hoveredCategory === cat.id ? 'filter invert brightness-200' : ''}>
              {cat.icon}
            </span>
          </button>
        ))}
      </aside>

      {/* Flyout Panel */}
      <div
        className={`absolute left-[72px] top-0 h-full w-[360px] bg-white shadow-2xl transition-all duration-300 ${
          showFlyout ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
        onMouseEnter={() => setShowFlyout(true)}
      >
        {hoveredCategory && (
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <h3 className="text-xl font-bold text-[#071827] mb-6">
              {hoveredCategory === 'fish' && 'Fresh Fish & Seafood'}
              {hoveredCategory === 'meat' && 'Smoked & Cured'}
              {hoveredCategory === 'shellfish' && 'Shellfish & Crustaceans'}
              {hoveredCategory === 'dairy' && 'Dairy & Chilled'}
              {hoveredCategory === 'bakery' && 'Bakery'}
              {hoveredCategory === 'beverages' && 'Beverages'}
              {hoveredCategory === 'offers' && 'Special Offers'}
            </h3>

            {/* Subcategories Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 flex-1 overflow-y-auto">
              {categories
                .find((c) => c.id === 'fish-boxes')
                ?.subcategories.map((sub) => (
                  <a
                    key={sub.id}
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F5EEE3] transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#63B7AF] to-[#1B6CA8] rounded-full flex items-center justify-center text-lg flex-shrink-0">
                      {sub.icon}
                    </div>
                    <span className="text-sm text-[#071827] group-hover:text-[#1B6CA8] font-medium">
                      {sub.name}
                    </span>
                  </a>
                ))}
            </div>

            {/* Promotional Card */}
            <div className="bg-gradient-to-br from-[#F5EEE3] to-[#e8dfd0] rounded-xl p-6 border border-[#63B7AF]/20">
              <h4 className="text-lg font-bold text-[#071827] mb-2">
                Get 20% Off Your First Fish Box
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Subscribe today and enjoy premium coastal seafood delivered to your door.
              </p>
              <button className="w-full py-2.5 bg-[#1B6CA8] text-white rounded-lg font-medium hover:bg-[#063d66] transition-colors">
                Shop Fish Boxes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group flex-shrink-0 w-[260px] bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-transparent hover:border-[#1B6CA8]/20">
      <div className="relative">
        {/* Image Area */}
        <div className="h-[200px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center relative overflow-hidden">
          <span className="text-gray-400 text-sm font-medium">Product Image</span>

          {/* Badges */}
          {product.discount && (
            <div className="absolute top-3 left-3 bg-[#1B6CA8] text-white px-3 py-1 rounded-full text-xs font-bold">
              -{product.discount}%
            </div>
          )}
          {product.badge && (
            <div className="absolute top-3 right-12 bg-[#63B7AF] text-white px-3 py-1 rounded-full text-xs font-bold">
              {product.badge}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#F5EEE3] transition-colors"
          >
            <span className={`text-lg ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}>
              {isWishlisted ? '♥' : '♡'}
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
          <h3 className="text-sm font-semibold text-[#071827] mb-3 line-clamp-2 h-10">
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-[#1B6CA8]">
              £{product.salePrice.toFixed(2)}
            </span>
            {product.originalPrice > product.salePrice && (
              <span className="text-sm text-gray-400 line-through">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xs text-gray-500">{product.unit}</span>
          </div>

          {/* Stock Progress Bar */}
          <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#63B7AF] to-[#1B6CA8] rounded-full transition-all duration-300"
              style={{ width: `${product.stock}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategorySection({ category }: { category: Category }) {
  const isWeeklyOffers = category.id === 'weekly-offers';

  return (
    <section
      className={`py-8 ${isWeeklyOffers ? 'bg-[#F5EEE3]/30' : ''}`}
      id={category.id}
    >
      <div className="px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#071827] flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            {category.name}
          </h2>
          <a
            href="#"
            className="text-sm text-[#1B6CA8] hover:text-[#063d66] font-medium flex items-center gap-1 group"
          >
            View all products
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Product Cards Row */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 md:ml-[72px] pt-6">
          {categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}

          {/* Footer Spacing */}
          <div className="h-20" />
        </main>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
