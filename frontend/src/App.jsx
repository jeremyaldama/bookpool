import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { BookProvider } from "./context/booksContext";
import { BookFormPage } from "./pages/BookFormPage";
import { BooksPage } from "./pages/booksPage";

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <BrowserRouter>
          <main className="container text-black bg-amber-50 content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/my-books" element={<BooksPage />} />
                <Route path="/add-book" element={<BookFormPage />} />
                <Route path="/my-books/:id" element={<BookFormPage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;
