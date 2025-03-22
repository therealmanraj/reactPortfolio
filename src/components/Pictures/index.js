import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { pictures } from "../../data/constants";

/* ─────────────────────────────────────────────────────────────────────────────
   1. Styled components for the container, cards, and layout
   ───────────────────────────────────────────────────────────────────────────── */

const Container = styled.div`
  background: #1b1c1e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 98%, 0 100%);
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 10px 0px 100px 0;
  gap: 12px;

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: #ffffff;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  color: #c2c2c2;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

/**
 * Matching the Projects spacing approach:
 * - Flex container
 * - Wrap the cards
 * - Use "gap" for consistent spacing
 */
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

/**
 * Updated Card with a subtle hover transition
 */
const Card = styled.div`
  background-color: #292d3e;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  width: 90%;
  max-width: 400px;
  height: 420px; /* fixed height for consistency */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-align: center;
  padding: 16px;
  box-sizing: border-box;
  cursor: pointer;

  /* Smooth hover effect on transform and box-shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
  }
`;

const CardImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
`;

/**
 * For single images in the card
 */
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  opacity: ${({ fadeIn }) => (fadeIn ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

/**
 * For preview videos in the card (muted + loop)
 */
const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  opacity: ${({ fadeIn }) => (fadeIn ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

/**
 * Title + description
 */
const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 6px;
`;

const CardDescription = styled.div`
  font-size: 14px;
  color: #d1d1d1;
  margin: 0 0 8px 0;
`;

/**
 * Optional: If you do an auto-slideshow in each card,
 * you can keep or remove this SlideWrapper + SlideCounter.
 */
const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SlideCounter = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none;
`;

/* ─────────────────────────────────────────────────────────────────────────────
   2. Modal styled components (Next/Prev for images in the same card or video)
   ───────────────────────────────────────────────────────────────────────────── */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #292d3e;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 99999;
  background-color: transparent;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 60vh; /* or a fixed px height, e.g. 500px */
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * For the modal image (object-fit: contain to show entire image)
 */
const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

/**
 * For the modal video (with controls so user can play sound)
 */
const ModalVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

/**
 * Left/right arrow buttons
 */
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 8px 14px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const LeftArrowButton = styled(ArrowButton)`
  left: 10px;
`;

const RightArrowButton = styled(ArrowButton)`
  right: 10px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #ffffff;
`;

const ModalDescription = styled.p`
  color: #d1d1d1;
`;

/* ─────────────────────────────────────────────────────────────────────────────
   3. PictureModal: cycles among images or a single video
   ───────────────────────────────────────────────────────────────────────────── */

const PictureModal = ({ picture, setOpenModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!picture) return null;

  const closeModal = () => setOpenModal({ state: false, picture: null });
  const isVideo = picture.type === "video";

  // If it's an image card with multiple images
  const images = picture.images ?? (picture.image ? [picture.image] : []);
  const currentImage = images[currentIndex] || null;

  // Next / Prev for multiple images
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={closeModal}>&times;</CloseButton>

        <ModalImageWrapper>
          {isVideo ? (
            /* Single video with controls */
            <ModalVideo
              src={picture.video}
              controls
              autoPlay={false} /* user must click play for sound */
            />
          ) : (
            /* Show image or multiple images */
            <>
              {currentImage && (
                <ModalImage src={currentImage} alt={picture.title} />
              )}
              {images.length > 1 && (
                <>
                  <LeftArrowButton onClick={prevImage}>
                    &#10094;
                  </LeftArrowButton>
                  <RightArrowButton onClick={nextImage}>
                    &#10095;
                  </RightArrowButton>
                </>
              )}
            </>
          )}
        </ModalImageWrapper>

        <ModalTitle>{picture.title}</ModalTitle>
        {picture.description && (
          <ModalDescription>{picture.description}</ModalDescription>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   4. Optional Carousel for images in each card (auto slideshow)
   ───────────────────────────────────────────────────────────────────────────── */

const Carousel = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
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

/* ─────────────────────────────────────────────────────────────────────────────
   5. Main Pictures component (cards with images or videos)
   ───────────────────────────────────────────────────────────────────────────── */

export default function Pictures() {
  const [openModal, setOpenModal] = useState({
    state: false,
    picture: null,
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (openModal.state) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openModal.state]);

  const handleCardClick = (pic) => {
    setOpenModal({ state: true, picture: pic });
  };

  return (
    <>
      <Container id="pictures">
        <Wrapper>
          <Title>Moments & Media</Title>
          <Desc>
            Life is a tapestry of moments, and these photos and videos are some
            of my most cherished threads. Dive in to see the places I’ve
            explored, the music I’ve created, and the incredible people I’ve met
            along the way.
          </Desc>

          <CardContainer>
            {pictures.map((picture) => {
              const isVideo = picture.type === "video";

              return (
                <Card key={picture.id} onClick={() => handleCardClick(picture)}>
                  <CardImageWrapper>
                    {isVideo ? (
                      /* For the card preview, show a muted auto-play loop (optional) */
                      <StyledVideo
                        src={picture.video}
                        muted
                        loop
                        autoPlay
                        fadeIn
                      />
                    ) : picture.images ? (
                      <Carousel images={picture.images} alt={picture.title} />
                    ) : (
                      <StyledImage
                        src={picture.image}
                        alt={picture.title}
                        fadeIn
                      />
                    )}
                  </CardImageWrapper>

                  <CardTitle>{picture.title}</CardTitle>
                  {picture.description && (
                    <CardDescription>{picture.description}</CardDescription>
                  )}
                </Card>
              );
            })}
          </CardContainer>
        </Wrapper>
      </Container>

      {openModal.state && (
        <PictureModal picture={openModal.picture} setOpenModal={setOpenModal} />
      )}
    </>
  );
}
