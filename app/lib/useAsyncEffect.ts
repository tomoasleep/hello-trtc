import { DependencyList, useEffect, useRef } from "react";

type AsyncCleanup = () => Promise<void>;
type AsyncEffect = () => Promise<AsyncCleanup | undefined>;

export function useAsyncEffect(effect: AsyncEffect, deps: DependencyList) {
  const latestCleanup = useRef<Promise<any> | null>(null);

  useEffect(() => {
    async function runEffect() {
      if (latestCleanup.current) {
        await latestCleanup.current;
      }

      await effect();
    }

    const effectPromise = runEffect();

    return () => {
      async function cleanup() {
        await effectPromise;
      }

      latestCleanup.current = cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
