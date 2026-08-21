import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/projects", isRouterLink: true },
    { label: "Contact", href: "/#contact" },
  ];

  const handleNavClick = (e, itemOrHref) => {
    setIsMobileMenuOpen(false);

    const isString = typeof itemOrHref === "string";
    const href = isString ? itemOrHref : itemOrHref.href;
    const isRouterLink = isString ? href === "/projects" : itemOrHref.isRouterLink;

    if (isRouterLink) {
      e.preventDefault();
      navigate(href);
      return;
    }

    const hash = href.substring(1); // e.g. "/#about" -> "#about"
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 py-4 md:px-12 ${isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="/#home"
            onClick={(e) => handleNavClick(e, "/#home")}
            className="text-2xl md:text-3xl font-black text-white tracking-tight font-outfit"
          >
            BADAL MAHATA<span className="text-brand-red font-black">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Hire Me CTA */}
          <div className="hidden md:block">
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,42,42,0.3)] hover:border-brand-red/50"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-brand-red transition-colors p-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-brand-red flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${isMobileMenuOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center space-y-8 text-center px-6">
          {navItems.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-3xl font-bold text-white hover:text-black transition-colors duration-300 tracking-wide font-outfit"
              style={{
                transitionDelay: isMobileMenuOpen ? `${idx * 50}ms` : "0ms",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, "/#contact")}
            className="mt-6 px-8 py-3 rounded-full border-2 border-white bg-transparent hover:bg-white hover:text-brand-red text-lg font-bold text-white transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
}
