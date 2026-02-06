import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, MapPin, Calendar, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const coachRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  // Load animation (auto-play on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background fade in
      tl.fromTo(bgRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.6 }, 
        0
      );

      // Coach portrait slide in
      tl.fromTo(coachRef.current,
        { x: '15vw', scale: 1.06, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.9 },
        0.15
      );

      // Badge fade in
      tl.fromTo(badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.3
      );

      // Headline words stagger
      const headlineWords = headlineRef.current?.querySelectorAll('.word');
      if (headlineWords) {
        tl.fromTo(headlineWords,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
          0.4
        );
      }

      // Subheadline
      tl.fromTo(subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.8
      );

      // CTA button
      tl.fromTo(ctaRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.95
      );

      // Stats row
      tl.fromTo(statsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        1.1
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadRef.current, ctaRef.current, statsRef.current], {
              opacity: 1, x: 0, y: 0
            });
            gsap.set(coachRef.current, { opacity: 1, x: 0, scale: 1 });
          }
        }
      });

      // ENTRANCE (0-30%): Hold at visible state (already animated on load)
      // SETTLE (30-70%): Static
      
      // EXIT (70-100%)
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-8vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(subheadRef.current,
        { x: 0, opacity: 1 },
        { x: '-6vw', opacity: 0.2, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-4vw', opacity: 0.2, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(statsRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(coachRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '10vw', scale: 1.03, opacity: 0.35, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(bgRef.current,
        { scale: 1 },
        { scale: 1.06, ease: 'none' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'QBs TRAINED', value: '300+', icon: Users },
    { label: 'TRAINING SINCE', value: '2015', icon: Calendar },
    { label: 'LOCATIONS', value: '5 STATES', icon: MapPin },
    { label: 'POWER 4 COMMITS', value: '25+', icon: Trophy },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-brand-black z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero-bg-field.jpg"
          alt="Football field"
          className="w-full h-full object-cover film-grade"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/30" />
      </div>

      {/* Coach Portrait (Right Side) - Professional hero image */}
      <div
        ref={coachRef}
        className="absolute right-0 top-0 w-[55vw] h-full z-10 hidden lg:block"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero-coach-final.png"
          alt="Coach Baylin Trujillo"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-brand-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent" />
      </div>

      {/* Content (Left Side) */}
      <div className="absolute left-[7vw] top-[14vh] w-[54vw] z-20">
        {/* Micro Badge */}
        <span
          ref={badgeRef}
          className="font-mono-label text-brand-orange mb-6 block"
          style={{ opacity: 0 }}
        >
          BTRU QB TRAINING
        </span>

        {/* Headline */}
        <div ref={headlineRef} className="mb-6">
          <h1 className="font-display font-extrabold text-hero text-brand-white uppercase leading-[0.92]">
            <span className="word inline-block">BECOME</span>{' '}
            <span className="word inline-block">AN</span>{' '}
            <span className="word inline-block">ELITE</span>
            <br />
            <span className="word inline-block">QUARTERBACK</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="text-base lg:text-lg text-brand-gray max-w-xl leading-relaxed mb-8"
          style={{ opacity: 0 }}
        >
          Central Florida's premier QB training. Master mechanics, footwork, 
          and reads with Coach Baylin Trujillo. Training QBs since 2015.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4" ref={ctaRef} style={{ opacity: 0 }}>
          <a
            href="https://www.baylintrujillo.com/sign-up"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base"
          >
            BOOK TRAINING
            <span className="text-xl">→</span>
          </a>
          <a
            href="https://www.baylintrujillo.com/camps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-brand-white/30 text-white font-semibold rounded-[10px] hover:border-brand-orange hover:text-brand-orange transition-all duration-200"
          >
            VIEW CAMPS
          </a>
        </div>
      </div>

      {/* Stats Row (Bottom) */}
      <div
        ref={statsRef}
        className="absolute left-[7vw] bottom-[8vh] w-[86vw] z-20"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-wrap gap-3 lg:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card-dark px-4 py-3 lg:px-6 lg:py-4 flex items-center gap-3"
            >
              <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-brand-orange" />
              <div>
                <p className="font-mono-label text-brand-gray text-[9px] lg:text-[10px]">
                  {stat.label}
                </p>
                <p className="font-display font-bold text-xl lg:text-3xl text-brand-white">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
