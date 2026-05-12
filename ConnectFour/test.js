function Gameboard() {
    const rows = 6;
    const columns = 7;
    // 代表棋盤的二維數組
    const board = [];

    for (let i = 0; i < rows; i++) {
        // initialize 陣列值，告訴電腦放置一個空陣列 (相似於java 的new ArrayList<>())
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            // 加入element 到最後並且改變原數組
            board[i].push(Cell());
        }
    }

    const getBoard = function() {
        return board;
    };

    
    const dropToken = function(column, player) {
        /*
            創建一個能夠使用的格子的map
            .filter() 過濾陣列 (條件)，只返回符合的array element
            .map() 將過濾後的陣列，創建到board 在指定給availableCells
        */
        const availableCells = board
        .filter(row => row[column].getValue() === 0)
        .map(row => row[column]);

        // 只要大於零的值皆true ，0為false
        // availableCells 能使用的為零，代表棋盤已被下滿
        if (!availableCells.length) return;

        
        const lowestRow = availableCells.length - 1;
        board[lowestRow][column].addToken(player);
    };

    // 將每個格子的玩家值、空值印到console
    const printBoard = () => {
        const boardWithCellValues = board.map((row) =>
            row.map((cell) => cell.getValue())
        );
        console.log(boardWithCellValues);
    };
    /*  
        printBoard 展開之後
            const printBoard = function() {
                let boardWithCellValues = board.map(function(row) {
                        row.map( function(cell) {
                            return cell.getValue();
                        }
                    }
                );
            };
    */

    const getWithBoardValues = function() {
        return board.map(function(row) {
            return row.map(function(cell) {
                return cell.getValue();
            });
        });
    };

    // 返回方法，供外部使用
    return {getBoard, dropToken, printBoard, getWithBoardValues};
}

function Cell() {
    // private value
    let value = 0;

    // public method (Cell.addToken 可以呼叫) 用於放置棋子
    const addToken = function(player) {
        value = player;
    };

    // public method (Cell.getValue 可以呼叫) 用於獲取格子的值
    function getValue() {
        return value;
    }

    // 返回方法，供外部使用
    return {addToken, getValue};
}

function GameController(playOneName = "Player One", playTwoName = "Player Two") {
    const board = Gameboard();
    // 限制玩家名稱和棋子的值
    const players = [
        {
            name: playOneName,
            token: 1
        },
        {
            name: playTwoName,
            token: 2
        }
    ];
    // 先手 和 玩家回合變數
    let activePlayer = players[0];

    // change player's turn
    const switchPlayerTurn = function() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    
    const getActivePlayer = function() {
        return activePlayer;
    };

    const printNewRound = function() {
        board.printBoard();
        // console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = function(column) {
        const resultMsg = document.querySelector(".result");
        const droppingMsg = document.querySelector(".message");
        droppingMsg.textContent = `Dropping ${getActivePlayer().name}'s token into column ${column}...`;

        board.dropToken(column, getActivePlayer().token);

        if (checkWin()) {
            const resultBox = document.querySelector(".result-box");
            board.printBoard();
            resultMsg.textContent = `${getActivePlayer().name} is winner.`;
            resultBox.classList.add("active");
            return;
        }

        if (checkTie()) {
            const resultBox = document.querySelector(".result-box");
            board.printBoard();
            resultMsg.textContent = `It's a tie`;
            resultBox.classList.add("active");
            return;
        }

        switchPlayerTurn();
        printNewRound();
    };

    const checkWin = function() {
        const boardValue = board.getWithBoardValues();

        const rows = 6;
        const cols = 7;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const player = boardValue[row][col];

                if (player === 0) continue;

                // 只檢查每個格子的右邊，右邊不成立左邊也不會成立
                if (col + 3 < cols &&
                    player === boardValue[row][col + 1] &&
                    player === boardValue[row][col + 2] &&
                    player === boardValue[row][col + 3]
                ) {
                    return true;
                }

                // 只檢查上面，同樣上面不成立下面也不會成立
                if (row + 3 < rows &&
                    player === boardValue[row + 1][col] &&
                    player === boardValue[row + 2][col] &&
                    player === boardValue[row + 3][col]
                ) {
                    return true;
                }

                // 只檢查右上，同樣左下不檢查
                if (row + 3 < rows && col + 3 < cols &&
                    player === boardValue[row + 1][col + 1] &&
                    player === boardValue[row + 2][col + 2] &&
                    player === boardValue[row + 3][col + 3]
                ) {
                    return true;
                }

                // 右上處理過，但會忽略右下，同樣不檢查左上
                if (row - 3 >= 0 && col + 3 < cols &&
                    player === boardValue[row - 1][col + 1] &&
                    player === boardValue[row - 2][col + 2] &&
                    player === boardValue[row - 3][col + 3]
                ) {
                    return true;
                }
            }
        }

        return false;
    };

    const checkTie = function() {
        const boardValue = board.getWithBoardValues();

        // every() 全部符合才为 true
        return boardValue.every(function(row) {
            return row.every(function(cell) {
                return cell !== 0;
            });
        });
    };

    // Initialize
    printNewRound();

    return {getActivePlayer, playRound, getBoard: board.getBoard, checkWin, checkTie};
}

// test
// const game = GameController();

// update the screnn when player click the board
function ScreenController(playerOneName, playerTwoName) {
    const game = GameController(playerOneName, playerTwoName);
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const startBtn = document.querySelector('.start-btn');
    const restartBtn = document.querySelector('.restart-btn');

    startBtn.addEventListener("click", function() {
        const oneName = document.querySelector("#play1");
        const twoName = document.querySelector("#play2");
        const info = document.querySelector(".play-information");

        info.classList.add("active");

        ScreenController(
            oneName.value || "PlayerOne", 
            twoName.value || "PlayerTwo"
        );
    });

    restartBtn.addEventListener("click", function() {
        const resultBox = document.querySelector(".result-box");
        resultBox.classList.remove("active");
        // ScreenController 不能直接使用ScreenController 會變成多個 GameController 同時存在
        // ScreenController(playerOneName, playerTwoName);
    });
    
    const updateScreen = function() {
        // clean the board
        boardDiv.textContent = '';

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn.`;

        board.forEach(function(row) {
            // 第12行建立了 board[i].push(Cell());
            row.forEach(function(cell, index) {
                // 單元格是按鈕，而不是div元素。為什麼？在大多數情況下，任何可點擊的內容都應該是按鈕或連結。這樣，有行動不便的用戶仍然可以透過鍵盤上的Tab鍵和選擇鍵輕鬆使用我們的網站。
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                // 賦予button data-column 自訂屬性，用於視覺沒有的額外訊息
                // dataset 賦予後顯示為 data-xxx 的形式
                // tips dataset.indexNumber 到html會以這種格式呈現 : data-index-number
                // 為每個board row 的column 賦予0 ~ 6 的index
                cellButton.dataset.column = index;
                // 第12行建立了 board[i].push(Cell()); 這裡的cell 就是Cell()，所以可以呼叫Cell()裡的getValue方法
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            });
        });
    };

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        
        // 如果點擊的不是button 或者 沒有data-column屬性，則不執行任何操作
        if (!selectedColumn) return;

        game.playRound(selectedColumn);
        updateScreen();
    }
    boardDiv.addEventListener('click', clickHandlerBoard);

    updateScreen();
}

ScreenController();