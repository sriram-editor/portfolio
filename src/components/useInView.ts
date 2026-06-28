import { useEffect, useState, useRef } from 'react';

interface UseInViewOptions {
  triggerOnce?: boolean;
  threshold?: number | number[];
  rootMargin?: string;
}

export function useInView(options: UseInViewOptions = {}) {
  const { triggerOnce = true, threshold = 0.15, rootMargin = '0px' } = options;
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (triggerOnce) {
          observer.unobserve(element);
        }
      } else if (!triggerOnce) {
        setInView(false);
      }
    }, {
      threshold,
      rootMargin
    });

    observer.observe(element);

    return () => {
      if (element && !triggerOnce) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [triggerOnce, threshold, rootMargin]);

  return [ref, inView] as const;
}
