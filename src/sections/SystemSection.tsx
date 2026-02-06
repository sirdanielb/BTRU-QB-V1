import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Footprints, Brain, User, Users, Monitor, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SystemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const formatsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const pillars = pillarsRef.current?.querySelectorAll('.pillar-card');
      const formats = formatsRef.current?.querySelectorAll('.format-card');
      
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
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

      scrollTl.fromTo(introRef.current,
        { y: '-8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      if (pillars) {
        scrollTl.fromTo(pillars,
          { y: '40vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.08
        );
      }

      if (formats) {
        scrollTl.fromTo(formats,
          { y: '50vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, ease: 'none' },
          0.15
        );
      }

      // EXIT (70-100%)
      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(introRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0.2, ease: 'power2.in' },
        0.72
      );

      if (pillars) {
        scrollTl.fromTo(pillars,
          { y: 0, opacity: 1 },
          { y: '15vh', opacity: 0.2, ease: 'power2.in' },
          0.7
        );
      }

      if (formats) {
        scrollTl.fromTo(formats,
          { y: 0, opacity: 1 },
          { y: '18vh', opacity: 0.2, ease: 'power2.in' },
          0.72
        );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Target,
      title: 'THROWING MECHANICS',
      description: 'Proper form and technique for maximum accuracy and velocity. 200-225 reps per session.',
    },
    {
      icon: Footprints,
      title: 'FOOTWORK & DROPS',
      description: '3-step, 5-step, and 7-step drops. Pocket movement and escape routes.',
    },
    {
      icon: Brain,
      title: 'READING COVERAGES',
      description: 'Learn to identify defenses and make the right throw before the snap.',
    },
  ];

  const formats = [
    {
      icon: User,
      title: 'PRIVATE 1-ON-1',
      description: 'Personalized one-hour sessions focused on your specific needs.',
      cta: 'Book Private',
      link: 'https://www.baylintrujillo.com/sign-up',
    },
    {
      icon: Users,
      title: 'SMALL GROUP',
      description: 'Train with 2-4 QBs. Compete, correct, and learn together.',
      cta: 'Join Group',
      link: 'https://www.baylintrujillo.com/sign-up',
    },
    {
      icon: Monitor,
      title: 'FILM REVIEW',
      description: 'Break down game tape and learn to see the field like a college QB.',
      cta: 'Schedule Review',
      link: 'https://www.baylintrujillo.com/sign-up',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="system"
      className="section-pinned z-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/system-bg-field.jpg"
          alt="Football field"
          className="w-full h-full object-cover film-grade"
        />
        <div className="absolute inset-0 bg-brand-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-transparent to-brand-black/80" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-[7vw]">
        {/* Header */}
        <div className="text-center mb-6">
          <h2
            ref={headlineRef}
            className="font-display font-bold text-h2 text-brand-white mb-3"
            style={{ opacity: 0 }}
          >
            THE BTRU QB SYSTEM
          </h2>
          <p
            ref={introRef}
            className="text-base lg:text-lg text-brand-gray max-w-2xl mx-auto"
            style={{ opacity: 0 }}
          >
            A structured, proven approach to quarterback development. 
            Train your way with flexible options designed for every athlete.
          </p>
        </div>

        {/* Training Pillars */}
        <div
          ref={pillarsRef}
          className="mb-6"
        >
          <p className="font-mono-label text-brand-orange text-xs text-center mb-4">TRAINING PILLARS</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="pillar-card card-dark p-5 text-center"
                style={{ opacity: 0 }}
              >
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-3">
                  <pillar.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="font-display font-bold text-sm text-brand-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-brand-gray leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Training Formats */}
        <div
          ref={formatsRef}
        >
          <p className="font-mono-label text-brand-orange text-xs text-center mb-4">TRAINING FORMATS</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {formats.map((format, index) => (
              <div
                key={index}
                className="format-card card-dark p-5 flex flex-col"
                style={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                    <format.icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-brand-white">
                    {format.title}
                  </h3>
                </div>
                <p className="text-xs text-brand-gray leading-relaxed mb-4 flex-grow">
                  {format.description}
                </p>
                <a
                  href={format.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-orange text-xs font-semibold hover:gap-3 transition-all"
                >
                  {format.cta}
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemSection;
