function isOperator(value){
    var operatorString = "+-*/()";
    return operatorString.indexOf(value) > -1
}
 
function getPrioraty(value){
    switch(value){
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return 0;
    }
}
 
function prioraty(o1, o2){
    return getPrioraty(o1) <= getPrioraty(o2);
}
 
function dal2Rpn(exp){
    var inputStack = [];
    var outputStack = [];
    var outputQueue = [];
 
    for(var i = 0, len = exp.length; i < len; i++){
        var cur = exp[i];
        if(cur != ' ' ){
            inputStack.push(cur);
        }
    }
    console.log('step one');
    while(inputStack.length > 0){
        var cur = inputStack.shift();
        if(isOperator(cur)){
            if(cur == '('){
                outputStack.push(cur);
            }else if(cur == ')'){
                var po = outputStack.pop();
                while(po != '(' && outputStack.length > 0){
                    outputQueue.push(po);
                    po = outputStack.pop();
                }
                if(po != '('){
                    throw "error: unmatched ()";
                }
            }else{
                while(prioraty(cur, outputStack[outputStack.length - 1]) && outputStack.length > 0){
                    outputQueue.push(outputStack.pop());
                }
                outputStack.push(cur);
            }
        }else{
            outputQueue.push(new Number(cur));
        }
    }
    console.log('step two');
    if(outputStack.length > 0){
        if(outputStack[outputStack.length - 1] == ')' || outputStack[outputStack.length - 1] == '('){
            throw "error: unmatched ()";
        }
        while(outputStack.length > 0){
            outputQueue.push(outputStack.pop());
        }
    }
    console.log('step three');
    return outputQueue;
 
}
 
// 模拟计算
console.log(dal2Rpn('1 + 2'));
console.log(dal2Rpn('1 + 2 + 3'));
console.log(dal2Rpn('1 + 2 * 3'));
console.log(dal2Rpn('1 + 2 * 3 - 4 / 5'));
console.log(dal2Rpn('( 1 + 2 )'));
 
console.log(dal2Rpn('( 1 + 2 ) * ( 3 - 4 ) / 5'));
console.log(dal2Rpn('( 1 + 2 ) * (( 3 - 4 ) / 5)'));