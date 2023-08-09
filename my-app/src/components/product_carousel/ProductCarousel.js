import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './productCarousel.css';
import { Navigation } from 'swiper/modules';
import SingleProd from '../single_product_card/SingleProd';

const ProductCarousel = (props) => {
    // console.log(props)
    return (
        <div style={{ direction: 'rtl' }} >
            {/* <h3>{props.prods[0].category}</h3> */}
            <Swiper
                slidesPerView={5.5}
                spaceBetween={0.5}
                loop={true}
                pagination={{ clickable: true, }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                 breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
          // Add more breakpoints as needed
        }}
            

            >
                {props.prods.map((prod, i) =>
                    <SwiperSlide key={i}  >
                        <SingleProd
                            prod={prod}
                            // price={prod.price}
                            // desc={prod.description}
                            // img={prod.image}
                            // id={prod.id}
                            // title={prod.name}
                            amount={0}
                        >
                        </SingleProd >
                    </SwiperSlide>
                )}
                {/* 
                <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide> */}
            </Swiper></div>
    )
}

export default ProductCarousel