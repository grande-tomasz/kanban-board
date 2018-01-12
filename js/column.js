function Column(id, name) {
  var self = this;

  this.id = id;
  this.name = name || "no name";
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
    $columnAddCard.click(function(event) {
      var cardName = prompt("Enter the name of the card");
      event.preventDefault();
      
      $.ajax({
        url: baseUrl + "/card",
        method: "POST",
        data: {
          name: cardName,
          bootcamp_kanban_column_id: self.id
        },
        success: function(response) {
          var card = new Card(response.id, cardName);
          self.addCard(card);
        }
      });

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
    var self = this;

    $.ajax({
      url: baseUrl + "/column/" + self.id,
      method: "DELETE",
      success: function(response) {
        self.$element.remove();
      }
    });

  }
};
