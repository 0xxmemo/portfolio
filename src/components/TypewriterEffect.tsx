import { useState, useEffect } from "react";

interface Props {
  words: string[];
  className?: string;
}

export function TypewriterEffect({ words, className = "" }: Props) {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWord];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentChar < word.length) {
            setCurrentChar((c) => c + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentChar > 0) {
            setCurrentChar((c) => c - 1);
          } else {
            setIsDeleting(false);
            setCurrentWord((w) => (w + 1) % words.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [currentChar, isDeleting, currentWord, words]);

  const text = words[currentWord].slice(0, currentChar);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[3px] h-[1em] bg-cyan-accent ml-1 align-middle animate-pulse" />
    </span>
  );
}
