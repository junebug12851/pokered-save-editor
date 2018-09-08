import { SaveFileService } from './../../savefile.service';
import { SaveFileIterator } from '../SaveFileIterator';

export function toBitArray(
    saveFile: SaveFileService,
    offset: number,
    byteSize: number,
    toArr: Array<boolean>
): SaveFileIterator {
    const it = saveFile.iterator.offsetTo(offset);
    for (let i = 0; i < byteSize; i++) {
        // Push bits in order of this byte
        toArr.push(it.getBit(1, 0));
        toArr.push(it.getBit(1, 1));
        toArr.push(it.getBit(1, 2));
        toArr.push(it.getBit(1, 3));
        toArr.push(it.getBit(1, 4));
        toArr.push(it.getBit(1, 5));
        toArr.push(it.getBit(1, 6));
        toArr.push(it.getBit(1, 7));

        // Increment iterator
        it.inc();
    }

    return it;
}

export function fromBitArray(
    saveFile: SaveFileService,
    offset: number,
    byteSize: number,
    fromArr: Array<boolean>
): SaveFileIterator {
    const it = saveFile.iterator.offsetTo(offset);
    for (let i = 0; i < byteSize * 8; i += 8) {
        it.setBit(1, 0, fromArr[i + 0]);
        it.setBit(1, 1, fromArr[i + 1]);
        it.setBit(1, 2, fromArr[i + 2]);
        it.setBit(1, 3, fromArr[i + 3]);
        it.setBit(1, 4, fromArr[i + 4]);
        it.setBit(1, 5, fromArr[i + 5]);
        it.setBit(1, 6, fromArr[i + 6]);
        it.setBit(1, 7, fromArr[i + 7]);

        // Increment iterator
        it.inc();
    }

    return it;
}
