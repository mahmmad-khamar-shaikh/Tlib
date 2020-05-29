import { compare } from './util';
export { }
declare global {
    export interface Array<T> {
        first(): T;
        last(): T;
        where(predicate: (item: T) => boolean): T[];
        addRange(range: T[]): T[];
        removeRange(index: number, range: number): T[];
        strictSort(): T[];
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

if (!Array.prototype.removeRange) {
    Array.prototype.removeRange = function <T>(this: T[], index: number, range: number): T[] {
        return this.splice(index, range);
    }
}

if (!Array.prototype.strictSort) {
    Array.prototype.strictSort = function <T>(this: T[]): T[] {
        if (this.length > 1) {
            const typeDetermine = typeof this[0];
            switch (typeDetermine) {
                case "string":
                    return this.sort();
                    break;
                case "number":
                    return this.sort(compare);
                    break;
                default:
                    throw new Error("'strictSort' works with 'number' and 'string'. For sorting array of Objects, use 'orderBy' function");
            }
        } else {
            throw new Error("Invalid or Insufficient items in Array");
        }
    }
}

