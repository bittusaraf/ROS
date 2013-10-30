
var logininfo;
var listFamilyMember;
var listOrdRepBecause;
var list_pharmacy_info;
// Cordova is loaded and it is now safe to make calls Cordova methods
function onDeviceReady() {
    alert("hgfgd");
    $.mobile.hidePageLoadingMsg();
    	var networkState = navigator.connection.type;
	
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    
	if ( states[networkState] == 'Unknown connection' || states[networkState] == 'No network connection' )
    {
    	alert( 'Connection Error: ' + states[networkState] );
    }
    else
    {

//        localStorage.deviceToken="kM3PZtYQ65Tx7AAkJgvdbBM0dPOoxtVmXaPWwLs5Ukg";
//        getToknenid();
       // showFamile();
      //  checkMemberId();
    }
}

  /*check member id is already exists*/
function checkMemberId()
{
    localStorage.uid="146";
    alert(localStorage.pinValue+"--"+localStorage.uid+"--"+localStorage.deviceToken);
    if(localStorage.uid)
    {
        if(localStorage.uid.length>0)
        {
             $.mobile.changePage('#id_PinEnter');
        }
    }
    else
    {
        $.mobile.changePage('#id_login_page');
    }
    
}

function getToknenid()
{
   
    $.mobile.showPageLoadingMsg();
    $.ajax({
           url:'http://www.repeatorderingsystem.co.nz/services/session/token',
           success: function(result) {
           $.mobile.hidePageLoadingMsg();
           localStorage.deviceToken=result;
           $.mobile.hidePageLoadingMsg();
           checkMemberId();

           },
           error: function(result) {
           
           alert("error--"+result);
                $.mobile.hidePageLoadingMsg();
               for(var i in result)
               console.log(i +"----"+result[i]);
//               checkMemberId();
               }
           });
    
    
//    $.ajax(
//    {
//        type: "GET",
//        url: 'http://www.repeatorderingsystem.co.nz/services/session/token',
//        cache: false,
//        async:false,
//        dataType: "json",
//        //dataType: "text",
//        xhrFields:{
//            withCredentials: false
//        },
//        ajaxLinksEnabled: false,
//        complete: function() {
//        },
//        success: function(msg){
//            alert('datarcved - '+msg+' function: +funName');
//           for(var i in msg)
//           console.log(i +"----"+msg[i]);
//        //           funName(msg);
//        },
//        error: function(errMsg){
//           alert("error");
//            console.log("Error:"+JSON.stringify(errMsg));
//           for(var i in errMsg)
//           console.log(i +"----"+errMsg);
//        }
//    });
    
}

var responceRegister=JSON.stringify({"uid":"107","uri":"http://www.repeatorderingsystem.co.nz/rest/user/107"});

function registerUser()
{
//    alert("hello");
    var username = $( "#txtUsername" ).val();
    var emailAddress = $( "#txtEmail" ).val();
    var password = $( "#txtPassword" ).val();
    var pin = $( "#basic" ).val();

    
    var data="{'name':'"+username+"','pass':'"+password+"',  'mail':'"+emailAddress+"','user_roles':5,'field_login_pin_value':{'und':[{'value':'"+pin+"'}]} }";
    var jsonData = JSON.stringify(eval("(" + data + ")"));


//    alert(localStorage.deviceToken+"--"+jsonData);
    $.mobile.showPageLoadingMsg();
    $.ajax({
           type:"POST",
           beforeSend: function (request)
           {
               request.setRequestHeader("X-CSRF-Token",localStorage.deviceToken);
               request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
           },
           url: "http://www.repeatorderingsystem.co.nz/rest/user/register.json",
           data:jsonData,
           dataType: 'json',
           processData: false,
           success: function(result) {
           $.mobile.hidePageLoadingMsg();
               alert("registraion success");
               
               /*parsing registraion data*/
//               var parseData =JSON.parse(msg);
               /*store object to local storage for future use*/
               localStorage.uid=result['uid'];
               localStorage.uri=result['uri'];
               localStorage.pinValue=pin;
               $.mobile.changePage('#id_menuPage');
              for(var i in result)
                   console.log(i +"----"+result[i]);
           },
           error: function(msg) {
           for(var i in msg)
               console.log(i +"----"+msg[i]);
               alert("error"+msg);
           }
    });
    
}

var loginResponce = JSON.stringify({"sessid":"ng2xWqkkE2bQpS3brYvK-813WvuCZCkq7GrpyVeo1PU","session_name":"SESS61e016bdbaccffb32a861519572865c2","user":{"uid":"107","name":"customer6","theme":"","signature":"","signature_format":"filtered_html","created":"1376757668","access":"0","login":"1376757837","status":"1","timezone":null,"language":"","picture":null,"data":{"contact":"1"},"roles":{"2":"authenticated user","5":"Customer"},"metatags":[],"rdf_mapping":{"rdftype":["sioc:UserAccount"],"name":{"predicates":["foaf:name"]},"homepage":{"predicates":["foaf:page"],"type":"rel"}}}});


function gotoLogin()
{
    var username = $( "#txtLoginUserName" ).val();
    var password = $( "#txtLoginAPssword" ).val();
    var pin = $( "#txtLoginPin" ).val();
    
    var data="{'name':'"+username+"','pass':'"+password+"'}";
    var jsonData = JSON.stringify(eval("(" + data + ")"));
    
    $.mobile.showPageLoadingMsg();
    $.ajax({
           type:"POST",
           beforeSend: function (request)
           {
           request.setRequestHeader("X-CSRF-Token",localStorage.deviceToken);
           request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
           },
           url: "http://www.repeatorderingsystem.co.nz/rest/user/login.json ",
           data:jsonData,
           dataType: 'json',
           processData: false,
           success: function(result) {
               $.mobile.hidePageLoadingMsg();
               alert("registraion success");
               /*store object to local storage for future use*/
               localStorage.pinValue=pin;
               for(var i in result)
               console.log(i +"----"+result[i]);
           },
           error: function(msg) {
 
                $.mobile.hidePageLoadingMsg();
                localStorage.pinValue=pin;
               logininfo=JSON.parse(loginResponce);
               for(var i in logininfo)
                {
                    if(i=="user")
                    {
                        console.log(i +"----"+logininfo[i]);
                      
                    }
                }
                $.mobile.changePage('#id_menuPage');
           }
           });
}

function checkPin()
{
    var pinValue = $( "#txtPin" ).val();
    if(pinValue.length >0 )
    {
 
        if(localStorage.pinValue == pinValue)
        {
            $.mobile.changePage('#id_menuPage');
        }
        else
        {
            customAlert("Wrong Pin Value","Messge!","ok")
        }
    }
    else
    {
        customAlert("please enter value","Message!","ok");
    }
}

function customAlert(message,title)
{
    navigator.notification.alert(message, [], title, "ok")

}

window.onload = function()
{
//	document.addEventListener("deviceready", onDeviceReady, false);
};

/*fucntion show family of user*/
function showFamile()
{

    $.mobile.showPageLoadingMsg();
    document.getElementById('id_familyInfo').innerHTML = '';
    $.mobile.changePage('#id_family_page', { transition: "slide", changeHash: false });
   
    $.ajax({
           url: 'http://repeatorderingsystem.co.nz/rest/fm_list.json/?user_head_uid='+localStorage.uid,
           type: 'get',
           dataType: 'json',
           async: false,
           success: function(result)
           {
               $.mobile.hidePageLoadingMsg();
               listFamilyMember=result;
               for(var i=0;i<result.length;i++)
               {
                 var html = '';
                   html += '<div class="collapsible" id="collapsibleSet"'+i+'>';
                   html += '<h3>'+result[i].Firstname+' '+result[i].Middlename+' '+result[i].Lastname+'</h3>';
                   html += '<p>'+result[i].Dateofbirth+'</p>';
                   html += '<p>'+result[i].Phoneno+'</p>';
                   html += '<p>'+result[i].Relations+'</p>';
                   html += '</div>';
           
               var content = "<div data-role='collapsible' id='set" + i + "'><h3>" +result[i].Firstname+"</h3><p>'"+result[i].Firstname+' '+result[i].Middlename+' '+result[i].Lastname+"'</p><p>'"+result[i].Dateofbirth+"'</p><p>'"+result[i].Phoneno+"'</p><p>'"+result[i].Relations+"'</p></div>";
               
               $("#id_familyInfo").append( content ).collapsibleset('refresh');
           
               }
           },
           error: function(result)
           {
               $.mobile.hidePageLoadingMsg();
               alert("Error !"+result);
               
               /*parsing for family perameter*/
               var data =JSON.parse(familyInfoData);
              
            }
        });

}


/*manage repeat order page funcationality*/
function showRepeatOrder()
{
    $.mobile.showPageLoadingMsg();
    $.mobile.changePage('#id_repeat_medi_order', { transition: "slide", changeHash: false });
    document.getElementById('select-place_order').innerHTML = '';
       
    /*fill the list of family mambers */
    for(var i=0;i<listFamilyMember.length;i++)
    {
        var html = '';
        html+='<option value="'+i+'">'+listFamilyMember[i].Firstname+' '+listFamilyMember[i].Middlename+' '+listFamilyMember[i].Lastname+'</option>';
        $("#select-place_order").append( html );
        
    }
    
    /*
     call formacy functionality as per provided doc
     */
    pharmacy_list();
    /*
     cal servcie to fill the ordering repeats because
     pass vid to get the list by default use 3
     */
    var vid="4";
    ordering_repeats_because(vid);
    
}

/*store lsit of pharmacy to show search result*/
function pharmacy_list()
{
    $.mobile.showPageLoadingMsg();
    
    $.ajax({
           url:'http://www.repeatorderingsystem.co.nz/rest/registered_pharmacy.json',
           success: function(result) {
               alert("success--"+result);
               $.mobile.hidePageLoadingMsg();
               list_pharmacy_info=result;
               for(var i in result)
               console.log(i +"----"+result[i]);
               /*create dinamic readio button  to show oder prepeat because option*/
            },
           error: function(result) {
               alert("error--"+result);
               $.mobile.hidePageLoadingMsg();
               for(var i in result)
               console.log(i +"----"+result[i]);
               }
           });
}

/*ordering repeats because */

function ordering_repeats_because(vid)
{

    $.mobile.showPageLoadingMsg();
    
    $.ajax({
           url:'http://www.repeatorderingsystem.co.nz/rest/taxonomy_term.json?parameters[vid]='+vid,
           success: function(result) {
            alert("success--"+result);
               $.mobile.hidePageLoadingMsg();
               listOrdRepBecause=result;
           for(var i in result)
           console.log(i +"----"+result[i]);
                /*create dinamic readio button  to show oder prepeat because option*/
           
               for(var i=0;i<result.length;i++)
               {
                   var id = "radio_order_repeat" + i;
                   $("#radio_order_repeat").append("<input type='radio' name='vehiclechoice' id='" + id + "' />");
                   $("#radio_order_repeat").append("<label for='" + id + "' >" + result[i].name + "</label>");
                   $("#" + id).checkboxradio().checkboxradio("refresh");
           
                }
               $("#radio_order_repeat").controlgroup("refresh");
               $("#radio_order_repeat0").attr("checked", true).checkboxradio("refresh");
           
           },
           error: function(result) {
               alert("error--"+result);
               $.mobile.hidePageLoadingMsg();
               for(var i in result)
               console.log(i +"----"+result[i]);
                          }
           });
    
}


/*back button to handler*/
function goToBackPage(pageID) {
     $.mobile.changePage('#'+pageID);
    //$.mobile.changePage( '#'+pageID );
    
}


