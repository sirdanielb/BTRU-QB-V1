import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SportsShowSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const videos = videosRef.current?.querySelectorAll('.video-card');
      
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

      if (videos) {
        scrollTl.fromTo(videos,
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

      if (videos) {
        scrollTl.fromTo(videos,
          { y: 0, opacity: 1 },
          { y: '18vh', opacity: 0.2, ease: 'power2.in' },
          0.7
        );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  const videos = [
    {
      title: 'THE LEGACY OF UCF/FSU QB MCKENZIE MILTON',
      episode: 'EPISODE 11',
      thumbnail: '/vlog-thumb-2.jpg',
      link: 'https://www.youtube.com/watch?v=example1',
    },
    {
      title: 'Julian Calvez COMEBACK STORY (Part 2)',
      episode: 'EPISODE 10',
      thumbnail: '/vlog-thumb-1.jpg',
      link: 'https://www.youtube.com/watch?v=example2',
    },
    {
      title: '2021 Elite 11 Recap & Julian Calvez Interview',
      episode: 'EPISODE 7',
      thumbnail: '/vlog-thumb-3.jpg',
      link: 'https://www.youtube.com/watch?v=example3',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="sports-show"
      className="section-pinned z-[35]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/filmroom-bg-whiteboard.jpg"
          alt="BTRU Sports Show"
          className="w-full h-full object-cover film-grade"
        />
        <div className="absolute inset-0 bg-brand-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 via-transparent to-brand-black/80" />
      </div>

      {/* Headline */}
      <div
        ref={headlineRef}
        className="absolute top-[10vh] left-1/2 -translate-x-1/2 text-center w-[86vw] z-10"
        style={{ opacity: 0 }}
      >
        <span className="font-mono-label text-brand-orange text-xs mb-3 block">
          PRESENTED BY VSN
        </span>
        <h2 className="font-display font-bold text-h2 text-brand-white">
          BTRU SPORTS SHOW
        </h2>
      </div>

      {/* Videos */}
      <div
        ref={videosRef}
        className="absolute left-[7vw] bottom-[8vh] w-[86vw] z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {videos.map((video, index) => (
            <a
              key={index}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="video-card group relative overflow-hidden rounded-[10px] cursor-pointer card-lift"
              style={{ opacity: 0 }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="play-button relative w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-brand-orange flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-5 h-5 lg:w-6 lg:h-6 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <span className="font-mono-label text-brand-orange text-[10px]">
                  {video.episode}
                </span>
                <h3 className="font-display font-bold text-sm lg:text-base text-brand-white mt-1 line-clamp-2">
                  {video.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-6">
          <a
            href="https://www.baylintrujillo.com/btru-sports-show"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-orange font-semibold text-sm hover:gap-3 transition-all"
          >
            View All Episodes
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SportsShowSection;
