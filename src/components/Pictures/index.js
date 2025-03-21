import React from "react";
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
} from "./ProjectsStyle";
import { pictures } from "../../data/constants";

const Pictures = () => {
  return (
    <Container id="pictures">
      <Wrapper>
        <Title>Pictures</Title>
        <Desc>I love taking pictures. Here are some of my favorite shots:</Desc>
        <CardContainer>
          {pictures.map((picture) => (
            <div
              key={picture.id}
              style={{ margin: "10px", textAlign: "center" }}
            >
              <img
                src={picture.image}
                alt={picture.title}
                style={{
                  width: "300px",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
              <div style={{ marginTop: "8px", fontSize: "16px" }}>
                {picture.title}
              </div>
            </div>
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Pictures;
