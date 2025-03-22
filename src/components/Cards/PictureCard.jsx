import React, { useState, useEffect } from "react";
import {
  Card,
  CardImageWrapper,
  StyledImage,
  StyledVideo,
  CardTitle,
  CardDescription,
  SlideWrapper,
  SlideCounter,
} from "../Pictures/PicturesStyle";

/* Optional carousel if you want an auto-slideshow in the card. */
const Carousel = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFadeIn(true);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <SlideWrapper>
      <StyledImage src={images[currentIndex]} alt={alt} fadeIn={fadeIn} />
      <SlideCounter>
        {currentIndex + 1}/{images.length}
      </SlideCounter>
    </SlideWrapper>
  );
};

const PictureCard = ({ picture, onClick }) => {
  const isVideo = picture.type === "video";

  return (
    <Card onClick={onClick}>
      <CardImageWrapper>
        {isVideo ? (
          <StyledVideo src={picture.video} muted loop autoPlay fadeIn />
        ) : picture.images ? (
          /* If multiple images => show carousel or just first image. */
          <Carousel images={picture.images} alt={picture.title} />
        ) : (
          <StyledImage src={picture.image} alt={picture.title} fadeIn />
        )}
      </CardImageWrapper>

      <CardTitle>{picture.title}</CardTitle>
      {picture.description && (
        <CardDescription>{picture.description}</CardDescription>
      )}
    </Card>
  );
};

export default PictureCard;
