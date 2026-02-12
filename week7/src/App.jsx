import "./App.css";
import { createHashRouter, RouterProvider } from "react-router";
import routes from "./routes/index.jsx";

const router = createHashRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
