var baseUrl = "https://kodilla.com/pl/bootcamp-api";
var myHeaders = {
  "X-Client-Id": "2695",
  "X-Auth-Token": "63def24bff4caa4d4fb266687e0f1bd0"
};
$.ajaxSetup({
  headers: myHeaders
});

$.ajax({
  url: baseUrl + "/board",
  method: "GET",
  success: function(response) {
    setupColumns(response.columns);
  }
});

function initSortable() {
  $(".column-card-list")
    .sortable({
      connectWith: ".column-card-list",
      placeholder: "highlight",
      receive: function(event, ui) {
        // console.log("card id:"+ui.item.attr("id"));
        // console.log("card text:"+ ui.item.children("p").text());
        // console.log("new column id:"+ui.item.closest(".column").attr("id"));
        $.ajax({
          url: baseUrl + "/card/" + ui.item.attr("id"),
          method: "PUT",
          data: {
            name: ui.item.children("p").text(),
            bootcamp_kanban_column_id: ui.item.closest(".column").attr("id")
          }
        });
      }
    })
    .disableSelection();
}

function setupColumns(columns) {
  columns.forEach(function(column) {
    var col = new Column(column.id, column.name);
    board.addColumn(col);
    initSortable();
    setupCards(col, column.cards);
  });
}

function setupCards(col, cards) {
  cards.forEach(function(card) {
    var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    col.addCard(card);
  });
}
