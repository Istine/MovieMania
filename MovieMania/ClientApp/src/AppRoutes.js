import { Home } from "./components/Home";
import { Movie } from "./components/Movie";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },

  {
    path: "/movie/:Title",
    element: <Movie />,
  },
];

export default AppRoutes;
