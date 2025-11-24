import React, { useState } from "react";
import { addProductAsync, fetchProductsAsync } from "../../../slicers/productsSlice";
import { useAppDispatch } from "../../../app/hooks";
import "./addproduct.css";

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [desc, setdesc] = useState("");
  const [img, setimg] = useState(null);
  const [img1, setimg1] = useState(null);
  const [img2, setimg2] = useState(null);
  const [img3, setimg3] = useState(null);
  const [img4, setimg4] = useState(null);

  const [category, setcategory] = useState("");

  // const handleImg = (event) => {
  //   // `${event.target.name}`(event.target.files[0]);
  //   event.target.name == 'img' && setimg([...img,event.target.files[0]])
  //   event.target.name == 'img1' && setimg([...img,event.target.files[0]])
  //   event.target.name == 'img2' && setimg([...img,event.target.files[0]])
  //   event.target.name == 'img3' && setimg([...img,event.target.files[0]])
  //   event.target.name == 'img4' && setimg([...img,event.target.files[0]])
  //   console.log(img)
  // };
  const handleImg = (event) => {
    const name = event.target.name;
    const file = event.target.files[0];

    if (name === 'img') setimg(file);
    else if (name === 'img1') setimg1(file);
    else if (name === 'img2') setimg2(file);
    else if (name === 'img3') setimg3(file);
    else if (name === 'img4') setimg4(file);
  };


const sendProduct = () => {
  dispatch(addProductAsync({
    name,
    price,
    description: desc,
    image: img,
    image1: img1,
    image2: img2,
    image3: img3,
    image4: img4,
    category
  }))
  .unwrap()
  .then(() => {
    // reload products from server so new one appears
    dispatch(fetchProductsAsync());
  })
  .catch((err) => {
    console.error(err);
    alert("שגיאה בהוספת מוצר");
  });
};

  return (
    <div className="main_add">
      <h4> הוספת מוצר:</h4>
      <input placeholder="שם מוצר" onChange={(e) => setname(e.target.value)} />
      <input
        placeholder="מחיר מוצר"
        type="number"
        onChange={(e) => setprice(e.target.valueAsNumber)}
      />
      <input
        placeholder="תאור מוצר"
        onChange={(e) => setdesc(e.target.value)}
      />
      <input
        placeholder="קטגוריה"
        onChange={(e) => setcategory(e.target.value)}
      />
      <div className="file-upload">
        בחירת תמונה :
        <input
          name="img"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleImg}
        />
      </div>
      <div className="file-upload">
        בחירת תמונה :
        <input
          name="img2"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleImg}
        />
      </div>
      <div className="file-upload">
        בחירת תמונה :
        <input
          name="img3"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleImg}
        />
      </div>
      <div className="file-upload">
        בחירת תמונה :
        <input
          name="img4"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleImg}
        />
      </div>
      <button onClick={sendProduct}>הוסף מוצר לחנות</button>
    </div>
  );
};

export default AddProduct;
