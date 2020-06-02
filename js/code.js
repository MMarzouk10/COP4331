var urlBase = 'http://ultracontacts.com/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";
//


//

function doLogin()
{
userId = 0;
firstName = "";
lastName = "";

var login = document.getElementById("loginName").value;
var password = document.getElementById("loginPassword").value;
var hash = md5( password );

document.getElementById("loginResult").innerHTML = "";

if (login.length == 0)
{
   document.getElementById("loginResult").innerHTML = "You Need A Login Name";
   return;
}
if (password.length == 0)
{
   document.getElementById("loginResult").innerHTML = "You Need A Password";
   return;
}

var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
// var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
var url = urlBase + '/Login.' + extension;

var xhr = new XMLHttpRequest();
xhr.open("POST", url, false);
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
try
{
xhr.send(jsonPayload);


var jsonObject = JSON.parse( xhr.responseText );

userId = jsonObject.UserID;

if( userId < 1 )
{
document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
return;
}

firstName = jsonObject.FirstName;
lastName = jsonObject.LastName;

saveCookie();

window.location.href = "COP_4331C.html" + "?user=" + userId;

}
catch(err)
{
document.getElementById("loginResult").innerHTML = err.message;
}

}

function saveCookie()
{
var minutes = 20;
var date = new Date();
date.setTime(date.getTime()+(minutes*60*1000));
document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
userId = -1;
var data = document.cookie;
var splits = data.split(",");
for(var i = 0; i < splits.length; i++)
{
var thisOne = splits[i].trim();
var tokens = thisOne.split("=");
if( tokens[0] == "firstName" )
{
firstName = tokens[1];
}
else if( tokens[0] == "lastName" )
{
lastName = tokens[1];
}
else if( tokens[0] == "userId" )
{
userId = parseInt( tokens[1].trim() );
}
}

// Read url
var url = window.location.href.split("user=");
var urlUserId = parseInt(url[1]);

if( userId < 0 )
{
window.location.href = "index.html";
}
if (urlUserId != userId)
{
   window.location.href = url[0] + "user=" + userId;
}
else
{
document.getElementById("userName").innerHTML = "Welcome " + firstName + " " + lastName + "!";
}
}

function doLogout()
{
userId = 0;
firstName = "";
lastName = "";
document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
window.location.href = "index.html";
}

function addColor()
{
var newColor = document.getElementById("colorText").value;
document.getElementById("colorAddResult").innerHTML = "";

var jsonPayload = '{"color" : "' + newColor + '", "userId" : ' + userId + '}';
var url = urlBase + '/AddColor.' + extension;

var xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
try
{
xhr.onreadystatechange = function()
{
if (this.readyState == 4 && this.status == 200)
{
document.getElementById("colorAddResult").innerHTML = "Color has been added";
}
};
xhr.send(jsonPayload);
}
catch(err)
{
document.getElementById("colorAddResult").innerHTML = err.message;
}

}

function addAccount()
{
    userId = 0;
    firstName = "";
lastName = "";
   
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
var login = document.getElementById("loginName").value;
var password = document.getElementById("loginPassword").value;
var confirmPass = document.getElementById("confirmPass").value;

document.getElementById("addAccountResult").innerHTML = "";

// User input checks
if (firstName.length == 0)
{
   document.getElementById("addAccountResult").innerHTML = "Enter Your First Name";
   return;
}
if (lastName.length == 0)
{
   document.getElementById("addAccountResult").innerHTML = "Enter Your Last Name";
   return;
}
if (login.length == 0)
{
   document.getElementById("addAccountResult").innerHTML = "Enter A Login Name";
   return;
}
if (password.length == 0)
{
   document.getElementById("addAccountResult").innerHTML = "Enter A Password";
   return;
}
if (confirmPass.length == 0)
{
   document.getElementById("addAccountResult").innerHTML = "Confirm Your Password";
   return;
}
if (password.localeCompare(confirmPass) != 0)
{
   document.getElementById("addAccountResult").innerHTML = "Passwords Do Not Match";
   return;
}

    var hash = md5( password );

var jsonPayload = '{"FirstName" : "' + firstName + '", "LastName" : "' + lastName + '", "Login" : "' + login + '", "Password" : "' + hash + '"}';
// var jsonPayload = '{"FirstName" : "' + firstName + '", "LastName" : "' + lastName + '", "Login" : "' + login + '", "Password" : "' + password + '"}';
var url = urlBase + '/Signup.' + extension;

var xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
try
{
xhr.onreadystatechange = function()
{
if (this.readyState == 4 && this.status == 200)
{
document.getElementById("addAccountResult").innerHTML = "Account Created";
}
};
xhr.send(jsonPayload);
}
catch(err)
{
document.getElementById("addAccountResult").innerHTML = err.message;
}

// Auto Log In
var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
// var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
var url = urlBase + '/Login.' + extension;

var xhr = new XMLHttpRequest();
xhr.open("POST", url, false);
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
try
{
xhr.send(jsonPayload);


var jsonObject = JSON.parse( xhr.responseText );

userId = jsonObject.UserID;

if( userId < 1 )
{
document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
return;
}

firstName = jsonObject.FirstName;
lastName = jsonObject.LastName;

saveCookie();

window.location.href = "COP_4331C.html" + "?user=" + userId;
}
catch(err)
{
document.getElementById("loginResult").innerHTML = err.message;
}

}

function searchColor()
{
var srch = document.getElementById("searchText").value;
document.getElementById("colorSearchResult").innerHTML = "";

var colorList = "";

var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
var url = urlBase + '/SearchColors.' + extension;

var xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
try
{
xhr.onreadystatechange = function()
{
if (this.readyState == 4 && this.status == 200)
{
document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
var jsonObject = JSON.parse( xhr.responseText );

for( var i=0; i<jsonObject.results.length; i++ )
{
colorList += jsonObject.results[i];
if( i < jsonObject.results.length - 1 )
{
colorList += "<br />\r\n";
}
}

document.getElementsByTagName("p")[0].innerHTML = colorList;
}
};
xhr.send(jsonPayload);
}
catch(err)
{
document.getElementById("colorSearchResult").innerHTML = err.message;
}

}



function DefaultFunction()
  {
    var urlCurrent = window.location.href;
    var userId = urlCurrent.slice(-2);
    var urlBase = 'http://ultracontacts.com/LAMPAPI/';
    var extension = 'php';
    var colorList = "";
    var jsonPayload = '{"UserID" : ' + userId + ',"search" : ' + '""' + '}';
    var url = urlBase + '/SearchContacts.' + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    var x = 0;
    var arr = [];
        try{
            xhr.onreadystatechange = function()
                {
                    if (this.readyState == 4 && this.status == 200)
                        {
                            var jsonObject = JSON.parse( xhr.responseText );
                            if(jsonObject.results != undefined);
                            for( var i=0; i<jsonObject.results.length; i++ )
                                {
                                    x=jsonObject.results.length;
                                    arr[i] = (jsonObject.results[i]).split(" ");
                                }
                            document.getElementById("searchbar").value="";                      
                            var table = document.getElementById('table');
                            while (table.rows.length > 1)
                                {
                                    table.deleteRow(1);
                                }
                            if(table.rows[0].cells[0].innerHTML != 'ID')
                                {
                                document.getElementById('table').rows[0].insertCell(0);
                                table.rows[0].cells[0].innerHTML = 'ID';
                                }
 
                                var firstRow = document.getElementById('table').rows[0];
                                if(document.getElementById('table').rows[0].cells.length<7)
                                {
                                   
                                    var cell7= firstRow.insertCell(6);
                                    var cell8=firstRow.insertCell(7);
                                    cell7.innerHTML = "Edit";
                                    cell7.style.fontWeight='bold';
                                    cell8.innerHTML = "Delete";
                                    cell8.style.fontWeight='bold';
                                }
                            //while data doesnt reach max insert row
                            var amt=0;


                            for(var i=x+1; i>0;i-- )
                                {
                                    var row = table.insertRow();
                                      for(var j=0; j<=7; j++)
                                      {
                                        var cell1 = row.insertCell(0);
                                      }
                                }

                                for(var i=1; i<x+1;i++ )
                                    {
                                       var cellData = [];
                                        arr[i-1].forEach(element => cellData.push(element.split(' ')));
                                for(var j=0; j<=7; j++)
                                    {
                                         if(j==1 || j==2 || j==5)
                                        {
                                            //alert(cellData[6]);
                                        table.rows[i].cells[j].innerHTML =(cellData[j-1]);
                                        }
                                        else if (j==4)
                                        {
                                            table.rows[i].cells[j].innerHTML =(cellData[j-2]);
                                        }
                                        else if (j==0)
                                        {
                                            table.rows[i].cells[j].innerHTML =(cellData[j+6]);
                                        }
                                        else if(j==3)
                                        {
                                            table.rows[i].cells[j].innerHTML =(cellData[j]);
                                        }
                                        else if(j==6)
                                        {
                                        table.rows[i].cells[j].innerHTML = '<button class="Edit" onclick="EditContact()"><i class="fa fa-edit"></i></button>';
                                        }
                                        else if(j==7)
                                        {
                                       
                                        table.rows[i].cells[j].innerHTML =  '<button class="Delete" onclick="DeleteContact()"><i class="fa fa-trash"></i></button>';
                                        }
                                    }
 
                        }
                var search = document.getElementById("searchbar");
                search.style.visibility = "visible";
                var save = document.getElementById("SaveButton");
                save.style.visibility="hidden";
                
                }
            };
        xhr.send(jsonPayload);
        }
    catch(err)
    {
    document.getElementById("contactSearchResult").innerHTML = err.message;
    }
};
                       

    function SaveConfirmation()
     {
         
        var urlBase = 'http://ultracontacts.com/LAMPAPI/';
        var extension = 'php';
        var firstRow = document.getElementById('table').rows[1];
        var firstName = document.getElementById("FirstName").value;
        var lastName = document.getElementById("LastName").value;
        var email = document.getElementById("Email").value;
        var Phone = document.getElementById("Phone").value;
         
         const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        let dateObj = new Date();
        let month = monthNames[dateObj.getMonth()];
        let day = String(dateObj.getDate()).padStart(2, '0');
        let year = dateObj.getFullYear();
        let output = month  + day  + ', ' + year;


        if (firstName != "" && lastName != "" && email != "" && Phone != "")

            {
                var urlCurrent = window.location.href;
                var userId = urlCurrent.slice(-2);
               
                var val = 1;
                var jsonPayload = '{"FirstName" : "' +  firstName + '", "LastName" : "' + lastName + '", "PhoneNumber" : "' + Phone + '", "Email" : "' + email + '", "UserID" : ' + userId  +'}';
               
                var url = urlBase + '/CreateContacts.' + extension;
            
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                try
                {
                    xhr.send(jsonPayload);
                    //alert("SAVED!");
                    document.getElementById("FirstName").value = "";
                    document.getElementById("LastName").value = "";
                    document.getElementById("Email").value = "";
                    document.getElementById("Phone").value="";
                   
                }
                catch(err)
                {
                    alert("Failed to save");
                }  
            }
        else
        {
         alert ("Fill all fields prior to saving.");
        }
    }

function AddRow() {
    var save = document.getElementById("SaveButton");
    save.style.visibility="visible";
    var table = document.getElementById('table');
    while (table.rows.length > 1)
    {
        table.deleteRow(1);
    }
    var firstRow = document.getElementById('table').rows[0];
    if(table.rows[0].cells[0].innerHTML == 'ID')
    {
        firstRow.deleteCell(0);
    
    }

    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var txtBox1 = document.createElement("input");
    txtBox1.type = "text";
    txtBox1.name = "FN";
    txtBox1.id = "FirstName";
    //txtBox1.placeholder ("First Name...");
    cell1.appendChild(txtBox1);

    var cell2 = row.insertCell(1);
    var txtBox2 = document.createElement("input");
    txtBox2.type = "text";
    txtBox2.name = "LN";
    txtBox2.id = "LastName";
    //txtBox2.placeholder ("Last Name...");
    cell2.appendChild(txtBox2);

    var cell3 = row.insertCell(2);
    var txtBox3 = document.createElement("input");
    txtBox3.type = "text";
    txtBox3.name = "Email";
    txtBox3.id = "Email";
    //txtBox3.placeholder ("Age...");
    cell3.appendChild(txtBox3);

    var cell4 = row.insertCell(3);
    var txtBox4 = document.createElement("input");
    txtBox4.type = "text";
    txtBox4.name = "Phone";
    txtBox4.id = "Phone";
    //txtBox4.placeholder ("Email...");
    cell4.appendChild(txtBox4);



    var cell5 = row.insertCell(4);
    const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
    let dateObj = new Date();
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();
    let output = month  + '\n'+ day  + ', ' + year;
    cell5.innerHTML = output;

    for(var z=2; z>0; z--)
    {
        firstRow.deleteCell(5);
    
    }

    var search = document.getElementById("searchbar");
    search.style.visibility="hidden";


}; //end of function
       
    var EditingRowValue = 0
    function EditContact() {
        var index, table = document.getElementById('table');
        for(var i=1; i<table.rows.length;i++)
        {
            table.rows[i].cells[6].onclick=function()
            {
                    index= this.parentElement.rowIndex;
                    EditingRowValue = index;
                    for (var x=1; x<5; x++)
                    {
                        var prev = (document.getElementById('table').rows[index].cells[x].innerText);
                        document.getElementById('table').rows[index].cells[x].innerHTML = "<div contenteditable>"+ prev+"</div>";
                    }

                    //alert("Row " + index +" now available for editing.");
           
                    for (var dlt=0; dlt<table.rows.length; dlt++)
                    {
                        table.rows[dlt].deleteCell(7);
                        table.rows[dlt].deleteCell(6);
               
                    }
                    var Upd = table.rows[index].insertCell(6);
                    Upd.innerHTML = '<button class="UpdateBtn" id = "UpdateButton" onclick="UpdateConfirmation()" ">Update<br><i class="fa fa-save"></i></button>';
                    var search = document.getElementById("searchbar");
                    search.style.visibility="hidden";
                    var save = document.getElementById("SaveButton");
                    save.style.visibility="hidden";
           
           
            };
        }
    };
    
    function UpdateConfirmation()
     {
        var table = document.getElementById('table');
        var EditRow = EditingRowValue;
        var urlBase = 'http://ultracontacts.com/LAMPAPI/';
        var extension = 'php';
        var contactId = table.rows[EditRow].cells[0].innerText;
        var firstName = table.rows[EditRow].cells[1].innerText;
        var lastName = table.rows[EditRow].cells[2].innerText;
        var email = table.rows[EditRow].cells[3].innerText;
        var Phone = table.rows[EditRow].cells[4].innerText;
         
         


        if (firstName != "" && lastName != "" && email != "" && Phone != "")

        {
            var urlCurrent = window.location.href;
            var userId = urlCurrent.slice(-2);
           
            var val = 1;
            var jsonPayload = '{"ContactID" : ' +  contactId + ', "FirstName" : "' +  firstName + '", "LastName" : "' + lastName + '", "PhoneNumber" : "' + Phone + '", "Email" : "' + email + '", "UserID" : ' + userId  +'}';
            //alert(jsonPayload);
            var url = urlBase + '/UpdateContact.' + extension;
        
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try
        {
            xhr.send(jsonPayload);
        //alert("UPDATED!");
            location.reload();
       
        }
        catch(err)
        {
        alert("Failed to save");
        }  
     }
    else
     {
         alert ("Fill all fields prior to saving.");
     }

}
  function LogOutFunction() {
    // alert(document.location.href);
    window.location.href = "index.html";
     };
 function DeleteContact() {
   var index, table = document.getElementById('table');
    for(var i=1; i<table.rows.length;i++)
    {
        table.rows[i].cells[7].onclick=function()
        {
            var conf = confirm("Are you sure you want to delete?");
            if(conf == true)
            {
                var urlBase = 'http://ultracontacts.com/LAMPAPI';
                var extension = 'php'
                index= this.parentElement.rowIndex;
                var id =table.rows[index].cells[0].innerHTML;
                var jsonPayload = '{"ContactID" : ' + id + '}';
                // alert (jsonPayload);
                var url = urlBase + '/DeleteContacts.' + extension;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                try
                {
                    xhr.send(jsonPayload);
                }
                catch(err)
                {
                    alert(err);
                }
                                 
                table.deleteRow(index);    
            }
                                   
        };
    }
};

    function handle(e){
        var address=document.getElementById("searchbar").value;
            if(e.keyCode === 13)
             {
                //alert("Searching for: " + address);
                var urlCurrent = window.location.href;
                var userId = urlCurrent.slice(-2);
                var urlBase = 'http://ultracontacts.com/LAMPAPI/';
                var extension = 'php';
                var jsonPayload = '{"UserID" : ' + userId + ',"search" : ' + '"'+ address+'"' + '}';
                var url = urlBase + '/SearchContacts.' + extension;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                var x = 0;
                var arr = [];
                while (table.rows.length > 1)
                {
                    table.deleteRow(1);
                }
                try
                {
                   
                    xhr.onreadystatechange = function()
                    {
                        if (this.readyState == 4 && this.status == 200)
                        {
                        var jsonObject = JSON.parse( xhr.responseText );
                        if(jsonObject.results != undefined);

                        for( var i=0; i<jsonObject.results.length; i++ )
                        {
                            x=jsonObject.results.length;
                            arr[i] = (jsonObject.results[i]).split(" ");

                        }

                    document.getElementById("searchbar").value="";                      
                    var table = document.getElementById('table');
                    while (table.rows.length > 1)
                    {
                            table.deleteRow(1);
                    }
                    if(table.rows[0].cells[0].innerHTML != 'ID')
                    {
                        document.getElementById('table').rows[0].insertCell(0);
                        table.rows[0].cells[0].innerHTML = 'ID';
                    }
 
                    var firstRow = document.getElementById('table').rows[0];
                    if(document.getElementById('table').rows[0].cells.length<7)
                    {
   
                        var cell7= firstRow.insertCell(6);
                        var cell8=firstRow.insertCell(7);
                        cell7.innerHTML = "Edit";
                        cell7.style.fontWeight='bold';
                        cell8.innerHTML = "Delete";
                        cell8.style.fontWeight='bold';
                    }
                    //while data doesnt reach max insert row
                    var amt=0;


                    for(var i=x+1; i>0;i-- )
                        {
                            var row = table.insertRow();
                            for(var j=0; j<=7; j++)
                              {
                                var cell1 = row.insertCell(0);
                              }
                        }

                    for(var i=1; i<x+1;i++ )
                    {
                        var cellData = [];
                        arr[i-1].forEach(element => cellData.push(element.split(' ')));
                         for(var j=0; j<=7; j++)
                         {
                            if(j==1 || j==2 || j==5)
                            {
                                table.rows[i].cells[j].innerHTML =(cellData[j-1]);
                            }
                            else if (j==4)
                            {
                                table.rows[i].cells[j].innerHTML =(cellData[j-2]);
                            }
                            else if(j==3)
                            {
                                table.rows[i].cells[j].innerHTML =(cellData[j]);
                            }
                            else if (j==0)
                            {
                                table.rows[i].cells[j].innerHTML =(cellData[j+6]);
                            }
                            else if(j==6)
                            {
                            table.rows[i].cells[j].innerHTML = '<button class="Edit" onclick="EditContact()"><i class="fa fa-edit"></i></button>';
                            }
                            else if(j==7)
                            {
                               
                                table.rows[i].cells[j].innerHTML =  '<button class="Delete" onclick="DeleteContact()"><i class="fa fa-trash"></i></button>';
                            }
                        }
 
                    }
            var search = document.getElementById("searchbar");
            search.style.visibility = "visible";
            var save = document.getElementById("SaveButton");
            save.style.visibility="hidden";

            }
        };
    xhr.send(jsonPayload);
    }
    catch(err)
    {
    alert(err);
    }
}
};
                          
