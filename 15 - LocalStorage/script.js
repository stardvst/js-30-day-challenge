'use strict';

class Model {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("items")) || [];
  }

  addItem(name) {
    this.items.push({ name, checked: false });
    this.update();
    this.onItemListChanged(this.items);
  }

  deleteItem(name) {
    this.items = this.items.filter((item) => item.name !== name);
    this.update();
  }

  deleteAll() {
    this.items.length = 0;
    this.update();
  }

  checkAll(checked) {
    for (const item of this.items) {
      item.checked = checked;
    }
    this.update();
  }

  toggleItem(idx) {
    if (idx < 0 || idx >= this.items.length) return;
    const item = this.items[idx];
    item.checked = !item.checked;
    this.update();
  }

  update() {
    localStorage.setItem("items", JSON.stringify(this.items));
    this.onItemListChanged(this.items);
  }

  bindEvents(controller) {
    this.onItemListChanged = controller.onItemListChanged;
  }
}

class View {
  constructor() {
    this.itemList = document.querySelector(".plates");
    this.checkAllButton = document.getElementById("check-all");
    this.uncheckAllButton = document.getElementById("uncheck-all");
    this.clearAllButton = document.getElementById("clear-all");
    this.input = document.querySelector("[name=item]");
    this.itemForm = document.querySelector(".add-items");
  }

  bindEvents(controller) {
    this.checkAllButton.addEventListener("click", controller.handleCheckAll);
    this.uncheckAllButton.addEventListener("click", controller.handleCheckAll);
    this.clearAllButton.addEventListener("click", controller.handleClearAll);
    this.itemForm.addEventListener("submit", controller.handleAddItem);
    this.itemList.addEventListener("click", controller.handleToggleItem);
  }

  getItemName() {
    return this.input.value;
  }

  resetInput() {
    this.input.value = "";
  }

  displayItems(items) {
    this.itemList.textContent = "";

    if (items.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Loading Tapas...";
      this.itemList.appendChild(li);
      return;
    }

    items.forEach((item, idx) => {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = item.checked;
      input.setAttribute("id", `item${idx}`);
      input.setAttribute("data-index", idx);

      const li = document.createElement("li");
      const label = document.createElement("label");
      label.textContent = item.name;
      label.setAttribute("for", `item${idx}`);
      li.append(input);
      li.append(label);
      this.itemList.appendChild(li);
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.model.bindEvents(this);
    this.view = view;
    this.view.bindEvents(this);

    this.onItemListChanged(this.model.items);
  }

  handleAddItem = (e) => {
    e.preventDefault();
    this.model.addItem(this.view.getItemName());
    this.view.resetInput();
  };

  handleToggleItem = (e) => {
    const input = e.target.closest("input");
    if (input) this.model.toggleItem(input.dataset.index);
  };

  handleClearAll = () => {
    this.model.deleteAll();
  };

  handleCheckAll = (e) => {
    if (e.target.closest("#check-all")) {
      this.model.checkAll(true);
    } else if (e.target.closest("#uncheck-all")) {
      this.model.checkAll(false);
    }
  };

  onItemListChanged = (items) => {
    this.view.displayItems(items);
  };
}

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
