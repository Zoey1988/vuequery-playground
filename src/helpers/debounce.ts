export function debounce(fn: any, wait: number) {
  let timer: number;
  return (event: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (typeof fn === "function") {
        fn(event);
      }
    }, wait);
  };
}
