import { Parallax } from "react-scroll-parallax";
import { randomColor } from "../../helpers/helpers";

interface TestPageProps {
  count: number;
  speed: number;
}

const TestPage: React.FC<TestPageProps> = ({ count, speed }) => {
  const createParallax = (speed: number, i: number) => {
    return (
      <Parallax
        rotateY={[speed * i, -speed * i]}
        rotateX={[speed * i, -speed * i]}
        rotateZ={[speed * i, -speed * i]}
        key={i}
      >
        <div
          style={{
            width: "30vw",
            height: "30vh",
            border: `8px solid ${randomColor(1)}`,
            backgroundColor: randomColor(1),
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>{i + 1}</h1>
        </div>
      </Parallax>
    );
  };

  const boxes = [];
  for (let i = 0; i < count; i++) {
    boxes.push(createParallax(speed, i));
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {boxes}
    </div>
  );
};

export default TestPage;
