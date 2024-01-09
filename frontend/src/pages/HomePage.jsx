import { Link } from "react-router-dom";

function HomePage() {
  return (
  <section className="bg-yellow-100 flex justify-center items-center">
    <header className="bg-yellow-100 p-10">
      <h1 className="text-5xl py-2 font-bold text-color-">Welcome to bookpool</h1>
      <p className="text-md">
        You must register first to start enjoying!
      </p>

      <Link
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 inline-block"
        to="/register"
      >
        Get Started
      </Link>
    </header>
  </section>
  );
}

export default HomePage;
