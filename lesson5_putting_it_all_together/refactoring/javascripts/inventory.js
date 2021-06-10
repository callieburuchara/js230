var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date(); // keep this
      $("#order_date").text(date.toUTCString()); // .toUTCString() works in vanilla JS
    },
    cacheTemplate: function() {
      var $iTmpl = $("#inventory_item").remove(); // returns what was deleted
      this.template = $iTmpl.html(); // iTmpl.innerHTML should work here
    },
    add: function() {
      this.lastId++; // increment the ID
      var item = {
        id: this.lastId, // the item's ID is up to date
        name: "",        // name is empty
        stock_number: "",// stock number is empty
        quantity: 1      // quantity defaults to 1
      };
      this.collection.push(item); // add this new item to the collection of all items

      return item; // return the item from this function
    },
    remove: function(idx) { // remove item based on index
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx; // reset the collection to ignore the item w index
      });
    },
    get: function(id) { // find item based on index
      var found_item;

      this.collection.forEach(function(item) { // look through entire collection
        if (item.id === id) {
          found_item = item; // set found item to item if found
          return false; // I think this just exits the forEach early
        }
      });

      return found_item; // return the found item
    },
    update: function($item) { // uses a jquery object 
      var id = this.findID($item), // find id of the item we want to update
          item = this.get(id);     // find the item we want to update using the id

      item.name = $item.find("[name^=item_name]").val(); // update item name attribute
      item.stock_number = $item.find("[name^=item_stock_number]").val(); // '' stock n
      item.quantity = $item.find("[name^=item_quantity]").val(); // '' item quantity
    },
    newItem: function(e) {
      e.preventDefault(); // e must be an event here
      var item = this.add(), // //  
          $item = $(this.template.replace(/ID/g, item.id));

      $("#inventory").append($item);
    },
    findParent: function(e) {
      return $(e.target).closest("tr");
    },
    findID: function($item) {
      return +$item.find("input[type=hidden]").val();
    },
    deleteItem: function(e) {
      e.preventDefault();
      var $item = this.findParent(e).remove();

      this.remove(this.findID($item));
    },
    updateItem: function(e) {
      var $item = this.findParent(e);

      this.update($item);
    },
    bindEvents: function() {
      $("#add_item").on("click", $.proxy(this.newItem, this));
      $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
      $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

$($.proxy(inventory.init, inventory));
