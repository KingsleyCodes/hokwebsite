// src/store/useCartStore.ts
import { createCart } from "@/lib/shopify/cart";
import { CartItem } from "@/lib/shopify/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  cartId: string | null;
  checkoutUrl: string | null;

  // Actions
  addItem: (item: Omit<CartItem, "id">) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  setOpen: (isOpen: boolean) => void;
  syncWithShopify: () => Promise<void>;
  getCheckoutUrl: () => Promise<string | null>;
  // Computed
  totalItems: () => number;
  totalPrice: () => string;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,
      cartId: null,
      checkoutUrl: null,

      // Add an item to the cart
      addItem: async (newItem) => {
        set((state) => {
          // Check if the item already exists
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.variantId === newItem.variantId &&
              item.productId === newItem.productId,
          );

          let updatedItems: CartItem[];

          if (existingItemIndex !== -1) {
            // Update quantity if item exists
            updatedItems = state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item,
            );
          } else {
            // Add new item with unique ID
            const id = `${newItem.productId}-${newItem.variantId || "default"}-${Date.now()}`;
            updatedItems = [...state.items, { ...newItem, id }];
          }

          return {
            items: updatedItems,
            isOpen: true, // Open cart drawer
          };
        });

        // Sync with Shopify
        await get().syncWithShopify();
      },

      // Remove an item from the cart
      removeItem: async (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));

        // Sync with Shopify
        await get().syncWithShopify();
      },

      // Update an item's quantity
      updateQuantity: async (id, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        }));

        // Sync with Shopify
        await get().syncWithShopify();
      },

      // Clear the cart
      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      // Open/close the cart drawer
      setOpen: (isOpen) => {
        set({ isOpen });
      },

      // Sync cart with Shopify
      syncWithShopify: async () => {
        const items = get().items;
        const cartId = get().cartId;

        if (items.length === 0) {
          set({ cartId: null, checkoutUrl: null });
          return;
        }

        set({ isLoading: true });

        try {
          if (!cartId) {
            // Create a new cart
            const cart = await createCart(items);
            set({
              cartId: cart.id,
              checkoutUrl: cart.checkoutUrl,
            });
          } else {
            // Update existing cart
            // This is a simplified implementation
            // In a real app, you'd need to track Shopify cart line IDs
            // For now, we'll recreate the cart if it exists
            const cart = await createCart(items);
            set({
              cartId: cart.id,
              checkoutUrl: cart.checkoutUrl,
            });
          }
        } catch (error) {
          console.error("Failed to sync cart with Shopify:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Get checkout URL
      getCheckoutUrl: async () => {
        const cartId = get().cartId;
        const items = get().items;
        const checkoutUrl = get().checkoutUrl;

        if (!cartId || items.length === 0) {
          return null;
        }

        if (checkoutUrl) {
          return checkoutUrl;
        }

        set({ isLoading: true });

        try {
          // Ensure cart is synced
          await get().syncWithShopify();
          return get().checkoutUrl;
        } catch (error) {
          console.error("Failed to get checkout URL:", error);
          return null;
        } finally {
          set({ isLoading: false });
        }
      },

      // Calculate total number of items
      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Calculate total price
      totalPrice: () => {
        const total = get().items.reduce(
          (sum, item) => sum + parseFloat(item.price) * item.quantity,
          0,
        );

        return new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 0,
        }).format(total);
      },
    }),
    {
      name: "cart-storage",
      skipHydration: true, // For Next.js client components
    },
  ),
);
