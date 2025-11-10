import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "./pages/Index";
import PricingPage from "./pages/PricingPage";
import Dashboard from "./pages/Dashboard";
import EReader from "./pages/EReader";
import WebinarAccess from "./pages/WebinarAccess";
import NotFound from "./pages/NotFound";
import Logindash from "./pages/logindash";
import LoginForm from "./pages/login";
import RegistrationForm from "./pages/register";
import ForgotPasswordForm from "./pages/forgotpassword";
import ResetPasswordForm from "./pages/reset";
import UserMenu from "./components/auth/user-menu";

import "./index.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/logindash" element={<Logindash />} />
            <Route path="/loginform" element={<LoginForm />} />
            <Route path="/registerform" element={<RegistrationForm />} />
            <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
            <Route path="/resetpassword" element={<ResetPasswordForm />} />
            <Route path="/usermenu" element={<UserMenu userName="Guest" />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/e-reader" element={<EReader />} />
            <Route path="/webinar" element={<WebinarAccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
