import { TrendingUp, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="bg-accent p-2 rounded-lg"> */}
            <div className="">
              <img src={logo} alt="Logo"   className="h-16 w-16 rounded-sm object-cover text-accent-foreground" />
            </div>              
            {/* </div> */}
              <span className="font-bold text-xl">AB Institute</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Empowering traders with practical knowledge and proven strategies for the Indian stock market.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About Trainer
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById("course")?.scrollIntoView({ behavior: "smooth" })} className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Course Details
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })} className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Success Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })} className="text-primary-foreground/80 hover:text-accent transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" })} className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <Link to="/privacy" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="h-4 w-4 text-accent" />
                info@abinstitute.com
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="h-4 w-4 text-accent" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4 text-accent" />
                Kolkata, West Bengal
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          {/* Risk Disclaimer */}
          <div className="bg-primary-foreground/10 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-sm mb-2 text-accent">⚠️ Risk Disclaimer</h4>
            <p className="text-xs text-primary-foreground/80 leading-relaxed">
              Stock market trading involves significant risk and is not suitable for everyone. Past performance 
              is not indicative of future results. This course is for educational purposes only and does not 
              constitute investment advice. You should only invest money that you can afford to lose. AB Institute 
              of Market Research and its instructors are not responsible for any trading losses. We strongly 
              recommend consulting with a qualified financial advisor before making any investment decisions.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-primary-foreground/60">
            <p>© {currentYear} AB Institute of Market Research. All rights reserved.</p>
            <p className="mt-1">Designed for Indian Stock Market Traders</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
