import { styleTypes } from "./types.js";

function createStyles(styles = styleTypes) {
  const keys = Object.keys(styles);
  const allowedChars = "abcdefghijklmnopqrstuvwxyz".split("");

  let stylesResult = "";

  for (let i = 0; i < keys.length; i++) {
    if (styles[keys[i]] !== null) {
      let k = "";

      for (let c of keys[i].split("")) {
        if (allowedChars.includes(c)) {
          k += c;
        } else {
          k += `-${String(c).toLowerCase()}`;
        }
      }

      stylesResult += `${k}:${styles[keys[i]]};`;
    }
  }

  return stylesResult;
}

export { createStyles };
