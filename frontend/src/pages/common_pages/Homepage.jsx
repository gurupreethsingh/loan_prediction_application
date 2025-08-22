import React from "react";
import {
  FaMoneyCheckAlt,
  FaChartLine,
  FaRobot,
  FaShieldAlt,
  FaUniversity,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8 md:py-12">
      {/* HERO */}
      <section className="rounded-2xl bg-white p-6 md:p-10 text-center">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">
          AI-Powered Loan Prediction & SIP Assistant
        </h1>
        <p className="mt-3 text-gray-700 text-base md:text-lg max-w-3xl mx-auto">
          Welcome to our{" "}
          <span className="font-semibold">AI-driven financial assistant</span> —
          a smart application designed to simplify{" "}
          <span className="font-semibold">loan management</span>, automate{" "}
          <span className="font-semibold">
            SIP (Systematic Investment Plan) tracking
          </span>
          , and provide personalized{" "}
          <span className="font-semibold">AI recommendations</span>.
        </p>

        {/* Subtle badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100">
            <FaUniversity className="text-blue-500" /> PES College (CSE)
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-100">
            <FaShieldAlt className="text-green-500" /> Privacy-Focused
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium border border-purple-100">
            <FaRobot className="text-purple-500" /> AI Assistant
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm md:text-base hover:bg-blue-700 transition shadow-sm"
          >
            Get Started <FaArrowRight />
          </Link>
          <Link
            to="/about-us"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-gray-800 text-sm md:text-base border border-gray-200 hover:bg-gray-50 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 rounded-xl bg-blue-50 border border-blue-100 hover:shadow-md transition">
          <div className="flex items-center justify-center mb-3">
            <FaMoneyCheckAlt className="text-blue-600 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Loan Analysis
          </h3>
          <p className="text-sm text-gray-700">
            AI-based eligibility scoring, EMI optimization, and repayment
            insights to keep you financially healthy.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-green-50 border border-green-100 hover:shadow-md transition">
          <div className="flex items-center justify-center mb-3">
            <FaChartLine className="text-green-600 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            SIP Management
          </h3>
          <p className="text-sm text-gray-700">
            Track contributions, simulate future growth, and plan goals with
            data-driven projections and scenarios.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-purple-50 border border-purple-100 hover:shadow-md transition">
          <div className="flex items-center justify-center mb-3">
            <FaRobot className="text-purple-600 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            AI Assistant
          </h3>
          <p className="text-sm text-gray-700">
            Ask questions, get personalized suggestions, and receive clear
            explanations—instantly.
          </p>
        </div>
      </section>

      {/* QUICK STATS / TRUST STRIP (optional, subtle) */}
      <section className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <p className="text-2xl md:text-3xl font-extrabold text-gray-900">
            95%
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            Prediction Confidence*
          </p>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <p className="text-2xl md:text-3xl font-extrabold text-gray-900">
            ₹ SIP
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            Scenario Simulations
          </p>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <p className="text-2xl md:text-3xl font-extrabold text-gray-900">
            24×7
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            Assistant Availability
          </p>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <p className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Secure
          </p>
          <p className="text-xs md:text-sm text-gray-600">Privacy First</p>
        </div>
      </section>

      {/* CREDIT */}
      <section className="mt-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Final Year Project by Nihal
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          Department of Computer Science • PES College
        </p>
      </section>
    </div>
  );
};

export default Homepage;
