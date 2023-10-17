import { useRouteError } from "react-router-dom";

export default function Joram3000() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Joram3000 website</h1>
      <h2>Joram3000 website</h2>
      <h3>Joram3000 website</h3>
      <h4>Joram3000 website</h4>
    </div>
  );
}
