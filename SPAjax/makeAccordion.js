function getItems(listName) {
  var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ listName + "')/items";
  return $.ajax({
               url: url,
               method: "GET",
               headers: { "Accept": "application/json; odata=verbose" }                   
      });
}

function makeAccordion(listName){
  $(document).ready(function(){
  //Code runs here      
  getItems(listName).then(function(data){
    var results = data.d.results;
    var myHtml = "";n
    console.log(results);
    var count = 0;
    for(var item of results){
      myHtml += `
          <div class="card">
            <div class="card-header">
              <a class="${count==0 ? '' : 'collapsed'} card-link" data-toggle="collapse" href="#collapse${item.ID}">
                ${item.Title}
              </a>
            </div>
            <div id="collapse${item.ID}" class="collapse ${count==0 ? 'show' : ''}" data-parent="#accordion">
              <div class="card-body">
                ${item.Description}
              </div>
            </div>
          </div>
      `;
      count++;
    }
    $('#accordion').html(myHtml);
    });
});
}