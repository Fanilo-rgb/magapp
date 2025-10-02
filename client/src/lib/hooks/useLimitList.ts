// hooks/useLimitList.ts
import {useEffect, useRef, useState} from "react";

type Variant = "open" | "close";

export function useLimitList<T>(data: T[], step = 3, minLimit = 4) {
  const [limit, setLimit] = useState(0);
  const [variant, setVariant] = useState<Variant>("open");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // init limit
  useEffect(() => {
    setLimit(data.length > minLimit ? minLimit : data.length);
  }, [data, minLimit]);

  // scroll auto vers le bas
  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, 50);
  }, [limit]);

  const handleClick = () => {
    const newLimit = limit < data.length ? limit + step : minLimit;
    setLimit(newLimit);
    setVariant(newLimit === data.length ? "close" : "open");
  };

  const sliced = data.slice(0, limit);

  return {
    sliced,
    limit,
    variant,
    handleClick,
    bottomRef,
  };
}
