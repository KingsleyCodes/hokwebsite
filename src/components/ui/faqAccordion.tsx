import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionContentList } from "@/lib/data";
import React from "react";

const FaqAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {AccordionContentList.map((faq) => (
        <AccordionItem value={faq.id} key={faq.id} className="pb-4">
          <AccordionTrigger className="
            font-montserrat text-sm md:text-base uppercase rounded-md
          ">
            {faq.title}
          </AccordionTrigger>
          <AccordionContent className="
             mt-3 md:mt-4 mb-0 md:mb-4 rounded-md bg-white px-5 py-4
            text-sm md:text-base font-montserrat
          ">
            {faq.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
