"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Newsletter from "@/components/ui/landingPage/Newsletter";
import { format } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { createNewShopifyCustomer } from "@/utils/actions/createNewShopifyCustomer";

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(11, "Phone number must be at least 11 digits"),
});

export default function WholesalePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    email: "",
    orderRequest: "",
  });
  const [tourFormData, setTourFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [date, setDate] = React.useState<Date>();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  //const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);

  const validateForm = () => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleWholesaleReg = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await createNewShopifyCustomer({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      });

      if (result && result.errors) {
        toast.error(result.errors[0], {
          icon: <XCircle className="h-4 w-4" />,
        });
      } else {
        toast.success("Your wholesale application has been submitted.", {
          icon: <CheckCircle className="h-4 w-4" />,
        });
      }

      // Reset form and close dialog
      if (!result.errors) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
        });
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.", {
        icon: <XCircle className="h-4 w-4" />,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to submit the quote request
      console.log("Quote form submitted:", quoteFormData);
      toast("Your quote request has been submitted successfully!");
      setQuoteFormData({ email: "", orderRequest: "" });
    } catch (error) {
      console.error(error);
      toast("Failed to submit quote request. Please try again.");
    }
  };

  const handleTourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to submit the tour booking
      console.log("Tour form submitted:", {
        ...tourFormData,
        date: date ? format(date, "yyyy-MM-dd") : null,
      });
      toast("Your warehouse tour request has been submitted successfully!");
      setTourFormData({ fullName: "", email: "", phoneNumber: "" });
      setDate(undefined);
    } catch (error) {
      console.error(error);
      toast("Failed to submit tour request. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="">
        <div className="
          my-12 flex flex-col md:flex-row
          md:items-center
          justify-between
        ">
          <h1 className="font-playfair mb-4 text-4xl lg:text-6xl">
            Wholesaler <br /> Terms – HOK Pro
          </h1>

          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button className="bg-[#73512C] hover:bg-[#73512C]/90">
                Apply Now
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleWholesaleReg} className="space-y-6">
                <h2 className="font-playfair text-xl font-semibold">
                  Wholesale Application
                </h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                    {errors.phoneNumber && (
                      <p className="text-sm text-red-500">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#73512C] hover:bg-[#73512C]/90"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Scrollable white box container */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="max-h-[70vh] overflow-y-auto p-8">
            <main className="font-montserrat">
              <section className="max-w-4xl">
                <p className="mb-6">
                  Welcome to Home of Korean Beauty – HOK Pro,
                  <br />
                  An exclusive wholesale membership program that gives approved
                  resellers access to discounted pricing on curated K-Beauty
                  brands and products.
                </p>

                <p className="mb-8">
                  Please read these Terms and Conditions carefully before
                  registering. By accessing or using HOK Pro, you agree to
                  comply with and be bound by these terms.
                </p>

                <section className="mb-8">
                  <h3 className="mb-3 text-xl font-semibold">
                    🧩 Wholesale Eligibility
                  </h3>
                  <p>
                    HOK Pro is designed exclusively for resellers and bulk
                    buyers.
                  </p>
                  <p>
                    To qualify, applicants must submit verifiable business
                    information during registration.
                  </p>
                  <p className="mt-3">🟤 Minimum Order Quantity (MOQ)</p>
                  <p>
                    Wholesale orders must meet a minimum purchase requirement of
                    15 products per order.
                  </p>

                  <div className="mt-4 ml-4">
                    <p className="font-semibold">HOK Pros can:</p>
                    <ul className="mt-2 ml-6 list-disc space-y-2">
                      <li>Order 15 units of a single product, or</li>
                      <li>
                        Mix and match any products across categories and brands,
                        as long as the total units = 15 or more
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="mb-8">
                  <h3 className="mb-3 text-xl font-semibold">
                    📦 Product Availability
                  </h3>
                  <p>All wholesale orders are subject to stock availability.</p>
                  <p>
                    HOK reserves the right to limit product quantities or place
                    items on backorder when demand exceeds supply.
                  </p>
                </section>

                <section className="mb-8">
                  <h3 className="mb-3 text-xl font-semibold">
                    📝 How to Place Orders
                  </h3>
                  <ol className="ml-6 list-decimal space-y-2">
                    <li>
                      Browse and select products from the Wholesale Category.
                    </li>
                    <li>
                      Add items to your cart, ensuring your order meets the
                      minimum quantity (15) and value.
                    </li>
                    <li>Proceed to checkout and select shipping or pickup.</li>
                  </ol>
                </section>

                <section className="mb-8">
                  <h3 className="mb-3 text-xl font-semibold">
                    🪙 Refund Policy
                  </h3>

                  <div className="mb-4">
                    <h4 className="mt-3 font-semibold">a. Returns & Refunds</h4>
                    <p>
                      We take pride in offering high-quality Korean beauty
                      products. If you receive defective or damaged items,
                      please notify us within 3 days of receipt.
                    </p>
                    <p>
                      We&apos;ll promptly replace the product or issue a refund,
                      subject to investigation.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="mt-3 font-semibold">
                      b. Refund Eligibility
                    </h4>
                    <ul className="mt-2 ml-6 list-disc space-y-2">
                      <li>
                        Refunds are only issued for defective or damaged items
                        reported within the 3-day window.
                      </li>
                      <li>
                        Items that are used, opened, or damaged due to misuse
                        are not eligible.
                      </li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="mt-3 font-semibold">
                      c. How to Request a Refund
                    </h4>
                    <p>Email us at homeofkoreanbeautyng@gmail.com with:</p>
                    <ul className="mt-2 ml-6 list-disc space-y-2">
                      <li>Your order number</li>
                      <li>Product details</li>
                      <li>Description and photos of the issue</li>
                    </ul>
                    <p className="mt-2">
                      Our support team will review and guide you through the
                      next steps.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="mt-3 font-semibold">d. Refund Timelines</h4>
                    <p>
                      Once your request is approved, the refund will be
                      processed within 5 business days to your original payment
                      method.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h3 className="mb-3 text-xl font-semibold">📞 Contact Us</h3>
                  <p>Questions about your wholesale account or order?</p>
                  <p>Reach out to our dedicated team at:</p>
                  <p className="mt-2">📧 homeofkoreanbeautyng@gmail.com</p>
                </section>

                <section className="mb-8">
                  <h3 className="mb-3 text-xl font-semibold">
                    📄 Policy Updates
                  </h3>
                  <p>
                    HOK reserves the right to modify these terms and conditions
                    at any time without prior notice.
                  </p>
                  <p>
                    Changes will become effective immediately upon being posted
                    to the HOK Pro portal.
                  </p>
                </section>

                <p className="mt-6">Thank you for partnering with HOK Pro.</p>
                <p>
                  We&apos;re excited to support your business with premium
                  K-Beauty products and exceptional service.
                </p>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/* Quote and Tour Section */}
      <div className="relative my-16 h-[360px] md:h-[500px] overflow-hidden rounded">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/specialist.png')" }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
          <h2 className="font-playfair mb-8 text-center text-3xl lg:text-5xl">
            Request a Quote or Book a<br />
            Warehouse Tour
          </h2>
          <div className="flex flex-col gap-4 md:flex-row">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white text-black hover:bg-white/90"
                >
                  Request a Quote
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleQuoteSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-montserrat mb-4 text-lg font-semibold">
                        Request Wholesale Quote
                      </h3>
                      <div className="mb-6 rounded-lg bg-gray-50 p-4">
                        <p className="font-montserrat mb-2 text-sm text-gray-600">
                          Download our wholesale price list to view our current
                          offerings:
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            window.open(
                              "https://docs.google.com/spreadsheets/d/1b2wmlwzqfG9l6MwqGCYjyhiWO2mQDDkZM1D54MW4hns/edit?usp=sharing",
                              "_blank",
                            );
                          }}
                        >
                          Download Price List
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="quote-email">Email</Label>
                      <Input
                        id="quote-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={quoteFormData.email}
                        onChange={(e) =>
                          setQuoteFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="order-request">Order Request</Label>
                      <textarea
                        id="order-request"
                        name="orderRequest"
                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                        placeholder="Please detail your order request here..."
                        value={quoteFormData.orderRequest}
                        onChange={(e) =>
                          setQuoteFormData((prev) => ({
                            ...prev,
                            orderRequest: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <AlertDialogFooter className="flex justify-end gap-4">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-[#73512C] hover:bg-[#73512C]/90">
                      Submit Request
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white text-black hover:bg-white/90"
                >
                  Book Warehouse Tour
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleTourSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-montserrat mb-4 text-lg font-semibold">
                        Book a Warehouse Tour
                      </h3>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tour-fullname">Full Name</Label>
                      <Input
                        id="tour-fullname"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={tourFormData.fullName}
                        onChange={(e) =>
                          setTourFormData((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tour-email">Email</Label>
                      <Input
                        id="tour-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={tourFormData.email}
                        onChange={(e) =>
                          setTourFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tour-phone">Phone Number</Label>
                      <Input
                        id="tour-phone"
                        name="phoneNumber"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={tourFormData.phoneNumber}
                        onChange={(e) =>
                          setTourFormData((prev) => ({
                            ...prev,
                            phoneNumber: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tour-date">Preferred Date</Label>
                      <Input
                        id="tour-date"
                        name="date"
                        type="date"
                        placeholder="Select a date"
                        value={date ? format(date, "yyyy-MM-dd") : ""}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          if (!isNaN(selectedDate.getTime())) {
                            setDate(selectedDate);
                          }
                        }}
                        min={format(new Date(), "yyyy-MM-dd")}
                      />
                    </div>
                  </div>
                  <AlertDialogFooter className="flex justify-end gap-4">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      type="submit"
                      className="bg-[#73512C] hover:bg-[#73512C]/90"
                    >
                      Book Tour
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
}
