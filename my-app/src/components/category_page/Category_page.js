// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom'
// import { fetchCategoryAsync, selectCategories, selectProduct } from '../../slicers/productsSlice';
// import Cart from '../navigator/Cart/Cart';
// import './category_page.css'
// // import SingleProd from '../single_product_card/SingleProd';
// import SingleProd2 from '../single_product_card2/SingleProd2';
// import { useAppDispatch } from '../../app/hooks';
// import { fetchCartAsync } from '../navigator/Cart/cartSlice';
// const Category_page = () => {
//     const dispatch = useAppDispatch();
//     const { category } = useParams();
//     const categories = useSelector(selectCategories);
//     const products = useSelector(selectProduct)

// useEffect(() => {
//     if (category) {
//     console.log('runing###############')
//     dispatch(fetchCategoryAsync(category))
//     }
// }, [category,dispatch])


//     const category_object = categories.find(cat => cat.category === category)
//     console.log(products);
//     console.log('***********************88')

//     return (
//         <div>
//             <div className='category_cart'>

//                 <Cart></Cart>
//             </div>
//             <div className='category_show'  >
//                 <div className='prodsCatWrapCategory'>

//                     {/* {categories[`${category}`].category_object} */}
//                     {category_object.products.map((prod, i) => (
//                         <SingleProd2
//                             prod={prod}
//                             // price={prod.price}
//                             // img={prod.image}
//                             // id={prod.id}
//                             // title={prod.name}
//                             amount={0}
//                             key={i}>

//                         </SingleProd2 >

//                     ))}
//                 </div>
//             </div>


//         </div>
//     )
// }

// export default Category_page






import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchCategoryAsync,
  selectCategories,
  selectProduct
} from '../../slicers/productsSlice';
import Cart from '../navigator/Cart/Cart';
import './category_page.css';
import SingleProd2 from '../single_product_card2/SingleProd2';
import { useAppDispatch } from '../../app/hooks';

const Category_page = () => {
  const dispatch = useAppDispatch();
  const { category } = useParams();

  const categories = useSelector(selectCategories);
  const products = useSelector(selectProduct);

  useEffect(() => {
    if (category) {
      console.log('running###############');
      dispatch(fetchCategoryAsync(category));
    }
  }, [category, dispatch]);

  const category_object = categories.find((cat) => cat.category === category);

  // 🛡️ Safeguard against undefined on first render
  if (!category_object) {
    return <div className="loading">Loading category...</div>;
  }

  return (
    <div>
      <div className="category_cart">
        <Cart />
      </div>
      <div className="category_show">
        <div className="prodsCatWrapCategory">
          {category_object.products.map((prod, i) => (
            <SingleProd2 prod={prod} amount={0} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category_page;
