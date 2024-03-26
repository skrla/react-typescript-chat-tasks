import React from 'react'

const LoginPage = () => {
    return (
      <div className="bg-blue-600 h-[100vh] flex items-center justify-center p-10">
        <div className="w-full md:w-[450px]">
          <h1 className="text-white text-center text-bold text-4xl md:text-6xl mb-10">Login</h1>
          <div className="flex flex-col bg-white p-6 min-h-[150px] gap-3 w-full rounded-xl drop-shadow-xl">
            <input
              type="text"
              placeholder="Enter name"
              className="flex-1 placeholder-gray-300 bg-transparent border-2 border-gray-300 rounded-full px-3 py-1"
            />
            <input
              type="text"
              placeholder="Enter name"
              className="flex-1 placeholder-gray-300 bg-transparent border-2 border-gray-300 rounded-full px-3 py-1"
            />
            <input
              type="text"
              placeholder="Enter name"
              className="flex-1 placeholder-gray-300 bg-transparent border-2 border-gray-300 rounded-full px-3 py-1"
            />
          </div>
        </div>
      </div>
    );
}

export default LoginPage;