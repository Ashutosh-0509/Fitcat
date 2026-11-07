import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { menu } from "@/config/fitcat";

/**
 * Cart lives in the browser only — this site hands the order to WhatsApp, so it
 * neither stores orders nor takes payment. Persisted to localStorage so a
 * reload on a phone does not lose the basket.
 */
const STORAGE_KEY = "fitcat.cart.v1";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      /* a corrupt basket is simply ignored */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* private mode: the basket still works for this session */
    }
  }, [lines, hydrated]);

  const add = useCallback((id) => {
    setLines((prev) => {
      const found = prev.find((line) => line.id === id);
      if (found) return prev.map((line) => (line.id === id ? { ...line, qty: line.qty + 1 } : line));
      return [...prev, { id, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id, qty) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((line) => line.id !== id)
        : prev.map((line) => (line.id === id ? { ...line, qty } : line))
    );
  }, []);

  const remove = useCallback((id) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    const items = lines
      .map((line) => {
        const product = menu.find((entry) => entry.id === line.id);
        return product ? { ...product, qty: line.qty } : null;
      })
      .filter(Boolean);

    return {
      items,
      count: items.reduce((sum, item) => sum + item.qty, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.qty, 0),
      qtyOf: (id) => lines.find((line) => line.id === id)?.qty ?? 0,
      add,
      setQty,
      remove,
      clear,
    };
  }, [lines, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}