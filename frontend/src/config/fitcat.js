export const business = {
  name: "FitCat Healthy Kitchen",
  brandLine: "Let’s Make Mumbai Fit",
  locality: "Vikhroli East, Mumbai",
  address: "Shop no. 9, Ground floor, Amrapali CHSL, Pirojsha Nagar, near railway station, Vikhroli East, Mumbai",
  whatsappNumber: "919876543210",
  whatsappGreeting: "Hi FitCat! I’d like to place an order:",
  swiggyUrl: "https://www.swiggy.com",
  toingUrl: "https://www.zomato.com",
  hours: "Mon – Sun: 8:00 AM – 10:00 PM",
};

export const assets = {
  sequenceVideo: "/videos/fitcat.mp4",
  sequencePoster: "/images/poster.png",
  preparationVideo: "/videos/fitcat.mp4",
  preparationPoster: "/images/poster.png",
  logoImage: "/images/logo.png",
  frames: {
    basePath: "/assets/fitcat-fruit-frames/",
    count: 0,
    fileName: (index) => `f_${String(index).padStart(4, "0")}.webp`,
  },
};

export const menu = [
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

export const currency = "₹";
export const formatPrice = (value) => `${currency}${value}`;

export function buildWhatsAppUrl(lines, subtotal) {
  const number = business.whatsappNumber.replace(/\D/g, "");
  if (!number) return null;
  const body = [
    business.whatsappGreeting,
    "",
    ...lines,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
  ].join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(body)}`;
}
