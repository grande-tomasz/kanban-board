$(function() {

  function randomString() {
    var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var str = "";
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  // BOARD OBJECT
  var board = {
    name: "Kanban Board",
    $element: $("#board .column-container"),
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    }
    
  };
  function initSortable() {
    $(".column-card-list").sortable({
      connectWith: ".column-card-list",
      placeholder: "highlight"
    //   ,start: function (event, ui) {
    //     ui.item.toggleClass("highlight");
    //   },
    //   stop: function (event, ui) {
    //     ui.item.toggleClass("highlight");
    //   }
    }).disableSelection();
  }
  $(".board > .btn-create").click(function() {
    var name = prompt("Enter a column name");
    var column = new Column(name);
    board.addColumn(column);
    // board.addColumn(new Column(prompt("Enter a column name")));
  });

  // COLUMN CLASS
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

  // CARD CLASS
  function Card(description) {
    var self = this;
    
    this.id = randomString();
    this.description = description;
    this.$element = createCard();
    
    function createCard() {
      var $card = $("<li>").addClass("card");
      var $cardDescription = $("<p>").addClass("card-description").text(self.description);
      var $cardDelete = $("<button>").addClass("btn-delete").text("X");

      $cardDelete.click(function(){
        self.removeCard();
      });

      $card.append($cardDelete)
        .append($cardDescription);
      
      return $card;
    }
  }
  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  };

  // MAIN
  var toDoColumn = new Column("TO DO");
  var inProgressColumn = new Column("IN PROGRESS");
  var finishedColumn = new Column("FINISHED");

  board.addColumn(toDoColumn);
  board.addColumn(inProgressColumn);
  board.addColumn(finishedColumn);

  var toDoCard = new Card("toDoCard");
  var inProgressCard = new Card("inProgressCard");

  toDoColumn.addCard(toDoCard);
  inProgressColumn.addCard(inProgressCard);
  
});
