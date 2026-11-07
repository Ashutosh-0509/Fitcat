import { useState } from "react";
import { CartProvider } from "@/components/fitcat/cart-context";
import Header from "@/components/fitcat/Header";
import FreshnessSection from "@/components/fitcat/FreshnessSection";
import MenuSection from "@/components/fitcat/MenuSection";
import PreparationSection from "@/components/fitcat/PreparationSection";
import OrderSection from "@/components/fitcat/OrderSection";
import ReviewsSection from "@/components/fitcat/ReviewsSection";
import Footer from "@/components/fitcat/Footer";
import CartSheet from "@/components/fitcat/CartSheet";
import OrderBar from "@/components/fitcat/OrderBar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Header onOpenCart={() => setCartOpen(true)} />
      <main>
        <FreshnessSection />
        <MenuSection />
        <PreparationSection />
        <OrderSection />
        <ReviewsSection />
      </main>
      <Footer />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
      <OrderBar onOpenCart={() => setCartOpen(true)} />
    </CartProvider>
  );
}
