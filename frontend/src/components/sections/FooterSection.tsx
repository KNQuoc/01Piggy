import React from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import MainButton from "../common/MainButton";

function FooterSection() {
  const links = ["About us", "Services", "Team", "Pricing", "Blog"];
  const socials = [
    "/images/linkedin_icon.png",
    "/images/facebook_icon.png",
    "/images/twitter_icon.png",
  ];
  return (
    <section className="bg-white outline-double outline-4  rounded-t-[45px] p-8 md:p-[60px]">
      <div className="flex flex-col gap-8 md:flex-row justify-between">
        <div>
          <img src="/images/company-logo.svg" alt="footer logo" />
        </div>
        <div className="flex flex-col md:flex-row gap-[40px]">
          {links?.map((link, index) => (
            <p key={index} className="text-black underline text-p">
              {link}
            </p>
          ))}
        </div>
        <div className="flex gap-[20px]">
          {socials.map((social, index) => (
            <div key={index}>
              <img src={social} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[66px] flex flex-col md:flex-row gap-8 justify-between">
        <div>
          <div className="px-4 py-2 bg-primary text-white inline-block font-medium text-[20px] rounded-md">
            Contact Us:
          </div>

          <p className="text-black mt-[27px]">Email: info@01piggy.com</p>
          <p className="text-black mt-[27px]">Phone: 555-567-8901</p>
          <p className="text-black mt-[27px]">
            Address: 800 W Campbell Rd, Richardson TX 75080
          </p>
        </div>
        <div className="bg-[#ffffff] flex flex-col md:flex-row gap-4 justify-center items-center md:gap-[20px] py-16 px-[40px] border-solid border-2 border-gray-800 rounded-[14px]">
          <Input
            placeholder="Email"
            className="h-[58px] rounded-[14px] text-white"
          />
          <MainButton
            text="Subscribe to news "
            classes="bg-primary w-full text-green-500"
          />
        </div>
      </div>
      <div className="my-[25px]">
        <Separator />
      </div>
      <div className="flex flex-col md:flex-row gap-1 md:gap-[40px]">
        <p className="text-white text-p">
          © 2023 Positivus. All Rights Reserved.
        </p>
        <p className="text-white underline text-p">Privacy Policy</p>
      </div>
    </section>
  );
}

export default FooterSection;
