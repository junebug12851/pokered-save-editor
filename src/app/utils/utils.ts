declare var window: {
    require: any;
};

declare var process: any;

const path = window.require('path');

export const utils = {
    isDev: (process.env.DEV)
        ? (process.env.DEV.trim() === 'true')
        : false,
    getPath(_path: string) {
        return path.join(process.cwd(), _path);
    }
};
