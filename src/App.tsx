import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuilderPage from "./pages/BuilderPage";
import PreviewPage from "./pages/PreviewPage";
import ResumeProofPage from "./pages/ResumeProofPage";
import NotFound from "./pages/NotFound";
import StepPage from "./pages/rb/StepPage";
import ProofPage from "./pages/rb/ProofPage";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/proof" element={<ResumeProofPage />} />
          <Route path="/rb/proof" element={<ProofPage />} />
          <Route path="/rb/:slug" element={<StepPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
