import Hero from './Hero'
import SingleProd from '../single_product_card/SingleProd'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { fetchProductsAsync, selecProducts, selectCategories } from '../../slicers/productsSlice'
import { useAppDispatch } from '../../app/hooks'
import { useEffect, useState, } from 'react'
import ProductCarousel from '../product_carousel/ProductCarousel'
import ProductPopup from '../popuupProduct/ProductPopup'
import './home.css'
const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])
  const categories = useSelector(selectCategories)
  // const products = useSelector(selecProducts)
console.log(categories)
  const [homeDisplay, sethomeDisplay] = useState('all')
  // console.log(homeDisplay)
  const [cat_prods, setcat_prods] = useState([])
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
      <div style={{ width: '85%', margin: 'auto' }}>
        {homeDisplay == 'all' && (categories.map((cat, i) =>
          <div style={{marginTop:'30px'}} key={i}>
            <div className='carousel_headling'              >
              <div onClick={() => sethomeDisplay(cat['category'])} style={{height:'25px', display: 'flex',marginTop:'5px', zIndex: '9999' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                <div style={{ marginRight: '10px' ,marginLeft:'10px'}}>הצג הכל</div>
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