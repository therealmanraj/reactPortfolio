// src/components/Pictures/index.js

import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
} from "./PicturesStyle"; // container/wrapper
import PictureCard from "../Cards/PictureCard"; // the card
import { pictures } from "../../data/constants";
import styled from "styled-components";

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: top;
  justify-content: center;
  overflow-y: scroll;
  transition: all 0.5s ease;
`;

const ModalWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  border-radius: 16px;
  margin: 50px 12px;
  height: min-content;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

/* Same styling as your project modal's close icon */
const CloseIcon = styled(CloseRounded)`
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
`;

const ModalImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
`;

const ModalVideo = styled.video`
  width: 100%;
  border-radius: 12px;
  margin-top: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  object-fit: cover;
`;

const ModalTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 6px 0px 6px;
  @media only screen and (max-width: 600px) {
    font-size: 24px;
    margin: 6px 6px 0px 6px;
  }
`;

const ModalDesc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 6px;
  @media only screen and (max-width: 600px) {
    font-size: 14px;
    margin: 6px 6px;
  }
`;

/* Arrows for multiple images */
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

const LeftArrow = styled(ArrowButton)`
  left: 20px;
`;

const RightArrow = styled(ArrowButton)`
  right: 20px;
`;

const Index = () => {
  const [openModal, setOpenModal] = useState({ state: false, picture: null });
  const [currentIndex, setCurrentIndex] = useState(0);

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
    setCurrentIndex(0); // reset to first image if multiple
  };

  const closeHandler = () => {
    setOpenModal({ state: false, picture: null });
  };

  /* If it's a video or multiple images, handle next/prev */
  const isVideo = openModal.picture?.type === "video";
  const images =
    openModal.picture?.images ??
    (openModal.picture?.image ? [openModal.picture?.image] : []);
  const currentMedia = images[currentIndex] || null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Container id="pictures">
      <Wrapper>
        <Title>Moments & Media</Title>
        <Desc>
          Life is a tapestry of moments, and these photos and videos are some of
          my most cherished threads. Dive in to see the places I’ve explored,
          the music I’ve created, and the incredible people I’ve met along the
          way.
        </Desc>

        <CardContainer>
          {pictures.map((pic) => (
            <PictureCard
              key={pic.id}
              picture={pic}
              onClick={() => handleCardClick(pic)}
            />
          ))}
        </CardContainer>
      </Wrapper>

      {/* MUI Modal, same approach as Projects */}
      <Modal open={openModal.state} onClose={closeHandler}>
        <ModalOverlay>
          <ModalWrapper>
            <CloseIcon onClick={closeHandler} />

            {isVideo ? (
              <ModalVideo
                src={openModal.picture?.video}
                controls
                autoPlay={false}
              />
            ) : (
              <>
                <ModalImage src={currentMedia} alt={openModal.picture?.title} />
                {images.length > 1 && (
                  <>
                    <LeftArrow onClick={prevImage}>&#10094;</LeftArrow>
                    <RightArrow onClick={nextImage}>&#10095;</RightArrow>
                  </>
                )}
              </>
            )}

            <ModalTitle>{openModal.picture?.title}</ModalTitle>
            {openModal.picture?.description && (
              <ModalDesc>{openModal.picture?.description}</ModalDesc>
            )}
          </ModalWrapper>
        </ModalOverlay>
      </Modal>
    </Container>
  );
};

export default Index;
