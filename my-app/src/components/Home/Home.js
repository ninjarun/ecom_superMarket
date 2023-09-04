// import Hero from './Hero'
// import SingleProd from '../single_product_card/SingleProd'
// import Footer from './Footer'
// import { useSelector } from 'react-redux'
// import { fetchProductsAsync, selecProducts, selectCategories } from '../../slicers/productsSlice'
// import { useAppDispatch } from '../../app/hooks'
// import { useEffect, useState, } from 'react'
// import ProductCarousel from '../product_carousel/ProductCarousel'
// import ProductPopup from '../popuupProduct/ProductPopup'
// import { Helmet } from 'react-helmet';
// import './home.css'



// const Home = () => {
//   const dispatch = useAppDispatch()
//   const categories = useSelector(selectCategories)
//   const [homeDisplay, sethomeDisplay] = useState('all')
//   const [cat_prods, setcat_prods] = useState([])
//   // const [pageTitle, setpageTitle] = useState(second)
//   // const [pageDescription, setpageDescription] = useState(second)

//   useEffect(() => {
//     dispatch(fetchProductsAsync())
//   }, [dispatch])
//   useEffect(() => {
//     if (homeDisplay !== 'all') {
//       let currentCatProds = categories.find(cat => cat.category === homeDisplay);
//       if (currentCatProds && currentCatProds['products']) {
//         setcat_prods(currentCatProds['products']);
//       } else {
//         setcat_prods([]); // clear if no products found for the category
//       }
//     }
//   }, [homeDisplay, categories]);

//   return (
//     <div >
//       <Hero></Hero>

//       {/* WHOLE CATEGORY PRODUCT DISPLAY - WILL BE SHOWEN ONCE USE CLICKS ON SHOW ALL */}
//       {homeDisplay != 'all' &&
//         <div className='catDisplay'>
//           <div className='cat_title'>
//             {homeDisplay}
//           </div>
//           <div className='goBackBTN' onClick={() => sethomeDisplay('all')}>
//             חזור אל כל המוצרים
//           </div>
//           <div className='prodsCatWrap'>
//             {cat_prods.map((prod, i) => (
//               <SingleProd
//                 prod={prod}
//                 // price={prod.price}
//                 // img={prod.image}
//                 // id={prod.id}
//                 // title={prod.name}
//                 amount={0}
//                 key={i}>

//               </SingleProd >
//             ))}
//           </div>
//         </div>}

//       {/* CAROUSEL DISPLAY DIVIDED BY CATEGORIES */}
//       <div className='carouselsWrapper'>
//         {homeDisplay == 'all' && (categories.map((cat, i) =>
//           <div style={{ marginTop: '30px' }} key={i}>
//             <div className='carousel_headling'              >
//               <div onClick={() => sethomeDisplay(cat['category'])} style={{ height: '25px', display: 'flex', marginTop: '5px', zIndex: '2' }}>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
//                   <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
//                 </svg>
//                 <div style={{ marginRight: '10px', marginLeft: '10px' }}>הצג הכל</div>
//               </div>
//               <div className='subtitle'> {cat['category']}</div>
//             </div>
//             <ProductCarousel prods={cat['products']}></ProductCarousel>
//           </div>
//         ))}
//       </div>
//       <Footer></Footer>
//       {/* <ProductPopup></ProductPopup> */}
//     </div>
//   )
// }

// export default Home









import Hero from './Hero'
import SingleProd from '../single_product_card/SingleProd'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { fetchProductsAsync, selecProducts, selectCategories } from '../../slicers/productsSlice'
import { useAppDispatch } from '../../app/hooks'
import { useEffect, useState, } from 'react'
import ProductCarousel from '../product_carousel/ProductCarousel'
import ProductPopup from '../popuupProduct/ProductPopup'
import { Helmet } from 'react-helmet';
import './home.css'



const Home = () => {
  const dispatch = useAppDispatch()
  const categories = useSelector(selectCategories)
  const [homeDisplay, sethomeDisplay] = useState('all')
  const [cat_prods, setcat_prods] = useState([])
  // const [pageTitle, setpageTitle] = useState(second)
  // const [pageDescription, setpageDescription] = useState(second)

  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])
  useEffect(() => {
    if (homeDisplay !== 'all') {
      let currentCatProds = categories.find(cat => cat.category === homeDisplay);
      if (currentCatProds && currentCatProds['products']) {
        setcat_prods(currentCatProds['products']);
      } else {
        setcat_prods([]); // clear if no products found for the category
      }
    }
  }, [homeDisplay, categories]);

  return (

    <div >
      <Helmet>
        <title>{homeDisplay === 'all' ? 'All Products' : `Category: ${homeDisplay}`}</title>
        <meta name="description" content="Welcome to the best Candy store" />
        <meta name="keywords" content="chocholate, candy, snacks" />
      </Helmet>

      <Hero></Hero>

      {/* WHOLE CATEGORY PRODUCT DISPLAY - WILL BE SHOWEN ONCE USE CLICKS ON SHOW ALL */}
      {homeDisplay != 'all' &&
        <div className='catDisplay'>
          <div className='cat_title'>
            {homeDisplay}
          </div>
          <div className='goBackBTN' onClick={() => sethomeDisplay('all')}>
            חזור אל כל המוצרים
          </div>
          <div className='prodsCatWrap'>
            {cat_prods.map((prod, i) => (
              <SingleProd
                prod={prod}
                // price={prod.price}
                // img={prod.image}
                // id={prod.id}
                // title={prod.name}
                amount={0}
                key={i}>

              </SingleProd >
            ))}
          </div>
        </div>}

      {/* CAROUSEL DISPLAY DIVIDED BY CATEGORIES */}
      <div className='carouselsWrapper'>
        {homeDisplay == 'all' && (categories.map((cat, i) =>
          <div style={{ marginTop: '30px' }} key={i}>
            <div className='carousel_headling'              >
              <div onClick={() => sethomeDisplay(cat['category'])} style={{ height: '25px', display: 'flex', marginTop: '5px', zIndex: '2' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                <div style={{ marginRight: '10px', marginLeft: '10px' }}>הצג הכל</div>
              </div>
              <div className='subtitle'> {cat['category']}</div>
            </div>
            <ProductCarousel prods={cat['products']}></ProductCarousel>
          </div>
        ))}
      </div>
      <Footer></Footer>
      {/* <ProductPopup></ProductPopup> */}
    </div>
  )
}

export default Home










// ###### CHATGPT SEO OPTIMIZED   example 


// import React, { useEffect, useState } from 'react';
// import {  useSelector } from 'react-redux';
// import { fetchProductsAsync, selectCategories } from '../../slicers/productsSlice';
// import Hero from './Hero';
// import SingleProd from '../single_product_card/SingleProd';
// import ProductCarousel from '../product_carousel/ProductCarousel';
// import Footer from './Footer';
// import './home.css';
// import { useAppDispatch } from '../../app/hooks'

// const Home = () => {
//   const dispatch = useAppDispatch();
//   const categories = useSelector(selectCategories);
//   const [homeDisplay, setHomeDisplay] = useState('all');
//   const [catProds, setCatProds] = useState([]);

//   useEffect(() => {
//     dispatch(fetchProductsAsync());
//   }, [dispatch]);

//   useEffect(() => {
//     if (homeDisplay !== 'all') {
//       const currentCatProds = categories.find(cat => cat.category === homeDisplay);
//       if (currentCatProds?.products) {
//         setCatProds(currentCatProds.products);
//       } else {
//         setCatProds([]);
//       }
//     }
//   }, [homeDisplay, categories]);

//   return (
//     <main role="main">
//       <header>
//         <Hero />
//       </header>

//       <section aria-labelledby="product-category">
//         {homeDisplay !== 'all' && (
//           <div className="catDisplay">
//             <h1 id="product-category">{homeDisplay}</h1>
//             <button className="goBackBTN" onClick={() => setHomeDisplay('all')}>Go Back to All Products</button>
//             <div className="prodsCatWrap">
//               {catProds.map((prod, i) => (
//                 <SingleProd prod={prod} amount={0} key={i} />
//               ))}
//             </div>
//           </div>
//         )}
//       </section>

//       <section aria-labelledby="product-carousel">
//         <div className="carouselsWrapper">
//           {homeDisplay === 'all' && categories.map((cat, i) => (
//             <div style={{ marginTop: '30px' }} key={i}>
//               <h2 id="product-carousel" className="carousel_headling">
//                 <button onClick={() => setHomeDisplay(cat.category)}>Show All</button>
//                 <span className="subtitle">{cat.category}</span>
//               </h2>
//               <ProductCarousel prods={cat.products} />
//             </div>
//           ))}
//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// };

// export default Home;
