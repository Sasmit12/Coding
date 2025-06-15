import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="page-container min-h-screen bg-gray-50">
      <div className="w-full flex flex-col items-center">
        <Navbar />
        <main className="w-full flex-grow flex flex-col items-center">
          <div className="container">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
