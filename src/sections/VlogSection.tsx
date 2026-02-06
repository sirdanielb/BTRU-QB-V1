import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VlogSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.vlog-card');
      
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
          { y: 0, opacity: 1, stagger: 0.05, ease: 'none' },
          0.08
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

  const vlogs = [
    {
      title: 'TRAINING BREAKDOWNS',
      description: 'Mechanics, footwork, reads — explained step-by-step.',
      image: '/vlog-thumb-1.jpg',
    },
    {
      title: 'FILM ANALYSIS',
      description: 'Learn to see the field like a college QB.',
      image: '/vlog-thumb-2.jpg',
    },
    {
      title: 'CAMP HIGHLIGHTS',
      description: 'Real reps. Real improvement. Real energy.',
      image: '/vlog-thumb-3.jpg',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="vlog"
      className="section-pinned z-[80]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/filmroom-bg-whiteboard.jpg"
          alt="Film room"
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
        STUDY THE GAME.
      </h2>

      {/* Vlog Cards */}
      <div
        ref={cardsRef}
        className="absolute left-[7vw] bottom-[8vh] w-[86vw] z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {vlogs.map((vlog, index) => (
            <div
              key={index}
              className="vlog-card group relative overflow-hidden rounded-[10px] cursor-pointer card-lift"
              style={{ opacity: 0 }}
              onClick={() => alert('Video content - Coming Soon')}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={vlog.image}
                  alt={vlog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="play-button relative w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-brand-orange flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-5 h-5 lg:w-6 lg:h-6 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <h3 className="font-display font-bold text-sm lg:text-base text-brand-white mb-1">
                  {vlog.title}
                </h3>
                <p className="text-xs text-brand-gray leading-relaxed">
                  {vlog.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VlogSection;
