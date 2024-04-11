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
    }, [productId, dispatch]);

    useEffect(() => {
        product && setdisplay_img(product.image);
    }, [product]);


    // const structuredData = product && {
    //     "@context": "http://schema.org/",
    //     "@type": "Product",
    //     "name": product.name,
    //     "description": product.description,
    //     "image": [`${SERVER}/static${product.image}`],
    //     "price": product.price,
    //     "priceCurrency": "USD",
    //     // "sku": product.id,
    //     // "brand": {
    //     //     "@type": "Brand",
    //     //     "name": "Your Brand Name Here"
    //     // }
    // };

    const structuredData = product && {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": [`${SERVER}/static${product.image}`],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.averageRating, // Assuming you have this data
            "reviewCount": product.reviewCount // Assuming you have this data
        },
        "offers": {
            "@type": "Offer",
            // "availability": "https://schema.org/InStock", // Update based on your data
            "price": product.price,
            "priceCurrency": "USD" // Or whatever your currency is
        },
        // "review": product.reviews.map(review => ({
        //     "@type": "Review",
        //     "author": review.author,
        //     "datePublished": review.datePublished,
        //     "reviewBody": review.body,
        //     "name": review.title,
        //     "reviewRating": {
        //         "@type": "Rating",
        //         "bestRating": "5",
        //         "ratingValue": review.rating,
        //         "worstRating": "1"
        //     }
        // })) // Assuming you have this data
    };
    
    const goBack = () => {
        window.history.back();
      };
    return (
        <div className="mainProductContainer">
           {product && <Helmet>
                        <title>{product.name}</title>
                        <meta name="description" content={product.description} />
                        <meta name="keywords" content={product.keywords || product.description} />
                        <link rel="canonical" href={`https://silver-cocada-e03718.netlify.app/product/${product.id}`} />
                        <script type="application/ld+json">
                        {structuredData ? JSON.stringify(structuredData) : null}                 
                               </script>
            </Helmet>}
         
            <div className='backBTN' onClick={goBack}>חזרה לעמוד ראשי</div>

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
