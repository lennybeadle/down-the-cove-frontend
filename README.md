# Down The Cove - UK Coastal Provisioners

A premium UK coastal fishing & lifestyle e-commerce store built with Next.js 16, React 18, and Tailwind CSS.

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
downthecove/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles + Tailwind
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.ts          # Next.js configuration
```

## Features

- **Sticky Header** with logo, search, navigation, and cart/wishlist
- **Collapsible Sidebar** with hover-expand flyout menu
- **Product Cards** with discount badges, wishlist functionality, and stock indicators
- **Horizontal Scrolling** category sections
- **Responsive Design** optimized for desktop, tablet, and mobile
- **Coastal Color Palette**:
  - Deep Navy (#071827)
  - Ocean Blue (#1B6CA8)
  - Sea-glass Teal (#63B7AF)
  - Sand/Beige (#F5EEE3)

## Tech Stack

- **Next.js 16** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**

## Future Integration

The current implementation uses mock data at the top of `app/page.tsx`. To integrate with a real backend:

1. Replace `mockData` arrays with API calls to your e-commerce backend (Saleor, Medusa, Shopify, etc.)
2. Implement proper image handling with Next.js `<Image>` component
3. Connect cart/wishlist functionality to a state management solution
4. Add authentication and user account features

## License

Private
