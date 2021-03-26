import { useEffect, useRef } from 'react';

/*
 ** FROM https://www.aaron-powell.com/posts/2019-09-23-recursive-settimeout-with-react-hooks/
 */

function useRecursiveTimeout<T>(callback: (() => Promise<T>) | (() => void), delay: number | null) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        // @ts-ignore
        let id;
        function tick() {
            const ret = savedCallback.current();

            if (ret instanceof Promise) {
                ret.then(() => {
                    if (delay !== null) {
                        id = setTimeout(tick, delay);
                    }
                });
            } else if (delay !== null) {
                id = setTimeout(tick, delay);
            }
        }
        if (delay !== null) {
            id = setTimeout(tick, delay);
            // @ts-ignore
            return () => id && clearTimeout(id);
        }
    }, [delay]);
}

export default useRecursiveTimeout;
