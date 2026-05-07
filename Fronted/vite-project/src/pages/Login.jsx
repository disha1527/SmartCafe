



import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    if (response.ok) {
      const user = data.user || data.data?.user;
      const token = data.token || data.data?.token;

      localStorage.setItem("token", token);
      login(user);

      navigate("/");
    } else {
      toast.error(data.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5ECE3] px-6">

      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
            alt="coffee"
            className="h-full w-full object-cover"
          />
        </div>

        {/* LOGIN FORM */}
        <div className="p-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-6">
            Login to continue your Smart Cafe experience 
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B3F00]"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B3F00]"
              onChange={handleChange}
            />

            <button
              className="w-full bg-[#7B3F00] text-white py-3 rounded-lg
              hover:bg-[#5a2e00] transition duration-300"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#7B3F00] font-semibold">
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;