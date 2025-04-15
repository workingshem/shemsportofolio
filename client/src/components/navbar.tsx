import { Link } from "wouter";
import { useMobileMenu } from "@/context/mobile-menu-context";
import { Menu, X } from "lucide-react";

// { name: "Game", path: "#game" },
const navLinks = [
  { name: "Home", path: "#home" },
  { name: "About", path: "#about" },
  { name: "Skills", path: "#skills" },
  { name: "Projects", path: "#projects" },
  { name: "Experience", path: "#experience" },
  { name: "Visualizations", path: "#visualizations" },
  { name: "Contact", path: "#contact" },
];

export default function Navbar() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 70,
          behavior: "smooth",
        });
        closeMenu();
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
            SL
          </div>
          <span className="font-bold text-xl">Shem Lim</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 font-medium text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={handleNavClick}
              className="hover:text-primary px-2 py-1 rounded hover:bg-blue-50 transition"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-neutral-800 focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-lg absolute w-full py-2`}
      >
        <nav className="container mx-auto px-4 flex flex-col space-y-2 font-medium text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={handleNavClick}
              className="hover:text-primary px-2 py-2 rounded hover:bg-blue-50 transition"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
