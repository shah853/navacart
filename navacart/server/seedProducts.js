const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  // ==================== MEN ====================
  {
    name: "Men's Casual Shirt",
    description: "Comfortable cotton casual shirt for men",
    price: 1200,
    category: "Men",
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600",
  },
  {
    name: "Men's Formal Shirt",
    description: "Premium formal shirt for office wear",
    price: 1800,
    category: "Men",
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600",
  },
  {
    name: "Men's Polo Shirt",
    description: "Soft cotton polo shirt",
    price: 1600,
    category: "Men",
    stock: 25,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  },
  {
    name: "Men's Denim Jacket",
    description: "Blue denim jacket for casual wear",
    price: 4500,
    category: "Men",
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
  },
  {
    name: "Men's Hoodie",
    description: "Warm fleece hoodie",
    price: 2800,
    category: "Men",
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
  },
  {
    name: "Men's Jeans",
    description: "Slim fit blue jeans",
    price: 2500,
    category: "Men",
    stock: 22,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
  },
  {
    name: "Men's Chinos",
    description: "Classic cotton chinos",
    price: 2300,
    category: "Men",
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600",
  },
  {
    name: "Men's Sweatshirt",
    description: "Comfortable everyday sweatshirt",
    price: 2100,
    category: "Men",
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
  },
  {
    name: "Men's T-Shirt",
    description: "Round neck cotton t-shirt",
    price: 900,
    category: "Men",
    stock: 35,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600",
  },
  {
    name: "Men's Kurta",
    description: "Traditional cotton kurta",
    price: 2600,
    category: "Men",
    stock: 16,
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=600&fit=crop",
  },

  // ==================== WOMEN ====================
  {
    name: "Women's Summer Dress",
    description: "Elegant floral summer dress",
    price: 3200,
    category: "Women",
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
  },
  {
    name: "Women's Kurti",
    description: "Comfortable embroidered kurti",
    price: 2500,
    category: "Women",
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600",
  },
  {
    name: "Women's Maxi Dress",
    description: "Stylish long maxi dress",
    price: 3800,
    category: "Women",
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
  },
  {
    name: "Women's Hoodie",
    description: "Warm casual hoodie",
    price: 2800,
    category: "Women",
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  },
  {
    name: "Women's T-Shirt",
    description: "Soft cotton round neck t-shirt",
    price: 1200,
    category: "Women",
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
  },
  {
    name: "Women's Jeans",
    description: "Slim fit stretch jeans",
    price: 2900,
    category: "Women",
    stock: 16,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
  },
  {
    name: "Women's Cardigan",
    description: "Lightweight knitted cardigan",
    price: 2600,
    category: "Women",
    stock: 14,
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600",
  },
  {
    name: "Women's Sweater",
    description: "Soft wool winter sweater",
    price: 3100,
    category: "Women",
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600",
  },
  {
    name: "Women's Abaya",
    description: "Elegant black abaya",
    price: 4200,
    category: "Women",
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600",
  },
  {
    name: "Women's Blouse",
    description: "Classic office wear blouse",
    price: 1900,
    category: "Women",
    stock: 22,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  },

  // ==================== KIDS ====================
  {
    name: "Kids Printed T-Shirt",
    description: "Soft cotton printed t-shirt for kids",
    price: 900,
    category: "Kids",
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
  },
  {
    name: "Kids Denim Jacket",
    description: "Stylish denim jacket for kids",
    price: 2200,
    category: "Kids",
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
  },
  {
    name: "Kids Hoodie",
    description: "Warm hoodie for boys and girls",
    price: 1800,
    category: "Kids",
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600",
  },
  {
    name: "Kids Jeans",
    description: "Comfortable blue jeans for kids",
    price: 1500,
    category: "Kids",
    stock: 25,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600",
  },
  {
    name: "Kids Shorts",
    description: "Comfortable cotton shorts",
    price: 800,
    category: "Kids",
    stock: 28,
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600",
  },
  {
    name: "Kids School Uniform",
    description: "High quality school uniform",
    price: 2500,
    category: "Kids",
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
  },
  {
    name: "Kids Winter Sweater",
    description: "Soft winter sweater for kids",
    price: 1700,
    category: "Kids",
    stock: 22,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
  },
  {
    name: "Kids Cotton Pajama",
    description: "Comfortable night wear for kids",
    price: 1100,
    category: "Kids",
    stock: 24,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600",
  },
  {
    name: "Kids Cap",
    description: "Stylish sun protection cap",
    price: 600,
    category: "Kids",
    stock: 35,
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
  },
  {
    name: "Kids Sneakers",
    description: "Comfortable everyday sneakers",
    price: 2100,
    category: "Kids",
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },

  // ==================== SHOES ====================
  {
    name: "Running Shoes",
    description: "Lightweight running shoes for daily exercise",
    price: 4500,
    category: "Shoes",
    stock: 25,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    name: "Casual Sneakers",
    description: "Comfortable casual sneakers for everyday wear",
    price: 3900,
    category: "Shoes",
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
  },
  {
    name: "Leather Formal Shoes",
    description: "Premium leather formal shoes",
    price: 6500,
    category: "Shoes",
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600",
  },
  {
    name: "Canvas Shoes",
    description: "Stylish canvas shoes for casual outfits",
    price: 2800,
    category: "Shoes",
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600",
  },
  {
    name: "High Top Sneakers",
    description: "Fashionable high top sneakers",
    price: 5200,
    category: "Shoes",
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
  },
  {
    name: "Sports Trainers",
    description: "Comfortable trainers for gym and sports",
    price: 4800,
    category: "Shoes",
    stock: 22,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600",
  },
  {
    name: "Slip-On Shoes",
    description: "Easy to wear slip-on casual shoes",
    price: 3200,
    category: "Shoes",
    stock: 17,
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600",
  },
  {
    name: "Walking Shoes",
    description: "Comfortable walking shoes with soft sole",
    price: 3700,
    category: "Shoes",
    stock: 24,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600",
  },
  {
    name: "Football Shoes",
    description: "Professional football shoes with grip",
    price: 5900,
    category: "Shoes",
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600",
  },
  {
    name: "Classic Loafers",
    description: "Elegant loafers for formal occasions",
    price: 5400,
    category: "Shoes",
    stock: 14,
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600",
  },

  // ==================== WATCHES ====================
  {
    name: "Classic Analog Watch",
    description: "Elegant leather strap analog watch",
    price: 5800,
    category: "Watches",
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600",
  },
  {
    name: "Luxury Gold Watch",
    description: "Premium gold plated wrist watch",
    price: 9500,
    category: "Watches",
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600",
  },
  {
    name: "Silver Analog Watch",
    description: "Stylish silver stainless steel watch",
    price: 7200,
    category: "Watches",
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600",
  },
  {
    name: "Digital Sports Watch",
    description: "Water resistant digital sports watch",
    price: 4300,
    category: "Watches",
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600",
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smart watch",
    price: 12500,
    category: "Watches",
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600",
  },
  {
    name: "Minimal Black Watch",
    description: "Modern black dial wrist watch",
    price: 6400,
    category: "Watches",
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
  },
  {
    name: "Brown Leather Watch",
    description: "Classic brown leather strap watch",
    price: 6100,
    category: "Watches",
    stock: 14,
    image:
      "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=600",
  },
  {
    name: "Couple Watch Set",
    description: "Matching watches for couples",
    price: 9800,
    category: "Watches",
    stock: 7,
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600",
  },
  {
    name: "Chronograph Watch",
    description: "Premium chronograph wrist watch",
    price: 11200,
    category: "Watches",
    stock: 9,
    image:
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600",
  },
  {
    name: "Everyday Casual Watch",
    description: "Comfortable everyday wrist watch",
    price: 3900,
    category: "Watches",
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600",
  },
];

// ==================== SEED DATABASE ====================

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    console.log("Old products removed");

    await Product.insertMany(products);

    console.log(`${products.length} products added successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);

    process.exit(1);
  }
};

seedProducts();