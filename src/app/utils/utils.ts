declare var window: {
    require: any;
}

const path = window.require("path");

const isDev = process.env.DEV
    ? (process.env.DEV.trim() == "true")
    : false;

export const utils = {
    isDev,
    getPath(_path: string) {
        return path.join(process.cwd(), _path);
    }
};
