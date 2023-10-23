import { Parallax } from "react-scroll-parallax";

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const colors = [];
for (let i = 0; i < 100; i++) {
  colors.push(generateRandomColor());
}

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
            border: `8px solid ${generateRandomColor()}`,
            backgroundColor: generateRandomColor(),
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
        border: "2px solid black",
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
