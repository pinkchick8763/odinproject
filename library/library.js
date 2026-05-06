/* Store data (Model) */
const myLibrary = [];

function Book(id, title, author, pages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
}

/* controls add and remove (Logic) */
/*
    library 不用index 搜尋，使用id 代替
    因remove 會導致index 變為不連續性，導致搜尋效率降低
*/
function addBookToLibrary(title, author, pages, isRead) {
    // 產生全球唯一ID ，ex : "3f9c2c9a-8f1a-4c2f-9c7a-1d3e5b6a7f8b"
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages, isRead);
    myLibrary.push(book);
}

function removeBook(id) {
    // 尋找符合條件的id ，並返回位置
    /*
        b => b.id === id 等同於
        function(b) {
            return b.id === id;
        }
    */
    const index = myLibrary.findIndex(b => b.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
}

/* Display (View) */
function displayBooks() {
    const container = document.getElementById("library");
    container.innerHTML = "";

    myLibrary.forEach(book => {
        const cards = document.createElement("div");
        cards.classList.add("book-card");

        /* 將div 添加dataset 屬性 <div class="book-card" data-id=" (book.id) "></div> */
        cards.dataset.id = book.id;

        cards.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.pages}</p>
            <p>${book.isRead ? "Read" : "Not read"}</p>
            <button class="toggle">Toggle</button>
            <button class="delete">Delete</button>
        `;

        container.appendChild(cards)
    });
}

/* add event (Controller) */
document.getElementById("library").addEventListener("click", (e) => {
    // e.target.closest 從「被點擊的元素」往上找最近的 <div>
    const cards = e.target.closest(".book-card");
    if (!cards) return;

    const id = cards.dataset.id;
    /* 
        .find 找到回傳Object
        {
            id: "abc123",
            title: "...",
            ...
        }
    */
   /* 防止錯誤元素 */
    const book = myLibrary.find(b => b.id === id);
    
    if (!book) return;

    if (e.target.classList.contains("delete")) {
        removeBook(id);
        displayBooks();
    }

    if (e.target.classList.contains("toggle")) {
        /* book prototype toggleRead */
        book.toggleRead();
        displayBooks();
    }
});

const form = document.getElementById("form");
/* add new book */
form.addEventListener("submit", (e) => {
    /*     preventDefault()
        阻止瀏覽器的「預設行為」發生 (所有元素的預設行為都可以阻止)
        form 的預設行為: 送出表單 → 重新整理頁面（reload）→ 嘗試送資料到伺服器
    */
    e.preventDefault();
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const isRead = form.isRead.checked;

    addBookToLibrary(title, author, pages, isRead);
    displayBooks();
    /* 清空form 全部的value */
    // form.reset();
});