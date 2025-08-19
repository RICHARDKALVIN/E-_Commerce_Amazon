import {moneyFormat} from '../scripts/utils/money.js';

describe('test suit : testing converted into rubees',()=>{
    // it('converts cents into money',()=>{
    //     expect(moneyFormat(1000)).toEqual('340');
    // });
    it('expected value came?',()=>{
        expect(moneyFormat(1090)).toEqual('136.00');
    });
    it('basketball value ',()=>{
        expect(moneyFormat(2095)).toEqual('262.00');
    });
});

describe('new Test : Suit',()=>{
    it('testing_again this',()=>{
        expect(moneyFormat(799)).toEqual('100.00');
    });
});