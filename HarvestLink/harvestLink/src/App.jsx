import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import AppRoutes from "./routes";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import { devConfig } from "./config/development.js";
import ScrollToTop from "./components/ScrollToTop";

// Create a client with development configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: devConfig.reactQuery.retry,
      refetchOnWindowFocus: devConfig.reactQuery.refetchOnWindowFocus,
      staleTime: devConfig.reactQuery.staleTime,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router future={{ 
        v7_relativeSplatPath: true,
        v7_startTransition: true 
      }}>
        <AuthProvider>
          <NotificationProvider>
            <div className="min-h-screen flex flex-col">
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: "#363636",
                    color: "#fff",
                  },
                  success: {
                    duration: 2000,
                    theme: {
                      primary: "#4aed88",
                    },
                  },
                  error: {
                    duration: 4000,
                    theme: {
                      primary: "#ff4b4b",
                    },
                  },
                }}
              />
              <Navbar />
              <ScrollToTop />
              <main className="flex-grow">
                <AppRoutes />
              </main>
              <Footer />
              <ChatWidget />
            </div>
          </NotificationProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
