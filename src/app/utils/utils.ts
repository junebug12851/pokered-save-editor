// @ts-ignore
const path = window.require("path");

// @ts-ignore
const isDev = process.env.DEV
    // @ts-ignore
    ? (process.env.DEV.trim() == "true")
    : false;

export const utils = {
    isDev,
    getPath(_path: string) {
        // @ts-ignore
        return path.join(process.cwd(), _path);
    }
};
