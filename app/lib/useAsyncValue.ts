import { useEffect, useState } from "react";

type AsyncResponse<T> = {
  data: T | null;
  isCompleted: boolean;
};

export function useAsyncValue<T>(calculation: () => Promise<T>) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    (async () => {
      const calculated = await calculation();
      setData(calculated);
      setIsCompleted(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isCompleted,
    data,
  };
}
