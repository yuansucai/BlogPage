"use client";

import { useState, useEffect } from "react";

/**
 * 通用 API 数据获取 Hook
 * 自动从后端获取数据，失败时使用 fallback 静态数据
 *
 * @param fetchFn - 从后端获取数据的函数
 * @param fallback - 后端不可用时使用的静态数据
 * @returns 数据和加载状态
 */
export function useApiData<T>(fetchFn: () => Promise<T>, fallback: T): {
  data: T;
  loading: boolean;
  fromApi: boolean;
} {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchFn()
      .then((apiData) => {
        if (!cancelled) {
          setData(apiData);
          setFromApi(true);
          setLoading(false);
        }
      })
      .catch(() => {
        // 后端不可用，使用 fallback 数据
        if (!cancelled) {
          setData(fallback);
          setFromApi(false);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, fromApi };
}
