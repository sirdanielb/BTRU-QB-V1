import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Percent, Timer, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PortalSection = () => {
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
        { y: '60vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
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

  const metrics = [
    { icon: Activity, label: 'Sessions Completed', value: '24' },
    { icon: Percent, label: 'Completion %', value: '72%' },
    { icon: Timer, label: 'Next Goal', value: '< 1.9s' },
    { icon: Star, label: 'Coach Rating', value: '4.8' },
  ];

  return (
    <section
      ref={sectionRef}
      id="portal"
      className="section-pinned z-50"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/portal-bg-undercenter.jpg"
          alt="Quarterback under center"
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
        YOUR DASHBOARD. YOUR GROWTH.
      </h2>

      {/* Dashboard Preview Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 -translate-x-1/2 bottom-[8vh] w-[min(920px,86vw)] z-10"
        style={{ opacity: 0 }}
      >
        <div className="card-dark p-6 lg:p-8">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-mono-label text-brand-orange text-xs">
                ATHLETE PORTAL PREVIEW
              </span>
              <h3 className="font-display font-bold text-xl lg:text-2xl text-brand-white mt-1">
                My Progress
              </h3>
            </div>
            <button 
              onClick={() => alert('Athlete Portal - Coming Soon')}
              className="flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange text-sm font-semibold rounded-lg hover:bg-brand-orange/20 transition-colors"
            >
              Get Access
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-brand-black/50 rounded-lg p-4 border border-white/5"
              >
                <metric.icon className="w-5 h-5 text-brand-orange mb-2" />
                <p className="text-xs text-brand-gray mb-1">{metric.label}</p>
                <p className="font-display font-bold text-xl lg:text-2xl text-brand-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-xs text-brand-gray mb-3">RECENT ACTIVITY</p>
            <div className="space-y-2">
              {[
                'Completed footwork drill session - 85% accuracy',
                'Film review: Reading Cover 2 defenses',
                'New goal set: Improve 3-step drop timing',
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-brand-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalSection;
