$(function() {

  function randomString() {
    var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var str = "";
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  // Board object
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
      placeholder: "card-placeholder"
    }).disableSelection();
  }
  $(".create-column").click(function() {
    var name = prompt("Enter a column name");
    var column = new Column(name);
    board.addColumn(column);
    // board.addColumn(new Column(prompt("Enter a column name")));
  });

  // Column class
  function Column(name) {
    var self = this; // useful for nested functions

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      var $column = $("<div>").addClass("column");
      var $columnTitle = $("<h2>").addClass("column-title").text(self.name);
      var $columnCardList = $("<ul>").addClass("column-card-list");
      var $columnDelete = $("<button>").addClass("btn-delete").text("x");
      var $columnAddCard = $("<button>").addClass("add-card").text("Add a card");

      $columnDelete.click(function() {
        self.removeColumn();
      });
      $columnAddCard.click(function() {
        self.addCard(new Card(prompt("Enter a card name")));
      });

      $column.append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
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

  // Card class
  function Card(description) {
    var self = this;
    
    this.id = randomString();
    this.description = description;
    this.$element = createCard();
    
    function createCard() {
      var $card = $("<li>").addClass("card");
      var $cardDescription = $("<p>").addClass("card-description").text(self.description);
      var $cardDelete = $("<button>").addClass("btn-delete").text("x");

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

  // CREATING COLUMNS
  var toDoColumn = new Column("TO DO");
  var inProgressColumn = new Column("IN PROGRESS");
  var finishedColumn = new Column("FINISHED");

  // ADDING COLUMNS TO THE BOARD
  board.addColumn(toDoColumn);
  board.addColumn(inProgressColumn);
  board.addColumn(finishedColumn);

  // CREATING CARDS
  var toDoCard = new Card("toDoCard");
  var inProgressCard = new Card("inProgressCard");

  // ADDING CARDS TO COLUMNS
  toDoColumn.addCard(toDoCard);
  inProgressColumn.addCard(inProgressCard);
  
});

// Klasa Card


/*
var table = {
  name: "project",
  element: $("div"),
  addNewColumn: function() {

  }
};

var column = {
  id: "12j82da20k",
  name: "To Do",
  element: $("div"),
  removeColumn: function() {

  },
  createNewCard: function() {

  }
};

var card = {
  id: "2kd8s958ka",
  description: "Create Kanban app",
  color: "green",
  element: $("div"),
  removeCard: function() {

  },
  moveCard: function() {

  }
};
*/