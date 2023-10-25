import "./styles.css";
import { useState } from "react";
import UseFade from "./useFade";
import { Text } from "@mantine/core";

const FadeTest: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow((show) => !show)}>
        {show ? "hide" : "show"}
      </button>
      <UseFade show={show}>
        <div>
          <Text>HELLO </Text>
        </div>
      </UseFade>
    </div>
  );
};

export default FadeTest;
