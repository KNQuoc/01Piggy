import React from "react";
import MainButton from "../common/MainButton";

function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row justify-between w-full">
      <div className="md:w-[50%]">
        <p className="text-h1Mobile md:text-h1 text-black font-bold leading-tight">
          The Future <br /> of Financial Literacy <br />
          for Kids!
        </p>
        <div className="block  md:hidden my-[35px]">
          <img
            src="/images/microphone_illustration.png"
            alt="microphone illustration"
          />
        </div>

        <p className="text-p text-black my-[35px]">
          Empower your children to save,spend and learn responsibly with our fun
          and interactive financial literacy program.
        </p>

        <MainButton
          text="Get Started"
          classes="bg-primary text-white text-[18px] w-full md:w-[231px] hover:text-green-500"
        />
      </div>
      <div className="hidden md:block">
        <img
          src="/images/microphone_illustration.png"
          alt="microphone illustration"
        />
      </div>
    </section>
  );
}

export default HeroSection;
