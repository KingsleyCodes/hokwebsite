import { Button } from "@/components/ui/button";
import FaqAccordion from "@/components/ui/faqAccordion";
import { Input } from "@/components/ui/input";
import Newsletter from "@/components/ui/landingPage/Newsletter";
import { Textarea } from "@/components/ui/textarea";
import { Asterisk } from "lucide-react";
import React from "react";

const Contact = () => {
  return (
    <div className="px-6 lg:px-0">
      <div className="container mx-auto mt-22">
        <h2 className="font-playfair text-center text-6xl">Contact</h2>
      </div>

      <section className="relative container mx-auto mt-16 md:mt-36 lg:px-[119px]">
        <h2 className="font-playfair text-4xl md:text-6xl">Have a question or comment?</h2>
        <p className="font-montserrat mt-2 md:text-lg">
          Use the form below to send us a message or contact us by mail
        </p>

        <form action="" className="font-montserrat mt-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            <div className="flex flex-col gap-2">
              <label htmlFor="">First name</label>
              <Input
                type="text"
                placeholder="John"
                className="border-stone-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Last name</label>
              <Input
                type="text"
                placeholder="Doe"
                className="border-stone-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="flex">
                Email Address <Asterisk className="size-4 text-[#FB0D0D]" />
              </label>
              <Input
                type="email"
                placeholder="0909999999"
                className="border-stone-400"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="flex">
              Comment <Asterisk className="size-4 text-[#FB0D0D]" />
            </label>
            <Textarea
              placeholder="What is your request"
              className="h-40 border-stone-400"
              required
            />
          </div>

          <Button
            size="lg"
            className="font-montserrat mt-5 bg-[#2D1801] text-white uppercase"
          >
            Submit
          </Button>
        </form>
      </section>

      <section className="font-montserrat container mx-auto mt-16 lg:mt-36 space-y-5 lg:space-y-10 lg:px-[119px]">
        <h3 className="text-4xl font-medium text-black">Get in Touch!</h3>
        <div className="grid grid-cols-1 gap-3 text-black/70 lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col gap-y-4">
            <span className="md:text-lg font-medium">Call: +234 9164036455</span>
            <span className="md:text-lg font-medium">
              Mail: homeofkoreanbeautyng@gmail.com
            </span>
          </div>
          <div>
            <p className="font-medium md:text-lg">
              Address: SHOP 043 GRACE OF GOD PLAZA, OPPOSITE KADUNA PLAZA,
              BALOGUN MARKET, OFF LAGOS BADAGRY EXPRESS WAY, TRADE FAIR
              COMPLEX, LAGOS STATE.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-[119px]">
        <div className="col-span-1">
          <h2 className="font-playfair text-6xl lg:text-[82px] text-[#201E1C]">FAQ</h2>
          <span className="font-inter md:text-lg text-black/70">
            We’ve got answers!
          </span>
        </div>
        <div className="col-span-2">
          <FaqAccordion />
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Contact;
