function getItems(listName) {
  //var _spPageContextInfo;
  if(!_spPageContextInfo)return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('foo');
    }, 300);
  });
  var today = new Date();

  var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$filter=Until ge datetime'"+ today.toISOString() + "'";
  return $.ajax({
    url: url,
    method: "GET",
    headers: { "Accept": "application/json; odata=verbose" }
  });
}


$(document).ready(function () {
  //Code runs here      
  getItems('EmployeeSpotlight').then(function (data) {
    var results = data.d.results;
    //results=[1,2,3,4,5];
    var myHtml = ""; 
    console.log(results);
    
    for (var item of results) {
      var disc = item.Description.length >200 ? item.Description.substring(0,200) + "..." : item.Description;
      myHtml += `
      <div class="col-md-4 col-sm-6">
        <div class="our-team">
            <div class="pic">
                <img src="${item.Photo}" alt="${item.Title} Picture">
            </div>
            <ul class="social">
                <li><a href="#" class="fab fa-facebook"></a></li>
                <li><a href="#" class="fab fa-google-plus"></a></li>
                <li><a href="#" class="fab fa-twitter"></a></li>
            </ul>
            <div class="team-content">
                <h3 class="title">${item.Title}</h3>
                <span class="post">${item.JobTitle}</span>
            </div>
            <p class="description">
                ${disc}
            </p>
            
        </div>
    </div>
    
      `;
    }
    $('#employeeSpotlight').html(myHtml);
  });

  //Code ends here
});
