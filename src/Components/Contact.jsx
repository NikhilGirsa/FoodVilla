import React from "react";

const Contact = () => {
  return (
    <div className="font-sans p-6 max-w-xl mx-auto text-black dark:text-white">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
        Contact Us
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        We'd love to hear from you! Please fill out the form below to get in
        touch with us.
      </p>

      <form className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="mb-1">Name:</span>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1">Email:</span>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1">Message:</span>
          <textarea
            placeholder="Enter your message"
            rows="5"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
          ></textarea>
        </label>

        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
