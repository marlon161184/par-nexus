import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard.tsx";
import Elegiveis from "./pages/Elegiveis.tsx";
import MetasCorporativas from "./pages/MetasCorporativas.tsx";
import Paineis from "./pages/Paineis.tsx";
import Simulador from "./pages/Simulador.tsx";
import Glossario from "./pages/Glossario.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/elegiveis" element={<Elegiveis />} />
            <Route path="/metas" element={<MetasCorporativas />} />
            <Route path="/paineis" element={<Paineis />} />
            <Route path="/paineis/:memberId" element={<Paineis />} />
            <Route path="/simulador" element={<Simulador />} />
            <Route path="/glossario" element={<Glossario />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
