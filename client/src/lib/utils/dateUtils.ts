// 📦 Utilitaires pour manipuler les dates

/**
 * Ajoute des jours à une date
 */
export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

/**
 * Ajoute des heures à une date
 */
export function addHours(date: Date, hours: number): Date {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}

/**
 * Différence en jours entre deux dates
 */
export function diffInDays(d1: Date, d2: Date): number {
  const diffMs = d2.getTime() - d1.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Vérifie si une date est passée
 */
export function isPast(date: Date): boolean {
  return date.getTime() < Date.now();
}

/**
 * Vérifie si une date est dans le futur
 */
export function isFuture(date: Date): boolean {
  return date.getTime() > Date.now();
}

/**
 * Retourne le temps écoulé en texte ("il y a 2 jours")
 */
export function timeAgo(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `il y a ${days} j`;
  if (hours > 0) return `il y a ${hours} h`;
  if (minutes > 0) return `il y a ${minutes} m`;
  return `A l'instant`;
}

/**
 * Formate une date au format français
 */
export function formatDateFr(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

/**
 * Formate une heure au format français
 */
export function formatTimeFr(date: Date): string {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}