

import React, { useState } from 'react';
import { FaUtensils, FaCheckCircle, FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const initialRecipes = [
  {
    name: 'Paneer Tikka',
    category: 'Starter',
    prepTime: 20,
    stock: 'Available',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    ingredients: 'Paneer, Yogurt, Spices, Capsicum',
  },
  {
    name: 'Veg Biryani',
    category: 'Main Course',
    prepTime: 30,
    stock: 'Available',
    image: 'https://images.unsplash.com/photo-1604908177522-432c5c7c1c8a?auto=format&fit=crop&w=400&q=80',
    ingredients: 'Rice, Mixed Vegetables, Spices',
  },
  {
    name: 'Chocolate Cake',
    category: 'Dessert',
    prepTime: 45,
    stock: 'Available',
    image: 'https://images.unsplash.com/photo-1505250463726-0d238b6a9cfa?auto=format&fit=crop&w=400&q=80',
    ingredients: 'Flour, Cocoa, Sugar, Eggs, Butter',
  },
  {
    name: 'Masala Dosa',
    category: 'Breakfast',
    prepTime: 15,
    stock: 'Available',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    ingredients: 'Rice, Lentils, Potato, Spices',
  },
  {
    name: 'Mango Smoothie',
    category: 'Beverage',
    prepTime: 5,
    stock: 'Available',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    ingredients: 'Mango, Yogurt, Sugar',
  },
];

const categories = [
  'Starter',
  'Main Course',
  'Dessert',
  'Breakfast',
  'Beverage',
];

export default function RecipeManagement() {
    const [recipes, setRecipes] = useState(() => {
      const saved = localStorage.getItem('recipes');
      return saved ? JSON.parse(saved) : initialRecipes;
    });
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
      name: '',
      category: '',
      ingredients: '',
      prepTime: '',
      image: '',
    });
    const [viewRecipe, setViewRecipe] = useState(null);
    const [editRecipe, setEditRecipe] = useState(null);
    const [deleteRecipe, setDeleteRecipe] = useState(null);
    const [editForm, setEditForm] = useState({
      name: '',
      category: '',
      ingredients: '',
      prepTime: '',
      image: '',
    });

    const filteredRecipes = recipes.filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );

    function handleInput(e) {
      const { name, value, files } = e.target;
      if (name === 'image' && files && files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setForm(f => ({ ...f, image: reader.result }));
          }
        };
        reader.readAsDataURL(files[0]);
      } else {
        setForm(f => ({ ...f, [name]: value }));
      }
    }

    function handleEditInput(e) {
      const { name, value, files } = e.target;
      if (name === 'image' && files && files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setEditForm(f => ({ ...f, image: reader.result }));
            }
        };
        reader.readAsDataURL(files[0]);
      } else {
        setEditForm(f => ({ ...f, [name]: value }));
      }
    }

    function handleSubmit(e) {
      e.preventDefault();
      if (!form.name || !form.category || !form.prepTime) return;
      const newRecipes = [
        ...recipes,
        {
          name: form.name,
          category: form.category,
          prepTime: Number(form.prepTime),
          stock: 'Available',
          image: form.image || 'https://via.placeholder.com/400x200?text=No+Image',
          ingredients: form.ingredients,
        },
      ];
      setRecipes(newRecipes);
      localStorage.setItem('recipes', JSON.stringify(newRecipes));
      setForm({ name: '', category: '', ingredients: '', prepTime: '', image: '' });
      setShowModal(false);
    }

    function handleEditSave(e) {
      e.preventDefault();
      if (!editForm.name || !editForm.category || !editForm.prepTime) return;
      const updatedRecipes = recipes.map(r =>
        r === editRecipe
          ? {
              ...r,
              name: editForm.name,
              category: editForm.category,
              prepTime: Number(editForm.prepTime),
              ingredients: editForm.ingredients,
              image: editForm.image || r.image,
            }
          : r
      );
      setRecipes(updatedRecipes);
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      setEditRecipe(null);
    }

    function handleDeleteConfirm() {
      const filtered = recipes.filter(r => r !== deleteRecipe);
      setRecipes(filtered);
      localStorage.setItem('recipes', JSON.stringify(filtered));
      setDeleteRecipe(null);
    }

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaUtensils className="text-2xl text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Recipe Management</h1>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button
              className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium shadow hover:bg-blue-700 transition"
              onClick={() => setShowModal(true)}
            >
              + Add New Recipe
            </button>
          </div>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((r, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-4 flex flex-col">
              <img
                src={r.image}
                alt={r.name}
                className="rounded-lg mb-3 h-40 object-cover w-full"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{r.name}</h3>
              <p className="text-sm text-gray-500 mb-1">Category: <span className="font-medium text-gray-700">{r.category}</span></p>
              <p className="text-sm text-gray-500 mb-1">Prep Time: <span className="font-medium text-gray-700">{r.prepTime} mins</span></p>
              <p className="text-sm text-green-600 flex items-center mb-2">Stock: {r.stock} <FaCheckCircle className="ml-1 h-4 w-4" /></p>
              <div className="flex gap-3 mt-auto">
                <button
                  className="text-blue-600 flex items-center gap-1 hover:underline"
                  onClick={() => setViewRecipe(r)}
                >
                  <FaEye /> View
                </button>
                <button
                  className="text-gray-600 flex items-center gap-1 hover:underline"
                  onClick={() => {
                    setEditRecipe(r);
                    setEditForm({
                      name: r.name,
                      category: r.category,
                      ingredients: r.ingredients || '',
                      prepTime: r.prepTime.toString(),
                      image: r.image,
                    });
                  }}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="text-red-600 flex items-center gap-1 hover:underline"
                  onClick={() => setDeleteRecipe(r)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Recipe Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Add New Recipe</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Recipe Name"
                  className="border rounded-lg px-3 py-2"
                  value={form.name}
                  onChange={handleInput}
                  required
                />
                <select
                  name="category"
                  className="border rounded-lg px-3 py-2"
                  value={form.category}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <textarea
                  name="ingredients"
                  placeholder="Enter ingredients..."
                  className="border rounded-lg px-3 py-2"
                  value={form.ingredients}
                  onChange={handleInput}
                />
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    name="prepTime"
                    placeholder="Preparation Time"
                    className="border rounded-lg px-3 py-2 w-32"
                    value={form.prepTime}
                    onChange={handleInput}
                    required
                    min={1}
                  />
                  <span>mins</span>
                </div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="border rounded-lg px-3 py-2"
                  onChange={handleInput}
                />
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium shadow hover:bg-blue-700 transition"
                  >
                    Save Recipe
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 font-medium shadow hover:bg-gray-300 transition"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Recipe Modal */}
        {viewRecipe && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setViewRecipe(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">{viewRecipe.name}</h2>
              <img src={viewRecipe.image} alt={viewRecipe.name} className="rounded-lg mb-3 h-40 object-cover w-full" />
              <p className="mb-1"><strong>Category:</strong> {viewRecipe.category}</p>
              <p className="mb-1"><strong>Prep Time:</strong> {viewRecipe.prepTime} mins</p>
              <p className="mb-1"><strong>Stock:</strong> {viewRecipe.stock}</p>
              <p className="mb-1"><strong>Ingredients:</strong> {viewRecipe.ingredients || 'N/A'}</p>
            </div>
          </div>
        )}

        {/* Edit Recipe Modal */}
        {editRecipe && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setEditRecipe(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>
              <form onSubmit={handleEditSave} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Recipe Name"
                  className="border rounded-lg px-3 py-2"
                  value={editForm.name}
                  onChange={handleEditInput}
                  required
                />
                <select
                  name="category"
                  className="border rounded-lg px-3 py-2"
                  value={editForm.category}
                  onChange={handleEditInput}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <textarea
                  name="ingredients"
                  placeholder="Enter ingredients..."
                  className="border rounded-lg px-3 py-2"
                  value={editForm.ingredients}
                  onChange={handleEditInput}
                />
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    name="prepTime"
                    placeholder="Preparation Time"
                    className="border rounded-lg px-3 py-2 w-32"
                    value={editForm.prepTime}
                    onChange={handleEditInput}
                    required
                    min={1}
                  />
                  <span>mins</span>
                </div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="border rounded-lg px-3 py-2"
                  onChange={handleEditInput}
                />
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium shadow hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 font-medium shadow hover:bg-gray-300 transition"
                    onClick={() => setEditRecipe(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Recipe Modal */}
        {deleteRecipe && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setDeleteRecipe(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Delete Recipe</h2>
              <p>Are you sure you want to delete <strong>{deleteRecipe.name}</strong>?</p>
              <div className="flex gap-3 mt-4">
                <button
                  className="bg-red-600 text-white rounded-lg px-4 py-2 font-medium shadow hover:bg-red-700 transition"
                  onClick={handleDeleteConfirm}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 font-medium shadow hover:bg-gray-300 transition"
                  onClick={() => setDeleteRecipe(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

