/*
*  Command for start:  NODE_ENV=test mocha 
*/
const calc = require('../calculator');
const expect = require('chai').expect;
const should = require('should');
// make sure you run it in test env
should(process.env.NODE_ENV).eql('test');


describe('Calculator ', () => {
    
    it('simple', ()=>{
        let num =  15 + 23 + 44 * 21 / 3 - 4;
        let str = '15 + 23 + 44 * 21 / 3 - 4';
        calc(str).should.be.equal(num);
    });
    
    it('the number', ()=>{
        let num =  15;
        let str = '15';
        calc(str).should.be.equal(num);
    });
    
    it('the negative number', ()=>{
        let num =  -4;
        let str = ' - 4';
        calc(str).should.be.equal(num);
    });
    
    it('brackets', ()=>{
        let num =  (15 + (23 + 44)) * 21 - 12 / 4;
        let str = '(15 + (23 + 44)) * 21 - 12 / 4';
        calc(str).should.be.equal(num);
    });
    
    it('fraction', ()=>{
        let num =  15 - 3 / 4;
        let str = '15 - 3 / 4';
        calc(str).should.be.equal(num);
    });
    
    it('negative numbers', ()=>{
        let num =  -5 + 3 * (-7 + 2);
        let str = '-5 + 3 * (-7 + 2)';
        calc(str).should.be.equal(num);
    });
    
    it('Complicated calculation', ()=>{
        let num =  -5+3*(33-7*2-(33-11+(-2+3/2))/3-1);
        let str = '-5+3*(33-7*2-(33-11+(-2+3/2))/3-1)';
        calc(str).should.be.equal(num);
    });
    
    it('Division by zero throw Error', ()=>{
        expect(() => calc('25 / 0')).to.throw();
    });

});