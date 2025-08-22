import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-10">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center">
        Privacy Policy
      </h1>
      <hr className="mt-3 mb-6 border-gray-300 w-24 mx-auto" />

      <div className="prose max-w-3xl mx-auto text-gray-700">
        <p>
          This project is the intellectual property of{" "}
          <span className="font-semibold">
            PES College of Electronic City, Bangalore
          </span>
          . It has been developed exclusively as part of a{" "}
          <span className="font-semibold">Final Year Project</span> by the
          student team.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Ownership
        </h2>
        <p>
          All rights related to the design, implementation, source code, and
          documentation belong to PES College and the student developer(s).
          Unauthorized use, reproduction, or distribution of any part of this
          project is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Restrictions
        </h2>
        <ul className="list-disc list-inside">
          <li>
            No individual or organization is permitted to copy, modify, or reuse
            the project without prior written consent.
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

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Purpose
        </h2>
        <p>
          This project has been created solely for academic evaluation and
          demonstration of skills in{" "}
          <span className="font-semibold">
            Machine Learning, Artificial Intelligence, and Data Science
          </span>
          . It must not be duplicated or presented as original work by others.
        </p>

        <p className="mt-6 text-gray-600 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="mt-8 text-center">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
