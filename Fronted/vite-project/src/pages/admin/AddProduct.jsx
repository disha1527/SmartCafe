

import React, { useState, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

const AddProduct = () => {
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

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.image ||
      !form.category
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/admin/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`, // 🔥 important
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product Added Successfully ✅");

        // Reset form
        setForm({
          name: "",
          description: "",
          price: "",
          image: "",
          category: "",
          countInStock: "",
        });
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex justify-center items-center p-6 mt-5">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Product 🍔
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

          <input
            type="text"
            name="category"
            placeholder="Category (e.g. Coffee, Pizza)"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

       <input
            type="number"
            name="countInStock"
            placeholder="Stock Quantity"
            value={form.countInStock}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6F4E37] text-white py-3 rounded-lg hover:bg-[#5a3d2c]"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;




// import React, { useState, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const AddProduct = () => {
//   const { adminToken } = useContext(AuthContext);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     image: "",
//     category: "",
//     countInStock: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const response = await fetch(
//         "http://localhost:5000/api/admin/products/add",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${adminToken}`,
//           },
//           body: JSON.stringify(form),
//         }
//       );

//       if (response.ok) {
//         alert("Product Added ✅");
//         setForm({
//           name: "",
//           description: "",
//           price: "",
//           image: "",
//           category: "",
//           countInStock: "",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // <div className="min-h-screen font-[Poppins] bg-gradient-to-br from-[#fdf8f3] via-[#f7efe5] to-[#f1e3d3] pt-28 px-6">

//     //   {/* Card */}
//     //   <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

//     //     {/* Header */}
//     //     <div className="bg-gradient-to-r from-[#7B3F00] to-[#d97706] p-6 text-white">
//     //       <h2 className="text-3xl font-bold">Add New Product</h2>
//     //       <p className="text-sm opacity-80">
//     //         Manage your cafe menu easily
//     //       </p>
//     //     </div>

//     //     {/* Form */}
//     //     <form onSubmit={handleSubmit} className="p-8 space-y-6">

//     //       {/* Name */}
//     //       <div>
//     //         <label className="text-sm font-medium text-gray-600">
//     //           Product Name
//     //         </label>
//     //         <input
//     //           type="text"
//     //           name="name"
//     //           value={form.name}
//     //           onChange={handleChange}
//     //           className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7B3F00] outline-none"
//     //         />
//     //       </div>

//     //       {/* Description */}
//     //       <div>
//     //         <label className="text-sm font-medium text-gray-600">
//     //           Description
//     //         </label>
//     //         <textarea
//     //           name="description"
//     //           rows="3"
//     //           value={form.description}
//     //           onChange={handleChange}
//     //           className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7B3F00] outline-none"
//     //         />
//     //       </div>

//     //       {/* Row */}
//     //       <div className="grid md:grid-cols-3 gap-5">

//     //         <div>
//     //           <label className="text-sm text-gray-600">Price</label>
//     //           <input
//     //             type="number"
//     //             name="price"
//     //             value={form.price}
//     //             onChange={handleChange}
//     //             className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7B3F00]"
//     //           />
//     //         </div>

//     //         <div>
//     //           <label className="text-sm text-gray-600">Stock</label>
//     //           <input
//     //             type="number"
//     //             name="countInStock"
//     //             value={form.countInStock}
//     //             onChange={handleChange}
//     //             className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7B3F00]"
//     //           />
//     //         </div>

//     //         <div>
//     //           <label className="text-sm text-gray-600">Category</label>
//     //           <input
//     //             type="text"
//     //             name="category"
//     //             value={form.category}
//     //             onChange={handleChange}
//     //             className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7B3F00]"
//     //           />
//     //         </div>

//     //       </div>

//     //       {/* Image */}
//     //       <div>
//     //         <label className="text-sm text-gray-600">Image URL</label>
//     //         <input
//     //           type="text"
//     //           name="image"
//     //           value={form.image}
//     //           onChange={handleChange}
//     //           className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7B3F00]"
//     //         />
//     //       </div>

//     //       {/* Button */}
//     //       <div className="text-right">
//     //         <button
//     //           type="submit"
//     //           disabled={loading}
//     //           className="bg-gradient-to-r from-[#7B3F00] to-[#d97706] text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-md"
//     //         >
//     //           {loading ? "Adding..." : "Add Product"}
//     //         </button>
//     //       </div>

//     //     </form>
//     //   </div>

//     // </div>


//     <div className="min-h-screen font-sans bg-[#F4F6F8] pt-28 px-6">

//   <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border">

//     {/* Header */}
//     <div className="border-b px-8 py-5">
        
//        <h2 className="text-2xl font-bold mb-6 ">
//           Add New Product 🍔
//         </h2>
//       <p className="text-sm text-gray-500">
//         Manage your cafe menu
//       </p>
//     </div>

//     {/* Form */}
//     <form className="p-8 space-y-6">

//       <div>
//         <label className="text-sm text-gray-600">Product Name</label>
//         <input className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B3F00]" />
//       </div>

//       <div>
//         <label className="text-sm text-gray-600">Description</label>
//         <textarea className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B3F00]" />
//       </div>

//       <div className="grid md:grid-cols-3 gap-4">

//         <input
//           placeholder="Price"
//           className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B3F00]"
//         />

//         <input
//           placeholder="Stock"
//           className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B3F00]"
//         />

//         <input
//           placeholder="Category"
//           className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B3F00]"
//         />

//       </div>

//       <input
//         placeholder="Image URL"
//         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B3F00]"
//       />

//       <div className="text-right">
//         <button className="bg-[#7B3F00] text-white px-6 py-2 rounded-lg hover:bg-[#5a2e00]">
//           Add Product
//         </button>
//       </div>

//     </form>
//   </div>
// </div>
//   );
// };

// export default AddProduct;