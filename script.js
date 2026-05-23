let items = [
    { name: "Молоко", quantity: 1, bought: false },
    { name: "Хліб", quantity: 1, bought: false },
    { name: "Сир", quantity: 1, bought: false }
];

const itemInput = document.getElementById("item-input");
const addButton = document.getElementById("add-btn");
const itemsList = document.getElementById("items-list");
const statsRemaining = document.getElementById("stats-remaining");
const statsBought = document.getElementById("stats-bought");

function addItem() {
    const name = itemInput.value.trim();

    if (name !== "") {
        items.push({ name: name, quantity: 1, bought: false });
        itemInput.value = "";
        render();
    }

    itemInput.focus();
}

function deleteItem(index) {
    items.splice(index, 1);
    render();
}

function changeQuantity(index, value) {
    items[index].quantity += value;

    if (items[index].quantity < 1) {
        items[index].quantity = 1;
    }

    render();
}

function changeBought(index) {
    items[index].bought = !items[index].bought;
    render();
}

function editName(index, nameElement) {
    if (items[index].bought) {
        return;
    }

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = items[index].name;
    editInput.className = "edit-input";

    nameElement.replaceWith(editInput);
    editInput.focus();

    editInput.addEventListener("blur", function () {
        const newName = editInput.value.trim();

        if (newName !== "") {
            items[index].name = newName;
        }

        render();
    });
}

function createButton(text, className) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    return button;
}

function renderItems() {
    itemsList.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const row = document.createElement("li");
        row.className = "item-row";

        if (item.bought) {
            row.className += " bought";
        }

        const name = document.createElement("span");
        name.textContent = item.name;
        name.className = "item-name";
        name.addEventListener("click", function () {
            editName(i, name);
        });

        const controls = document.createElement("div");
        controls.className = "item-controls";

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;
        quantity.className = "qty-display";

        if (!item.bought) {
            const minusButton = createButton("-", "btn-minus");
            minusButton.disabled = item.quantity === 1;
            minusButton.addEventListener("click", function () {
                changeQuantity(i, -1);
            });

            const plusButton = createButton("+", "btn-plus");
            plusButton.addEventListener("click", function () {
                changeQuantity(i, 1);
            });

            controls.appendChild(minusButton);
            controls.appendChild(quantity);
            controls.appendChild(plusButton);
        } else {
            controls.appendChild(quantity);
        }

        const actions = document.createElement("div");
        actions.className = "item-actions";

        const buyButton = createButton(item.bought ? "Не куплено" : "Куплено", "btn-buy");
        buyButton.addEventListener("click", function () {
            changeBought(i);
        });
        actions.appendChild(buyButton);

        if (!item.bought) {
            const deleteButton = createButton("x", "btn-delete");
            deleteButton.addEventListener("click", function () {
                deleteItem(i);
            });
            actions.appendChild(deleteButton);
        }

        row.appendChild(name);
        row.appendChild(controls);
        row.appendChild(actions);
        itemsList.appendChild(row);
    }
}

function addStat(container, item) {
    const stat = document.createElement("span");
    stat.className = "stat-item";
    stat.textContent = item.name + " " + item.quantity;
    container.appendChild(stat);
}

function renderStats() {
    statsRemaining.innerHTML = "";
    statsBought.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
        if (items[i].bought) {
            addStat(statsBought, items[i]);
        } else {
            addStat(statsRemaining, items[i]);
        }
    }
}

function render() {
    renderItems();
    renderStats();
}

addButton.addEventListener("click", addItem);

itemInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addItem();
    }
});

render();
