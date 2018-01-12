var board = {
  name: "Kanban Board",
  $element: $("#board .column-container"),
  addColumn: function(column) {
    this.$element.append(column.$element);
  }
  
};
$(".board > .btn-create").click(function() {
  var columnName = prompt("Enter a column name");
  
  $.ajax({
    url: baseUrl + "/column",
    method: "POST",
    data: {
      name: columnName
    },
    success: function(response) {
      var column = new Column(response.id, columnName);
      board.addColumn(column);
    }
  });

});
