import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'System', href: '#system' },
    { label: 'Camps', href: '#camps' },
    { label: 'Sports Show', href: '#sports-show' },
    { label: 'About', href: '#coach' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-brand-black/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="flex items-center gap-3"
            >
              <img 
                src="/btru-logo-official.png" 
                alt="BTRU QB Training" 
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
              />
              <span className="font-display font-bold text-sm lg:text-base text-brand-white hidden sm:block">
                BTRU QB
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="text-sm font-medium text-brand-gray hover:text-brand-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Login Button */}
              <button 
                onClick={() => alert('Athlete Portal - Coming Soon')}
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-brand-gray hover:text-brand-white transition-colors duration-200"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>

              {/* CTA Button */}
              <a
                href="https://www.baylintrujillo.com/sign-up"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-[10px] hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200"
                style={{ boxShadow: '0 4px 20px rgba(255, 77, 46, 0.3)' }}
              >
                BOOK NOW
                <span className="text-lg">→</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-brand-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-brand-black/95 backdrop-blur-xl" />
        <div className="relative flex flex-col items-center justify-center h-full gap-8">
          <img 
            src="/btru-logo-official.png" 
            alt="BTRU QB Training" 
            className="w-16 h-16 object-contain mb-4"
          />
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              className="text-2xl font-display font-bold text-brand-white hover:text-brand-orange transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.baylintrujillo.com/sign-up"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 btn-primary"
          >
            BOOK NOW →
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
