// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { editProductAsync, fetchProductsAsync, removeProductAsync, selecProducts, selectCategories, setcategories } from '../../../slicers/productsSlice';
// import { useAppDispatch } from '../../../app/hooks';
// import "./ProductManage.css"
// const ProductManage = () => {
//   const dispatch = useAppDispatch();
//   const categories = useSelector(selectCategories)
//   const [editedProducts, setEditedProducts] = useState([]);
//   const [search_id, setsearch_id] = useState("")
//   const [search_title, setsearch_title] = useState("")
//   const [selectedCat, setselectedCat] = useState("second")
//   const [table_display, settable_display] = useState([])
//   const products = useSelector(selecProducts);
//   console.log(products)



//   useEffect(() => {
//     dispatch(fetchProductsAsync());
//     settable_display(products)
//   }, [dispatch]);



//   const handle_search_id = () => {
//     const tmpprod = products.filter(item => item.id === parseInt(search_id));
//     settable_display(tmpprod)
//     setsearch_id("")
//   }
//   const handle_search_title = () => {
//     const tmpprod = products.filter(item => item.name.includes(search_title))
//     settable_display(tmpprod)
//     setsearch_title("")
//   }
//   const handle_category = () => {
//     const tmpprod = products.filter(item => item.category.includes(selectedCat))

//     settable_display(tmpprod)
//   }

//   const handleUpdate = () => {
//     // Handle the update logic here
//     dispatch(editProductAsync(editedProducts[0]))

//   };

//   const handleProductRMV = (prod) => {
//     dispatch(removeProductAsync(prod))
  
    
//   };

//   const handleInputChange = (event, productId, field) => {
//     const { value, files } = event.target;
//     const updatedProducts = [...editedProducts];
//     const productIndex = updatedProducts.findIndex((product) => product.id === productId);
//     if (productIndex !== -1) {
//       const updatedProduct = { ...updatedProducts[productIndex] };
//       updatedProduct[field] = field === 'image' ? files[0] : value;
//       updatedProducts[productIndex] = updatedProduct;
//     } else {
//       updatedProducts.push({ id: productId, [field]: field === 'image' ? files[0] : value });
//     }
//     setEditedProducts(updatedProducts);
//   };

//   return (
//     <div className='productManage_wrap'>
//       <h1>ניהול מוצרים </h1>
//       <div className='prod_search'>
//         <div className='search_box'>
//           <select onChange={(e) => setselectedCat(e.target.value)}>
//             <option>בחר קטגוריה</option>
//             {categories.map((cat, i) => <option key={i}>{cat['category']}</option>)}
//           </select>
//           <div className='search_btn' onClick={() => handle_category()}>סנן לפי קטגוריה</div>
//         </div>
//         <div className='search_box'>
//           <input value={search_id} onChange={(e) => setsearch_id(e.target.value)} placeholder='חיפוש לפי מזהה'></input>
//           <div className='search_btn' onClick={() => search_id.length != "" ? handle_search_id() : alert("שדה ריק")}>חפש לפי מזהה</div>
//         </div>
//         <div className='search_box'>
//           <input value={search_title} onChange={(e) => setsearch_title(e.target.value)} placeholder='חיפוש לפי שם מוצר'></input>
//           <div className='search_btn' onClick={() => search_title.length != "" ? handle_search_title() : alert('שדה ריק')}>חפש לפי שם</div>
//         </div>
//       </div>
//       {table_display.length !== products.length && <div className='search_btn' onClick={() => settable_display(products)}>הצג את כל המוצרים</div>}
//       <div className='table_wrap'>
//         <table>
//           <thead>
//             <tr>
//               <th>מזהה</th>
//               <th>שם מוצר</th>
//               <th>תאור</th>
//               <th>מחיר</th>
//               <th>קטגוריה</th>
//               <th>תמונה</th>
//             </tr>
//           </thead>
//           <tbody>
//             {table_display.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.id}</td>
//                 <td>
//                   <input
//                     type="text"
//                     placeholder={product.name}
//                     onChange={(e) => handleInputChange(e, product.id, 'name')}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     placeholder={product.description}
//                     onChange={(e) => handleInputChange(e, product.id, 'description')}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     placeholder={product.price}
//                     onChange={(e) => handleInputChange(e, product.id, 'price')}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     placeholder={product.category}
//                     onChange={(e) => handleInputChange(e, product.id, 'category')}
//                   />
//                 </td>
//                 <td>
//                   <input type="file" onChange={(e) => handleInputChange(e, product.id, 'image')} />
//                   {/* {product.image && <img src={URL.createObjectURL(product.image)} alt={product.name} style={{ width: '50px', height: '50px' }} />} */}
//                 </td>
//                 <td><div className='upd_btn' onClick={() => handleUpdate({ 'id': product.id })}>עדכן</div></td>
//                 <td><div className='del_btn' onClick={() =>                   handleProductRMV({ 'id': product.id }
//                   )}>מחק</div></td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductManage;







// ********************************************


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  editProductAsync,
  fetchProductsAsync,
  removeProductAsync,
  selecProducts,
  selectCategories,
} from "../../../slicers/productsSlice";
import { useAppDispatch } from "../../../app/hooks";
import "./ProductManage.css";

const ProductManage = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector(selectCategories);
  const products = useSelector(selecProducts);

  const [editedProducts, setEditedProducts] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearchId = () => {
    if (!searchId) return alert("שדה ריק");
    const filtered = products.filter((item) => item.id === +searchId);
    setFilteredProducts(filtered);
    setSearchId("");
  };

  const handleSearchTitle = () => {
    if (!searchTitle) return alert("שדה ריק");
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(searchTitle.toLowerCase())
    );
    setFilteredProducts(filtered);
    setSearchTitle("");
  };

  const handleCategoryFilter = () => {
    if (!selectedCat) return alert("בחר קטגוריה");
    const filtered = products.filter((item) =>
      item.category.includes(selectedCat)
    );
    setFilteredProducts(filtered);
  };

  const handleUpdate = (productId) => {
    const productToUpdate = editedProducts.find((p) => p.id === productId);
    if (productToUpdate) {
      dispatch(editProductAsync(productToUpdate));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeProductAsync({ id: productId }));
  };

  const handleInputChange = (e, productId, field) => {
    const { value, files } = e.target;
    setEditedProducts((prev) => {
      const existing = prev.find((p) => p.id === productId);
      if (existing) {
        return prev.map((p) =>
          p.id === productId ? { ...p, [field]: field === "image" ? files[0] : value } : p
        );
      } else {
        return [...prev, { id: productId, [field]: field === "image" ? files[0] : value }];
      }
    });
  };

  return (
    <div className="productManage_wrap">
      <h1>ניהול מוצרים</h1>

      <div className="prod_search">
        <div className="search_box">
          <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}>
            <option value="">בחר קטגוריה</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
          <button className="search_btn" onClick={handleCategoryFilter}>
            סנן לפי קטגוריה
          </button>
        </div>

        <div className="search_box">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="חיפוש לפי מזהה"
          />
          <button className="search_btn" onClick={handleSearchId}>
            חפש לפי מזהה
          </button>
        </div>

        <div className="search_box">
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="חיפוש לפי שם מוצר"
          />
          <button className="search_btn" onClick={handleSearchTitle}>
            חפש לפי שם
          </button>
        </div>
      </div>

      {filteredProducts.length !== products.length && (
        <button className="search_btn reset_btn" onClick={() => setFilteredProducts(products)}>
          הצג את כל המוצרים
        </button>
      )}

      {/* Desktop Table - show all details */}
      <div className="table_wrap desktop_only">
        <table className="product_table">
          <thead>
            <tr>
              <th>מזהה</th>
              <th>שם מוצר</th>
              <th>תאור</th>
              <th className="price" >מחיר</th>
              <th>קטגוריה</th>
              {/* <th>תמונה</th> */}
              <th>עדכן</th>
              <th>מחק</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <input
                    type="text"
                    placeholder={product.name}
                    onChange={(e) => handleInputChange(e, product.id, "name")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder={product.description}
                    onChange={(e) => handleInputChange(e, product.id, "description")}
                  />
                </td>
                <td className="price">
                  <input
                    type="number"
                    placeholder={product.price}
                    onChange={(e) => handleInputChange(e, product.id, "price")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder={product.category}
                    onChange={(e) => handleInputChange(e, product.id, "category")}
                  />
                </td>
                {/* <td>
                  <input type="file" onChange={(e) => handleInputChange(e, product.id, "image")} />
                </td> */}
                <td>
                  <button className="upd_btn" onClick={() => handleUpdate(product.id)}>
                    עדכן
                  </button>
                </td>
                <td>
                  <button className="del_btn" onClick={() => handleRemove(product.id)}>
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards - only title, id and buttons horizontally aligned */}
      <div className="card_wrap mobile_only">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product_card">
            <div className="card_header_mobile">
              <div className="title_id_wrapper">
                <h3 className="product_title">{product.name}</h3>
                <span className="product_id">#{product.id}</span>
              </div>
              <div className="card_buttons_inline_mobile">
                <button
                  className="upd_btn"
                  onClick={() => handleUpdate(product.id)}
                >
                  עדכן
                </button>
                <button
                  className="del_btn"
                  onClick={() => handleRemove(product.id)}
                >
                  מחק
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManage;
