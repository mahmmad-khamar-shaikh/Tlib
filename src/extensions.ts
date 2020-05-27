export { }
declare global {
    export interface Array<T> {
        first(): T;
        last(): T;
        where(predicate: (item: T) => boolean): T[];
        addRange(range: T[]): T[];
    }
}

if (!Array.prototype.first) {
    Array.prototype.first = function <T>(this: T[]): T {
        if (this.length > 0) {
            return this[0];
        } else {
            throw new Error("Array has no elements");
        }
    }
}
if (!Array.prototype.last) {
    Array.prototype.last = function <T>(this: T[]): T {
        if (this.length > 0) {
            return this[this.length - 1];
        } else {
            throw new Error("Array has no elements");
        }
    }
}

if (!Array.prototype.where) {
    Array.prototype.where = function <T>(this: T[], predicate: (ele: T) => boolean): T[] {
        let resultArray = new Array<T>();
        this.forEach((item: T) => {
            if (predicate(item)) {
                resultArray.push(item);
            }
        });
        return resultArray
    }
}
if (!Array.prototype.addRange) {
    Array.prototype.addRange = function <T>(this: T[], listToAdd: T[]): T[] {
        this.push(...listToAdd);
        return this;
    }
}
