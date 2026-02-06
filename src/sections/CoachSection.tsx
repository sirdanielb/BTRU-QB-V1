import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CoachSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(headlineRef.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(cardRef.current,
        { y: '60vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // EXIT (70-100%)
      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(cardRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const credentials = [
    'Training QBs since 2015',
    '300+ athletes trained in Central Florida',
    'Former USF quarterback',
    'BTRU Sports Show host on VSN',
  ];

  const notableAthletes = [
    { name: 'Noah Grubbs', school: 'Notre Dame' },
    { name: 'Brady Hart', school: 'Michigan' },
    { name: 'Dereon Coleman', school: 'Miami' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/BTruQBtraining/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/baylintrujillo/', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/baylintrujillo', label: 'Twitter' },
    { icon: Youtube, href: 'https://www.youtube.com/channel/UCWK_zCjrbWRcF3YLlaYnW_Q', label: 'YouTube' },
  ];

  return (
    <section
      ref={sectionRef}
      id="coach"
      className="section-pinned z-[70]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/coach-bg-photo.jpg"
          alt="Coach on sideline"
          className="w-full h-full object-cover film-grade"
        />
        <div className="absolute inset-0 bg-brand-black/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 via-transparent to-brand-black/80" />
      </div>

      {/* Headline */}
      <h2
        ref={headlineRef}
        className="absolute top-[10vh] left-1/2 -translate-x-1/2 font-display font-bold text-h2 text-brand-white text-center w-[86vw] z-10"
        style={{ opacity: 0 }}
      >
        MEET THE COACH
      </h2>

      {/* Bio Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 -translate-x-1/2 bottom-[8vh] w-[min(800px,86vw)] z-10"
        style={{ opacity: 0 }}
      >
        <div className="card-dark p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start">
            {/* Circular Portrait */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-brand-orange/30">
                <img
                  src="/coach-portrait.png"
                  alt="Coach Baylin Trujillo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-display font-bold text-2xl lg:text-3xl text-brand-white mb-1">
                Baylin Trujillo
              </h3>
              <p className="font-mono-label text-brand-orange text-xs mb-4">
                FOUNDER & HEAD COACH
              </p>

              <p className="text-sm text-brand-gray leading-relaxed mb-5">
                Oak Ridge graduate and former USF quarterback. Baylin has been training 
                quarterbacks throughout Central Florida since 2015 — from Pop Warner to college. 
                His relationship with athletes extends beyond the field, helping with college selection 
                and coach communication.
              </p>

              {/* Credentials */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-brand-orange" />
                    </div>
                    <span className="text-xs text-brand-gray">{credential}</span>
                  </div>
                ))}
              </div>

              {/* Notable Athletes */}
              <div className="mb-5">
                <p className="font-mono-label text-brand-gray text-[10px] mb-2">NOTABLE ATHLETES</p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {notableAthletes.map((athlete, index) => (
                    <span key={index} className="px-3 py-1 bg-brand-orange/10 rounded-full text-xs text-brand-orange">
                      {athlete.name} → {athlete.school}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact & Social */}
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                <div className="flex items-center gap-4">
                  <a
                    href="tel:407-267-2388"
                    className="inline-flex items-center gap-2 text-sm text-brand-white hover:text-brand-orange transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    407-267-2388
                  </a>
                  <a
                    href="mailto:btruqb@gmail.com"
                    className="inline-flex items-center gap-2 text-sm text-brand-white hover:text-brand-orange transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    btruqb@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-brand-charcoal border border-white/10 flex items-center justify-center text-brand-gray hover:text-brand-orange hover:border-brand-orange transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachSection;
