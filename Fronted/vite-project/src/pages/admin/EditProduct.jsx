

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adminToken } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    countInStock: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // 🔥 GET PRODUCT DATA (AUTO FILL)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/admin/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        const data = await res.json();
        console.log("Product API:", data);

        // 🔥 FIX (handle all cases)
        const product = data.data || data.product || data;

        setForm({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          image: product.image || "",
          category: product.category || "",
          countInStock: product.countInStock || "",
        });

        setLoadingData(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (adminToken) {
      fetchProduct();
    }
  }, [id, adminToken]);

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/admin/products/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Product Updated ✅");
        navigate("/admin/menu");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 LOADING SCREEN
  if (loadingData) {
    return (
      <div className="text-center mt-20 text-lg">
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Product ✏️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* 🔥 IMAGE PREVIEW */}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-full h-40 object-cover rounded"
            />
          )}

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="number"
            name="countInStock"
            placeholder="Stock"
            value={form.countInStock}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6F4E37] text-white py-3 rounded-lg hover:bg-[#5a3d2b]"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;