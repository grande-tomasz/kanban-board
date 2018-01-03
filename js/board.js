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
  }).disableSelection();
}
$(".board > .btn-create").click(function() {
  board.addColumn(new Column(prompt("Enter a column name")));
});