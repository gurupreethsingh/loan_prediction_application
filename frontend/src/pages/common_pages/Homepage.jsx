import React from "react";

const Homepage = () => {
  return (
    <div className="max-w-7xl mx-auto w-full p-5 mb-5">
      <section className="min-h-[60vh] flex flex-col justify-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center">
          AI-Powered Loan Prediction & SIP Assistant
        </h1>
        <p className="text-center mt-3 text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
          Welcome to our{" "}
          <span className="font-semibold">AI-driven financial assistant</span> –
          a smart application designed to simplify{" "}
          <span className="font-semibold">loan management</span>, automate{" "}
          <span className="font-semibold">
            SIP (Systematic Investment Plan) tracking
          </span>
          , and provide personalized{" "}
          <span className="font-semibold">AI recommendations</span>.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Loan Analysis
            </h3>
            <p className="text-sm text-gray-600">
              Get AI-based predictions on loan eligibility, repayment
              strategies, and financial health tracking.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              SIP Management
            </h3>
            <p className="text-sm text-gray-600">
              Track your SIP investments, visualize future growth, and plan
              financial goals with data-driven insights.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow hover:shadow-lg transition bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              AI Assistant
            </h3>
            <p className="text-sm text-gray-600">
              An intelligent chatbot that answers queries, suggests investment
              options, and guides financial planning in real-time.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Final Year Project by Nihal
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-2">
            Department of Computer Science • PES College
          </p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
