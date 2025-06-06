import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl font-bold">Page not found</p>
      <Link to="/home" className="btn btn-primary">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
