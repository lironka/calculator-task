module.exports = function calculator (str) {
    let operArr = ['+','-','*','/'];
    let arr = [];
    let numStr = '';

    str = str.split(' ').join('');
    
    for (let i = 0; i < str.length; i++) {
        if(str[i] == '(' || str[i] == ')' || operArr.indexOf(str[i]) > -1 ) {
            if(numStr) { arr.push(parseFloat(numStr)) };
            numStr = '';
            arr.push(str[i]);
        } else{
            numStr += str[i];
        }
    }
    if(numStr) arr.push(parseFloat(numStr));
    return culcBrackets(arr);
};

function culcBrackets(arr) {
    let res = '';
    let line = '';
    let idxClosed = arr.indexOf(')');
    
    for (let i = idxClosed; i>=0 ; i--) {
        if(arr[i] == '('){
            let lineArr = arr.slice(i+1,idxClosed);
            res = calc(lineArr);
            arr.splice(i, idxClosed - i + 1, res);
            break;
        }       
    }
    if(arr.indexOf(')') > - 1){
        arr = culcBrackets(arr);
    }
    let num = calc(arr);
    return num;
}

function calc(arr) {
    if(typeof(arr) != 'object') return arr;
    
    if(arr[0] == '-') {
        arr.unshift(0);
    }
    arr = doCalc('*', arr);
    arr = doCalc('/', arr);
    arr = doCalc('-', arr);
    arr = doCalc('+', arr);
    return arr[0];
}

function doCalc(operator, array) {
    while (array.includes(operator)) {
        let index = array.indexOf(operator);
        array[index + 1] = calcSimple(operator, array[index - 1], array[index + 1]);
        array[index - 1] = null;
        array[index] = null;
    }
    array = array.filter(function(n){ return n != undefined })
    return array;
}

function calcSimple(operator, num1,num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if(num2 === 0 ){ 
                throw new Error("You can't split 0");
            }
            return num1 / num2;
        default:
            break;
    }
    throw new Error("Unknown operation");
}