import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import logo from "../assets/logo.jpg";


const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="">
              <img src={logo} alt="Logo" className="h-16 w-16 rounded-sm object-cover text-accent-foreground" />
            </div>
            <span className="text-primary">AB Institute</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            
            {/* FIX: Changed to "about" to match mobile & common naming convention */}
            <button onClick={() => scrollToSection("about")} className="text-foreground hover:text-accent transition-colors">
              About
            </button>
            
            <button onClick={() => scrollToSection("course")} className="text-foreground hover:text-accent transition-colors">
              Course
            </button>
            
            {/* Using Link for navigation to a different page/section */}
            <Link to="/pricing" className="text-foreground hover:text-accent transition-colors">
              Pricing
            </Link>
            
            <button onClick={() => scrollToSection("testimonials")} className="text-foreground hover:text-accent transition-colors">
              Success Stories
            </button>
            
            <button onClick={() => scrollToSection("faq")} className="text-foreground hover:text-accent transition-colors">
              FAQ
            </button>
            
            {/* Login button now using navigate("/logindash") */}
            <Button 
              onClick={() => navigate("/logindash")} 
              className="bg-[#001F3F] hover:bg-[#001a35] text-white font-semibold" 
            >
              Login
            </Button>

            <Button onClick={() => scrollToSection("enroll")} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"> 
              Enroll Now 
            </Button>
            
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            
            <button onClick={() => scrollToSection("about")} className="block w-full text-left text-foreground hover:text-accent transition-colors py-2">
              About
            </button>
            <button onClick={() => scrollToSection("course")} className="block w-full text-left text-foreground hover:text-accent transition-colors py-2">
              Course
            </button>
            <Link 
              to="/pricing" 
              onClick={() => setIsOpen(false)} // Close menu on navigation
              className="block w-full text-left text-foreground hover:text-accent transition-colors py-2"
            >
              Pricing
            </Link>
            <button onClick={() => scrollToSection("testimonials")} className="block w-full text-left text-foreground hover:text-accent transition-colors py-2">
              Success Stories
            </button>
            <button onClick={() => scrollToSection("faq")} className="block w-full text-left text-foreground hover:text-accent transition-colors py-2">
              FAQ
            </button>
            
            {/* FIX: Login button now using navigate("/logindash") */}
            <Button 
              onClick={() => {
                navigate("/logindash");
                setIsOpen(false); // Close menu after clicking
              }} 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold" 
            >
              Login
            </Button>
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;