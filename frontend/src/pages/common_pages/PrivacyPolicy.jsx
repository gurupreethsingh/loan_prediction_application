import React from "react";
import { Link } from "react-router-dom";
import {
  FaLock,
  FaUniversity,
  FaBan,
  FaClipboardList,
  FaArrowLeft,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-10">
      {/* Header */}
      <div className="text-center">
        <FaLock className="text-4xl text-gray-700 mx-auto mb-3" />
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          Protecting the integrity of this project is our top priority.
        </p>
        <hr className="mt-4 mb-8 border-gray-300 w-24 mx-auto" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto space-y-8 text-gray-700">
        {/* Intro */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
          <p>
            This project is the intellectual property of{" "}
            <span className="font-semibold">
              PES College of Electronic City, Bangalore
            </span>
            . It has been developed exclusively as part of a{" "}
            <span className="font-semibold">Final Year Project</span> by the
            student team.
          </p>
        </div>

        {/* Ownership */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <FaUniversity className="text-blue-600" /> Ownership
          </h2>
          <p>
            All rights related to the design, implementation, source code, and
            documentation belong to PES College and the student developer(s).
            Unauthorized use, reproduction, or distribution of any part of this
            project is strictly prohibited.
          </p>
        </div>

        {/* Restrictions */}
        <div className="bg-red-50 p-6 rounded-xl border border-red-200 shadow-sm">
          <h2 className="text-xl font-semibold text-red-800 mb-3 flex items-center gap-2">
            <FaBan className="text-red-600" /> Restrictions
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              No individual or organization is permitted to copy, modify, or
              reuse the project without prior written consent.
            </li>
            <li>
              The project may not be used for commercial or academic submissions
              outside PES College.
            </li>
            <li>
              Any violation of this policy will be considered an infringement of
              intellectual property rights.
            </li>
          </ul>
        </div>

        {/* Purpose */}
        <div className="bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm">
          <h2 className="text-xl font-semibold text-green-800 mb-3 flex items-center gap-2">
            <FaClipboardList className="text-green-600" /> Purpose
          </h2>
          <p>
            This project has been created solely for academic evaluation and
            demonstration of skills in{" "}
            <span className="font-semibold">
              Machine Learning, Artificial Intelligence, and Data Science
            </span>
            . It must not be duplicated or presented as original work by others.
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-gray-500 text-sm text-center mt-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Back to Homepage */}
      <div className="mt-10 text-center">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white text-sm md:text-base font-medium hover:bg-gray-800 transition"
        >
          <FaArrowLeft /> Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
