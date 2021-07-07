import React, { FC, useEffect, useState } from "react";
import "./style.css";
import { useInView } from "react-intersection-observer";

type propsType = {
  food: any;
};
export const ImageComponent: FC<propsType> = (props: propsType) => {
  const [image, setImage] = useState("");
  const [ref, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (image == "" && inView) {
      fetch(
        `https://evening-brook-32083.herokuapp.com/images/${props.food.img}`
      )
        .then((res) => res.json())
        .then((res) => setImage(res.src));
    }
  }, [inView]);
  return (
    <img
      ref={ref}
      className="CurrentFood__food-image"
      src={`data:image/jpeg;base64,${image}`}
    />
  );
};
