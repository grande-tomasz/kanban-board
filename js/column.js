function Column(name) {
  var self = this;

  this.id = randomString();
  this.name = name;
  this.$element = createColumn();

  function createColumn() {
    var $column = $("<div>").addClass("column");
    var $columnTitle = $("<h2>").addClass("column-title").text(self.name);
    var $columnCardList = $("<ul>").addClass("column-card-list");
    var $columnAddCard = $("<button>").addClass("btn-create").text("Add a card");
    var $columnDelete = $("<button>").addClass("btn-delete").text("X");

    $columnDelete.click(function() {
      self.removeColumn();
    });
    $columnAddCard.click(function() {
      self.addCard(new Card(prompt("Enter a card name")));
    });

    $column.append($columnTitle)
      .append($columnAddCard)
      .append($columnDelete)
      .append($columnCardList);
    
    return $column;
  }
}
Column.prototype = {
  addCard: function(card) {
    this.$element.children("ul").append(card.$element);
  },
  removeColumn: function() {
    this.$element.remove();
  }
};