"use client";
import { useState } from "react";
import Head from "next/head";
import Script from "next/script";

const Page = () => {
  const [requestsInProgress, setRequestsInProgress] = useState(false);
  const [forMessage, setForMessage] = useState("Generating advice...");
  const [againstMessage, setAgainstMessage] = useState("Generating advice...");
  const [showDecisionSection, setShowDecisionSection] = useState(false);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  const startDecisionProcess = async () => {
    if (requestsInProgress) return;
    setRequestsInProgress(true);

    const startButton = document.getElementById(
      "start-button"
    ) as HTMLButtonElement;
    if (startButton) {
      startButton.disabled = true;
      startButton.classList.add("opacity-50");
    }

    try {
      const [forResponse, againstResponse] = await Promise.allSettled([
        fetch(`${BACKEND_URL}/decision/for`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: "Should I make this purchase?" }), // Backend expects `content`
        }).then(async (res) => {
          if (!res.ok) throw new Error("Failed to fetch for-response");
          return res.json();
        }),
        fetch(`${BACKEND_URL}/decision/against`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: "Should I reconsider this purchase?",
          }), // Backend expects `content`
        }).then(async (res) => {
          if (!res.ok) throw new Error("Failed to fetch against-response");
          return res.json();
        }),
      ]);

      // Process the "for" response
      if (forResponse.status === "fulfilled" && forResponse.value?.message) {
        setForMessage(
          forResponse.value.message.replace(/\n/g, "<br>") ||
            "Unable to generate advice. Please try again."
        );
      } else if (forResponse.status === "rejected") {
        setForMessage("Error generating advice. Please try again.");
        console.error("For response error:", forResponse.reason);
      }

      // Process the "against" response
      if (
        againstResponse.status === "fulfilled" &&
        againstResponse.value?.message
      ) {
        setAgainstMessage(
          againstResponse.value.message.replace(/\n/g, "<br>") ||
            "Unable to generate advice. Please try again."
        );
      } else if (againstResponse.status === "rejected") {
        setAgainstMessage("Error generating advice. Please try again.");
        console.error("Against response error:", againstResponse.reason);
      }

      // Show decision section if any response was successful
      if (
        (forResponse.status === "fulfilled" && forResponse.value?.message) ||
        (againstResponse.status === "fulfilled" &&
          againstResponse.value?.message)
      ) {
        setShowDecisionSection(true);
      }
    } catch (error) {
      setForMessage("Error generating advice. Please try again.");
      setAgainstMessage("Error generating advice. Please try again.");
      console.error("Error during the decision process:", error);
    } finally {
      setRequestsInProgress(false);
      if (startButton) {
        startButton.disabled = false;
        startButton.classList.remove("opacity-50");
      }
    }
  };

  const makeDecision = (decision: string) => {
    console.log(`Decision made: ${decision}`);
    alert(
      `You decided to ${decision === "yes" ? "make" : "skip"} the purchase!`
    );
  };

  return (
    <>
      <Head>
        <title>Purchase Decision Assistant</title>
      </Head>
      <Script src="https://cdn.tailwindcss.com" strategy="afterInteractive" />
      <div className="container mx-auto p-4 max-w-6xl">
        <div id="initial-section" className="text-center py-10">
          <button
            onClick={startDecisionProcess}
            id="start-button"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold transition-colors">
            Should I Purchase?
          </button>
        </div>

        <div id="advice-section" className={requestsInProgress ? "hidden" : ""}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-red-800">
                Reasons to Reconsider
              </h2>
              <div
                id="against-message"
                className="text-gray-800 min-h-[200px]"
                dangerouslySetInnerHTML={{ __html: againstMessage }}></div>
            </div>

            <div className="bg-green-50 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-green-800">
                Reasons to Purchase
              </h2>
              <div
                id="for-message"
                className="text-gray-800 min-h-[200px]"
                dangerouslySetInnerHTML={{ __html: forMessage }}></div>
            </div>
          </div>

          <div
            id="decision-section"
            className={`mt-8 text-center flex space-x-4 ${
              showDecisionSection ? "" : "hidden"
            }`}>
            <button
              onClick={() => makeDecision("no")}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors">
              Don't Buy
            </button>
            <button
              onClick={() => makeDecision("yes")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors">
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
