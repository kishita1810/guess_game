
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { GameProvider } from "./context/GameContext";
import TransitionLayout from "./components/TransitionLayout";

// Pages
import Start from "./pages/Start";
import ModeSelect from "./pages/ModeSelect";
import Game from "./pages/Game";
import Congratulations from "./pages/Congratulations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <GameProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/mode-select" element={<ModeSelect />} />
              <Route path="/game" element={<Game />} />
              <Route path="/congratulations" element={<Congratulations />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
