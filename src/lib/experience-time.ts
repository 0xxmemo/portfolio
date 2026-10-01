export const EXPERIENCE_START = "2019-01-01T00:00:00.000Z";

export function getExperienceDuration(now = Date.now()) {
  const start = Date.parse(EXPERIENCE_START);
  const timestamp = Math.max(start, now);
  const year = new Date(timestamp).getUTCFullYear();
  const anniversary = Date.UTC(year, 0, 1);
  const remainder = Math.floor((timestamp - anniversary) / 1000);

  return {
    years: year - new Date(start).getUTCFullYear(),
    days: Math.floor(remainder / 86400),
    hours: Math.floor(remainder / 3600) % 24,
    minutes: Math.floor(remainder / 60) % 60,
    seconds: remainder % 60,
  };
}
