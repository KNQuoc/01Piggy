"use client";
import React from "react";
import Link from "next/link";
import { Chart } from "react-google-charts";
import AnimatePNG from "../pages/animatePNG";

export default function Page() {
  const spending = [
    ["Category", "Dollars"],
    ["Roblox", 50],
    ["Amazon", 10],
    ["Mcdonalds", 10],
    ["Google Play Store", 25],
  ];

  const balance = [
    ["Day", "Dollars"],
    [1, 0],
    [2, 100],
    [6, 50],
    [12, 40],
    [19, 30],
    [22, 5],
    [30, 5],
  ];

  const optionpie = {
    title: "Your Spending Breakdown",
    pieHole: 0.4,
    pieStartAngle: 100,
    sliceVisibilityThreshold: 0.005,
    pieSliceText: "percentage",
    pieSliceTextStyle: {
      fontSize: 9,
      color: "white",
    },
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
    },
    colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
    backgroundColor: "transparent",
    tooltip: {
      trigger: "none",
    },
  };

  const optionline = {
    title: "Line Chart Example",
    hAxis: { title: "Day" },
    vAxis: { title: "Balance" },
    legend: "none",
    backgroundColor: "transparent",
  };

  return (
    <div
      className="Track"
      style={{
        backgroundColor: "#F8F8FF",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          textAlign: "center",
          backgroundColor: "#70da50",
          padding: "5px",
          color: "white",
        }}
      >
        <h1>Track that Piggy</h1>
      </header>

      <main
        style={{
          width: "100%",
          height: "100%",
          padding: "0px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "200px",
            position: "absolute",
            right: "0%",
            top: "0%",
          }}
        >
          <AnimatePNG />
        </div>

        <div
          style={{
            position: "absolute",
            left: "5%",
            top: "250px",
            width: "700px",
          }}
        >
          <Chart
            chartType="PieChart"
            data={spending}
            options={optionpie}
            width={"100%"}
            height={"400px"}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "250px",
            width: "700px",
          }}
        >
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={balance}
            options={optionline}
          />
        </div>

        <Link href="/" passHref>
          <button
            style={{
              position: "absolute",
              top: "150px",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "10px",
              width: "300px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Home
          </button>
        </Link>
      </main>
    </div>
  );
}
