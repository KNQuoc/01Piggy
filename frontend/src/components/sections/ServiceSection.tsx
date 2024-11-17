import React from "react";
import ServiceCard from "../cards/ServiceCard";

export default function ServiceSection() {
  const services = [
    {
      titleTop: "AI-Powered",
      titleBottom: "Insights",
      bg: "bg-accent",
      titleBg: "bg-white",
      image: "/images/s_1.png",
      paraText: "Help parents make informed purchase approvals",
      darkArrow: true,
      link: "/",
    },

    {
      titleTop: "Encourage Financial ",
      titleBottom: "Literacy",
      bg: "bg-primary",
      titleBg: "bg-none text-white",
      paraText: "Children learn to save and spend responsibly",
      image: "/images/s_2.png",
      darkArrow: false,
      link: "/",
    },

    {
      titleTop: "Simple and",
      titleBottom: "Secure",
      bg: "bg-primary",
      titleBg: "bg-none text-white",
      paraText: "Easy-to-use interface with robust security for families",
      image: "/images/s_3.png",
      darkArrow: false,
      link: "/",
    },

    {
      titleTop: "Real-Time",
      titleBottom: "Notifications",
      bg: "bg-accent",
      titleBg: "bg-white",
      paraText: "Stay informed about your child's activity",
      image: "/images/s_4.png",
      darkArrow: true,
      link: "/",
    },
  ];
  return (
    <section className="">
      <div className="flex flex-col md:flex-row gap-8 md:gap-[40px] items-center ">
        <div className="px-2 text-green-500 inline-block font-medium text-h2 rounded-md">
          Why Choose Us?
        </div>
        <p className="text-p">
          We provide a full-service solution to teach your kids budgeting,
          saving, and investing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] mt-[80px]">
        {services.map((service, index) => (
          <ServiceCard {...service} key={index} />
        ))}
      </div>
    </section>
  );
}
