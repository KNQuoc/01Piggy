import { cn } from "@/lib/utils";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface IProps {
  label: string;
  title: string;
  description: string;
  currentValue: string;
}

function WorkingProcessCard({
  label,
  title,
  description,
  currentValue,
}: IProps) {
  return (
    <div
      className={cn(
        currentValue === `item-${label}` ? "bg-primary" : "bg-accent",
        "rounded-[45px] p-8 md:p-[50px] border-b-[6px] border-b-black mb-[30px]"
      )}
    >
      <AccordionItem value={`item-${label}`}>
        <AccordionTrigger className="hover:no-underline">
          {" "}
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "text-h3 md:text-h1 font-bold",
                currentValue === `item-${label}` && "text-green-500"
              )}
            >
              {label}
            </span>{" "}
            <span
              className={cn(
                "text-p md:text-h3 font-bold",
                currentValue === `item-${label}` && "text-blue-400"
              )}
            >
              {title}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-p text-white">
          {description}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}

export default WorkingProcessCard;
