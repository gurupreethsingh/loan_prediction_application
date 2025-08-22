import React from "react";
import nihal from "../../assets/nihal.jpg";
import {
  FaUniversity,
  FaRobot,
  FaChartLine,
  FaBullseye,
  FaRocket,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto w-full p-5 md:p-8 mb-10">
      {/* Page Header */}
      <section className="text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
          About Me
        </h1>
        <hr className="mt-3 mb-6 border-gray-300 w-24 mx-auto" />
        <p className="text-gray-600 text-sm md:text-base flex items-center justify-center gap-2">
          <FaMapMarkerAlt className="inline-block text-gray-500" />
          Electronic City, Bangalore • PES College of Engineering
        </p>
      </section>

      {/* Intro + Avatar */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Intro Text */}
        <div className="intro order-2 md:order-1">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs md:text-sm font-medium">
              <FaUniversity className="text-gray-500" /> PES College
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs md:text-sm font-medium">
              <FaRobot className="text-blue-500" /> Machine Learning & AI
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs md:text-sm font-medium">
              <FaChartLine className="text-green-500" /> Data Science
            </span>
          </div>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            I am <span className="font-semibold text-gray-800">Nihal</span>, a
            final-year student at{" "}
            <span className="font-semibold text-gray-800">
              PES College of Electronic City, Bangalore
            </span>
            , pursuing{" "}
            <span className="font-semibold text-gray-800">
              Machine Learning, Artificial Intelligence, and Data Science
            </span>
            . My academic journey focuses on building intelligent systems,
            predictive models, and AI-powered applications that solve real-world
            problems—particularly in finance, with{" "}
            <span className="font-semibold text-blue-600">loan analytics</span>{" "}
            and{" "}
            <span className="font-semibold text-green-600">
              SIP forecasting
            </span>
            .
          </p>

          {/* Social */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="mailto:your.email@example.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm hover:bg-blue-100 border border-blue-200"
            >
              <FaEnvelope /> Email
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-blue-700 text-sm hover:bg-gray-100 border border-gray-200"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-800 text-sm hover:bg-gray-100 border border-gray-200"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </div>

        {/* Avatar */}
        <div className="avatar_section order-1 md:order-2 flex justify-center">
          <img
            src={nihal}
            alt="Nihal portrait"
            className="w-full max-w-xs md:max-w-sm aspect-square object-cover rounded-2xl shadow-md border border-gray-200"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaBullseye className="text-blue-500" /> Mission
          </h3>
          <p className="text-gray-600 leading-relaxed">
            To leverage AI & Data Science for innovative, reliable, and ethical
            solutions across finance, healthcare, and education. My mission is
            to bridge academic learning with impactful applications.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaRocket className="text-green-500" /> Vision
          </h3>
          <p className="text-gray-600 leading-relaxed">
            To design AI-powered assistants and intelligent tools that empower
            people to make smarter decisions—with a focus on transparency,
            usability, and ethical AI practices.
          </p>
        </div>
      </section>

      {/* Highlight Cards */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-blue-50 border border-blue-100 shadow-sm hover:shadow-md transition">
          <h4 className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <FaRobot className="text-blue-500" /> AI Loan Insights
          </h4>
          <p className="text-gray-600 text-sm">
            Eligibility scoring, EMI optimization, and repayment strategies with
            explainable model outputs.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-green-50 border border-green-100 shadow-sm hover:shadow-md transition">
          <h4 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
            <FaChartLine className="text-green-500" /> SIP Growth Forecasting
          </h4>
          <p className="text-gray-600 text-sm">
            Scenario simulations, long-term projections, and goal-based planning
            with AI-driven insights.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-purple-50 border border-purple-100 shadow-sm hover:shadow-md transition">
          <h4 className="text-lg font-semibold text-purple-700 mb-2 flex items-center gap-2">
            <FaRobot className="text-purple-500" /> Conversational Assistant
          </h4>
          <p className="text-gray-600 text-sm">
            A friendly AI chatbot that answers queries, explains predictions,
            and guides financial planning in real-time.
          </p>
        </div>
      </section>

      {/* Areas of Focus */}
      <section className="mt-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Areas of Focus
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
            Machine Learning
          </span>
          <span className="px-4 py-2 bg-blue-50 rounded-full text-sm font-medium text-blue-700">
            Artificial Intelligence
          </span>
          <span className="px-4 py-2 bg-green-50 rounded-full text-sm font-medium text-green-700">
            Data Science
          </span>
          <span className="px-4 py-2 bg-purple-50 rounded-full text-sm font-medium text-purple-700">
            Deep Learning
          </span>
          <span className="px-4 py-2 bg-yellow-50 rounded-full text-sm font-medium text-yellow-700">
            NLP
          </span>
          <span className="px-4 py-2 bg-emerald-50 rounded-full text-sm font-medium text-emerald-700">
            Financial AI
          </span>
        </div>
      </section>

      {/* Closing */}
      <p className="text-gray-600 text-center mt-12 max-w-2xl mx-auto">
        This project represents my passion for{" "}
        <span className="font-semibold text-blue-600">
          Artificial Intelligence
        </span>{" "}
        and <span className="font-semibold text-green-600">Data Science</span>,
        combining research with real-world problem solving—built as my{" "}
        <span className="font-semibold text-gray-800">Final Year Project</span>
        at PES College, Bangalore.
      </p>
    </div>
  );
};

export default AboutUs;
