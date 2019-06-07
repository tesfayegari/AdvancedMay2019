$(document).ready(function () {
  getItems();
});

function createListItem() {
  var eName = $('#txtempname').val();
  var eDesg = $('#txtdesignation').val();
  var eEmail = $('#txtemail').val();
  var eMobile = $('#txtmobile').val();
  var eBloodGroup = $('#txtbloodgrp').val();
  var eComAddress = $('#txtaddress').val();
  var eEmergency = $('#txtemergency').val();
  if(!eName){alert("name is required")}
  $.ajax({
    async: true,
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employee')/items",
    method: "POST",
    data: JSON.stringify({
      '__metadata': {
        'type': 'SP.Data.EmployeeListItem'
      },
      'EmployeeName': eName,
      'Designation': eDesg,
      'Email': eEmail,
      'Mobile': eMobile,
      'BloodGroup': eBloodGroup,
      'CommunicationAddress': eComAddress,
      'EmergencyContact': eEmergency
    }),
    headers: {
      "accept": "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose",
      "X-RequestDigest": $("#__REQUESTDIGEST").val()
    },
    success: function (data) {
      var eName = $('#txtempname').val("");
      var eDesg = $('#txtdesignation').val("");
      var eEmail = $('#txtemail').val("");
      var eMobile = $('#txtmobile').val("");
      var eBloodGroup = $('#txtbloodgrp').val("");
      var eComAddress = $('#txtaddress').val("");
      var eEmergency = $('#txtemergency').val("");
      swal("Created","Item created successfully", "success");

     
      getItems();
    },
    error: function (error) {
      console.log(JSON.stringify(error));
    }
  });
}

function getItems() {
  if ($.fn.DataTable.isDataTable('#subsiteList')) {
    $('#subsiteList').DataTable().destroy();
  }
  $('#subsiteList tbody').empty();
  $.ajax({
    async: true,
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employee')/items",
    method: "GET",
    headers: {
      "accept": "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose"
    },
    success: function (data) {
      data = data.d.results;
      console.log(data);
      // for(i=0; i<data.length; i++){ 
      //   var value = data[i];
      //   var html = "<tr><td>" + value.EmployeeName + "</td><td>" + value.Designation + "</td><td>" + value.Email + "</td><td>" + value.BloodGroup + "</td><td>" + value.CommunicationAddress + "</td><td>" + value.EmergencyContact + "</td><td>" + value.Mobile + 
      //   "</td><td><a href='#' data-target='#ModalForUpdateEmployee' data-toggle='modal' onclick='edit(" + value.Id + ")'><img src='/sites/demo/SiteAssets/jQueryCRUD/assets/images/003-edit-document.png'></a></td><td><a href='#' onclick='deleteItem(" + value.Id + ");'><img src='/sites/demo/SiteAssets/jQueryCRUD/assets/images/001-delete.png'></a></td></tr>";
      //   $('#subsiteList tbody').append(html);
      // }
      // data.forEach(function(value){
      //   var html = "<tr><td>" + value.EmployeeName + "</td><td>" + value.Designation + "</td><td>" + value.Email + "</td><td>" + value.BloodGroup + "</td><td>" + value.CommunicationAddress + "</td><td>" + value.EmergencyContact + "</td><td>" + value.Mobile + 
      //   "</td><td><a href='#' data-target='#ModalForUpdateEmployee' data-toggle='modal' onclick='edit(" + value.Id + ")'><img src='/sites/demo/SiteAssets/jQueryCRUD/assets/images/003-edit-document.png'></a></td><td><a href='#' onclick='deleteItem(" + value.Id + ");'><img src='/sites/demo/SiteAssets/jQueryCRUD/assets/images/001-delete.png'></a></td></tr>";
      //   $('#subsiteList tbody').append(html);
      // });
      $.each(data, function (index, value) {
        var html = "<tr><td>" + value.EmployeeName + "</td><td>" + value.Designation + "</td><td>" + value.Email + "</td><td>" + value.BloodGroup + "</td><td>" + value.CommunicationAddress + "</td><td>" + value.EmergencyContact + "</td><td>" + value.Mobile + 
        "</td><td><a href='#' data-target='#ModalForUpdateEmployee' data-toggle='modal' onclick='edit(" + value.Id + ")'><img src='/sites/demo/SiteAssets/jQueryCRUD/assets/images/003-edit-document.png'></a></td><td><a href='#' onclick='deleteItem(" + value.Id + ");'><img src='/sites/demo/SiteAssets/jQueryCRUD/assets/images/001-delete.png'></a></td></tr>";
        $('#subsiteList tbody').append(html);
      });
      table = $('#subsiteList').DataTable();
    },
    error: function (error) {
      console.log(JSON.stringify(error));
    }
  });
}

function edit(itemID) {
  $.ajax({
    async: true,
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employee')/items(" + itemID + ")",
    method: "GET",
    headers: {
      "accept": "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose"

    },
    success: function (data) {
      console.log(data.d.EmployeeName);
      $('#txtempnames').val(data.d.EmployeeName);
      $('#txtdesignations').val(data.d.Designation);
      $('#txtemails').val(data.d.Email);
      $('#txtmobiles').val(data.d.Mobile);
      $('#txtbloodgrps').val(data.d.BloodGroup);
      $('#txtaddresss').val(data.d.CommunicationAddress);
      $('#txtemergencys').val(data.d.EmergencyContact);      
    },
    error: function (error) {
      console.log(JSON.stringify(error));
    }
  });
  uId = itemID;
}

function update() {
  if(!uId){console.log("Error: no uid"); return;}
  var eName = $('#txtempnames').val();
  var eDesg = $('#txtdesignations').val();
  var eEmail = $('#txtemails').val();
  var eMobile = $('#txtmobiles').val();
  var eBloodGroup = $('#txtbloodgrps').val();
  var eComAddress = $('#txtaddresss').val();
  var eEmergency = $('#txtemergencys').val();

  $.ajax({
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employee')/items(" + uId + ")",
    method: "POST",
    data: JSON.stringify({
      '__metadata': {
        'type': 'SP.Data.EmployeeListItem'
      },
      'EmployeeName': eName,
      'Designation': eDesg,
      'Email': eEmail,
      'Mobile': eMobile,
      'BloodGroup': eBloodGroup,
      'CommunicationAddress': eComAddress,
      'EmergencyContact': eEmergency
    }),
    headers: {
      "accept": "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose",
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      "IF-MATCH": "*",
      "X-HTTP-Method": "MERGE"
    },
    success: function (data) {
      swal("Updated","Item Updated successfully", "success");
      
      getItems();
    },
    error: function (error) {
      console.log(JSON.stringify(error));
    }
  });
}

function deleteItem(value) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover the item!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employee')/items(" + value + ")",
        method: "POST",
        headers: {
          "accept": "application/json;odata=verbose",
          "content-type": "application/json;odata=verbose",
          "X-RequestDigest": $("#__REQUESTDIGEST").val(),
          "IF-MATCH": "*",
          "X-HTTP-Method": "DELETE"
        },
        success: function (data) {
          swal("Deleted!", "Item Deleted successfully", "success");
          
          getItems();
        },
        error: function (error) {
          console.log(JSON.stringify(error));
        }
      });
    } else {
      //swal("Your imaginary file is safe!");
    }
  });
  

}