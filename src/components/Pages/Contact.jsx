import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-Roboto w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg bg-primbtncolor-0">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-primbtnhover-0 hover:bg-primbtncolor-0 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
