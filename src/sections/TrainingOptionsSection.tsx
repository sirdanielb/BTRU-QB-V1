import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Users, Monitor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TrainingOptionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.training-card');
      
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

  const trainingOptions = [
    {
      icon: User,
      title: 'PRIVATE 1-ON-1',
      description: 'Personalized one-hour sessions focused on your specific needs. Mechanics, footwork, and reads.',
      cta: 'Book Private',
      link: 'https://www.baylintrujillo.com/sign-up',
    },
    {
      icon: Users,
      title: 'SMALL GROUP',
      description: 'Train with 2-4 QBs. Compete, correct, and learn together with personalized attention.',
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
      id="training"
      className="section-pinned z-30"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/options-bg-throw.jpg"
          alt="Quarterback throwing"
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
        TRAIN YOUR WAY.
      </h2>

      {/* Training Cards */}
      <div
        ref={cardsRef}
        className="absolute left-[7vw] bottom-[8vh] w-[86vw] z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {trainingOptions.map((option, index) => (
            <div
              key={index}
              className="training-card card-dark p-6 lg:p-8 card-lift flex flex-col"
              style={{ opacity: 0 }}
            >
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mb-5">
                <option.icon className="w-7 h-7 lg:w-8 lg:h-8 text-brand-orange" />
              </div>
              <h3 className="font-display font-bold text-base lg:text-lg text-brand-white mb-3">
                {option.title}
              </h3>
              <p className="text-sm text-brand-gray leading-relaxed mb-6 flex-grow">
                {option.description}
              </p>
              <a
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-orange/10 text-brand-orange text-sm font-semibold rounded-lg hover:bg-brand-orange hover:text-white transition-all duration-200"
              >
                {option.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingOptionsSection;
