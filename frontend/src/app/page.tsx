"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import blackArrow from "./images/black-arrow.png";
import AnimatePNG from "./pages/animatePNG";
import "./globals.css";

export default function Page() {
  const [amount, setAmount] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <div
      className="Home"
      style={{
        textAlign: "center",
        backgroundColor: "#F8F8FF",
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <header
        style={{ backgroundColor: "#70da50", padding: "20px", color: "white" }}
      >
        <h1>Welcome to 01Piggy!</h1>
      </header>

      <main
        style={{
          width: "100%",
          height: "100%",
          padding: "0px",
          textAlign: "center",
          color: "black",
        }}
      >
        <h1>Your Journey to Saving Starts Here</h1>
        <p>
          Track your savings, set goals, and manage your finances in a fun,
          kid-friendly way!
        </p>

        <div
          className="circle"
          style={{
            width: "200px",
            height: "200px",
            position: "absolute",
            left: "50%",
            top: "300px",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <p style={{ marginLeft: "30px" }}>Main Account</p>
          <p style={{ marginLeft: "30px" }}>$5,000</p>
        </div>

        <div
          style={{
            width: "200px",
            height: "200px",
            position: "absolute",
            right: "0%",
            top: "0%",
          }}
        >
          <AnimatePNG style={{ width: "200px", height: "200px" }} />
        </div>

        <div>
          <Image
            src={blackArrow}
            alt="Black Arrow"
            width={120}
            height={80}
            style={{
              position: "absolute",
              left: "50%",
              top: "460px",
              transform: "translate(-50%, -50%) rotate(90deg)",
            }}
          />
        </div>

        <div
          className="circle"
          style={{
            width: "150px",
            height: "150px",
            position: "absolute",
            left: "50%",
            top: "600px",
            transform: "translate(-50%, -50%)",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <p style={{ marginLeft: "20px" }}>Kid Account</p>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
            }}
          >
            <span
              style={{
                marginLeft: "20px",
                color: "white",
                fontSize: "18px",
              }}
            >
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={handleChange}
              placeholder="100"
              style={{
                width: "70%",
                textAlign: "left",
                fontSize: "18px",
                border: "none",
                color: "white",
                borderRadius: "5px",
                backgroundColor: "transparent",
                outline: "none",
              }}
            />
          </div>
        </div>

        <Link href="/track">
          <button
            style={{
              position: "absolute",
              top: "450px",
              left: "70%",
              padding: "10px",
              width: "300px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              transform: "translate(-50%, -50%)",
            }}
          >
            Plan & Track
          </button>
        </Link>

        <Link href="/decision" className="text-blue-500 hover:underline">
          Go to Purchase Decision Assistant
        </Link>
      </main>
    </div>
  );
}
