import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import "./styles.scss";

const defaultImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png",
];

// import required modules
import { FreeMode, Thumbs } from "swiper/modules";

export default function SwiperGallery({ images = defaultImages }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [open, setOpen] = React.useState(false);

  let imagesCopy = images;

  if (images.length < 1) {
    imagesCopy = defaultImages;
  }

  return (
    <>
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
      >
        {imagesCopy.map((image, index) => (
          <SwiperSlide key={index} onClick={() => setOpen(true)}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper"
      >
        {imagesCopy.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={imagesCopy.map((image) => ({ src: image }))}
      />
    </>
  );
}
