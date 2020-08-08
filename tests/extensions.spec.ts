import '../src/index';
class Heoros {
    Name: string;
    Alias: string;
    SuperStrength: number;
}

describe("Extension methods for array", () => {
    let numericArray: Array<number>;
    let numericArray2: Array<number>;
    let stringArray: Array<string>;
    let heroList: Array<Heoros>;
    beforeEach(() => {
        numericArray = new Array<number>();
        numericArray.push(3);
        numericArray.push(100);
        numericArray.push(2);
        numericArray.push(10);
        numericArray.push(4);


        numericArray2 = new Array<number>();
        numericArray2.push(5);
        numericArray2.push(6);

        stringArray = new Array<string>();
        stringArray.push("IronMan");
        stringArray.push("Captain America");

        heroList = new Array<Heoros>();
        heroList.push({ Name: "Tony Stark", Alias: "Iron Man", SuperStrength: 8 });
        heroList.push({ Name: "Steve Rogers", Alias: "Captain America", SuperStrength: 7 });
    });

    it("Should initialized array with no items", () => {
        expect(numericArray).toBeDefined();
    });
    it("Should initialized array with 5 items", () => {
        expect(numericArray.length).toBe(5);
    });
    /***
     *  First() 
     * */
    it("Should return first element from array", () => {
        expect(numericArray.first()).toBe(3);
    });
    it("Should throw an error 'Array has no element'- for First()", () => {
        expect(function () { numericArray.clear().first() }).toThrow(new Error("Array has no elements"));
    });
    /** 
     * Last()
     *  */
    it("Should return last elemet from array", () => {
        expect(numericArray.last()).toBe(4);
    });
    it("Should throw an error 'Array has no element'-for Last()", () => {
        expect(function () { numericArray.clear().last() }).toThrow(new Error("Array has no elements"));
    });
    /*** 
     * Clear()
     */
    it("Should clear all the items from array and return blank array", () => {
        expect(numericArray.clear().length).toBe(0);
    });
    it("Should throw an error 'Array has no element'- for First()", () => {
        expect(function () { numericArray.clear().clear() }).toThrow(new Error("Array has no elements"));
    });
    /***
     *  Where()
     *  */
    it("Should return all items greater than 4", () => {
        const result = numericArray.where(ele => ele > 4);
        expect(result).toEqual([100, 10]);
    });
    it("Should return array with item  4", () => {
        const result = numericArray.where(ele => ele === 4);
        expect(result).toEqual([4]);
    });
    it("Should return array with items  < 4", () => {
        const result = numericArray.where(ele => ele < 4);
        expect(result).toEqual([3, 2]);
    });
    it("Should return empty array if no item found", () => {
        const result = numericArray.where(ele => ele === 5);
        expect(result).toEqual([]);
    });
    /** 
     * addRange()
     *  */
    it("Should add two array of items", () => {
        const superSetArray = numericArray.addRange(numericArray2);
        expect(superSetArray).toEqual([3, 100, 2, 10, 4, 5, 6]);
    });
    /***
     *  RemoveRange()
     *  */
    it("Should remove number of items from array", () => {
        const subSetArray = numericArray.removeRange(2, 2);
        expect(subSetArray).toEqual([3, 100, 4]);
    });
    /***
     * strictSort
     */
    it("Should sort numeric array by value ", () => {
        expect(numericArray.strictSort()).toEqual([2, 3, 4, 10, 100]);
    });
    it("Should sort string array by value", () => {
        expect(stringArray.strictSort()).toEqual(["Captain America", "IronMan"]);
    });
    it("Should show Invalid or insufficient items in Array Message", () => {

        expect(function () { numericArray.where(el => el === 4).strictSort() })
            .toThrow(new Error("Invalid or Insufficient items in Array"));
    });
    it("Should show Object Error", () => {
        expect(function () { heroList.strictSort() })
            .toThrow(new Error("'strictSort' works with 'number' and 'string'. For sorting array of Objects, use 'orderBy' function"));
    });
    it("Shuold show invalid or insufficient error when array is blank ", () => {
        expect(function () { numericArray.clear().strictSort() })
            .toThrow(new Error("Invalid or Insufficient items in Array"));
    });
    /**
     * OrderBy
     */
    it("Should sort array of object in ascending order", () => {
        expect(heroList.orderBy(item => item.Name)).toEqual([
            { Name: "Steve Rogers", Alias: "Captain America", SuperStrength: 7 },
            { Name: "Tony Stark", Alias: "Iron Man", SuperStrength: 8 }
        ])
    });
    it("Should sort array of object in descending order", () => {
        expect(heroList.orderBy(item => item.Name, false)).toEqual([
            { Name: "Tony Stark", Alias: "Iron Man", SuperStrength: 8 },
            { Name: "Steve Rogers", Alias: "Captain America", SuperStrength: 7 }
        ])
    });
    it("Should show invalid or insufficient item in array message when Array of object is empty", () => {
        expect(function () { heroList.clear().orderBy(item => item.Name) })
            .toThrow(new Error("Invalid or Insufficient items in Array"));
    });
    it("Should show Object Error", () => {
        expect(function () { stringArray.orderBy(item => item) })
            .toThrow(new Error("'orderBy' works with 'object' . For sorting array of string or number, use 'strict' function"));
    });
    /**
     *  InserAt 
     */
    it("Should insert 50 at location 2 ", () => {
        expect(numericArray.insertAt(50, 1)[1]).toBe(50);
    });
});

