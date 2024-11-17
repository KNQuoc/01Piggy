import React from "react";
import MainButton from "../common/MainButton";

function LetMakeThingsHappenSection() {
  return (
    <section className="bg-accent rounded-[45px] p-[50px] md:p-[60px] relative">
      <div className="md:pr-[22rem]">
        <p className="text-h3Mobile md:text-h3 font-medium">
          Let&apos;s make things happen
        </p>

        <p className="my-[26px]">
          Try us out today to see how you can manage your child's wallet
        </p>

        <MainButton
          text="Get your free proposal"
          classes="bg-primary text-white text-[18px] w-full md:w-[231px] hover:text-green-400"
        />
      </div>
      <div className="absolute -top-8 right-8 hidden md:block">
        <img
          src="/images/proposal_illustration.png"
          alt="proposal illustration"
        />
      </div>
    </section>
  );
}

export default LetMakeThingsHappenSection;
