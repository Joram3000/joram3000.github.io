import React from "react";
import PatternMaker from "../../components/PatternMaker/PatternMaker";
import Transporter from "../../components/PatternMaker/Transporter";
import "./style.css";

const PatternMakerPage: React.FC = () => {
  return (
    <>
      <PatternMaker />
      <Transporter />
    </>
  );
};

export default PatternMakerPage;
