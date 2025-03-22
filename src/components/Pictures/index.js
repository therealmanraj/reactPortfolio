import React, { useState, useEffect } from "react";
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
  Card,
  CardImageWrapper,
  CardTitle,
  CardDescription,
  StyledImage,
} from "./PicturesStyle";
import { pictures } from "../../data/constants";

// Carousel for multiple images
const Carousel = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images]);

  return <StyledImage src={images[currentIndex]} alt={alt} />;
};

const Pictures = () => {
  return (
    <Container id="pictures">
      <Wrapper>
        <Title>Pictures</Title>
        <Desc>I love taking pictures. Here are some of my favorite shots:</Desc>
        <CardContainer>
          {pictures.map((picture) => (
            <Card key={picture.id}>
              <CardImageWrapper>
                {/* If multiple images exist, use carousel; otherwise show single image */}
                {picture.images ? (
                  <Carousel images={picture.images} alt={picture.title} />
                ) : (
                  <StyledImage src={picture.image} alt={picture.title} />
                )}
              </CardImageWrapper>
              <CardTitle>{picture.title}</CardTitle>
              {picture.description && (
                <CardDescription>{picture.description}</CardDescription>
              )}
            </Card>
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Pictures;
