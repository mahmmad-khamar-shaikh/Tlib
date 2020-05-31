export { }
declare global {
    interface Array<T> {
        addRange(range: T[]): T[];
        clear(): T[];
        first(): T;
        last(): T;
        where(predicate: (item: T) => boolean): T[];
        removeRange(index: number, range: number): T[];
        strictSort(): T[];
        orderBy(propertyExpressions: (item: T) => string, asc?: boolean): T[];

    }
}