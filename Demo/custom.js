function calculateAge(bd) {
  var birthDate = new Date(bd);
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  console.log("Your age is : ", age);
}
//alert(`Your age is : ${calculateAge("9/1/1988")}`);
var cards = ["Primary Card", "Success Card"];

var card1 =
{ title: "Card 1", cardType: "success"};
console.log(card1.cardType + ' ' + card1.title);

var cards = [
  {
    title:"Araya's Card",
   cardType:"danger"
  },
  {title:"Title 1", cardType:"success"},
  {title:"Title 2", cardType:"danger"},
  {title:"Title 3", cardType:"info"},
  {title:"Title 4", cardType:"primary"},
  {title:"Title 5", cardType:"success"},
  {title:"Title 6", cardType:"primary"},
  {title:"Title 7", cardType:"danger"},
  {title:"Title 8", cardType:"info"},
];

var myHtml = '';

// for(var value of cards){
//   // myHtml = myHtml + 
//   //           ` <div class="card" style="width:250px; float:left; margin:5px;">
//   //               <img class="card-img-top" src="https://randomuser.me/api/portraits/women/7.jpg" alt="Card image" style="width:100%">
//   //               <div class="card-body">
//   //                 <h4 class="card-title">John Doe</h4>
//   //                 <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
//   //                 <a href="#" class="btn btn-primary">See Profile</a>
//   //               </div>
//   //             </div>
              
//   //           `;
// }
var doc = document.getElementById("myCards");
doc.innerHTML = myHtml;
//Free api to pull some data from web. https://randomuser.me/api/?results=5000
//Reference: https://randomuser.me/documentation#howto
//https://randomuser.me/api/?page=3&results=10&seed=abc

var result="No Data";
var call = $.ajax(
  {
    url: 'https://randomuser.me/api/?results=20',
    dataType: 'json'
  }
);


call.done(function(data){
  console.log(data.results);
  for(var people of data.results){
    myHtml = myHtml + 
            ` <div class="card" style="width:250px; float:left; margin:5px;">
                <img class="card-img-top" src="${people.picture.large}" alt="Card image" style="width:100%">
                <div class="card-body">
                  <h4 class="card-title">${people.name.title} ${people.name.first} ${people.name.last}</h4>
                  <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                  <a href="#" class="btn btn-primary">See Profile</a>
                </div>
              </div>
              
            `;
  }
  doc.innerHTML = myHtml;
});
