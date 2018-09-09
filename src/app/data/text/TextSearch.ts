import { Text } from './../../../../dist/pokered-save-editor/assets/data/text.d';

declare var window: {
    require: any;
}

const _ = window.require("lodash");

export class TextSearch {
    constructor(keys: Text[]) {
        this.keys = keys;
    }

    doFilter(prop: string, inclusive: boolean): TextSearch {
        this.keys = _.filter(this.keys, (value: Text) => {
            // @ts-ignore
            if (inclusive && value[prop])
                return true;
            // @ts-ignore
            else if (!inclusive && !value[prop])
                return true;

            return false;
        });

        return this;
    }

    doInclusiveFilter(prop: string): TextSearch {
        return this.doFilter(prop, true);
    }

    doExclusiveFilter(prop: string): TextSearch {
        return this.doFilter(prop, false);
    }

    get andShorthand(): TextSearch {
        return this.doInclusiveFilter("shorthand");
    }

    get notShorthand(): TextSearch {
        return this.doExclusiveFilter("shorthand");
    }

    get andNormal(): TextSearch {
        return this.doInclusiveFilter("normal");
    }

    get notNormal(): TextSearch {
        return this.doExclusiveFilter("normal");
    }

    get andControl(): TextSearch {
        return this.doInclusiveFilter("control");
    }

    get notControl(): TextSearch {
        return this.doExclusiveFilter("control");
    }

    get andPic(): TextSearch {
        return this.doInclusiveFilter("picture");
    }

    get notPic(): TextSearch {
        return this.doExclusiveFilter("picture");
    }

    get andSingle(): TextSearch {
        return this.doInclusiveFilter("singleChar");
    }

    get notSingle(): TextSearch {
        return this.doExclusiveFilter("singleChar");
    }

    get andMulti(): TextSearch {
        return this.doInclusiveFilter("multiChar");
    }

    get notMulti(): TextSearch {
        return this.doExclusiveFilter("multichar");
    }

    get andVar(): TextSearch {
        return this.doInclusiveFilter("variable");
    }

    get notVar(): TextSearch {
        return this.doExclusiveFilter("variable");
    }

    get andTiles(): TextSearch {
        return this.doInclusiveFilter("useTilemap");
    }

    get notTiles(): TextSearch {
        return this.doExclusiveFilter("useTilemap");
    }

    public keys: Text[];
}
