// Navigation "single page" : on scrolle en JS plutôt que de laisser le
// navigateur suivre le href="#..." (ce qui évite le hash moche dans l'URL
// et le saut brutal de certains navigateurs).
export function scrollToId(id) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function handleAnchorClick(id, after) {
  return (e) => {
    e.preventDefault();
    scrollToId(id);
    after?.();
  };
}
