import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const styles = {
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },

  img: {
    height: "15rem",
    width: "20rem",
    borderRadius: ".25rem",
    margin: "auto",
  },

  h2: {
    fontWeight: "bold",
    margin: ".5rem auto",
  },

  p: {
    width: "15rem",
    margin: "auto",
  },
};

export class OwlDemo extends Component {
  render() {
    return (
      <div className="owl-carousel" style={{
        overflow: "hidden",
        display: "initial"
      }}>
        <OwlCarousel items={1} margin={0} autoplay={true}>
          
        </OwlCarousel>
      </div>
    );
  }
}
