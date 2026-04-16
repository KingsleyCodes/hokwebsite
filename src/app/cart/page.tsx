"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/formatPrice";
import { Loader2, Info, Minus, Plus, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Cart = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    getCheckoutUrl,
    syncWithShopify,
    clearCart,
  } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      syncWithShopify().catch((err) => console.error("Sync error:", err));
    }
  }, [items.length, syncWithShopify]);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    setError(null);

    try {
      await syncWithShopify();
      const checkoutUrl = await getCheckoutUrl();
      if (checkoutUrl) {
        setTimeout(() => {
          clearCart();
          window.location.href = checkoutUrl;
        }, 100);
      }
    } catch (err) {
      toast.error("Checkout failed. Please try again.");
      setError("Unable to redirect to checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Header Section */}
      <div className="border-b border-stone-100 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <span className="mb-4 block text-center text-[11px] font-bold tracking-[0.3em] text-[#0070bb] uppercase">
            Your Selection
          </span>
          <h1 className="font-valky text-center text-5xl md:text-7xl lg:text-8xl">
            Shopping <span className="italic font-light">Bag</span>
          </h1>
        </div>
      </div>

      <section className="container mx-auto mt-12 px-6 lg:max-w-6xl">
        {/* Fresh Delivery Notice */}
        <div className="mb-12 flex items-start gap-4 border border-stone-100 bg-stone-50/50 p-6">
          <Info className="mt-1 size-5 flex-shrink-0 text-[#0070bb]" />
          <div className="space-y-1">
            <p className="text-[10px] font-bold tracking-widest uppercase text-stone-900">
              Delivery Outside Lagos
            </p>
            <p className="text-[13px] leading-relaxed text-stone-500">
              For orders outside Lagos, we offer flexible shipping. Once placed, 
              our concierge will contact you via WhatsApp to confirm the most 
              reliable courier for your specific area.
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="mb-8 font-serif text-2xl text-stone-400">Your bag is currently empty.</p>
            <Link href="/shop">
              <button className="h-14 border border-black bg-black px-12 text-[11px] font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-transparent hover:text-black">
                RETURN TO SHOP
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            
            {/* Items Column */}
            <div className="lg:col-span-8">
              {/* Desktop Labels */}
              <div className="hidden grid-cols-12 border-b border-stone-100 pb-4 text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase md:grid">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-stone-100">
                {items.map((item) => (
                  <div key={item.id} className="group py-8">
                    <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
                      {/* Product Detail */}
                      <div className="flex items-center gap-6 md:col-span-6">
                        <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden bg-stone-50">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-serif text-lg text-stone-900">{item.title}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[9px] font-bold tracking-widest text-stone-400 uppercase hover:text-red-500 transition-colors"
                          >
                            Remove Item
                          </button>
                        </div>
                      </div>

                      {/* Price (Desktop) */}
                      <div className="hidden text-center text-[13px] font-medium text-stone-600 md:col-span-2 md:block">
                        {formatPrice(item.price, { currencyCode: item.currencyCode })}
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex justify-start md:col-span-2 md:justify-center">
                        <div className="flex h-10 w-28 items-center justify-between border border-stone-200 px-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="text-stone-400 hover:text-black"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-[13px] font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-stone-400 hover:text-black"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="flex items-center justify-between md:col-span-2 md:justify-end">
                        <span className="text-[10px] font-bold tracking-widest text-stone-300 uppercase md:hidden">Subtotal:</span>
                        <span className="text-[14px] font-bold text-stone-900 md:text-[13px] md:font-medium">
                          {formatPrice((parseFloat(item.price) * item.quantity).toString(), {
                            currencyCode: item.currencyCode,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 border border-stone-100 bg-stone-50/30 p-8">
                <h3 className="mb-8 text-[11px] font-bold tracking-[0.3em] uppercase text-stone-900">
                  Order Summary
                </h3>
                
                <div className="space-y-4 border-b border-stone-100 pb-8">
                  <div className="flex justify-between text-[13px] text-stone-500">
                    <span>Subtotal</span>
                    <span>{totalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-[13px] text-stone-500">
                    <span>Shipping</span>
                    <span className="text-[10px] font-bold tracking-tighter text-[#0070bb]">CALCULATED AT CHECKOUT</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-baseline mb-8">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-stone-900">ESTIMATED TOTAL</span>
                  <span className="text-2xl font-serif text-stone-900">{totalPrice()}</span>
                </div>

                {error && (
                  <div className="mb-4 text-[11px] text-red-500 tracking-wide uppercase italic">
                    {error}
                  </div>
                )}

                <button
                  disabled={isCheckingOut}
                  onClick={handleCheckout}
                  className="group relative flex h-14 w-full items-center justify-center gap-3 bg-black px-8 text-[11px] font-bold tracking-[0.2em] text-white transition-all hover:bg-[#0070bb] disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      PROCEED TO CHECKOUT 
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="mt-6 text-center text-[10px] leading-relaxed tracking-wide text-stone-400 uppercase">
                  Secure Checkout Guaranteed
                </p>
              </div>
            </div>
            
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;