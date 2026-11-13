import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory reviews store
const reviews = [
  {
    id: 1,
    name: "Riya M.",
    rating: 5,
    body: "The chutney cheese sandwich is absolutely amazing! So fresh and flavourful. Will definitely order again.",
    date: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Aditya K.",
    rating: 5,
    body: "Best healthy food delivery in Vikhroli. The chia pudding is to die for. Love that everything is made fresh.",
    date: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Sneha P.",
    rating: 5,
    body: "Finally a healthy option near the railway station. The assorted fruits are so fresh and the portions are great for the price.",
    date: new Date().toISOString(),
  },
];

// In-memory orders store
const orders = [];

// Menu items
const menu = [
  {
    id: "chutney-cheese-sandwich",
    name: "Chutney Cheese Sandwich",
    price: 99,
    category: "Snacks",
    description: "Flavourful snack made by layering green chutney and cheese between slices of bread.",
    image: "/images/dishes/chutney_sandwich.jpg",
    available: true,
    bestseller: true,
  },
  {
    id: "chia-pudding",
    name: "Chia Pudding",
    price: 99,
    category: "Cold Drinks",
    description: "A creamy, naturally sweetened pudding with the goodness of chia seeds.",
    image: "/images/dishes/chia_pudding.jpg",
    available: true,
    bestseller: true,
  },
  {
    id: "assorted-fruits",
    name: "Assorted Fruits",
    price: 99,
    category: "Fresh Bowls",
    description: "Pre selected fresh fruits served together as a variety blend.",
    image: "/images/dishes/assorted_fruits.jpg",
    available: true,
    bestseller: true,
  },
  {
    id: "peanut-butter-banana-sandwich",
    name: "Peanut Butter Banana Sandwich",
    price: 99,
    category: "Snacks",
    description: "Comforting meal made by spreading peanut butter onto bread slices and layering them with fresh banana slices.",
    image: "/images/dishes/peanut_butter_banana.jpg",
    available: true,
    bestseller: true,
  },
  {
    id: "o-sandwich",
    name: "O-Sandwich",
    price: 139,
    category: "Snacks",
    description: "Hearty sandwich packed with fresh veggies and cheese.",
    image: "/images/dishes/o_sandwich.jpg",
    available: true,
    bestseller: false,
  },
  {
    id: "gupta-fruit-juice",
    name: "Gupta Fruit & Juice",
    price: 149,
    category: "Cold Drinks",
    description: "Refreshing seasonal fruits blended to perfection.",
    image: "/images/dishes/gupta_juice.jpg",
    available: true,
    bestseller: false,
  },
  {
    id: "daily-protein-club",
    name: "Daily Protein Club",
    price: 169,
    category: "Fresh Bowls",
    description: "High protein meal to keep you full and energised.",
    image: "/images/dishes/protein_club.jpg",
    available: true,
    bestseller: false,
  },
  {
    id: "sangweech",
    name: "Sangweech",
    price: 139,
    category: "Snacks",
    description: "Juicy, wholesome sandwich made with care.",
    image: "/images/dishes/sangweech.jpg",
    available: true,
    bestseller: false,
  },
  {
    id: "indian-snack-house",
    name: "Indian Snack House",
    price: 119,
    category: "Snacks",
    description: "Crispy and classic Indian snack you'll love.",
    image: "/images/dishes/snack_house.jpg",
    available: true,
    bestseller: false,
  },
  {
    id: "protein-bowl",
    name: "Protein Bowl",
    price: 149,
    category: "Fresh Bowls",
    description: "Balanced bowl with protein, greens and grains.",
    image: "/images/dishes/protein_bowl.jpg",
    available: true,
    bestseller: false,
  },
  {
    id: "fruit-bowl",
    name: "Fruit Bowl",
    price: 129,
    category: "Fresh Bowls",
    description: "Fresh fruits served in a delicious bowl.",
    image: "/images/dishes/fruit_bowl.jpg",
    available: true,
    bestseller: false,
  },
  {
    id: "nutty-banana-toast",
    name: "Nutty Banana Toast",
    price: 119,
    category: "Snacks",
    description: "Banana toast topped with nuts and seeds.",
    image: "/images/dishes/nutty_toast.jpg",
    available: true,
    bestseller: false,
  },
];

// Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), service: "FitCat Backend API" });
});

app.get("/api/menu", (req, res) => {
  const { category } = req.query;
  if (category && category !== "All") {
    return res.json(menu.filter((m) => m.category === category));
  }
  res.json(menu);
});

app.get("/api/business", (req, res) => {
  res.json({
    name: "FitCat Healthy Kitchen",
    brandLine: "Let's Make Mumbai Fit",
    locality: "Vikhroli East, Mumbai",
    address: "Shop no. 9, Ground floor, Amrapali CHSL, Pirojsha Nagar, near railway station, Vikhroli East, Mumbai",
    whatsappNumber: "919876543210",
    hours: "Mon – Sun: 8:00 AM – 10:00 PM",
    socials: {
      whatsapp: "https://wa.me/919876543210",
      email: "mailto:hello@fitcatkitchen.com",
      call: "tel:+919876543210",
    },
  });
});

app.get("/api/reviews", (req, res) => {
  res.json(reviews);
});

app.post("/api/reviews", (req, res) => {
  const { name, rating, body } = req.body;
  if (!name || !rating || !body) {
    return res.status(400).json({ error: "Name, rating and review text are required." });
  }
  const newReview = {
    id: Date.now(),
    name: name.trim(),
    rating: Number(rating),
    body: body.trim(),
    date: new Date().toISOString(),
  };
  reviews.unshift(newReview);
  res.status(201).json(newReview);
});

app.post("/api/orders", (req, res) => {
  const { items, subtotal, customerNote } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ error: "Cart is empty." });
  }
  const order = {
    id: `ORD-${Date.now()}`,
    items,
    subtotal,
    customerNote,
    createdAt: new Date().toISOString(),
    status: "received",
  };
  orders.push(order);
  res.status(201).json({ success: true, order });
});

app.get("/api/time", (req, res) => {
  res.json({ time: new Date().toISOString() });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[FitCat Backend] Listening on http://localhost:${PORT}`);
  });
}

export default app;

