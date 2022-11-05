export function range(n: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
  return ((n - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

export function truncate(fullStr: string, frontChars: number, backChars: number, separator: string): string {
  frontChars = frontChars || 5;
  backChars = backChars || 3;
  separator = separator || "...";

  if (fullStr.length <= frontChars + backChars) return fullStr;

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
}

export function stringEqualsIgnoreCase(a: string | null | undefined, b: string | null | undefined): boolean {
  return typeof a === "string" && typeof b === "string"
    ? a.localeCompare(b, undefined, { sensitivity: "accent" }) === 0
    : a === b;
}

export function scrollIntoViewIfNeeded(target: HTMLElement | null): void {
  if (!target) {
    return;
  }

  if (target.getBoundingClientRect().bottom > window.innerHeight) {
    target.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  if (target.getBoundingClientRect().top < 0) {
    target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}

export function countDecimals(num: number): string | number {
  if (Math.floor(num.valueOf()) === num.valueOf()) return 0;

  const str = num.toString();
  if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
    return str.split("-")[1] || 0;
  } else if (str.indexOf(".") !== -1) {
    return str.split(".")[1].length || 0;
  }
  return str.split("-")[1] || 0;
}

/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function decimalAdjust(type: any, value: any, exp: any): any {
  // If the exp is undefined or zero...
  if (typeof exp === "undefined" || +exp === 0) {
    // @ts-ignore
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split("e");
  // @ts-ignore
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
}

export function getRandomId(length: number): string {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
