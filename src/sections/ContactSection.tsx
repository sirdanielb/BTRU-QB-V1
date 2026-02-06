import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(leftRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Right content animation
      gsap.fromTo(rightRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-brand-black py-20 lg:py-28 z-[90]"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Column - CTA */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <img 
              src="/btru-logo-official.png" 
              alt="BTRU QB Training" 
              className="w-16 h-16 object-contain mb-6"
            />
            
            <h2 className="font-display font-bold text-h2 text-brand-white mb-6">
              READY TO ELEVATE
              <br />
              <span className="text-brand-orange">YOUR GAME?</span>
            </h2>
            
            <p className="text-base lg:text-lg text-brand-gray leading-relaxed mb-8 max-w-lg">
              Join 300+ quarterbacks who have trained with BTRU QB. Whether you're 
              just starting or preparing for college, we have a program for you.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a
                href="tel:407-267-2388"
                className="flex items-center gap-3 text-brand-white hover:text-brand-orange transition-colors"
              >
                <Phone className="w-5 h-5 text-brand-orange" />
                <span className="text-lg font-semibold">407-267-2388</span>
              </a>
              <a
                href="mailto:btruqb@gmail.com"
                className="flex items-center gap-3 text-brand-white hover:text-brand-orange transition-colors"
              >
                <Mail className="w-5 h-5 text-brand-orange" />
                <span>btruqb@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-brand-gray">
                <MapPin className="w-5 h-5 text-brand-orange" />
                <span>Orlando, FL Area</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3 text-xs text-brand-gray">
              <span className="font-mono-label">ACCEPTED:</span>
              <span>CASH</span>
              <span className="text-brand-orange">•</span>
              <span>CASH APP</span>
              <span className="text-brand-orange">•</span>
              <span>VENMO</span>
            </div>
          </div>

          {/* Right Column - GoHighLevel Form Embed Area */}
          <div ref={rightRef} style={{ opacity: 0 }}>
            <div className="bg-brand-charcoal border border-white/5 rounded-[10px] p-6 lg:p-8">
              <h3 className="font-display font-bold text-xl text-brand-white mb-2">
                Get Started Today
              </h3>
              <p className="text-sm text-brand-gray mb-6">
                Fill out the form and we'll get back to you within 24 hours.
              </p>

              {/* GoHighLevel Form Embed Area */}
              <div className="border-2 border-dashed border-brand-orange/30 rounded-lg p-12 bg-brand-black/30 text-center mb-6">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-brand-orange/10 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-brand-orange/50" />
                  </div>
                </div>
                <p className="text-brand-white font-semibold mb-2">
                  Form Embed Area
                </p>
                <p className="text-sm text-brand-gray mb-4">
                  GoHighLevel form will be embedded here
                </p>
                <a
                  href="https://www.baylintrujillo.com/sign-up"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-orange text-sm hover:underline"
                >
                  Visit booking page
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Alternative CTA */}
              <a
                href="https://www.baylintrujillo.com/sign-up"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                BOOK TRAINING NOW
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-white/5">
        <div className="w-full px-6 lg:px-[7vw]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/btru-logo-official.png" 
                alt="BTRU QB Training" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-display font-bold text-sm text-brand-white">
                BTRU QB TRAINING
              </span>
            </div>

            {/* Copyright */}
            <p className="text-xs text-brand-gray text-center">
              © 2026 BTRU QB Training. All rights reserved.
              <span className="hidden lg:inline"> • </span>
              <br className="lg:hidden" />
              Central Florida's Premier QB Training
            </p>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-brand-gray">
              <a 
                href="https://www.baylintrujillo.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-white transition-colors"
              >
                Original Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
