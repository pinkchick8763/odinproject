/* Click event listener */
let clickBtn = document.querySelector("#btn");

function showAlert() {
    alert(event.type); // returnr event property
}

clickBtn.addEventListener("click", showAlert);

/* 
    匿名function 
clickBtn.addEventListener("click", function() {
    alert("Hey");
});

    arrow function
clickBtn.addEventListener("click", () => {
    alert("Hey");    
});
*/

/* Prevent element default event 但不阻止bubbling */
let getAnchor = document.querySelector("#prevent");

getAnchor.addEventListener('click',function(event) {
    console.log('This is prevent default message!');
    event.preventDefault(); // 阻止anchor 跳轉頁面
});

/* 阻止bubbling 但不阻止defualt 行為 */
let stopBubbling = document.querySelector("#stopBubbling");

stopBubbling.addEventListener("click", (event) => {
    console.log("This is stopBubbling event message!");
    event.stopPropagation();
});

document.body.addEventListener("click", (event) => {
    console.log("This is body bubbling message!");
});



/* ------------------------------------------------------------------------------ */
/* 1. mousedown 和mouseup 都有觸發才會觸發click */
/* double click 需要觸發1. 兩次才觸發dblclick */
let mouseBtn = document.querySelector("#mouse-btn");

mouseBtn.addEventListener("contextmenu", (event) => { // 阻止右鍵菜單顯示
    event.preventDefault();
});

/* 
    event.button
    0 left mouse button
    1 middle mouse button
    2 right mouse button
*/
mouseBtn.addEventListener("mouseup", (e) => {
    let mouseMsg = document.querySelector("#mouse-msg");
    switch (e.button) {
        case 0:
            mouseMsg.textContent = "Left mouse button clicked.";
            break;
        case 1:
            mouseMsg.textContent = "Middle mouse button clicked.";
            break;
        case 2:
            mouseMsg.textContent = "Right mouse button clicked.";
            break;
        default:
            mouseMsg.textContent = `Unknow mouse button code: ${event.button}`;
    }
});

/* 
    shift, alt, meta(window) and ctrl 偵測
*/
let keyBtn = document.querySelector("#key-btn");

keyBtn.addEventListener("click", (e) => {
    let keyMsg = document.querySelector("#key-msg");
    let keys = [];

    if (e.shiftKey) keys.push("shift");
    if (e.ctrlKey) keys.push("ctrl");
    if (e.metaKey) keys.push("meta");
    if (e.altKey) keys.push("alt");

    keyMsg.textContent = `Keys : ${keys.join('+')}`; // join('+') 將string array 之間使用 + 串成string
});

/* mousemove 座標分兩種 螢幕 和 瀏覽器視窗
    螢幕 screenX 、 screenY
    根據瀏覽器 clientX 、 clientY
*/
let move = document.querySelector("#move");

move.addEventListener("mousemove", (e) => {
    let pointer = document.querySelector("#pointer");

    pointer.innerText = `
        Screen X/Y : (${e.screenX}, ${e.screenY})
        Client X/Y : (${e.clientX}, ${e.clientY})
    `;
});

/* -------------------------------------------------------------------- */
let key = document.querySelector("#key");
let downkey = document.querySelector("#downkey");
let presskey = document.querySelector("#presskey");
let upkey = document.querySelector("#upkey");

key.addEventListener("keydown", (e) => {
    let key = [], code = [];
    key.push(e.key);
    code.push(e.code);
    downkey.innerText = `
        down : 
            key = ${key.join('+')} 
            code = ${code.join('+')}`;
});

key.addEventListener("keypress", (e) => {
    let key = [], code = [];
    key.push(e.key);
    code.push(e.code);
    presskey.innerText = `
        press : 
            key = ${key.join('+')}
            code = ${code.join('+')}`;
});

key.addEventListener("keyup", (e) => {
    let key = [], code = [];
    key.push(e.key);
    code.push(e.code);
    upkey.innerText = `
        up : 
            key = ${key.join('+')} 
            code = ${code.join('+')}`;
});

/* ------------------------------------------------------------------------ */
let menu = document.querySelector("#menu");

menu.addEventListener("click", (e) => {
    let target = e.target;

    switch (target.id) {
        case "home":
            console.log("Turn to home");
            break;
        case "about":
            console.log("Turn to about me");
            break;
        case "contact":
            console.log("Turn to contact");
            break;
    }
});
