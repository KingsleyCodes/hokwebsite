"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Menu, Search, ShoppingBag, ChevronDown, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProductSearch from "../product-search";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Announcement Bar */}
      <div className="bg-[#73512C] py-2 text-center text-[9px] font-bold tracking-[0.25em] text-white uppercase">
        5% OFF ON ALL WEBSITE ORDERS
      </div>

      <div className="mx-auto max-w-[1440px] border-b border-stone-100 px-4 lg:px-8">
        <section className="flex h-16 items-center justify-between lg:h-24">
          
          {/* LEFT: Mobile Toggle & Scoped Search Trigger */}
          <div className="flex flex-1 items-center gap-4 relative">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 -ml-2 outline-none border-none bg-transparent">
                  <Menu className="h-6 w-6 stroke-[1.2px]" />
                </button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full h-screen max-h-screen p-0 border-none bg-white flex flex-col duration-300">
                <div className="flex items-center px-6 py-5 border-b border-stone-50 flex-shrink-0">
                  <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Menu</span>
                </div>
                <div className="px-6 py-4 border-b border-stone-50 bg-stone-50/30 flex-shrink-0">
                   <ProductSearch />
                </div>
                <nav className="flex-1 overflow-y-auto px-6 py-2">
                  <div className="flex flex-col divide-y divide-stone-50">
                    {NavLinks.map((link) => (
                      <div key={link.title} className="py-4">
                        <div className="flex items-center justify-between">
                          <Link href={link.href} className="text-lg font-serif text-stone-900" onClick={() => setOpen(false)}>
                            {link.title}
                          </Link>
                          {link.submenu && <ChevronRight className="h-3.5 w-3.5 text-stone-300" />}
                        </div>
                        {link.submenu && (
                          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-3">
                            {link.submenu.map((sub) => (
                              <Link key={sub.title} href={sub.href} className="text-[10px] tracking-widest text-stone-400 uppercase font-medium" onClick={() => setOpen(false)}>
                                {sub.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Desktop Scoped Search Wrapper */}
            <div className="hidden lg:block relative">
              <AnimatePresence mode="wait">
                {!isSearchOpen ? (
                  <motion.button 
                    key="search-trigger"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSearchOpen(true)}
                    className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold text-stone-400 hover:text-black transition-colors outline-none"
                  >
                    <Search className="h-4 w-4 stroke-[1.5px]" />
                    SEARCH
                  </motion.button>
                ) : (
                  <motion.div 
                    key="search-input"
                    initial={{ opacity: 0, scale: 0.95, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -10 }}
                    className="flex items-center gap-3 bg-stone-50 rounded-full px-4 py-2 border border-stone-100 min-w-[300px]"
                  >
                    <div className="flex-1">
                      <ProductSearch />
                    </div>
                    <button 
                      onClick={() => setIsSearchOpen(false)}
                      className="text-stone-400 hover:text-black transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CENTER: Logo */}
          <div className="flex flex-1 justify-center">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Image
                src="/new-hok-logo.svg" 
                alt="HOK Logo"
                width={120}
                height={40}
                className="h-7 w-auto lg:h-10"
              />
            </Link>
          </div>

          {/* RIGHT: Cart */}
          <div className="flex flex-1 items-center justify-end">
            <Link href="/cart" className="group relative flex items-center gap-2 outline-none">
              <span className="hidden text-[10px] font-bold tracking-[0.2em] text-stone-400 group-hover:text-black lg:block">
                BAG
              </span>
              <div className="relative">
                <ShoppingBag className="h-5 w-5 lg:h-6 lg:w-6 stroke-[1.2px]" />
                {mounted && totalItemsCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#73512C] text-[8px] font-bold text-white">
                    {totalItemsCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </section>

        {/* BOTTOM: Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center justify-center gap-10 pb-6">
            {NavLinks.map((link) => (
              <li key={link.title}>
                {link.submenu ? (
                  <Popover className="relative group/popover">
                    <PopoverButton
                      ref={link.title === "BRANDS" ? brandsButtonRef : proButtonRef}
                      className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors hover:text-[#73512C] outline-none border-none ring-0"
                    >
                      {link.title}
                      <ChevronDown className="h-3 w-3 text-stone-300 transition-transform duration-300 group-data-[state=open]/popover:rotate-180" />
                    </PopoverButton>
                    <PopoverPanel className="absolute left-1/2 z-50 mt-6 w-56 -translate-x-1/2 border border-stone-100 bg-white p-6 shadow-2xl animate-in fade-in slide-in-from-top-2">
                      <div className="flex flex-col gap-4">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="text-[10px] tracking-[0.2em] text-stone-500 uppercase font-medium hover:text-[#73512C]"
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
                    className="text-[10px] font-bold tracking-[0.25em] uppercase transition-colors hover:text-[#73512C]"
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