import React from 'react'

const Hero = () => {
    return (
        <div style={{width:'95%',margin:'auto'}} >
            <div   id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div  className="carousel-inner">
                    <div className="carousel-item active">
                        <img  src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/0d3fa3e1-8524-4c51-a861-8118b2af4c55.__CR0,0,970,300_PT0_SX970_V1___.png" className="d-block w-100" alt="..."></img>
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.intelligencenode.com/blog/wp-content/uploads/2019/06/Prime-day.jpg" className="d-block w-100" alt="..."></img>
                    </div>
                    <div className="carousel-item">
                        <img  src="https://cdn.shopify.com/s/files/1/0447/1246/0439/collections/prime_banner_1024x.png?v=1654642705" className="d-block w-100" alt="..."></img>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>



        </div>
    )
}

export default Hero

// import React from 'react';

// const Hero = () => {
//   return (
//     <div>
//       <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/0d3fa3e1-8524-4c51-a861-8118b2af4c55.__CR0,0,970,300_PT0_SX970_V1___.png" className="d-block w-100" alt="..." style={{ maxWidth: "1330px", maxHeight: "330px" }}></img>
//           </div>
//           <div className="carousel-item">
//             <img src="https://www.intelligencenode.com/blog/wp-content/uploads/2019/06/Prime-day.jpg" className="d-block w-100" alt="..." style={{ maxWidth: "1330px", maxHeight: "330px" }}></img>
//           </div>
//           <div className="carousel-item">
//             <img src="https://cdn.shopify.com/s/files/1/0447/1246/0439/collections/prime_banner_1024x.png?v=1654642705" className="d-block w-100" alt="..." style={{ maxWidth: "1330px", maxHeight: "330px" }}></img>
//           </div>
//         </div>
//         <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Hero;
