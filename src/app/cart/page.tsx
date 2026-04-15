"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/formatPrice";
import { Loader2, MessageSquareWarning, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

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

  // Hydrate the store on client side
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  // Sync cart with Shopify when component mounts
  useEffect(() => {
    if (items.length > 0) {
      syncWithShopify().catch((error) => {
        console.error("Error syncing cart on mount:", error);
      });
    }
  }, [items.length, syncWithShopify]);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setIsCheckingOut(true);
    setError(null);

    try {
      // First sync with Shopify to ensure cart is updated
      await syncWithShopify();

      // Then get checkout URL
      const checkoutUrl = await getCheckoutUrl();

      if (checkoutUrl) {
        // Brief delay to ensure logs are captured
        setTimeout(() => {
          clearCart();
          window.location.href = checkoutUrl;
        }, 100);
      } else {
        console.error("Checkout URL is null or empty");
        toast.error("Failed to create checkout - no URL returned");
        setError("No checkout URL was returned from Shopify");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Checkout error:", error);
      toast.error("There was a problem creating your checkout");
      setError(`Error: ${errorMessage}`);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <main className="px-6 lg:px-0">
      <div className="container mx-auto mt-22">
        <h2 className="font-playfair text-center text-6xl">Cart</h2>

        <div className="font-montserrat container mx-auto my-6 flex max-w-4xl items-center gap-2 border-2 border-[#73512C] bg-[#73512C] p-4">
          <MessageSquareWarning className="mr-3 size-20 text-white" />
          <p className="text-sm text-white">
            Delivery Outside Lagos (Other States) For orders outside Lagos, we
            offer flexible delivery options for your location. Once your order
            is placed, our team will reach out via DM or WhatsApp to confirm the
            most convenient courier service and delivery cost for your area.
          </p>
        </div>
      </div>
      <section className="container mx-auto my-32 w-full lg:px-[119px]">
        {items.length === 0 ? (
          <div className="py-12 text-center">
            <h2 className="font-playfair text-4xl">Your cart is empty</h2>
            <p className="mb-8 text-gray-500">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Table Header - Only visible on desktop */}
            <div className="font-montserrat hidden border-b pb-2 md:grid md:grid-cols-4 md:gap-4">
              <div className="text-sm font-medium text-gray-700">PRODUCT</div>
              <div className="text-right text-sm font-medium text-gray-700">
                PRICE
              </div>
              <div className="text-center text-sm font-medium text-gray-700">
                QUANTITY
              </div>
              <div className="text-right text-sm font-medium text-gray-700">
                SUBTOTAL
              </div>
            </div>

            {/* Cart Items */}
            <div className="font-playfair space-y-6 py-4">
              {items.map((item) => (
                <div key={item.id} className="border-b py-4">
                  {/* Mobile Layout */}
                  <div className="overflow-hidden rounded-md bg-[#faf8f3] md:hidden">
                    {/* Product Info */}
                    <div className="flex p-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-white">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{item.title}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-500"
                            aria-label="Remove item"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      {/* Price Row */}
                      <div className="flex justify-between border-t border-gray-200 py-2">
                        <p className="text-sm text-gray-700">Price:</p>
                        <p className="text-sm font-medium">
                          {formatPrice(item.price, {
                            currencyCode: item.currencyCode,
                          })}
                        </p>
                      </div>

                      {/* Quantity Row */}
                      <div className="flex items-center justify-between border-t border-gray-200 py-2">
                        <p className="text-sm text-gray-700">Quantity:</p>
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="mx-2 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal Row */}
                      <div className="flex justify-between border-t border-gray-200 py-2">
                        <p className="text-sm text-gray-700">Subtotal:</p>
                        <p className="text-sm font-medium">
                          {formatPrice(
                            (parseFloat(item.price) * item.quantity).toString(),
                            { currencyCode: item.currencyCode },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid md:grid-cols-4 md:items-center md:gap-4">
                    {/* Product */}
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-1 tracking-tighter text-gray-400"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-lg font-medium">
                        {formatPrice(item.price, {
                          currencyCode: item.currencyCode,
                        })}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center rounded-md border border-gray-300">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="px-2 py-1 text-gray-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-4 py-1 text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 text-gray-600"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-lg">
                        {formatPrice(
                          (parseFloat(item.price) * item.quantity).toString(),
                          { currencyCode: item.currencyCode },
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Actions */}
            <div className="flex flex-col items-start justify-end gap-6 py-8 md:flex-row md:items-center">
              {/* Cart Totals */}
              <div className="font-playfair col-span-1 space-y-4">
                <h3 className="text-lg font-medium text-gray-700 uppercase">
                  CART TOTALS
                </h3>

                <div className="space-y-4 border-t border-b py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">SUBTOTAL</span>
                    <span className="text-lg">{totalPrice()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">TOTAL</span>
                    <span className="text-lg font-extrabold">
                      {totalPrice()}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  className="w-full rounded-none bg-[#73512C] transition-all duration-300 hover:bg-[#73512C]/80"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isCheckingOut || items.length === 0}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "PROCEED TO CHECKOUT"
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Cart;
