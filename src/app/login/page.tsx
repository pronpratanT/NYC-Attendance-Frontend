"use client";

import Image from "next/image";
import router from "next/router";
import { useState } from "react";

// icons
import { VscEye, VscEyeClosed } from "react-icons/vsc";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter username or password.");
      return;
    }

    const payload = {
      employee_id: username,
      password: password,
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({payload}),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      }
      setSuccess("Login successful!");
      setTimeout(() => {setSuccess("");}, 3000);
      router.push("/dashboard-hr/export"); // Redirect to dashboard after successful login
    } catch (error) {
      setError("Cannot connect to server. Please try again later.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-6 sm:py-10">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-[#2a2640] shadow-lg lg:h-[650px] lg:flex-row">
        {/* Left side with image or background */}
        <div className="relative min-h-[280px] w-full p-4 lg:w-1/2 lg:p-5">
          <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/att7.jpg"
              alt="attention pic"
              fill
              className="rounded-2xl object-cover"
              priority
            />
          </div>
        </div>
        {/* Right side with login form */}
        <div className="flex w-full items-center p-6 sm:p-8 lg:w-1/2 lg:p-10">
          <div className="w-full">
            <h1 className="text-4xl font-bold">Welcome Back</h1>
            <h2 className="text-lg text-gray-400 mt-5">
              Please login to your account
            </h2>
            <form className="mt-10" onSubmit={handleLogin}>
              <div className="mb-5">
                <label
                  className="block text-gray-300 mb-2"
                  htmlFor="employeeId"
                >
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employeeId"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your employee ID"
                />
              </div>
              <div className="mb-5">
                <label className="block text-gray-300 mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your password"
                  />
                  <button 
                  type="button" 
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-0 inset-y-0 flex items-center px-4 text-gray-300 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <VscEyeClosed className="w-4 h-4 cursor-pointer"/> : <VscEye className="w-4 h-4 cursor-pointer"/>}
                  </button>
                </div>
              </div>
              {error && (
                <p className="text-red-500 mb-5 border border-red-500 p-2 rounded">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-500 mb-5 border border-green-500 p-2 rounded">
                  {success}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200 cursor-pointer"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
