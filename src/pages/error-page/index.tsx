import { Box } from "@mantine/core";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // <i>{error.statusText || error.message}</i>;
  return (
    <Box id="error-page">
      <h1>Oopsiewoopsie!</h1>
      <h2>Oopsiewoopsie!</h2>
      <h3>Oopsiewoopsie!</h3>
      <h4>Oopsiewoopsie!</h4>
    </Box>
  );
}
