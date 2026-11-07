import React, { useState, Component } from "react";
import { CartProvider } from "@/components/fitcat/cart-context";
import Header from "@/components/fitcat/Header";
import FreshnessSection from "@/components/fitcat/FreshnessSection";
import HeroSection from "@/components/fitcat/HeroSection";
import MenuSection from "@/components/fitcat/MenuSection";
import GatheringSection from "@/components/fitcat/GatheringSection";
import HowItWorksSection from "@/components/fitcat/HowItWorksSection";
import ReviewsSection from "@/components/fitcat/ReviewsSection";
import Footer from "@/components/fitcat/Footer";
import CartSheet from "@/components/fitcat/CartSheet";
import OrderBar from "@/components/fitcat/OrderBar";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div id="top" className="min-h-screen bg-[#f8f5ef] text-[#142820] selection:bg-[#ff632b] selection:text-white">
        {/* Navigation Bar */}
        <ErrorBoundary>
          <Header onOpenCart={() => setCartOpen(true)} />
        </ErrorBoundary>

        <main>
          {/* Section 1: Scroll-driven Video Reel with Slides (Image 1 & Original ScrollSequence) */}
          <ErrorBoundary>
            <FreshnessSection />
          </ErrorBoundary>

          {/* Section 2: Interactive Mood / Dish Showcase (Image 2) */}
          <ErrorBoundary>
            <HeroSection />
          </ErrorBoundary>

          {/* Section 3: 12-Item Menu Grid with Category Filters & ADD Buttons (Image 3 Top) */}
          <ErrorBoundary>
            <MenuSection />
          </ErrorBoundary>

          {/* Section 4: Make Every Gathering a Little Fresher (Image 3 Bottom) */}
          <ErrorBoundary>
            <GatheringSection />
          </ErrorBoundary>

          {/* Section 5: Simple Steps & Delivery Banner with Swiggy, Toing/Zomato, WhatsApp (Image 4) */}
          <ErrorBoundary>
            <HowItWorksSection />
          </ErrorBoundary>

          {/* Section 6: Customer Reviews */}
          <ErrorBoundary>
            <ReviewsSection />
          </ErrorBoundary>
        </main>

        {/* Section 7: Professional Footer (Image 4 Bottom) */}
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>

        {/* Cart Drawer & Sticky Order Bar */}
        <ErrorBoundary>
          <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
        </ErrorBoundary>

        <ErrorBoundary>
          <OrderBar onOpenCart={() => setCartOpen(true)} />
        </ErrorBoundary>
      </div>
    </CartProvider>
  );
}
