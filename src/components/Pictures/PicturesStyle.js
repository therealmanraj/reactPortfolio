import styled from "styled-components";

/* Dark background gradient or solid color, similar to your screenshot */
export const Container = styled.div`
  background: #1b1c1e; /* or a dark gradient if you prefer */
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
  color: #ffffff; /* White text on dark background */
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

export const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto; /* Add this to center horizontally */
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

/**
 * Grid layout with two columns on larger screens.
 * Switches to single column below 960px.
 */
// export const CardContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 28px;
//   width: 100%;
//   padding: 20px;
//   justify-items: center;

//   @media (max-width: 960px) {
//     grid-template-columns: 1fr;
//   }
// `;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 28px; /* keeps the same gap between rows (optional) */
  width: 100%;
  padding: 20px;
  justify-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr; /* single column on smaller screens */
  }
`;

/**
 * Dark card background with a "3D" effect shadow,
 * consistent height, and card-like styling.
 */
export const Card = styled.div`
  background-color: #292d3e; /* A dark, slightly purple-toned background */
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  width: 90%;
  max-width: 400px;
  height: 420px; /* Fixed height for consistency */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-align: center;
  padding: 16px;
  box-sizing: border-box;
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  height: 220px; /* Adjust as needed */
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
`;

/**
 * Fill the card image space while maintaining aspect ratio
 * and avoiding distortion.
 */
export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

/**
 * Titles and descriptions in a lighter color
 * to stand out on the dark card background.
 */
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
