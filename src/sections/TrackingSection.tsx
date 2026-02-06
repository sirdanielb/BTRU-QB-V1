import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart2, PieChart, Target, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TrackingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.tracking-card');
      
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

      if (cards) {
        scrollTl.fromTo(cards,
          { y: '55vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, ease: 'none' },
          0.06
        );
      }

      // EXIT (70-100%)
      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      if (cards) {
        scrollTl.fromTo(cards,
          { y: 0, opacity: 1 },
          { y: '18vh', opacity: 0.2, ease: 'power2.in' },
          0.7
        );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  const trackingFeatures = [
    {
      icon: BarChart2,
      title: 'WEEKLY METRICS',
      description: 'Completion %, ball speed, footwork timing',
    },
    {
      icon: PieChart,
      title: 'SKILL BREAKDOWNS',
      description: 'See exactly what to improve next',
    },
    {
      icon: Target,
      title: 'GOAL SETTING',
      description: 'Short-term targets that build long-term results',
    },
    {
      icon: MessageSquare,
      title: 'COACH FEEDBACK',
      description: 'Notes + video highlights after every session',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="tracking"
      className="section-pinned z-40"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/tracking-bg-practice.jpg"
          alt="Practice session"
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
        TRACK EVERY REP.
      </h2>

      {/* Tracking Cards */}
      <div
        ref={cardsRef}
        className="absolute left-[7vw] bottom-[8vh] w-[86vw] z-10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {trackingFeatures.map((feature, index) => (
            <div
              key={index}
              className="tracking-card card-dark p-5 lg:p-6 card-lift"
              style={{ opacity: 0 }}
            >
              <feature.icon className="w-8 h-8 lg:w-10 lg:h-10 text-brand-orange mb-4" />
              <h3 className="font-display font-bold text-sm lg:text-base text-brand-white mb-2">
                {feature.title}
              </h3>
              <p className="text-xs lg:text-sm text-brand-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;
