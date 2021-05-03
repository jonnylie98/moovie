import { useState, useRef, useEffect, useCallback } from "react";

const useInfiniteScroll = (items, itemsPerPage) => {
  const [page, setPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  // add loader reference
  const loaderRef = useRef(null);

  // here we handle what happens when user scrolls to Load More div  in this case we just update page variable
  const handleObserver = useCallback(
    (entities) => {
      const target = entities[0];
      if (target.isIntersecting && page * itemsPerPage < items.length) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [page, items, itemsPerPage]
  );

  useEffect(() => {
    if (items && items.length !== 0) setIsMounted(true);
  }, [items]);

  useEffect(() => {
    if (isMounted) {
      const options = { root: null, rootMargin: "20px", threshold: 1.0 };
      // initialize IntersectionObserver and attaching to Load More div
      const observer = new IntersectionObserver(handleObserver, options);
      observer.observe(loaderRef.current);
    }
  }, [isMounted, handleObserver]);

  return [items.slice(0, page * itemsPerPage), loaderRef];
};

export default useInfiniteScroll;
