import RegisterForm from "@/components/forms/RegisterForm";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-24 lg:pt-0">
      <div className="h-full lg:flex flex-col justify-center items-center px-4">
        <RegisterForm />
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image
          src={"/images/company-logo.svg"}
          height={200}
          width={200}
          alt="Logo"
        />
      </div>
    </div>
  );
}
