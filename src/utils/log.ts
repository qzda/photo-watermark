import prolog from "@qzda/prolog";
import { IsDev } from "./env";

export function log(...arg: any[]) {
  console.log(prolog.green("Photo Watermark"), ...arg);
}

export function devLog(...arg: any[]) {
  if (IsDev) {
    log(...arg);
  }
}
