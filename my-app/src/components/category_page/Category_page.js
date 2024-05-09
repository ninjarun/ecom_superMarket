import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectCategories } from '../../slicers/productsSlice';
import Cart from '../navigator/Cart/Cart';
import './category_page.css'
import SingleProd from '../single_product_card/SingleProd';
import SingleProd2 from '../single_product_card2/SingleProd2';
const Category_page = () => {
    const { category } = useParams();
    const categories = useSelector(selectCategories);
    const category_object = categories.find(cat => cat.category === category)
    console.log('category', category);
    return (
        <div>
            <div className='category_cart'>

                <Cart></Cart>
            </div>
            <div className='category_show'  >
                <div className='prodsCatWrapCategory'>

                    {/* {categories[`${category}`].category_object} */}
                    {category_object.products.map((prod, i) => (
                        <SingleProd2
                            prod={prod}
                            // price={prod.price}
                            // img={prod.image}
                            // id={prod.id}
                            // title={prod.name}
                            amount={0}
                            key={i}>

                        </SingleProd2 >

                    ))}
                </div>
            </div>


        </div>
    )
}

export default Category_page