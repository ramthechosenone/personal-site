"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SearchResult } from "./types";
import { searchContent } from "./api";

interface UseMovieSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  loading: boolean;
}

export function useMovieSearch(): UseMovieSearchReturn {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      const data = await searchContent(q);
      setResults(data.results);
      setIsOpen(data.results.length > 0);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, doSearch]);

  return { query, setQuery, results, isOpen, setIsOpen, loading };
}
