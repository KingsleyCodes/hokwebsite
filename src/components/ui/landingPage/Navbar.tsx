"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Menu, Search, ShoppingBag, X } from "lucide-react"; // Switched to ShoppingBag for more Luxe feel
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProductSearch from "../product-search";

const NavLinks = [
  { title: "SHOP", href: "/shop" },
  {
    title: "BRANDS",
    href: "/brands",
    submenu: [
      { title: "Cosrx", href: "/shop?vendors=cosrx" },
      { title: "Derma Factory", href: "/shop?vendors=derma-factory" },
      { title: "Lizara", href: "/shop?vendors=lizara" },
      { title: "12 Grabs", href: "/shop?vendors=12-grabs" },
      { title: "Anua", href: "/shop?vendors=anua" },
    ],
  },
  { title: "SKIN ALGORITHM", href: "/skin-algorithm" },
  {
    title: "HOK PRO",
    href: "/wholesale",
    submenu: [
      { title: "Shop Wholesale", href: "/wholesale-shop" },
      { title: "Wholesaler Terms", href: "/wholesale" },
      { title: "Join The HOK Tribe", href: "https://linktr.ee/hokbeauty" },
    ],
  },
  { title: "ABOUT", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems } = useCartStore();
  const totalItemsCount = totalItems();

  const brandsButtonRef = useRef<HTMLButtonElement>(null);
  const proButtonRef = useRef<HTMLButtonElement>(null);

  const handlePopoverLinkClick = (buttonRef: React.RefObject<HTMLButtonElement>) => {
    if (buttonRef.current) buttonRef.current.click();
  };

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      {/* Announcement Bar - Very 'Fresh' style */}
      <div className="bg-[#0070bb] py-2 text-center text-[10px] font-medium tracking-[0.2em] text-white uppercase">
        Free Shipping on all orders over ₦50,000
      </div>

      <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
        <section className="flex h-16 items-center justify-between lg:h-24">
          
          {/* LEFT: Mobile Menu & Desktop Search */}
          <div className="flex flex-1 items-center gap-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6 text-black" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full p-0 sm:w-[400px]">
                <div className="flex flex-col h-full pt-12">
                  <div className="px-6 pb-8 border-b border-gray-100">
                     <ProductSearch />
                  </div>
                  <nav className="flex flex-col px-6 py-4 overflow-y-auto">
                    {NavLinks.map((link) => (
                      <div key={link.title} className="py-4 border-b border-gray-50">
                        <Link href={link.href} className="text-sm tracking-widest uppercase font-medium" onClick={() => setOpen(false)}>
                          {link.title}
                        </Link>
                      </div>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden lg:block group">
              <button className="flex items-center gap-2 text-[11px] tracking-[0.15em] font-medium text-gray-500 hover:text-black transition-colors">
                <Search className="h-4 w-4" strokeWidth={1.5} />
                SEARCH
              </button>
            </div>
          </div>

          {/* CENTER: Logo (The Anchor) */}
          <div className="flex flex-1 justify-center">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Image
                src="/new-hok-logo.svg" 
                alt="HOK Logo"
                width={120}
                height={40}
                className="h-8 w-auto lg:h-12"
              />
            </Link>
          </div>

          {/* RIGHT: Cart & Utils */}
          <div className="flex flex-1 items-center justify-end gap-6">
            <Link href="/cart" className="group relative flex items-center gap-2">
              <span className="hidden text-[11px] font-medium tracking-[0.15em] text-gray-500 group-hover:text-black lg:block">
                BAG
              </span>
              <div className="relative">
                <ShoppingBag className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={1.2} />
                {mounted && totalItemsCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0070bb] text-[9px] font-bold text-white">
                    {totalItemsCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </section>

        {/* BOTTOM: Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center justify-center gap-12 pb-6">
            {NavLinks.map((link) => (
              <li key={link.title}>
                {link.submenu ? (
                  <Popover className="relative">
                    <PopoverButton
                      ref={link.title === "BRANDS" ? brandsButtonRef : proButtonRef}
                      className="text-[11px] font-normal tracking-[0.2em] uppercase transition-colors hover:text-[#0070bb] focus:outline-none"
                    >
                      {link.title}
                    </PopoverButton>
                    <PopoverPanel className="absolute left-1/2 z-50 mt-4 w-48 -translate-x-1/2 border border-gray-100 bg-white p-4 shadow-xl animate-in fade-in slide-in-from-top-1">
                      <div className="flex flex-col gap-3">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="text-[10px] tracking-widest text-gray-600 uppercase hover:text-[#0070bb]"
                            onClick={() => handlePopoverLinkClick(link.title === "BRANDS" ? brandsButtonRef : proButtonRef)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </PopoverPanel>
                  </Popover>
                ) : (
                  <Link
                    href={link.href}
                    className="text-[11px] font-normal tracking-[0.2em] uppercase transition-colors hover:text-[#0070bb]"
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}