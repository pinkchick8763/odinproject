const drawboard = document.querySelector(".drawboard");

const createDraw = document.querySelector("#create");

createDraw.addEventListener("click", () => {
    drawboard.innerHTML = "";
    let sign = Number(prompt("輸入畫板範圍 :"));

    if (sign === null || sign === "" || sign > 100) {
        return;
    }else {
        let range = sign * 16; // 不要放在外層，sign == null 的話會出錯
        drawboard.style.width = range + "px";
        drawboard.style.height = range + "px";
        for (let i = 0; i < sign; i++) {
            for (let j = 0; j < sign; j++) {
                let createDiv = document.createElement("div");
                // createDiv.className = "pix" + i + j;  改用createDiv.addEventListener 就不需要了
                createDiv.className += " pix";
                createDiv.addEventListener("mouseenter", () => {
                    createDiv.style.background = "black";
                });
                drawboard.appendChild(createDiv);
                
                /* 效率差 */
                // let index = document.querySelector(".pix" + i + j);
                // index.addEventListener("mouseenter", () => {
                //     index.style.background = "black";
                // });
            }
        }
    }
});

