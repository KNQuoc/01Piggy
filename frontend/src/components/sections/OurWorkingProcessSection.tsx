"use client";

import React, { useState } from "react";
import WorkingProcessCard from "../cards/WorkingProcessCard";
import { Accordion } from "../ui/accordion";

function OurWorkingProcessSection() {
  const processes = [
    {
      label: "01",
      title: "Parent Creates an Account",
      description:
        "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
    },
    {
      label: "02",
      title: "Add Child Accounts",
      description:
        "02 - During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
    },
    {
      label: "03",
      title: "Children Request Purchases ",
      description:
        "03 - During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
    },
    {
      label: "04",
      title: "Parents Approve Requests",
      description:
        "04 - During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
    },
  ];

  const [value, setValue] = useState("");

  const handleAccordionChange = (value: string) => {
    setValue(value);
  };
  return (
    <section className="">
      <div className="flex flex-col md:flex-row gap-8 md:gap-[40px] items-center ">
        <div className="px-2 text-blue-600  first-line:inline-block font-medium text-h2 rounded-md">
          How it Works
        </div>
        <p className="text-p">How we work with you to achieve your goals</p>
      </div>

      <div className="mt-[80px]">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          onValueChange={handleAccordionChange}
        >
          {processes.map((process, index) => (
            <WorkingProcessCard {...process} currentValue={value} key={index} />
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default OurWorkingProcessSection;
