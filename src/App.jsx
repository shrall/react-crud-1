import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
import ProductDetail from "./pages/product/ProductDetail";
import TestValidation from "./pages/TestValidation";
import { Toaster } from "sonner";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App min-h-screen min-w-screen font-josefin-sans">
          <Toaster richColors position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/validation" element={<TestValidation />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
