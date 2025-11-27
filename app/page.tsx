'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';

// ============================================================================
// Icon Components (SVG Outline Icons)
// ============================================================================

const Icons = {
  Menu: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),

  Search: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),

  Heart: ({ className = "w-5 h-5", filled = false }: { className?: string; filled?: boolean }) => (
    <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),

  ShoppingCart: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),

  ChevronDown: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),

  ArrowRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),

  Fish: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),

  Package: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),

  Fire: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),

  Sparkles: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),

  Tag: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),

  Star: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),

  Users: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),

  User: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),

  CurrencyPound: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),

  Waves: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),

  Bread: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  ),

  Wine: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),

  Cube: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),

  Meat: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),

  Lightning: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),

  MapPin: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),

  Phone: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),

  Truck: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),

  Info: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),

  Mail: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),

  ChevronUp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  ),

  Facebook: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),

  Twitter: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  ),

  Instagram: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),

  YouTube: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
};

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
  rating?: number;
};

type Subcategory = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

type Category = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  subcategories: Subcategory[];
  products: Product[];
};

type HeroPromo = {
  id: number;
  label: string;
  icon: string;
};

type HeroSlide = {
  id: number;
  badge: string;
  title: string;
  description: string;
};

// ============================================================================
// Mock Data
// ============================================================================

const heroPromos: HeroPromo[] = [
  { id: 1, label: '-35% on Fish Boxes', icon: 'http://www.downthecove.com/wp-content/uploads/2015/08/HOME-CIRCLE-FISHING-nb-e1589709232864.png' },
  { id: 2, label: 'New Seasonal Catch', icon: 'http://www.downthecove.com/wp-content/uploads/2020/05/home-circle-smoking-nb-e1589709453980.png' },
  { id: 3, label: 'Save on Smoked Fish', icon: 'http://www.downthecove.com/wp-content/uploads/2020/05/HOME-CIRLCE-HOMEDECOR-nb-e1589709875537.png' },
  { id: 4, label: 'Free Chilled Delivery', icon: 'http://www.downthecove.com/wp-content/uploads/2020/05/HOME-CIRLCE-CHANDLERY-nb-e1589709814811.png' },
];

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    badge: 'Weekly Discounts',
    title: 'Save up to 30% on Coastal Fish Boxes.',
    description:
      'Hand-prepared, sustainably caught seafood delivered chilled to your door. Mix and match your favourites with flexible box sizes.',
  },
  {
    id: 2,
    badge: 'Limited Catch',
    title: 'Fresh Day-Boat Fish, Packed to Order.',
    description:
      'Line-caught specials filleted before dispatch, held at 0-2°C, and rushed to you in recyclable chilled packaging.',
  },
  {
    id: 3,
    badge: 'Chef Picks',
    title: 'Restaurant Cuts & Shellfish Pairings.',
    description:
      'Premium fillets, hand-dived scallops, and ready-to-grill skewers curated by our coastal kitchen team.',
  },
];

const categories: Category[] = [
  {
    id: 'fish-boxes',
    name: 'Fish Boxes',
    icon: Icons.Package,
    subcategories: [
      { id: 'classic', name: 'Classic Fish Box', icon: Icons.Fish },
      { id: 'family', name: 'Family Favourites', icon: Icons.Users },
      { id: 'bbq', name: 'BBQ Grill Box', icon: Icons.Fire },
      { id: 'premium', name: 'Premium Selection', icon: Icons.Star },
      { id: 'sustainable', name: 'Sustainable Catch', icon: Icons.Waves },
      { id: 'budget', name: 'Budget Box', icon: Icons.CurrencyPound },
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
        rating: 4.6,
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
        rating: 4.7,
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
        rating: 4.3,
      },
      {
        id: 'p20',
        name: 'Harbour Classics Box',
        category: '6 Species Mix',
        image: '',
        originalPrice: 54.99,
        salePrice: 44.99,
        unit: '/ box',
        discount: 18,
        badge: 'NEW',
        stock: 80,
      },
      {
        id: 'p21',
        name: 'Coastal Taster Box',
        category: 'Serves 2',
        image: '',
        originalPrice: 34.99,
        salePrice: 29.99,
        unit: '/ box',
        discount: 14,
        stock: 85,
      },
    ],
  },
  {
    id: 'fresh-fish',
    name: 'Fresh Fish',
    icon: Icons.Fish,
    subcategories: [
      { id: 'white-fish', name: 'White Fish', icon: Icons.Fish },
      { id: 'salmon', name: 'Salmon & Trout', icon: Icons.Fish },
      { id: 'premium', name: 'Premium Cuts', icon: Icons.Sparkles },
      { id: 'whole', name: 'Whole Fish', icon: Icons.Fish },
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
        rating: 4.5,
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
        rating: 4.4,
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
      {
        id: 'p22',
        name: 'Dover Sole',
        category: 'Day Boat',
        image: '',
        originalPrice: 27.99,
        salePrice: 23.99,
        unit: '/ kg',
        discount: 14,
        badge: 'LIMITED',
        stock: 45,
      },
      {
        id: 'p23',
        name: 'Tuna Loin Steaks',
        category: 'Sashimi Grade',
        image: '',
        originalPrice: 32.99,
        salePrice: 28.49,
        unit: '/ kg',
        discount: 14,
        stock: 65,
      },
    ],
  },
  {
    id: 'smoked-cured',
    name: 'Smoked & Cured',
    icon: Icons.Fire,
    subcategories: [
      { id: 'smoked-salmon', name: 'Smoked Salmon', icon: Icons.Meat },
      { id: 'smoked-fish', name: 'Smoked Fish', icon: Icons.Fish },
      { id: 'cured', name: 'Cured & Pickled', icon: Icons.Cube },
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
        rating: 4.8,
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
      {
        id: 'p24',
        name: 'Kiln Smoked Haddock',
        category: 'Naturally Smoked',
        image: '',
        originalPrice: 12.49,
        salePrice: 10.49,
        unit: '/ 300g',
        discount: 16,
        stock: 90,
      },
      {
        id: 'p25',
        name: 'Peppered Trout Slices',
        category: 'Hot Smoked',
        image: '',
        originalPrice: 11.99,
        salePrice: 9.99,
        unit: '/ 200g',
        discount: 17,
        stock: 75,
      },
    ],
  },
  {
    id: 'shellfish',
    name: 'Shellfish',
    icon: Icons.Waves,
    subcategories: [
      { id: 'prawns', name: 'Prawns & Shrimp', icon: Icons.Waves },
      { id: 'crab', name: 'Crab & Lobster', icon: Icons.Waves },
      { id: 'mussels', name: 'Mussels & Clams', icon: Icons.Waves },
      { id: 'oysters', name: 'Oysters', icon: Icons.Waves },
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
        rating: 4.6,
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
      {
        id: 'p26',
        name: 'Langoustines',
        category: 'Scottish',
        image: '',
        originalPrice: 22.99,
        salePrice: 19.99,
        unit: '/ 500g',
        discount: 13,
        stock: 70,
      },
      {
        id: 'p27',
        name: 'Brown Shrimp',
        category: 'Ready to Eat',
        image: '',
        originalPrice: 9.99,
        salePrice: 8.49,
        unit: '/ 200g',
        discount: 15,
        stock: 85,
      },
    ],
  },
  {
    id: 'weekly-offers',
    name: 'Weekly Offers',
    icon: Icons.Tag,
    subcategories: [
      { id: 'clearance', name: 'Clearance', icon: Icons.Lightning },
      { id: 'seasonal', name: 'Seasonal Specials', icon: Icons.Star },
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
        rating: 4.4,
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
      {
        id: 'p28',
        name: 'Smokery Taster Bundle',
        category: 'Mixed Smoked Fish',
        image: '',
        originalPrice: 29.99,
        salePrice: 21.99,
        unit: '/ pack',
        discount: 26,
        stock: 95,
      },
    ],
  },
];

// ============================================================================
// Components
// ============================================================================

const HeroSection: React.FC = () => {
  const benefits = [
    { id: 1, label: 'Fresh Catch Every Day', icon: <Icons.Fish className="w-5 h-5 text-[#1B6CA8]" /> },
    { id: 2, label: 'Safe Payment With Any Card', icon: <Icons.CurrencyPound className="w-5 h-5 text-[#1B6CA8]" /> },
    { id: 3, label: '24/7 Support', icon: <Icons.Phone className="w-5 h-5 text-[#1B6CA8]" /> },
    { id: 4, label: 'Free Delivery From £30', icon: <Icons.Truck className="w-5 h-5 text-[#1B6CA8]" /> },
    { id: 5, label: 'Chilled Packaging', icon: <Icons.Package className="w-5 h-5 text-[#1B6CA8]" /> },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="mb-10">
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {heroPromos.map((promo) => (
          <div
            key={promo.id}
            className="flex flex-col items-center text-center min-w-[140px]"
          >
            <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
              <img
                src={promo.icon}
                alt={promo.label}
                className="h-16 w-16 object-contain"
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-[#071827]">
              {promo.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-3">
        <div
          className="lg:col-span-2 rounded-xl bg-[#F5EEE3] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm relative"
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
        >
          <div className="flex-1 space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#63B7AF] text-white text-xs font-semibold uppercase tracking-wide">
              {slide.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#071827] leading-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-[#1B6CA8] max-w-2xl">
              {slide.description}
            </p>
            <div className="flex items-center gap-2 pt-2">
              {heroSlides.map((dot, idx) => (
                <span
                  key={dot.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-colors ${
                    idx === currentSlide ? 'bg-[#1B6CA8]' : 'bg-[#D1D5DB]'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-end gap-3 w-full md:w-auto justify-center md:justify-end">
            <div className="h-44 w-28 rounded-lg bg-gradient-to-b from-[#1B6CA8] to-[#63B7AF] text-white text-xs font-semibold flex items-center justify-center shadow-md">
              Fish Box Image
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-20 w-28 rounded-lg bg-white/80 border border-white text-[#071827] text-xs font-semibold flex items-center justify-center shadow-sm">
                Fresh Cuts
              </div>
              <div className="h-24 w-28 rounded-lg bg-[#E0F0FF] text-[#071827] text-xs font-semibold flex items-center justify-center shadow-sm">
                Seafood Pack
              </div>
            </div>
          </div>
          {isHoveringHero && (
            <>
              <button
                type="button"
                onClick={() =>
                  setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-[#071827] shadow-md hover:bg-white transition-colors flex items-center justify-center"
                aria-label="Previous slide"
              >
                <Icons.ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-[#071827] shadow-md hover:bg-white transition-colors flex items-center justify-center"
                aria-label="Next slide"
              >
                <Icons.ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="flex flex-col gap-6 lg:flex-row h-full">
            <div className="rounded-xl bg-[#E0F0FF] p-6 flex flex-col justify-between shadow-sm h-full flex-1">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#1B6CA8] tracking-wide">
                  SAVE UP TO 35% ON
                </span>
                <h3 className="text-2xl font-bold text-[#071827]">
                  Smoked & Cured
                </h3>
                <a href="#" className="text-sm text-[#1B6CA8] underline decoration-1 underline-offset-4 hover:text-[#063d66]">
                  Shop Now
                </a>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="h-24 w-full max-w-[160px] rounded-lg bg-white/70 border border-white text-[#071827] text-xs font-semibold flex items-center justify-center shadow-sm">
                  Can &amp; Pack Image
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#F8E4BF] p-6 flex flex-col justify-between shadow-sm h-full flex-1">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#a06017] tracking-wide">
                  GET DISCOUNT -15% ON
                </span>
                <h3 className="text-2xl font-bold text-[#071827]">
                  Shellfish Boxes
                </h3>
                <a href="#" className="text-sm text-[#a06017] underline decoration-1 underline-offset-4 hover:text-[#704414]">
                  Buy Now
                </a>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="h-24 w-full max-w-[160px] rounded-lg bg-white/70 border border-white text-[#071827] text-xs font-semibold flex items-center justify-center shadow-sm">
                  Shellfish Image
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-white shadow-sm px-4 py-3 overflow-hidden">
        <div className="flex items-center gap-6 ticker-track whitespace-nowrap">
          {[...benefits, ...benefits].map((benefit, idx) => (
            <div key={`${benefit.id}-${idx}`} className="flex items-center gap-2 flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-[#E0F0FF] flex items-center justify-center text-lg text-[#071827]">
                {benefit.icon}
              </div>
              <span className="text-sm font-semibold text-[#071827]">
                {benefit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StorySection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      aria-labelledby="story-heading"
      className="mt-16 bg-white py-10 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-10 xl:px-12 mb-0">
        <h2
          id="story-heading"
          className="text-xl md:text-2xl font-semibold text-[#1B6CA8] mb-3"
        >
          Online Coastal Nutrition &amp; Fresh Seafood Boxes.
        </h2>
        <p className="text-sm md:text-base text-slate-700 mb-4">
          Down The Cove brings the spirit of the British shoreline straight to your kitchen. We curate
          premium catches from trusted coastal boats, prepare them with care, and deliver chilled boxes
          to keep every fillet at peak freshness.
        </p>
        <p className="text-sm md:text-base font-semibold text-slate-900 mb-3">
          Your weekly seafood box, without the supermarket compromise.
        </p>
        <p className="text-sm md:text-base text-slate-700 mb-4">
          Choose from chef-led selections or build your own box with seasonal specials, shellfish, and
          smoked favourites. Every delivery is packed to stay cold on the journey and ready for easy
          midweek meals or weekend feasts.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-slate-700 mb-4">
          <li>Hand-filleted fish from trusted UK coastal boats.</li>
          <li>Packed chilled and delivered in recyclable boxes.</li>
          <li>Flexible subscriptions you can pause or skip anytime.</li>
          <li>Recipes and preparation tips in every box.</li>
        </ul>
        <div className="relative">
          {!isExpanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent" />
          )}
          {isExpanded && (
            <p className="text-sm md:text-base text-slate-700 mb-4">
              We work closely with small-scale fisheries to champion responsible sourcing, shorter supply
              chains, and honest pricing. From Cornish day boats to Scottish smokehouses, every partner
              shares our commitment to traceability, welfare, and flavour-first freshness.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-300 transition mb-6"
        >
          <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
          <span className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>⌄</span>
        </button>
      </div>
    </section>
  );
};

function TopBar() {
  return (
    <div className="relative bg-[#FAF8F6] text-[#071827] border-b border-gray-200 md:ml-[60px] z-40">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10 py-2">
        <div className="flex items-center justify-between text-xs">
          {/* Left side links */}
          <div className="flex items-center divide-x divide-[#071827]/10">
            <a href="#" className="flex items-center gap-1.5 px-3 first:pl-0 last:pr-0 hover:text-[#63B7AF] transition-colors">
              <span>About Us</span>
            </a>
            <a href="#" className="flex items-center gap-1.5 px-3 first:pl-0 last:pr-0 hover:text-[#63B7AF] transition-colors">
              <span>Contact Us</span>
            </a>
            <a href="#" className="flex items-center gap-1.5 px-3 first:pl-0 last:pr-0 hover:text-[#63B7AF] transition-colors">
              <span>Delivery</span>
            </a>
          </div>

          {/* Right side links */}
          <div className="flex items-center divide-x divide-[#071827]/10">
            <a href="#" className="flex items-center gap-1.5 px-3 first:pl-0 last:pr-0 hover:text-[#63B7AF] transition-colors">
              <Icons.MapPin className="w-4 h-4" />
              <span>Store Locations</span>
            </a>
            <a href="tel:9562387908" className="flex items-center gap-1.5 px-3 first:pl-0 last:pr-0 hover:text-[#63B7AF] transition-colors">
              <Icons.Phone className="w-4 h-4" />
              <span>(956) 238-7908</span>
            </a>
            <a href="#" className="flex items-center gap-1.5 px-3 first:pl-0 last:pr-0 hover:text-[#63B7AF] transition-colors">
              <Icons.Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </a>
            <a href="#" className="flex items-center gap-1.5 px-3 first:pl-0 last:pr-0 hover:text-[#63B7AF] transition-colors">
              <Icons.User className="w-4 h-4" />
              <span>Login / Register</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ onToggleSidebar, onOpenSearch }: { onToggleSidebar?: () => void; onOpenSearch?: () => void }) {
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(7);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      if (scrolled !== isScrolled) {
        setIsAnimating(true);
        setIsScrolled(scrolled);
        setTimeout(() => setIsAnimating(false), 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <header
      className={`${isScrolled ? 'fixed top-0 left-0 right-0 md:left-[60px] shadow-sm' : 'relative md:ml-[60px]'} z-50 bg-[#FAF8F6] border-b border-gray-200 ${
        isScrolled ? 'animate-slideDown' : ''
      }`}
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src="https://fmijmundotmgtsemfdat.supabase.co/storage/v1/object/public/media/dtc.png"
                alt="Down The Cove Logo"
                className="w-full h-full object-cover"
              />
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

          {/* All Categories Button */}
          <button
            onClick={onToggleSidebar}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#1B6CA8] text-white rounded-full hover:bg-[#063d66] transition-colors"
          >
            <Icons.Menu className="w-5 h-5" />
            <span className="text-sm font-medium">All Categories</span>
          </button>

          {/* Center: Search */}
          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-3xl">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for seafood, boxes, recipes…"
                className="w-full px-6 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent cursor-pointer"
                readOnly
                onClick={onOpenSearch}
              />
              <button
                onClick={onOpenSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#1B6CA8] text-white rounded-full flex items-center justify-center hover:bg-[#063d66] transition-colors"
              >
                <Icons.Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Links + Icons */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-[#071827] hover:text-[#1B6CA8] transition-colors flex items-center gap-2"
            >
              <Icons.Tag className="w-4 h-4" />
              <span>Promotions</span>
            </a>
            <a
              href="#"
              className="text-sm text-[#071827] hover:text-[#1B6CA8] transition-colors flex items-center gap-2"
            >
              <Icons.Fish className="w-4 h-4" />
              <span>Catch of the Week</span>
            </a>
            <a
              href="#"
              className="text-sm text-[#071827] hover:text-[#1B6CA8] transition-colors font-medium flex items-center gap-2"
            >
              <Icons.Lightning className="w-4 h-4" />
              <span>Weekly Offers</span>
            </a>

            <div className="flex items-center gap-4 ml-2">
              <button className="relative group">
                <div className="w-11 h-11 rounded-full bg-[#1B6CA8]/15 group-hover:bg-[#1B6CA8]/25 transition-colors flex items-center justify-center">
                  <Icons.ShoppingCart className="w-6 h-6 text-[#071827] group-hover:text-[#1B6CA8] transition-colors" />
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1B6CA8] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-[#071827]">
            <Icons.Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ isLockedOpen, onClose }: { isLockedOpen?: boolean; onClose?: () => void }) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const sidebarCategories = [
    { id: 'fish', icon: Icons.Fish, label: 'Fish' },
    { id: 'meat', icon: Icons.Meat, label: 'Smoked' },
    { id: 'shellfish', icon: Icons.Waves, label: 'Shellfish' },
    { id: 'dairy', icon: Icons.Cube, label: 'Dairy' },
    { id: 'bakery', icon: Icons.Bread, label: 'Bakery' },
    { id: 'beverages', icon: Icons.Wine, label: 'Drinks' },
    { id: 'offers', icon: Icons.Tag, label: 'Offers' },
  ];

  const handleMouseEnterSidebar = () => {
    if (!isLockedOpen) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeaveSidebar = () => {
    if (!isLockedOpen) {
      setIsExpanded(false);
      setHoveredCategory(null);
    }
  };

  const handleMouseEnterCategory = (categoryId: string) => {
    setHoveredCategory(categoryId);
  };

  const shouldBeExpanded = isLockedOpen || isExpanded;

  return (
    <div
      className="hidden md:block fixed left-0 top-0 bottom-0 z-[60] bg-white"
      onMouseEnter={handleMouseEnterSidebar}
      onMouseLeave={handleMouseLeaveSidebar}
    >
      {/* Sidebar - Icons only, expands on hover to show labels */}
      <aside
        className={`h-full bg-white border-r border-gray-200 flex flex-col items-start pb-6 transition-all duration-300 ${
          shouldBeExpanded ? 'w-[220px] opacity-100' : 'w-[60px] opacity-100'
        }`}
      >
        {/* Menu Item at Top */}
        <div className="w-full px-2 py-2 mb-2 flex justify-center">
          <div className={`flex items-center bg-[#1B6CA8] transition-all duration-300 ${
            shouldBeExpanded ? 'rounded-[50px] px-4 gap-3 w-full justify-start h-10' : 'rounded-full w-10 h-10 justify-center'
          }`}>
            <Icons.Menu className="w-5 h-5 text-white flex-shrink-0" />
            <span
              className={`text-sm font-bold whitespace-nowrap text-white transition-opacity duration-300 delay-150 ${
                shouldBeExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
              }`}
            >
              Menu
            </span>
          </div>
        </div>

        {sidebarCategories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <button
              key={cat.id}
              onMouseEnter={() => handleMouseEnterCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                hoveredCategory === cat.id
                  ? 'text-[#1B6CA8]'
                  : 'text-[#071827]'
              }`}
              aria-label={cat.label}
            >
              <IconComponent className="w-6 h-6 flex-shrink-0" />
              <span
                className={`text-sm font-medium whitespace-nowrap flex-1 transition-opacity duration-300 delay-150 ${
                  shouldBeExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                }`}
              >
                {cat.label}
              </span>
              {shouldBeExpanded && (
                <Icons.ArrowRight className="w-4 h-4 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </aside>

      {/* Flyout Panel - Appears when hovering over a category */}
      {hoveredCategory && (
        <div
          key={hoveredCategory}
          className="absolute left-[60px] top-0 h-full w-[360px] bg-white opacity-0 rounded-r-3xl border-r border-t border-b border-gray-200"
          style={{
            left: shouldBeExpanded ? '220px' : '60px',
            animation: 'slideInFromLeft 0.15s ease-out forwards'
          }}
        >
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
                ?.subcategories.map((sub) => {
                  const SubIcon = sub.icon;
                  return (
                    <a
                      key={sub.id}
                      href="#"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F5EEE3] transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-[#63B7AF] to-[#1B6CA8] rounded-full flex items-center justify-center flex-shrink-0">
                        <SubIcon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-[#071827] group-hover:text-[#1B6CA8] font-medium">
                        {sub.name}
                      </span>
                    </a>
                  );
                })}
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
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group flex-shrink-0 w-[260px] bg-white rounded-lg h-[400px] relative overflow-hidden">
      {/* Image Area */}
      <div className="h-[240px] bg-white flex items-center justify-center relative overflow-hidden flex-shrink-0">
        <span className="text-gray-300 text-sm font-medium">Product Image</span>

        {/* Badges */}
        {product.badge ? (
          <div className="absolute top-3 left-3 bg-[#63B7AF] text-white px-3 py-1 rounded-full text-xs font-bold">
            {product.badge}
          </div>
        ) : product.discount ? (
          <div className="absolute top-3 left-3 bg-[#1B6CA8] text-white px-3 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        ) : null}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center"
        >
          <Icons.Heart
            className={`w-5 h-5 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
            filled={isWishlisted}
          />
          {isWishlisted && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1B6CA8] text-white text-[10px] font-bold flex items-center justify-center">
              ✓
            </span>
          )}
        </button>
      </div>

      {/* Content - slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-white px-4 py-4 transition-transform duration-200 group-hover:-translate-y-12">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-sm font-semibold text-[#071827] line-clamp-2">
            {product.name}
          </h3>
          {product.rating && (
            <div className="flex items-center text-xs text-[#071827] flex-shrink-0">
              <div
                className="star-rating wd-style-simple"
                role="img"
                aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}
              >
                <div className="font-semibold text-sm text-right leading-none">
                  {product.rating.toFixed(1)}
                </div>
              </div>
              <span className="ml-1 text-[#f5a524] leading-none">★</span>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2">
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
      </div>

      {/* Button - slides up from bottom */}
      <button className="absolute bottom-4 left-4 right-4 px-4 py-2 bg-[#1B6CA8] text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 translate-y-16 group-hover:translate-y-0 transition-transform duration-200">
        Add to Cart
        <Icons.ShoppingCart className="w-4 h-4" />
      </button>
    </div>
  );
}

function CategorySection({ category }: { category: Category }) {
  const isWeeklyOffers = category.id === 'weekly-offers';
  const IconComponent = category.icon;
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isPointerDown = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateProgress = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) {
        setProgress(100);
        return;
      }
      setProgress(Math.min(100, Math.max(0, (el.scrollLeft / maxScroll) * 100)));
    };

    updateProgress();
    el.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    const handlePointerDown = (e: PointerEvent) => {
      isPointerDown.current = true;
      dragStartX.current = e.clientX;
      scrollStartX.current = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDown.current) return;
      const delta = e.clientX - dragStartX.current;
      el.scrollLeft = scrollStartX.current - delta;
    };

    const handlePointerUp = (e: PointerEvent) => {
      isPointerDown.current = false;
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = 'grab';
    };

    el.addEventListener('scroll', updateProgress);
    el.addEventListener('pointerdown', handlePointerDown);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('resize', updateProgress);

    return () => {
      el.removeEventListener('scroll', updateProgress);
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <section
      className={`py-8 ${isWeeklyOffers ? 'bg-[#F5EEE3]/30' : ''}`}
      id={category.id}
    >
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#071827] flex items-center gap-3">
            <IconComponent className="w-8 h-8 text-[#1B6CA8]" />
            {category.name}
          </h2>
          <a
            href="#"
            className="text-sm text-[#1B6CA8] hover:text-[#063d66] font-medium flex items-center gap-1 group"
          >
            View all products
            <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Product Cards Row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ cursor: 'grab' }}
        >
          {category.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Carousel Progress Bar */}
        <div className="mt-4 relative h-1 bg-gray-300 rounded-full">
          <div
            className="absolute top-0 h-full w-1/4 bg-gradient-to-r from-[#63B7AF] to-[#1B6CA8] rounded-full transition-all duration-300"
            style={{ left: `${progress * 0.75}%` }}
          />
        </div>
      </div>
    </section>
  );
}

type SearchOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularRequests = ['Fish boxes', 'Smoked', 'Shellfish', 'Frozen', 'Sauces'];

  const popularProducts = [
    { name: 'Classic Family Fish Box', price: '£38.99 / box' },
    { name: 'Fresh Cornish Cod Fillet', price: '£15.99 / kg' },
    { name: 'Oak Smoked Salmon', price: '£19.99 / 200g' },
    { name: 'Cornish Crab Meat', price: '£21.99 / 200g' },
  ];

  const fishBoxes = [
    { name: 'Premium Selection Box', price: '£52.70 / box' },
    { name: 'BBQ Grill Box', price: '£35.99 / box' },
    { name: 'Sustainable Catch Box', price: '£43.20 / box' },
    { name: 'Budget Fish Box', price: '£24.99 / box' },
  ];

  const smokedCured = [
    { name: 'Smoked Mackerel Fillets', price: '£7.49 / pack' },
    { name: 'Gravadlax Salmon', price: '£16.99 / 180g' },
    { name: 'Peppercorn Salmon', price: '£18.99 / 200g' },
    { name: 'Hot Smoked Trout', price: '£12.99 / pack' },
  ];

  const pantrySauces = [
    { name: 'Tartare Sauce', price: '£3.99 / jar' },
    { name: 'Lemon Butter Sauce', price: '£4.29 / bottle' },
    { name: 'Seafood Seasoning', price: '£2.99 / tin' },
    { name: 'Garlic Herb Butter', price: '£3.49 / pack' },
  ];

  return (
    <div className="fixed inset-0 z-[80] bg-white/95 backdrop-blur-sm overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200 transition-colors"
      >
        ✕
      </button>

      <div className="mx-auto mt-24 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Search Bar Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div className="flex-1 rounded-l-2xl rounded-r-2xl sm:rounded-r-none border border-slate-200 bg-white shadow-sm flex items-center px-4 py-3">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full bg-transparent text-sm md:text-base outline-none"
              autoFocus
            />
          </div>
          <div className="mt-2 flex sm:mt-0">
            <button className="flex items-center justify-between bg-slate-100 text-sm px-4 py-3 border border-slate-200 border-r-0 rounded-l-2xl sm:rounded-l-none">
              <span className="mr-2 text-xs uppercase tracking-wide text-slate-500">
                Select Category
              </span>
              <span>▾</span>
            </button>
            <button className="bg-[#1B6CA8] text-white px-5 py-3 rounded-r-2xl flex items-center justify-center text-lg">
              🔍
            </button>
          </div>
        </div>

        {/* Popular Requests */}
        <p className="mt-8 text-xs font-semibold tracking-[0.15em] text-slate-500">
          POPULAR REQUESTS
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {popularRequests.map((label) => (
            <button
              key={label}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:border-[#1B6CA8] hover:text-[#1B6CA8] transition"
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Popular Product Columns */}
        <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Column 1: Popular Products */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Popular Products
            </h3>
            {popularProducts.map((product, idx) => (
              <div key={idx} className="mb-3 flex items-start gap-3">
                <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-100" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-900">
                    {product.name}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Popular Fish Boxes */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Popular Fish Boxes
            </h3>
            {fishBoxes.map((product, idx) => (
              <div key={idx} className="mb-3 flex items-start gap-3">
                <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-100" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-900">
                    {product.name}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: Smoked & Cured */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Smoked & Cured
            </h3>
            {smokedCured.map((product, idx) => (
              <div key={idx} className="mb-3 flex items-start gap-3">
                <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-100" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-900">
                    {product.name}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 4: Pantry & Sauces */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Pantry & Sauces
            </h3>
            {pantrySauces.map((product, idx) => (
              <div key={idx} className="mb-3 flex items-start gap-3">
                <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-100" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-900">
                    {product.name}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function Footer() {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const popularCategories = [
    'Fish Boxes',
    'Fresh Fish',
    'Smoked & Cured',
    'Shellfish',
    'Premium Selection',
    'Sustainable Catch',
    'BBQ Grill Box',
    'Weekly Offers',
  ];

  const usefulLinks = [
    'About Us',
    'Contact Us',
    'Delivery Information',
    'Store Locations',
    'Track Your Order',
    'Returns & Refunds',
    'FAQs',
    'Sustainability',
  ];

  return (
    <footer className="relative overflow-hidden bg-[#071827] text-white md:ml-[60px]">
      <div aria-hidden className="w-full text-[#FAF8F6]">
        <svg
          className="block h-16 w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,48 C240,96 480,-10 720,24 C960,58 1200,80 1440,48 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="https://fmijmundotmgtsemfdat.supabase.co/storage/v1/object/public/media/dtc-white-bg.webp"
                  alt="Down The Cove Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-tight">
                  Down The Cove
                </span>
                <span className="text-xs text-gray-400 leading-tight">
                  UK Coastal Provisioners
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Bringing the freshest coastal catch straight to your door. Sustainably sourced,
              expertly prepared, delivered with care.
            </p>
            <div className="flex items-center gap-4 mb-4">
              <a
                href="tel:9562387908"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#63B7AF] transition-colors"
              >
                <Icons.Phone className="w-4 h-4" />
                <span>(956) 238-7908</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Icons.MapPin className="w-4 h-4 flex-shrink-0" />
              <span>Coastal Towns, UK</span>
            </div>
          </div>

          {/* Column 2: Popular Categories */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Popular Categories</h4>
            <ul className="space-y-2.5">
              {popularCategories.map((cat, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 hover:text-[#63B7AF] transition-colors flex items-center group"
                  >
                    <Icons.ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity -ml-5 group-hover:ml-0" />
                    <span>{cat}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Useful Links</h4>
            <ul className="space-y-2.5">
              {usefulLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 hover:text-[#63B7AF] transition-colors flex items-center group"
                  >
                    <Icons.ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity -ml-5 group-hover:ml-0" />
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Download & Social */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Available On</h4>
            <div className="space-y-3 mb-6">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-[#071827] font-bold text-xs">iOS</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Download on the</span>
                  <span className="text-sm font-semibold text-white">App Store</span>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-[#071827] font-bold text-xs">AND</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Get it on</span>
                  <span className="text-sm font-semibold text-white">Google Play</span>
                </div>
              </a>
            </div>

            <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#63B7AF] rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Icons.Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#63B7AF] rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Icons.Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#63B7AF] rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Icons.Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#63B7AF] rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Icons.YouTube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Band */}
      <div className="bg-[#071827] py-8">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="bg-black/15 rounded-xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icons.Mail className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-sm text-white/80">
                  Get exclusive deals and fresh catch updates delivered to your inbox
                </p>
              </div>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full md:w-80 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-white text-[#071827] rounded-full font-semibold hover:bg-white/90 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div>
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Down The Cove. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-[#63B7AF] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-[#63B7AF] transition-colors"
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-[#63B7AF] transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#1B6CA8] hover:bg-[#063d66] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <Icons.ChevronUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F6]">
      {/* TopBar scrolls away */}
      <TopBar />

      {/* Header is fixed */}
      <Header
        onToggleSidebar={handleToggleSidebar}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <div className="flex min-h-screen">
        <Sidebar isLockedOpen={isSidebarOpen} onClose={handleCloseSidebar} />

        {/* Main Content */}
        <main className="flex-1 md:ml-[60px] pt-6 bg-[#FAF8F6]">
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
            <HeroSection />
            {categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
            <StorySection />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Custom CSS for hiding scrollbar and animations */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .ticker-track {
          animation: ticker 24s linear infinite;
        }

        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
