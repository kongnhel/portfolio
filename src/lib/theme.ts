/**
 * Runs before first paint so the page never flashes the wrong colours.
 * Kept as a string because it must be inlined in <head>.
 *
 * It deliberately touches only the `class` attribute, and only the `dark` class.
 * React does not expect that class, so `<html>` carries `suppressHydrationWarning`
 * to acknowledge it — see app/[locale]/layout.tsx.
 *
 * `color-scheme` and the `theme-color` meta are intentionally NOT set from here:
 * both are already handled in CSS (globals.css) and by the viewport export, and
 * writing to them before hydration caused a mismatch warning.
 */
export const themeScript = `(function(){try{
var s=localStorage.getItem('theme');
var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark',d);
}catch(err){}})();`;

export const THEME_STORAGE_KEY = "theme";