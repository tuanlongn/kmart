import { useEffect, useState } from "react";

export default function usePageBottom() {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const _isBottom =
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.scrollHeight;
      setIsBottom(_isBottom);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isBottom;
}
