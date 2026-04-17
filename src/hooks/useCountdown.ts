import { useState, useEffect } from 'react';

export function useCountdown(dateStr: string) {
  const calc = () => {
    const eventDate = new Date(dateStr);
    eventDate.setHours(23, 59, 59, 999);
    const diff = eventDate.getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return { days, passed: diff < 0 };
  };

  const [state, setState] = useState(calc);

  useEffect(() => {
    setState(calc());
    const timer = setInterval(() => setState(calc()), 60000);
    return () => clearInterval(timer);
  }, [dateStr]);

  return state;
}
