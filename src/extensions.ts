import { compare } from './util';
export { }
declare global {
    export interface Array<T> {
        addRange(range: T[]): T[];
        clear(): T[];
        first(): T;
        last(): T;
        where(predicate: (item: T) => boolean): T[];
        removeRange(index: number, range: number): T[];
        strictSort(): T[];
        orderBy(propertyExpressions: (item: T) => string, asc?: boolean): T[];
        insertAt(item: T, index: number): T[];
        getMatchCount(predicate: (item: T) => boolean): number;
        removeDuplicate(Key: keyof T): T[];

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
if (!Array.prototype.clear) {
    Array.prototype.clear = function <T>(this: T[]): T[] {
        if (this.length > 0) {
            this.splice(0, this.length);
        } else {
            throw new Error("Array has no elements");
        }
        return this;
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
        this.splice(index, range);
        return this;
    }
}

if (!Array.prototype.insertAt) {
    Array.prototype.insertAt = function <T>(this: T[], item: T, index: number): T[] {
        this.splice(index, 0, item);
        return this;
    }
}
if (!Array.prototype.getMatchCount) {
    Array.prototype.getMatchCount = function <T>(this: T[], predicate: (ele: T) => boolean): number {
        return this.filter(predicate).length;
    }
}

if (!Array.prototype.strictSort) {
    Array.prototype.strictSort = function <T>(this: T[]): T[] {
        if (this.length > 1) {
            const typeDetermine = typeof this[0];
            switch (typeDetermine) {
                case "string":
                    return this.sort();
                case "number":
                    return this.sort(compare);
                default:
                    throw new Error("'strictSort' works with 'number' and 'string'. For sorting array of Objects, use 'orderBy' function");
            }
        } else {
            throw new Error("Invalid or Insufficient items in Array");
        }
    }
}

if (!Array.prototype.orderBy) {
    Array.prototype.orderBy = function <T>(this: T[], propertyExpression: (item: T) => string, asc: boolean = true): T[] {
        if (this.length > 1) {
            const typeDetermine = typeof this[0];
            if (typeDetermine === "object") {

                const compareFunction = (ele1: T, ele2: T): number => {
                    for (let i = 0; i < propertyExpression.length; i++) {
                        if (propertyExpression(ele1) > propertyExpression(ele2)) {
                            return asc ? 1 : -1;
                        }
                        if (propertyExpression(ele2) > propertyExpression(ele1)) {
                            return asc ? -1 : 1;
                        }
                    }
                    return 0;
                }
                this.forEach((arrayItem: T) => {
                    return this.sort(compareFunction);
                });
                return this;

            } else {
                throw new Error("'orderBy' works with 'object' . For sorting array of string or number, use 'strictSort' function");
            }
        } else {
            throw new Error("Invalid or Insufficient items in Array");
        }
    }
    if (!Array.prototype.removeDuplicate) {
        Array.prototype.removeDuplicate = function <T>(this: T[], key: keyof T): T[] {
            return Array.from(
                new Set(this.map(arrayIteam => arrayIteam[key]))
              ).map(uniqueItem => {
                return this.find(item => item[key] === uniqueItem);
              });
        }
    }
}