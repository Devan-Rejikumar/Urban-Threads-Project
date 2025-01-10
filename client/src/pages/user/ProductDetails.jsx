

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { ProductCard } from '../../components/user/ProductCard';
// import Header from '../../components/user/Header';
// import Footer from '../../components/user/Footer';
// import './ProductDetails.css';

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);




//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         console.log('Fetching product with ID:', productId);
//         const response = await axios.get(
//           `http://localhost:5000/api/products/${productId}`,
//           { withCredentials: true }
//         );
//         console.log('Product data received:', response.data);
//         setProduct(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching product:', err);
//         setError(err.response?.data?.error || 'Failed to fetch product');
//         setLoading(false);
//       }
//     };

//     if (productId) {
//       fetchProduct();
//     }
//   }, [productId]);

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error-message">{error}</div>;
//   if (!product) return <div className="error-message">Product not found</div>;

//   const { 
//     name, 
//     originalPrice,
//     salePrice,
//     images, 
//     rating, 
//     availability, 
//     description
//   } = product;

//   // Dummy data for reviews
//   const reviews = [
//     { author: "Belwin Raphel", rating: 5, comment: "Great product! Highly recommended." },
//     { author: "Al Ameen", rating: 4, comment: "Good quality, but a bit pricey." },
//     { author: "Nanda Kumar", rating: 5, comment: "Excellent service and fast delivery." }
//   ];

//   // Dummy data for related products
//   const relatedProducts = [
//     { _id: "1", name: "Related Product 1", price: 1999, image: "/placeholder.svg?height=200&width=200" },
//     { _id: "2", name: "Related Product 2", price: 2499, image: "/placeholder.svg?height=200&width=200" },
//     { _id: "3", name: "Related Product 3", price: 1799, image: "/placeholder.svg?height=200&width=200" }
//   ];

//   return (
//     <>
//       <Header />
//       <div className="product-detail">
//         <div className="product-detail-grid">
//           {/* Image Gallery */}
//           <div className="product-images">
//             <div 
//               className={`main-image-container ${isZoomed ? 'zoomed' : ''}`}
//               onMouseEnter={() => setIsZoomed(true)}
//               onMouseLeave={() => setIsZoomed(false)}
//             >
//               <img
//                 src={images[selectedImage]?.url || images[selectedImage]}
//                 alt={name}
//                 className="main-image"
//               />
//             </div>
//             <div className="thumbnail-grid">
//               {images.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img.url || img}
//                   alt={`${name} ${idx + 1}`}
//                   className={`thumbnail ${selectedImage === idx ? 'selected' : ''}`}
//                   onClick={() => setSelectedImage(idx)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="product-details">
//             <h1 className="detail-product-name">{name}</h1>
//             <div className="detail-rating">
//               {[...Array(5)].map((_, i) => (
//                 <span 
//                   key={i} 
//                   className={`star ${i < rating ? 'filled' : ''}`}
//                 >
//                   ★
//                 </span>
//               ))}
//               <span className="review-count">({reviews.length} reviews)</span>
//             </div>

//             <div className="price-container">
//               {salePrice ? (
//                 <>
//                   <p className="detail-price sale-price">₹ {salePrice}</p>

//                   <p className="detail-price original-price">₹<span>MRP </span>{originalPrice}</p><span>100/- off</span>
//                 </>
//               ) : (
//                 <p className="detail-price">₹{originalPrice}</p>
//               )}
//             </div>

//             <span className={`availability-badge ${availability}`}>
//               {availability === 'out_of_stock' 
//                 ? 'Out of Stock' 
//                 : availability === 'low_stock' 
//                   ? 'Low Stock' 
//                   : 'In Stock'}
//             </span>

//             <p className="product-description">{description}</p>

//             {/* Reviews Section */}
//             <div className="reviews-section">
//               <h2>Customer Reviews</h2>
//               {reviews.length > 0 ? (
//                 <div className="reviews-list">
//                   {reviews.map((review, idx) => (
//                     <div key={idx} className="review">
//                       <div className="review-header">
//                         <div className="review-rating">
//                           {[...Array(5)].map((_, i) => (
//                             <span 
//                               key={i} 
//                               className={`star ${i < review.rating ? 'filled' : ''}`}
//                             >
//                               ★
//                             </span>
//                           ))}
//                         </div>
//                         <span className="review-author">{review.author}</span>
//                       </div>
//                       <p className="review-comment">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="no-reviews">No reviews yet</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div className="related-products">
//             <h2>Related Products</h2>
//             <div className="related-products-grid">
//               {relatedProducts.map((product) => (
//                 <ProductCard key={product._id} {...product} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProductDetail;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { ProductCard } from '../../components/user/ProductCard';
// import Header from '../../components/user/Header';
// import Footer from '../../components/user/Footer';
// import './ProductDetails.css';

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         console.log('Fetching product with ID:', productId);
//         const response = await axios.get(
//           `http://localhost:5000/api/products/${productId}`,
//           { withCredentials: true }
//         );
//         console.log('Product data received:', response.data);
//         setProduct(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching product:', err);
//         setError(err.response?.data?.error || 'Failed to fetch product');
//         setLoading(false);
//       }
//     };

//     if (productId) {
//       fetchProduct();
//     }
//   }, [productId]);

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error-message">{error}</div>;
//   if (!product) return <div className="error-message">Product not found</div>;

//   const { 
//     name, 
//     originalPrice,
//     salePrice,
//     images, 
//     rating, 
//     availability, 
//     description
//   } = product;

//   // Dummy data for reviews
//   const reviews = [
//     { author: "Belwin Raphel", rating: 5, comment: "Great product! Highly recommended." },
//     { author: "Al Ameen", rating: 4, comment: "Good quality, but a bit pricey." },
//     { author: "Nanda Kumar", rating: 5, comment: "Excellent service and fast delivery." }
//   ];

//   // Dummy data for related products
//   const relatedProducts = [
//     { _id: "1", name: "Related Product 1", price: 1999, image: "/placeholder.svg?height=200&width=200" },
//     { _id: "2", name: "Related Product 2", price: 2499, image: "/placeholder.svg?height=200&width=200" },
//     { _id: "3", name: "Related Product 3", price: 1799, image: "/placeholder.svg?height=200&width=200" }
//   ];

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
//     ));
//   };

//   return (
//     <>
//       <Header />
//       <div className="product-detail-container">
//         <div className="product-detail-grid">
//           {/* Image Gallery */}
//           <div className="image-gallery">
//             <div 
//               className={`main-image-container ${isZoomed ? 'zoomed' : ''}`}
//               onMouseEnter={() => setIsZoomed(true)}
//               onMouseLeave={() => setIsZoomed(false)}
//             >
//               <img
//                 src={images[selectedImage]?.url || images[selectedImage]}
//                 alt={name}
//                 className="main-image"
//               />
//             </div>
//             <div className="thumbnail-grid">
//               {images.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedImage(idx)}
//                   className={`thumbnail-button ${selectedImage === idx ? 'selected' : ''}`}
//                 >
//                   <img
//                     src={img.url || img}
//                     alt={`${name} ${idx + 1}`}
//                     className="thumbnail-image"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="product-info">
//             <div className="rating-container">
//               <div className="stars">
//                 {renderStars(rating)}
//               </div>
//               <span className="rating-count">{reviews.length} Ratings</span>
//             </div>

//             <h1 className="product-name">{name}</h1>

//             <div className="price-section">
//               <div className="price-container">
//                 <span className="current-price">₹{salePrice || originalPrice}</span>
//                 {salePrice && (
//                   <>
//                     <span className="original-price">MRP ₹{originalPrice}</span>
//                     <span className="discount">({Math.round((originalPrice - salePrice) / originalPrice * 100)}% OFF)</span>
//                   </>
//                 )}
//               </div>
//               <p className="tax-info">inclusive of all taxes</p>
//             </div>

//             <div className="size-section">
//               <div className="size-header">
//                 <h3 className="section-title">SELECT SIZE</h3>
//                 <button className="size-chart-button">SIZE CHART</button>
//               </div>
//               <div className="size-options">
//                 {['S', 'M', 'L', 'XL'].map((size) => (
//                   <button
//                     key={size}
//                     className={`size-button ${(size === 'L' || size === 'XL') ? 'disabled' : ''}`}
//                     disabled={size === 'L' || size === 'XL'}
//                   >
//                     {size}
//                     {(size === 'S' || size === 'M') && (
//                       <span className="stock-label">1 left</span>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="action-buttons">
//               <button className="add-to-bag">
//                 ADD TO BAG
//               </button>
//               <button className="wishlist">
//                 <span className="heart-icon">♡</span>
//                 WISHLIST
//               </button>
//             </div>

//             <span className={`availability-badge ${availability}`}>
//               {availability === 'out_of_stock' 
//                 ? 'Out of Stock' 
//                 : availability === 'low_stock' 
//                   ? 'Low Stock' 
//                   : 'In Stock'}
//             </span>

//             <p className="product-description">{description}</p>

//             {/* Reviews Section */}
//             <div className="reviews-section">
//               <h2>Customer Reviews</h2>
//               {reviews.length > 0 ? (
//                 <div className="reviews-list">
//                   {reviews.map((review, idx) => (
//                     <div key={idx} className="review">
//                       <div className="review-header">
//                         <div className="review-rating">
//                           {renderStars(review.rating)}
//                         </div>
//                         <span className="review-author">{review.author}</span>
//                       </div>
//                       <p className="review-comment">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="no-reviews">No reviews yet</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div className="related-products">
//             <h2>Related Products</h2>
//             <div className="related-products-grid">
//               {relatedProducts.map((product) => (
//                 <ProductCard key={product._id} {...product} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProductDetail;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ProductCard } from '../../components/user/ProductCard';
import Header from '../../components/user/Header';
import Footer from '../../components/user/Footer';
import './ProductDetails.css';
// import Breadcrumbs from '../../components/user/userBreadcrumbs';
import Breadcrumbs from '../../components/breadcrumbs/user/userBreadcrumbs';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching product with ID:', productId);
        const productResponse = await axios.get(
          `http://localhost:5000/api/products/${productId}`,
          { withCredentials: true }
        );
        console.log('Product data received:', productResponse.data);
        setProduct(productResponse.data);

        const allProductsResponse = await axios.get('http://localhost:5000/api/products',
          { withCredentials: true }
        );
        console.log('All products received:', allProductsResponse.data);

        // If your API returns an array directly:
        setAllProducts(allProductsResponse.data);
        // OR if your API returns {products: [...]}
        // setAllProducts(allProductsResponse.data.products);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.error || 'Failed to fetch product');
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);




  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div className="error-message">Product not found</div>;

  const {
    name,
    originalPrice,
    salePrice,
    images,
    rating,
    availability,
    description
  } = product;

  const relatedProducts = allProducts
    .filter(p => p._id !== productId)
    .slice(0, 4); // Limit to 4 related products


  // Dummy data for reviews
  const reviews = [
    { author: "Belwin Raphel", rating: 5, comment: "Great product! Highly recommended." },
    { author: "Al Ameen", rating: 4, comment: "Good quality, but a bit pricey." },
    { author: "Nanda Kumar", rating: 5, comment: "Excellent service and fast delivery." }
  ];

  // Dummy data for related products


  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
    ));
  };

  return (
    <>
      <Header />
      <Breadcrumbs
        categoryName={product?.category?.name}
        productName={product?.name}
      />
      <div className="product-detail-container">
        <div className="product-detail-grid">
          {/* Image Gallery */}
          <div className="image-gallery">
            <div
              className={`main-image-container ${isZoomed ? 'zoomed' : ''}`}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                src={images[selectedImage]?.url || images[selectedImage]}
                alt={name}
                className="main-image"
              />
            </div>
            <div className="thumbnail-grid">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`thumbnail-button ${selectedImage === idx ? 'selected' : ''}`}
                >
                  <img
                    src={img.url || img}
                    alt={`${name} ${idx + 1}`}
                    className="thumbnail-image"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="rating-container">
              <div className="stars">
                {renderStars(rating)}
              </div>
              <span className="rating-count">{reviews.length} Ratings</span>
            </div>

            <h1 className="product-name">{name}</h1>

            <div className="price-section">
              <div className="price-container">
                <span className="current-price">₹{salePrice || originalPrice}</span>
                {salePrice && (
                  <>
                    <span className="original-price">MRP ₹{originalPrice}</span>
                    <span className="discount">({Math.round((originalPrice - salePrice) / originalPrice * 100)}% OFF)</span>
                  </>
                )}
              </div>
              <p className="tax-info">inclusive of all taxes</p>
            </div>

            <div className="size-section">
              <div className="size-header">
                <h3 className="section-title">SELECT SIZE</h3>
                <button className="size-chart-button">SIZE CHART</button>
              </div>
              <div className="size-options">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className={`size-button ${(size === 'L' || size === 'XL') ? 'disabled' : ''}`}
                    disabled={size === 'L' || size === 'XL'}
                  >
                    {size}
                    {(size === 'S' || size === 'M') && (
                      <span className="stock-label">1 left</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-bag">
                ADD TO BAG
              </button>
              <button className="wishlist">
                <span className="heart-icon">♡</span>
                WISHLIST
              </button>
            </div>

            <span className={`availability-badge ${availability}`}>
              {availability === 'out_of_stock'
                ? 'Out of Stock'
                : availability === 'low_stock'
                  ? 'Low Stock'
                  : 'In Stock'}
            </span>

            <p className="product-description">{description}</p>

            {/* Reviews Section */}
            <div className="reviews-section">
              <h2>Customer Reviews</h2>
              {reviews.length > 0 ? (
                <div className="reviews-list">
                  {reviews.map((review, idx) => (
                    <div key={idx} className="review">
                      <div className="review-header">
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                        <span className="review-author">{review.author}</span>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-reviews">No reviews yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="related-products-grid">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  name={product.name}
                  images={product.images}
                  originalPrice={product.originalPrice}
                  salePrice={product.salePrice}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;