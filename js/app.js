function randomString() {
  var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
  var str = "";
  for (var i = 0; i < 10; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

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
