import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

export default function useIntersect({
  threshold = 0,
  hasNextPage,
  fetchNextPage,
}: {
  threshold?: number;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}) {
  const [target, setTarget] = useState<HTMLLIElement | HTMLButtonElement | null>(null);

  const observerCallback = useCallback<IntersectionObserverCallback>(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(observerCallback, { threshold });
    observer.observe(target);
    return () => observer.unobserve(target);
  }, [observerCallback, threshold, target]);

  return { setTarget };
}
