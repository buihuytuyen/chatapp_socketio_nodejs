const expect = require('expect');

const { isRealString } = require('./isRealString');

describe('Is Real String', () => {
    it('should reject non-string values.', () => {
        let res = isRealString(65);
        expect.expect(res).toBe(false);
    });
    it('should reject string with only spaces.', () => {
        let res = isRealString('         ');
        expect.expect(res).toBe(false);
    });
    it('should allow string with non-space chars.', () => {
        let res = isRealString('         DWJ');
        expect.expect(res).toBe(true);
    });
});
