import { useState } from "react";
import React from "react";

const Signup = () => {
  const [inputMessage, setInputMessage] = useState({
    email: "",
    name: "",
    password: "",
    address: "",
  });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDisabled, setDisabled] = useState(true);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    validSignup();

    if (!isDisabled) {
      alert("Signup successful!"); // Simulating signup success
    }
  };

  const validSignup = () => {
    const isValid =
      inputMessage.email.length >= 5 &&
      inputMessage.name.length >= 5 &&
      inputMessage.password.length >= 5 &&
      inputMessage.address.length >= 5;
    setDisabled(!isValid);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F3F3] text-white p-4">
      <header className="sticky top-0 text-2xl font-bold bg-gradient-to-r from-[#FFAE75] to-[white] bg-clip-text text-transparent mb-6">
        BearChat
      </header>

      <h1 className="text-xl font-bold mb-4 text-black" >Sign Up for an Account</h1>

      <form onSubmit={handleSignup} className="bg-[white] p-6 rounded-lg shadow-md w-full max-w-md border border-[#000000]">
        <div className="flex flex-col gap-4">
          <input
            type="email"
            value={inputMessage.email}
            required
            placeholder="Enter your email"
            className="bg-[#white] border border-[#FFAE75] p-3 rounded-md text-black"
            onChange={(e) => {
              setInputMessage((prev) => ({ ...prev, email: e.target.value }));
              validSignup();
            }}
          />

          {/* <input
            type="text"
            value={inputMessage.name}
            required
            placeholder="Enter your name"
            className="bg-[#FFAE75] border border-[#FFAE75] p-3 rounded-md text-white"
            onChange={(e) => {
              setInputMessage((prev) => ({ ...prev, name: e.target.value }));
              validSignup();
            }}
          /> */}

          <input
            type="password"
            value={inputMessage.password}
            required
            placeholder="Enter your password"
            className="bg-[#white] border border-[#FFAE75] p-3 rounded-md text-[#000000]"
            onChange={(e) => {
              setInputMessage((prev) => ({ ...prev, password: e.target.value }));
              validSignup();
            }}
          />

          {/* <input
            type="text"
            value={inputMessage.address}
            required
            placeholder="Enter your address"
            className="bg-[#FFAE75] border border-[#FFAE75] p-3 rounded-md text-white"
            onChange={(e) => {
              setInputMessage((prev) => ({ ...prev, address: e.target.value }));
              setIsDropdownVisible(e.target.value.length > 0);
              validSignup();
            }}
            onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)}
            onFocus={() =>
              inputMessage.address.length > 0 && setIsDropdownVisible(true)
            }
          /> */}

          {isDropdownVisible && (
            <ul className="relative bg-[white] border border-[#FFAE75] rounded-md mt-1 w-full shadow-md z-10">
              <li className="p-2 cursor-pointer hover:[#FFAE75]">Suggestion</li>
            </ul>
          )}

<a href="/"><button
            type="submit"
            disabled={true}
            className={`w-full p-3 rounded-md font-bold text-white transition duration-300 ${
              isDisabled ? "bg-[#FFAE75] opacity-50 cursor-not-allowed" : "bg-[#FFAE75] hover:bg-white"
            }`}
          >
          Signup
          
          </button>
          </a>
        </div>
      </form>

      <a href="/login" className="mt-4 text-[#FFAE75] hover:underline">
        Already have an account? Login here
      </a>
    </div>
  );
};

export default Signup;
