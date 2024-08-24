import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import { useAuth } from "../context/AuthToken";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

function AllProduct() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("fashion");
  const [subcategory, setSubcategory] = useState("men");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState(null);
  const { products, fetchProducts } = useAuth();

  const subcategories = {
    fashion: ["men", "women", "baby"],
    sports: ["indoor", "outdoor"],
    gadgets: ["smartphones", "laptops", "accessories"],
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subcategory);

    if (file) {
      formData.append("image", file);
    }

    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:1000/api/v1/editProd/${editingProduct._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:1000/api/v1/addProd", formData);
      }
      fetchProducts();
      handleCancel();
    } catch (error) {
      console.error("Error updating/adding product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setCategory(product.category);
    setSubcategory(product.subcategory);
    setFile(null);
    setPreview(product.image); // Set preview to the current product image URL
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:1000/api/v1/deleteProd/${id}`)
      .then((res) => {
        console.log(res);
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowForm(false);
    setName("");
    setPrice("");
    setDescription("");
    setCategory("fashion");
    setSubcategory("men");
    setFile(null);
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const incrementPrice = () => {
    setPrice(prevPrice => prevPrice + 1);
  };

  const decrementPrice = () => {
    setPrice(prevPrice => (prevPrice > 0 ? prevPrice - 1 : 0));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-Roboto">
      <button
        onClick={() => setShowForm(true)}
        className="bg-primbtncolor-0 text-white px-4 py-2 rounded-md hover:bg-primbtnhover-0 font-Roboto transition duration-300 mb-6"
      >
        Add Product
      </button>

      {(showForm || editingProduct) && (
        <div className="bg-white rounded-lg shadow-md p-3 mb-6 animate-fade-in-up mx-auto w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-white text-center">
            {editingProduct ? "Update Product" : "Add Product"}
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none bg-[#ffffff0e] text-white focus:ring-2 focus:ring-slate-600 mb-4"
            />
            <div className="w-full mb-4 relative">
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-white bg-[#ffffff0e] focus:ring-slate-600 pr-16"
                min="0"
              />
              <div className="absolute right-0 top-0 h-full flex flex-col justify-center me-2">
                <button 
                  onClick={decrementPrice} 
                  className="px-1 text-xs text-white"
                >
                  <FaAngleDoubleDown />
                </button>
                <button 
                  onClick={incrementPrice} 
                  className="px-1 text-xs text-white"
                >
                  <FaAngleDoubleUp />
                </button>
              </div>
            </div>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-white bg-[#ffffff0e] focus:ring-slate-600 mb-4"
            />
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory(subcategories[e.target.value][0]);
              }}
              className="w-full px-4 py-2 border rounded-md text-white bg-[#ffffff0e] focus:outline-none focus:ring-2 focus:ring-slate-600 mb-4"
            >
              <option value="fashion" className="text-black font-Roboto font-medium bg-primbtncolor-0">Fashion</option>
              <option value="sports" className="text-black font-Roboto font-medium bg-primbtncolor-0">Sports</option>
              <option value="gadgets" className="text-black font-Roboto font-medium bg-primbtncolor-0">Gadgets</option>
            </select>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-[#ffffff0e] text-white focus:outline-none focus:ring-2 focus:ring-slate-600 mb-4"
            >
              {subcategories[category] && subcategories[category].map((sub) => (
                <option key={sub} value={sub} className="text-black font-Roboto font-medium bg-primbtncolor-0">
                  {sub}
                </option>
              ))}
            </select>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-md text-xs bg-[#ffffff0e] text-white focus:outline-none focus:ring-2 focus:ring-slate-600 mb-4"
            />
            {preview && (
              <div className="mb-4">
                <img src={preview} alt="Image Preview" className="w-full h-48 object-cover" />
              </div>
            )}
            <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly">
              <button
                onClick={handleUpdate}
                className="w-full sm:w-52 bg-primbtncolor-0 text-white py-2 rounded-md hover:bg-primbtnhover-0 transition duration-300 mb-2"
              >
                {editingProduct ? "Update" : "Upload"}
              </button>
              <button
                onClick={handleCancel}
                className="w-full sm:w-52 bg-primbtncolor-0 text-white py-2 rounded-md hover:bg-primbtnhover-0 transition duration-300 mb-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="shadow-md overflow-hidden">
        <ul className="space-y-3 p-4">
          {products.length > 0 ? (
             products && products.map((product) => (
              <li
                key={product._id}
                className="flex flex-col md:flex-row items-center bg-blurr-0 rounded-xl p-4 space-y-4 md:space-y-0 md:space-x-4 animate-fade-in-up"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-20 object-cover md:w-28 md:h-24 mr-0 md:mr-4"
                />
                <div className="flex-grow font-Roboto">
                  <h5 className="text-lg md:text-xl mb-2 text-gray-100">{product.name}</h5>
                  <p className="text-sm md:text-base text-white mb-2">
                    Price: ₹<span>{product.price}</span>
                  </p>
                  <p className="text-sm md:text-base text-gray-100 mb-2">{product.description}</p>
                  <p className="text-sm md:text-base text-white mb-2">
                    Category: <span>{product.category}</span> / Subcategory: <span>{product.subcategory}</span>
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center md:space-x-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-primbtncolor-0 text-white py-2 px-4 rounded-md hover:bg-primbtnhover-0 transition duration-300 mb-2 md:mb-0"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-primbtncolor-0 text-white py-2 px-4 rounded-md hover:bg-primbtnhover-0 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500 font-Roboto font-medium text-center">
              No products found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AllProduct;
