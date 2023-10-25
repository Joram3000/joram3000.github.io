import "./styles.css";
import { useState } from "react";

import { Text } from "@mantine/core";
import UseFade from "./UseFade";

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
