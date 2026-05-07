


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaMoneyBillWave, FaCreditCard, FaMapMarkerAlt } from "react-icons/fa";

function Checkout() {

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Prevent users from checking out with an empty cart
  useEffect(() => {
    const checkCart = async () => {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data || data.length === 0) {
        toast.error("Your cart is empty. Please add items first.");
        navigate("/menu");
      }
    };
    checkCart();
  }, [navigate, token]);

  const handleCOD = async () => {

    const res = await fetch("http://localhost:5000/api/orders/cod", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ address }),
    });

    if (res.ok) {
      navigate("/order-success");
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.message || "Order Failed");
    }

  };

  const handleStripe = async () => {

    localStorage.setItem("deliveryAddress", address);

    const res = await fetch(
      "http://localhost:5000/api/payment/online",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json().catch(() => ({}));

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.message || "Payment session failed");
    }

  };

  const handleSubmit = () => {

    const addressStr = address.trim();

    if (!addressStr) {
      alert("Please enter your delivery address");
      return;
    }

    if (addressStr.length < 15) {
      alert("Please enter a complete address (minimum 15 characters)");
      return;
    }

    if (addressStr.split(/\s+/).length < 3) {
      alert("Please provide a detailed address (Street, Area/Landmark, City)");
      return;
    }

    if (paymentMethod === "COD") {
      handleCOD();
    } else {
      handleStripe();
    }

  };

  return (

    <div className="min-h-screen bg-[#F5ECE3] pt-24 px-6">

      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-10">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Checkout
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Complete your order and enjoy your coffee ☕
        </p>

        {/* Address */}
        <div className="mb-6">

          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
            <FaMapMarkerAlt /> Delivery Address
          </label>

          <textarea
            rows="3"
            placeholder="Enter your complete delivery address (Street, Area/Landmark, City, Pincode)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B3F00] resize-none"
          ></textarea>

        </div>

        {/* Payment Method */}
        <div className="mb-8">

          <label className="text-gray-700 font-semibold mb-3 block">
            Payment Method
          </label>

          <div className="space-y-3">

            {/* COD */}
            <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">

              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <FaMoneyBillWave className="text-green-600" />

              <span>Cash on Delivery</span>

            </label>

            {/* Stripe */}
            <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">

              <input
                type="radio"
                value="Stripe"
                checked={paymentMethod === "Stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <FaCreditCard className="text-blue-600" />

              <span>Online Payment (Card / Stripe)</span>

            </label>

          </div>

        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#7B3F00] text-white py-3 rounded-full text-lg hover:bg-[#5a2e00] transition"
        >
          Pay & Place Order
        </button>

      </div>

    </div>
  );
}

export default Checkout;