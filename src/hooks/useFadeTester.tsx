import "./styles.css";
import { useState } from "react";
import { Title } from "@mantine/core";
import UseFade from "./UseFade";

const FadeTest: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow((show) => !show)}>
        {show ? "hide" : "show"}
      </button>
      <UseFade show={show}>
        <Title>{show ? "HELLO" : "BYE"}</Title>
      </UseFade>
    </div>
  );
};

export default FadeTest;
