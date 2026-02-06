import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ReviewsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.review-card');

      // Headline animation
      gsap.fromTo(headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards animation
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(card,
            { y: 50, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              delay: index * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const reviews = [
    {
      name: 'Joey D.',
      title: 'D1 Scholarship QB',
      quote: 'Coach Baylin transformed my game. I went from backup to starter and earned a full-ride D1 scholarship.',
      image: '/review-thumb-1.jpg',
    },
    {
      name: 'Andrew M.',
      title: 'Elite High School QB',
      quote: 'BETRU QB elevated every part of my QB play. Now I\'m reading defenses like a college QB.',
      image: '/review-thumb-2.jpg',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative bg-brand-black py-20 lg:py-28 z-[60]"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display font-bold text-h2 text-brand-white text-center mb-12 lg:mb-16"
          style={{ opacity: 0 }}
        >
          ATHLETE REVIEWS
        </h2>

        {/* Review Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="review-card group relative overflow-hidden rounded-[10px] cursor-pointer"
              style={{ opacity: 0 }}
              onClick={() => alert('Video testimonial - Coming Soon')}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="play-button relative w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-brand-orange flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 lg:w-8 lg:h-8 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                {/* Star Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                  ))}
                </div>

                {/* Name & Title */}
                <h3 className="font-display font-bold text-lg lg:text-xl text-brand-white mb-1">
                  {review.name}
                </h3>
                <p className="text-sm text-brand-orange mb-3">
                  {review.title}
                </p>

                {/* Quote */}
                <p className="text-sm text-brand-gray leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
