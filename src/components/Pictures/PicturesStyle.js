import styled from "styled-components";

export const Container = styled.div`
  background: #1b1c1e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 98%, 0 100%);
`;

export const Wrapper = styled.div`
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

export const Title = styled.div`
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

export const Desc = styled.div`
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
 * Grid layout: 3 columns on large screens, 1 column on smaller screens.
 * Adjust as needed for 2 columns if you prefer.
 */
export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 28px;
  width: 100%;
  padding: 20px;
  justify-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
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
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
`;

/**
 * We add fade-in/fade-out transitions here via "fadeIn" prop.
 *
 * "opacity" toggles between 0 and 1.
 * The transition ensures a smooth fade effect over 0.3s.
 */
export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;

  /* Fade in/out logic */
  opacity: ${({ fadeIn }) => (fadeIn ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

export const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 6px;
`;

export const CardDescription = styled.div`
  font-size: 14px;
  color: #d1d1d1;
  margin: 0 0 8px 0;
`;

/**
 * The SlideWrapper is a container for the image
 * that lets us position the slide counter absolutely.
 */
export const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

/**
 * SlideCounter is positioned in the bottom-right corner
 * with a semi-transparent background.
 */
export const SlideCounter = styled.div`
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
