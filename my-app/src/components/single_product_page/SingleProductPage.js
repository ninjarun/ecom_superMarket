// import React, { useEffect, useState } from 'react'
// import { Helmet } from 'react-helmet';
// import { useSelector } from 'react-redux';
// import { fetchOneProductAsync, selecProducts, selectProduct } from '../../slicers/productsSlice';
// import { useParams } from 'react-router-dom';
// import { useAppDispatch } from '../../app/hooks';
// import { SERVER } from '../../globalVar';
// import { add2cart, increment_amount, selecCart } from '../navigator/Cart/cartSlice';

// import "./singProductPage.css"

// const SingleProductPage = () => {
//     const { productId } = useParams()
//     const dispatch = useAppDispatch()
//     const product = useSelector(selectProduct)
//     const cart = useSelector(selecCart)
//     const [display_img, setdisplay_img] = useState('static/images/placeholder.png')
//     const [button_display, setbutton_display] = useState(true)

//     let objectWithId;
//     try { objectWithId = cart.cart.find(obj => obj.id === product.id); } catch (error) { console.log(error) }


//     useEffect(() => {
//         objectWithId ? setbutton_display(false) : setbutton_display(true)
//     }, [objectWithId])

//     useEffect(() => {
//         dispatch(fetchOneProductAsync(productId))
//     }, [productId])

//     useEffect(() => {
//         product && setdisplay_img(product.image)

//     }, [product])



//     // console.log('products', products)
//     // console.log(productId)
//     // console.log(product)
//     return (
//         <div className='mainSingleProd'>
//             <Helmet>
//                 <title>{product && product.name}</title>
//                 <meta name="description" content={product && product} />
//                 <meta name="keywords" content={product && product.description} />
//             </Helmet>
//             {product &&



//                 <div className='subWrapper'>
//                     <div className='images_wrapper'>

//                         <img className='sing_prod_img' alt='' src={`${SERVER}/static${display_img}`}></img>
//                         <div className='small_images'>
// {product.image !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(product.image)} className='small_img' alt='' src={`${SERVER}/static${product.image}`}></img>}
// {product.image2 !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(product.image2)} className='small_img' alt='' src={`${SERVER}/static${product.image2}`}></img>}
// {product.image3 !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(product.image3)} className='small_img' alt='' src={`${SERVER}/static${product.image3}`}></img>}
// {product.image4 !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(product.image4)} className='small_img' alt='' src={`${SERVER}/static${product.image4}`}></img>}
// {product.image5 !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(product.image5)} className='small_img' alt='' src={`${SERVER}/static${product.image5}`}></img>}
//                         </div>
//                     </div>
//                     <div className='subWrapper2'>
//                         <div className='prod_info'>
//                             <div className='popup_title'>{product.name}</div>
//                             <div className='popup_price' >&#8362;{product.price} :מחיר ליחידה</div>
//                             <div className='popup_desc'>{product.description}</div>
//                             <div className='btn_wrapper'>
//                                 {
//                                     button_display ?
//                                         <div className='add2cart' onClick={() => {
//                                             setbutton_display(!button_display)
//                                             dispatch(add2cart({ 'id': product.id, 'title': product.title, 'price': product.price, 'img': product.image, 'amount': 1 }))
//                                         }}>הוסף לסל
//                                         </div>
//                                         :
//                                         <div className='choose_quantity' >
//                                             <div className='decrease_amount_prod_card' onClick={() => {
//                                                 if (objectWithId.amount > 1) {
//                                                     dispatch(increment_amount({ 'id': product.id }))
//                                                 } else {
//                                                     setbutton_display(!button_display)
//                                                     dispatch(increment_amount({ 'id': product.id }))
//                                                 }
//                                             }}>
//                                                 &nbsp; - &nbsp;</div>
//                                             <div>{objectWithId ? <span>{objectWithId.amount}</span> : setbutton_display(!button_display)}</div>
//                                             <div className='add_amount_prod_card' onClick={() => {
//                                                 dispatch(add2cart({ 'id': product.id, 'title': product.name, 'price': product.price, 'img': product.image, 'amount': 1 }))
//                                             }}>
//                                                 &nbsp; + &nbsp; </div>
//                                         </div>
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                 </div>}


//         </div>
//     )
// }

// export default SingleProductPage




import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { fetchOneProductAsync, selecProducts, selectProduct } from '../../slicers/productsSlice';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { SERVER } from '../../globalVar';
import { add2cart, increment_amount, selecCart } from '../navigator/Cart/cartSlice';

import "./singProductPage.css";

const SingleProductPage = () => {
    const { productId } = useParams();
    const dispatch = useAppDispatch();
    const product = useSelector(selectProduct);
    const cart = useSelector(selecCart);
    const [display_img, setdisplay_img] = useState('static/images/placeholder.png');
    const [button_display, setbutton_display] = useState(true);

    let objectWithId;
    try {
        objectWithId = cart.cart.find(obj => obj.id === product.id);
    } catch (error) {
        console.log(error);
    }

    useEffect(() => {
        objectWithId ? setbutton_display(false) : setbutton_display(true);
    }, [objectWithId]);

    useEffect(() => {
        dispatch(fetchOneProductAsync(productId));
    }, [productId]);

    useEffect(() => {
        product && setdisplay_img(product.image);
    }, [product]);

    return (
        <div className="mainProductContainer">
            <Helmet>
                <title>{product && product.name}</title>
                <meta name="description" content={product && product} />
                <meta name="keywords" content={product && product.description} />
            </Helmet>
            {product &&
                <div className="contentWrapper">
                    <div className="imageSection">
                        <img className="mainImage" alt="" src={`${SERVER}/static${display_img}`}></img>
                        <div className="thumbnailImages">
                            {product.image !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(product.image)} className='small_img' alt='' src={`${SERVER}/static${product.image}`}></img>}
                            {product.image2 !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(product.image2)} className='small_img' alt='' src={`${SERVER}/static${product.image2}`}></img>}
                            {product.image3 !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(product.image3)} className='small_img' alt='' src={`${SERVER}/static${product.image3}`}></img>}
                            {product.image4 !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(product.image4)} className='small_img' alt='' src={`${SERVER}/static${product.image4}`}></img>}
                            {product.image5 !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(product.image5)} className='small_img' alt='' src={`${SERVER}/static${product.image5}`}></img>}            </div>
                    </div>
                    <div className="detailSection">
                        <div className="productInfo">
                            <div className="productTitle">{product.name}</div>
                            <div className="productPrice">&#8362; {product.price}</div>
                            <div className="productDescription">{product.description}</div>
                            <div className="buttonContainer">
                                {
                                    button_display ?
                                        <div className='add2cart' onClick={() => {
                                            setbutton_display(!button_display)
                                            dispatch(add2cart({ 'id': product.id, 'title': product.title, 'price': product.price, 'img': product.image, 'amount': 1 }))
                                        }}>הוסף לסל
                                        </div>
                                        :
                                        <div className='choose_quantity' >
                                            <div className='decrease_amount_prod_card' onClick={() => {
                                                if (objectWithId.amount > 1) {
                                                    dispatch(increment_amount({ 'id': product.id }))
                                                } else {
                                                    setbutton_display(!button_display)
                                                    dispatch(increment_amount({ 'id': product.id }))
                                                }
                                            }}>
                                                &nbsp; - &nbsp;</div>
                                            <div>{objectWithId ? <span>{objectWithId.amount}</span> : setbutton_display(!button_display)}</div>
                                            <div className='add_amount_prod_card' onClick={() => {
                                                dispatch(add2cart({ 'id': product.id, 'title': product.name, 'price': product.price, 'img': product.image, 'amount': 1 }))
                                            }}>
                                                &nbsp; + &nbsp; </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default SingleProductPage;
