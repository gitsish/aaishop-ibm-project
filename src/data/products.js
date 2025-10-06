// data/products.js
// Programmatically generate a product list so each category has >= 8 items.
// Keep the same product object shape used by the UI.

const uniq = (s) => String(s).replace(/\s+/g, "-").toLowerCase();

// A small set of vibrant Unsplash base images (public dev/demo use)
const IMAGES = {
  tShirt: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&auto=format&fit=crop&q=80",
  ],
  jeans: [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=1200&auto=format&fit=crop&q=80",
  ],
  dresses: [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&auto=format&fit=crop&q=80",
  ],
  jacket: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&auto=format&fit=crop&q=80",
  ],
  footwear: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&auto=format&fit=crop&q=80",
  ],
  saree: [
    "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1530810811122-0b6ba8f2d3b2?w=1200&auto=format&fit=crop&q=80",
  ],
  lehenga: [
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&auto=format&fit=crop&q=80",
  ],
  kurta: [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&auto=format&fit=crop&q=80",
  ],
  anarkali: [
    "https://images.unsplash.com/photo-1519741491475-4e5d1a6f2c1d?w=1200&auto=format&fit=crop&q=80",
  ],
  dupatta: [
    "https://images.unsplash.com/photo-1520975912266-6f2c8e6a7c1a?w=1200&auto=format&fit=crop&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80",
  ],
};

// categories you currently use / requested
export const categories = [
  "All",
  "T-Shirts",
  "Jeans",
  "Dresses",
  "Jackets",
  "Footwear",
  "Blazers",
  "Hoodies",
  "Shirts",
  "Shorts",
  "Coats",
  "Bags",
  "Sarees",
  "Lehengas",
  "Kurta Sets",
  "Anarkali",
  "Women Shirts",
  "Women Jeans",
  "Dupattas",
];

// small set of base templates per category (keeps UI lively & varied)
const BASE_TEMPLATES = {
  "T-Shirts": {
    brand: "UrbanStyle",
    nameBase: "Casual Cotton Tee",
    price: 599,
    description: "Premium cotton tee — soft and breathable.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Grey"],
    images: IMAGES.tShirt,
    category: "T-Shirts",
    inStock: true,
  },
  Jeans: {
    brand: "DenimCo",
    nameBase: "Slim Fit Denim Jeans",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    description: "Classic slim fit denim with comfortable stretch.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Blue", "Dark Blue", "Black"],
    images: IMAGES.jeans,
    category: "Jeans",
    inStock: true,
  },
  Dresses: {
    brand: "FloralStyle",
    nameBase: "Printed Summer Dress",
    price: 1299,
    description: "Flowy floral dress perfect for sunny days.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pink", "Blue", "Yellow"],
    images: IMAGES.dresses,
    category: "Dresses",
    badge: "new",
    inStock: true,
  },
  Jackets: {
    brand: "UrbanEdge",
    nameBase: "Leather Jacket",
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    description: "Premium leather jacket with classic design.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    images: IMAGES.jacket,
    category: "Jackets",
    inStock: true,
  },
  Footwear: {
    brand: "RunFast",
    nameBase: "Running Shoes",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    description: "Performance running shoes with cushioning tech.",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Blue"],
    images: IMAGES.footwear,
    category: "Footwear",
    inStock: true,
  },
  Blazers: {
    brand: "ClassicFit",
    nameBase: "Formal Blazer",
    price: 3499,
    description: "Tailored formal blazer for work and events.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Black", "Grey"],
    images: IMAGES.default,
    category: "Blazers",
    inStock: true,
  },
  Hoods: {
    brand: "ComfortZone",
    nameBase: "Cozy Hoodie",
    price: 999,
    description: "Warm cotton-blend hoodie for casual comfort.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Grey", "Black", "Maroon"],
    images: IMAGES.default,
    category: "Hoodies",
    inStock: true,
  },
  Shirts: {
    brand: "ExecutiveWear",
    nameBase: "Formal Shirt",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    description: "Wrinkle-free formal shirt for office wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Pink"],
    images: IMAGES.default,
    category: "Shirts",
    inStock: true,
  },
  Shorts: {
    brand: "BeachVibes",
    nameBase: "Summer Shorts",
    price: 699,
    description: "Light breathable shorts for beach days.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Khaki", "Navy", "Olive"],
    images: IMAGES.default,
    category: "Shorts",
    inStock: true,
  },
  Coats: {
    brand: "WarmStyle",
    nameBase: "Winter Coat",
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    description: "Warm coat with premium insulation.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Camel"],
    images: IMAGES.default,
    category: "Coats",
    inStock: true,
  },
  Bags: {
    brand: "TravelGear",
    nameBase: "Durable Backpack",
    price: 1499,
    description: "Spacious backpack with multiple compartments.",
    sizes: ["One Size"],
    colors: ["Black", "Grey", "Navy"],
    images: IMAGES.default,
    category: "Bags",
    inStock: true,
  },
  Sarees: {
    brand: "Savera",
    nameBase: "Silk Banarasi Saree",
    price: 7999,
    originalPrice: 11999,
    discount: 33,
    description: "Banarasi silk saree with zari work for weddings.",
    sizes: ["One Size"],
    colors: ["Maroon", "Gold", "Sapphire"],
    images: IMAGES.saree,
    category: "Sarees",
    badge: "trending",
    inStock: true,
  },
  Lehengas: {
    brand: "Rivaah",
    nameBase: "Designer Lehenga Set",
    price: 15999,
    description: "Hand-embroidered lehenga with dupatta.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Rose Gold", "Emerald", "Fuchsia"],
    images: IMAGES.lehenga,
    category: "Lehengas",
    inStock: true,
  },
  "Kurta Sets": {
    brand: "Nazrana",
    nameBase: "Kurta Set",
    price: 2499,
    description: "Comfortable kurta set with churidar or palazzo.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Mustard", "Teal", "Coral"],
    images: IMAGES.kurta,
    category: "Kurta Sets",
    badge: "new",
    inStock: true,
  },
  Anarkali: {
    brand: "Elegance",
    nameBase: "Anarkali Dress",
    price: 4999,
    description: "Floor-length anarkali with delicate embroidery.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Royal Blue", "Green"],
    images: IMAGES.anarkali,
    category: "Anarkali",
    inStock: true,
  },
  "Women Shirts": {
    brand: "JeanMuse",
    nameBase: "Women Denim Shirt",
    price: 1299,
    description: "Longline denim shirt for versatile styling.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Light Blue", "Dark Blue"],
    images: IMAGES.jeans,
    category: "Women Shirts",
    inStock: true,
  },
  "Women Jeans": {
    brand: "CurveFit",
    nameBase: "Women High-Rise Jeans",
    price: 1799,
    originalPrice: 2299,
    discount: 22,
    description: "High-rise slim jeans for an elegant silhouette.",
    sizes: ["26", "28", "30", "32"],
    colors: ["Indigo", "Black"],
    images: IMAGES.jeans,
    category: "Women Jeans",
    inStock: true,
  },
  Dupattas: {
    brand: "Drapes",
    nameBase: "Designer Dupatta",
    price: 699,
    description: "Lightweight designer dupatta with vivid prints.",
    sizes: ["One Size"],
    colors: ["Multicolor", "Pastel"],
    images: IMAGES.dupatta,
    category: "Dupattas",
    inStock: true,
  },
};

// helper to create N variants of a base product with slight differences
function generateForCategory(base, categoryKey, startIdx, count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const id = String(startIdx + i);
    const color = base.colors ? base.colors[i % base.colors.length] : "Default";
    const sizeOptions = base.sizes || ["One Size"];
    const size = sizeOptions[i % sizeOptions.length];
    const priceVariance = Math.floor((i % 5) * 50); // small price variance
    const price = (base.price || 999) + priceVariance;
    const originalPrice = base.originalPrice ? base.originalPrice + Math.floor((i % 3) * 100) : undefined;
    const discount = base.discount ?? (originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined);
    // choose images by rotating through base images and appending index for variety
    const baseImages = base.images && base.images.length ? base.images : IMAGES.default;
    const images = baseImages.map((u, idx) => {
      // append a query param to slightly change the URL (Unsplash ignores extra params but useful for variety)
      return `${u}&ixlib=rb-1.2.1&auto=format&fit=crop&q=80&variant=${i}-${idx}`;
    });

    const product = {
      id,
      name: `${base.nameBase} ${i + 1}`,
      brand: base.brand,
      price,
      ...(originalPrice ? { originalPrice } : {}),
      ...(discount ? { discount } : {}),
      rating: +(4 + ((i % 5) * 0.1)).toFixed(1), // range 4.0-4.4 etc
      reviews: 100 + i * 10,
      images,
      category: base.category,
      description: base.description,
      sizes: base.sizes,
      colors: base.colors,
      badge: i === 0 && base.badge ? base.badge : undefined,
      inStock: base.inStock,
    };

    arr.push(product);
  }
  return arr;
}

// Build products ensuring each category except "All" has at least 8 items
const desiredPerCategory = 8;
let products = [];
let nextId = 1;

// iterate through categories (skip "All" as it's not a product category)
for (const cat of categories) {
  if (cat === "All") continue;
  const baseKey = BASE_TEMPLATES[cat] ? cat : (cat.includes("Women") ? "Women Shirts" : "default");
  const base = BASE_TEMPLATES[baseKey] || {
    brand: "Generic",
    nameBase: `${cat} Item`,
    price: 999,
    description: `Default ${cat} product.`,
    sizes: ["One Size"],
    colors: ["Default"],
    images: IMAGES.default,
    category: cat,
    inStock: true,
  };

  // generate exactly desiredPerCategory
  const arr = generateForCategory(base, cat, nextId, desiredPerCategory);
  products = products.concat(arr);
  nextId += arr.length;
}

// OPTIONAL: you may want to shuffle products or keep by-category grouping.
// Right now products are grouped by category in order of categories array.

export { products };

// convenience helper
export function getProductById(id) {
  return products.find((p) => p.id === String(id)) || null;
}
