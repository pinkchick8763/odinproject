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

    // 返回方法，供外部使用
    return {getBoard, dropToken, printBoard};
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
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = function(column) {
        console.log(`Dropping ${getActivePlayer().name}'s token into column ${column}...`);

        board.dropToken(column, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    };

    // Initialize
    printNewRound();

    return {getActivePlayer, playRound};
}

const game = GameController();