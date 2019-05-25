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

for(var value of cards){
  myHtml = myHtml + 
            ` <div class="card bg-${value.cardType} text-white">
                <div class="card-body">${value.title}</div>
              </div>
              <br>
            `;
}
var doc = document.getElementById("myCards");
doc.innerHTML = myHtml;