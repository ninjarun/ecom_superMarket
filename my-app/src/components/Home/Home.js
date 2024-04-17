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
import { SERVER } from '../../globalVar'
import Cart from "../navigator/Cart/Cart"

const Home = () => {
  const dispatch = useAppDispatch()
  const categories = useSelector(selectCategories)
  const [homeDisplay, sethomeDisplay] = useState('all')
  const [cat_prods, setcat_prods] = useState([])

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

  let positionCounter = 1;
  const itemData = categories && categories.map(cat => {
    // console.log(cat['products'])

    return cat['products'].map(prod => {
      // console.log(prod['id'])
      return {
        "@type": "Product",
        "position": positionCounter++,
        "name": prod['name'], // Replace with your actual data
        "url": `${SERVER}/product/${prod['id']}`, // Replace with your actual data
        "image": SERVER + '/static' + prod['image'], // Replace with your actual data
        "offers": {
          "@type": "Offer",
          "price": prod['price'],
          "priceCurrency": "USD", // replace with the currency you use
          "availability": "InStock" // replace with the actual availability if possible
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "5.00",
            "currency": "USD"
          },
          "description": "Free shipping on orders over $50."
        }


      }
    })


  })

  const structuredData = itemData && JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": itemData.flat()
  });

  return (

    <div className='mainDiv'>
      <Helmet>
        <title>{homeDisplay === 'all' ? 'All Products' : `Category: ${homeDisplay}`}</title>
        <meta name="description" content="Welcome to the best Candy store" />
        <meta name="keywords" content="chocholate, candy, snacks" />
        <script type="application/ld+json">
          {structuredData}
        </script>
      </Helmet>

      <div className='forCart'>
        <Cart></Cart>
      </div>
      <div className='show'>
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
            <div className='oneCarousel'  key={i}>
              <div className='carousel_headling'              >
                <div onClick={() => sethomeDisplay(cat['category'])} style={{ height: '25px', display: 'flex', marginTop: '5px', zIndex: '2' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                  </svg>
                  <div style={{ marginRight: '10px', marginLeft: '10px' ,width:'100px'}}>{cat['products'].length} הצג הכל</div>
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
    </div>
  )
}

export default Home





