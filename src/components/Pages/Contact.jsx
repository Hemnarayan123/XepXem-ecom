import React from 'react';

function Contact() {
  return (
    <div className="flex items-center justify-center min-h-screen rgb(25, 22, 22) p-4 sm:p-6 lg:p-8 font-Roboto">
     
        <div className="bg-gray-600 p-6 sm:p-8 lg:p-10 rounded shadow-lg shadow-gray-400/50 w-[500px] max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">Contact Us</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-200 font-medium mb-2">
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
              <label htmlFor="email" className="block text-gray-200 font-medium mb-2">
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
              <label htmlFor="message" className="block text-gray-200 font-medium mb-2">
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
  );
}

export default Contact;
