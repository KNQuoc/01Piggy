import { cn } from "@/lib/utils";
import Link from "next/link";

interface IProps {
  titleTop: string;
  titleBottom: string;
  bg: string;
  titleBg: string;
  image: string;
  darkArrow?: boolean;
  paraText: string;
  link?: string;
}

function ServiceCard({
  titleTop,
  titleBottom,
  bg,
  titleBg,
  paraText,
  darkArrow = true,
  link = "/",
}: IProps) {
  return (
    <div
      className={cn(
        bg,
        "rounded-[45px] p-8 md:p-[50px] border-b-[6px] border-b-black"
      )}
    >
      <div className="flex justify-between gap-4">
        <div className="block">
          <div
            className={cn(
              "text-h3Mobile md:text-h3 rounded-[7px] px-1",
              titleBg
            )}
          >
            {titleTop}
          </div>
          <div
            className={cn(
              "text-h3Mobile md:text-h3 rounded-[7px] inline-block px-1",
              titleBg
            )}
          >
            {titleBottom}{" "}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "mt-4 text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed tracking-wide font-medium max-w-2xl mx-auto",
          !darkArrow && "text-green-200"
        )}
      >
        {paraText}
      </div>

      <div></div>
    </div>
  );
}

export default ServiceCard;
