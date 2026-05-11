// 失敗的閉包 (以下相似於閉包，其實是public function)
function outer() {
    const outerVar = "Hey I am the outer Var";

    function inner() {
        const innerVar = "Hey I am the inner Var";
        console.log(innerVar);
        console.log(outerVar);
    }
}

console.log(outer);

// 也是失敗的閉包，看似有回傳但是會把以下訊息回傳回去，導致資訊暴露
/*
    f inner() {
        const innerVar = "Hey I am the inner Var";
        console.log(innerVar);
        console.log(outerVar);
    }
*/
function outer() {
    const outerVar = "Hey I am the outer Var";

    function inner() {
        const innerVar = "Hey I am the inner Var";
        console.log(innerVar);
        console.log(outerVar);
    }

    return inner;
}

const fun = outer();

// 成功的閉包
// innerFun() 成功將return 的inner 啟用了function
function outer() {
    const outerVar = "Hey I am the outer Var";

    function inner() {
        const innerVar = "Hey I am the inner Var";
        console.log(innerVar);
        console.log(outerVar);
    }

    return inner;
}

const innerFun = outer();
innerFun();


// 閉包實際的基本運用
// 可以自由呼叫的同時，避免了資訊的暴露與更改
function crateGreeting(greeting = "") {
    const greet = greeting.toUpperCase();

    return function(name) {
        console.log(`${greet} ${name}`);
    }
}

// console print HELLO Jhon
// 透過傳遞hello 給createGreeting 轉大寫，返回function 將Jhon 套入內部function
const sayHello = createGreeting("hello");
console.log(sayHello("Jhon"));


// 閉包的私有變數運用
// 沒有為內部function 命名(win()) 將發生錯誤，因為有return 值回去必須為具名function
/* 
    score 相較於外部域來說為private ，win() 裡面的score 對於createGame 的score 來說也是private
    如此一來score 可以保證初始化為0 又可以保證score++ 不會汙染score
*/
function createGame(gameName) {
    let score = 0;

    return function win() {
        score++;
        return `Your name ${gameName} score is ${score}`;
    }
}

const hockeyGame = createGame("FTK");
hockeyGame(); // Your name FTK score is 1
hockeyGame(); // Your name FTK score is 2
hockeyGame(); // Your name FTK score is 3
 
// the Model pattern
// 啟用模組模式使用 (function() {})(); 將function 刮起來即可啟用
// 模組模式 用於檔案間的匯入匯出
// 模組模式 裡面定義皆為private
const calculator = (() => {
    let lastResult;

    const add = function(a, b) {
        lastResult = a + b;
        return lastResult;
    };

    const subtract = function(a, b) {
        lastResult = a - b;
        return lastResult;
    };

    const multiply = function(a, b) {
        lastResult = a * b;
        return lastResult;
    };

    const divide = function(a, b) {
        lastResult = a / b;
        return lastResult;
    };

    const getLastResult = () => lastResult;

    // 返回function 名稱即可呼叫function
    return { add, subtract, multiply, divide, getLastResult };
});