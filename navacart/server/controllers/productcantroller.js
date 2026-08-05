const Product = require("../models/Product");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort = "newest" } = req.query;
    const filter = {};

    if (search) {
      const searchTerm = search.trim();
      filter.$or = [
        { name: { $regex: escapeRegex(searchTerm), $options: "i" } },
        { description: { $regex: escapeRegex(searchTerm), $options: "i" } },
        { category: { $regex: escapeRegex(searchTerm), $options: "i" } },
        { tags: { $elemMatch: { $regex: escapeRegex(searchTerm), $options: "i" } } },
      ];
    }

    if (category) {
      filter.category = { $regex: escapeRegex(category), $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let query = Product.find(filter);

    switch (sort) {
      case "priceLow":
        query = query.sort({ price: 1 });
        break;
      case "priceHigh":
        query = query.sort({ price: -1 });
        break;
      case "rating":
        query = query.sort({ rating: -1, reviews: -1 });
        break;
      default:
        query = query.sort({ createdAt: -1 });
    }

    const products = await query;
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(200).json([]);
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: escapeRegex(q), $options: "i" } },
        { description: { $regex: escapeRegex(q), $options: "i" } },
        { category: { $regex: escapeRegex(q), $options: "i" } },
        { tags: { $elemMatch: { $regex: escapeRegex(q), $options: "i" } } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const vectorSearchProducts = async (req, res) => {
  try {
    const { q, query, limit = 10, minScore = 0.1 } = req.query;
    const searchTerm = (q || query || "").trim();

    if (!searchTerm) {
      return res.status(200).json([]);
    }

    const tokens = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
    const products = await Product.find({}).lean();

    const scoredProducts = products
      .map((product) => {
        const sourceText = [
          product.name || "",
          product.description || "",
          product.category || "",
          ...(product.tags || []),
        ]
          .join(" ")
          .toLowerCase();

        let score = 0;
        tokens.forEach((token) => {
          const tokenRegex = new RegExp(escapeRegex(token), "i");
          const nameHit = tokenRegex.test(product.name || "") ? 3 : 0;
          const descriptionHit = tokenRegex.test(product.description || "") ? 2 : 0;
          const categoryHit = tokenRegex.test(product.category || "") ? 1.5 : 0;
          const tagHit = tokenRegex.test((product.tags || []).join(" ")) ? 2.5 : 0;
          const frequency = (sourceText.match(new RegExp(escapeRegex(token), "g")) || []).length;
          score += nameHit + descriptionHit + categoryHit + tagHit + frequency * 0.2;
        });

        return { ...product, _searchScore: score };
      })
      .filter((product) => product._searchScore >= Number(minScore))
      .sort((a, b) => b._searchScore - a._searchScore)
      .slice(0, Number(limit));

    res.status(200).json(scoredProducts.map(({ _searchScore, ...product }) => product));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  searchProducts,
  vectorSearchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
