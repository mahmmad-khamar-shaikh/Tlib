import { compare } from '../src/util';
describe("util helper testing", () => {
    it("should return 1 when item1 > item2", () => {
        const result = compare(10, 4);
        expect(result).toBe(1);
    });
    it("should return -1 when item1 < item2", () => {
        const result = compare(1, 4);
        expect(result).toBe(-1);
    });
    it("should return 0 when item1 = item2", () => {
        const result = compare(10, 10);
        expect(result).toBe(0);
    });

});