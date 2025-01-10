// import React from 'react';
// import './ProductList.css';
// import AdminBreadcrumbs from '../Category-Management/AdminBreadcrumbs';

// const ProductListing = ({ products = [] }) => {
//   return (
//     <div className="product-listing-container">
//       <AdminBreadcrumbs />
      
//       {!products || products.length === 0 ? (
//         <div className="empty-state">
//           No products available.
//         </div>
//       ) : (
//         <div className="products-grid">
//           {products.map((product) => (
//             <div key={product._id} className="product-card">
//               <div className="product-image">
//                 {product.images && product.images[0] ? (
//                   <img 
//                     src={product.images[0]} 
//                     alt={product.name}
//                   />
//                 ) : (
//                   <div className="no-image">
//                     <span>No image available</span>
//                   </div>
//                 )}
//               </div>
              
//               <div className="product-info">
//                 <h3 className="product-title">{product.name}</h3>
//                 <p className="product-description">{product.description}</p>
                
//                 <div className="price-info">
//                   <div className="original-price">
//                     Original Price: ${product.originalPrice}
//                   </div>
//                   {product.salePrice && (
//                     <div className="sale-price">
//                       Sale Price: ${product.salePrice}
//                     </div>
//                   )}
//                 </div>

//                 <div className="product-footer">
//                   <div className="status">
//                     <span>Status:</span> {product.status}
//                   </div>
                  
//                   <div className="variants">
//                     {product.variants?.map((variant, index) => (
//                       <div 
//                         key={index}
//                         className="variant-tag"
//                       >
//                         <span>{variant.size}</span>
//                         <span 
//                           className="color"
//                           style={{ backgroundColor: variant.color }}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductListing;

