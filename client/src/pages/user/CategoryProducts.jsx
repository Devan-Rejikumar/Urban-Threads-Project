// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { ProductCard } from '../../components/user/ProductCard';
// import Header from '../../components/user/Header';
// import Footer from '../../components/user/Footer';

// const CategoryProducts = () => {
//     console.log('Category component mounted')
//   const { categoryId } = useParams();
//   console.log('categoryId:', categoryId);
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategoryProducts = async () => {
//       console.log('Fetching products for category:', categoryId);
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/products/category/${categoryId}`,
//           { withCredentials: true }
//         );
//         console.log('API Response:', response.data);
        
//         if (response.data) {
//           setProducts(response.data.products || []);
//           console.log('Product data:', response.data.products.map(p => ({id: p._id, image: p.image})));
//           setCategory(response.data.category);
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error('Error details:', err.response || err);
//         setError(err.response?.data?.error || 'Failed to fetch products');
//         setLoading(false);
//       }
//     };

//     if (categoryId) {
//       fetchCategoryProducts();
//     }
//   }, [categoryId]);

//   const renderContent = () => {
//     if (loading) {
//       return (
//         <div className="flex justify-center items-center min-h-screen">
//           <div>Loading products...</div>
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div className="flex justify-center items-center min-h-screen">
//           <div className="text-red-500">Error: {error}</div>
//         </div>
//       );
//     }

//     return (
//       <div className="app">
//         <Header />
//         <main className="container mx-auto px-4 py-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold mb-2">
//               {category?.name || 'Category Products'}
//             </h1>
//             <p className="text-gray-600">
//               {products.length} products found
//             </p>
//           </div>

//           {products.length === 0 ? (
//             <div className="text-center py-8">
//               <p>No products found in this category.</p>
//             </div>
//           ) : (
//             <div className="products-grid">
                
//               {products.map((product) => (
//                 <ProductCard
//                   key={product._id}
//                   {...product}
//                   isNew={false}
//                 />
//               ))}
//             </div>
//           )}
//         </main>
//         <Footer />
//       </div>
//     );
//   };

//   return renderContent();
// };

// export default CategoryProducts;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ProductCard } from '../../components/user/ProductCard';
import Filter from '../../components/user/Filter';
import Header from '../../components/user/Header';
import Footer from '../../components/user/Footer';
import './CategoryProduct.css';
import Breadcrumbs from '../../components/breadcrumbs/user/userBreadcrumbs';



const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Sample categories data - replace with your actual categories
  const categories = [
    { id: "sports-shoes", name: "Sports Shoes", count: 9049 },
    { id: "tshirts", name: "Tshirts", count: 8877 },
    { id: "track-pants", name: "Track Pants", count: 4601 },
    { id: "innerwear-vests", name: "Innerwear Vests", count: 3317 },
    { id: "shorts", name: "Shorts", count: 3119 },
    { id: "jackets", name: "Jackets", count: 1056 },
    { id: "tracksuits", name: "Tracksuits", count: 1052 },
    { id: "socks", name: "Socks", count: 837 },
  ];

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/category/${categoryId}`,
          { withCredentials: true }
        );
        
        if (response.data) {
          console.log('Products:', response.data.products); // Log individual products
          response.data.products.forEach(product => {
            console.log('Product ID:', product._id); // Verify each product has an ID
          });
          setProducts(response.data.products || []);
          setCategory(response.data.category);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.error || 'Failed to fetch products');
        setLoading(false);
      }
    };
  
    if (categoryId) {
      fetchCategoryProducts();
    }
  }, [categoryId]);

  const handleClearAll = () => {
    setSelectedGender("");
    setSelectedCategories([]);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const genderMatch = !selectedGender || product.gender === selectedGender;
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.categoryId);
    return genderMatch && categoryMatch;
  });

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div>Loading products...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <div className="error-message">Error: {error}</div>
        </div>
      );
    }

    return (
      <div className="app">
        <Header />
        <Breadcrumbs categoryName={category?.name} />
        <main className="main-container">
          <div className="category-header">
            <h1>{category?.name || 'Category Products'}</h1>
            <p>{filteredProducts.length} products found</p>
          </div>

          <div className="content-container">
            <Filter
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              onClearAll={handleClearAll}
            />

            <div className="products-container">
              {filteredProducts.length === 0 ? (
                <div className="no-products">
                  <p>No products found in this category.</p>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      {...product}
                      isNew={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  };

  return renderContent();
};

export default CategoryProducts;

