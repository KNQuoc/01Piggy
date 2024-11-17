import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 ">
      <div className="h-full lg:flex flex-col justify-center items-center px-4">
        <div className="text-center space-y-4 pt-4">
          <h1 className="text-[#2e2a47] font-bold text-3xl">Welcome Back!</h1>
          <p className="text-base text-[#7e8ca0]">
            Log In or Create an account to get back to your dashboard
          </p>
        </div>

        <div className="flex items-center justify-center mt-8 ">
          <Loader2 className="animate-spin text-muted-foreground" />
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image
          src={"images/company-logo.svg"}
          height={200}
          width={200}
          alt="Logo"
        />
      </div>
    </div>
  );
}