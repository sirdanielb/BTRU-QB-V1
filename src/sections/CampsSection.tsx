import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, DollarSign, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CampsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      scrollTl.fromTo(contentRef.current,
        { y: '55vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // EXIT (70-100%)
      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(contentRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const campLocations = [
    'Florida',
    'North Carolina', 
    'Virginia',
    'New Jersey',
    'Texas'
  ];

  return (
    <section
      ref={sectionRef}
      id="camps"
      className="section-pinned z-[35]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/tracking-bg-practice.jpg"
          alt="QB Camp"
          className="w-full h-full object-cover film-grade"
        />
        <div className="absolute inset-0 bg-brand-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 via-transparent to-brand-black/80" />
      </div>

      {/* Headline */}
      <h2
        ref={headlineRef}
        className="absolute top-[10vh] left-1/2 -translate-x-1/2 font-display font-bold text-h2 text-brand-white text-center w-[86vw] z-10"
        style={{ opacity: 0 }}
      >
        ADVANCED QB CAMPS
      </h2>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute left-[7vw] bottom-[8vh] w-[86vw] z-10"
        style={{ opacity: 0 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Camp Info Card */}
          <div className="card-dark p-6 lg:p-8">
            <h3 className="font-display font-bold text-xl lg:text-2xl text-brand-white mb-4">
              BTRU's Advanced QB/WR Camps
            </h3>
            <p className="text-sm text-brand-gray leading-relaxed mb-6">
              Intensive training camps for quarterbacks and offensive skill players. 
              All skill levels welcome. Focus on mechanics, footwork, reads, and game-like reps.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-brand-orange" />
                <div>
                  <span className="text-sm text-brand-gray">QB: </span>
                  <span className="text-brand-white font-semibold">$120</span>
                  <span className="text-sm text-brand-gray ml-3">WR/TE/RB: </span>
                  <span className="text-brand-white font-semibold">$80</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-orange" />
                <span className="text-sm text-brand-gray">2-hour intensive sessions</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-orange" />
                <span className="text-sm text-brand-gray">Multiple locations across 5 states</span>
              </div>
            </div>

            <a
              href="https://www.baylintrujillo.com/camps"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
            >
              VIEW UPCOMING CAMPS
            </a>
          </div>

          {/* Locations Card */}
          <div className="card-dark p-6 lg:p-8">
            <h3 className="font-display font-bold text-xl lg:text-2xl text-brand-white mb-4">
              Camp Locations
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {campLocations.map((location, index) => (
                <div key={index} className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                  <span className="text-sm text-brand-white">{location}</span>
                </div>
              ))}
            </div>

            {/* GoHighLevel Calendar Embed Area */}
            <div className="border-2 border-dashed border-brand-orange/30 rounded-lg p-6 bg-brand-black/30">
              <Calendar className="w-8 h-8 text-brand-orange/50 mx-auto mb-3" />
              <p className="text-center text-sm text-brand-gray">
                Calendar Embed Area
              </p>
              <p className="text-center text-xs text-brand-gray/60 mt-1">
                GoHighLevel calendar will be embedded here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampsSection;
