
// to handle the click of search div
$(document).delegate('#id_register','click',function()
 {
 
     var username = $( "#txtUsername" ).val();
     var emailAddress = $( "#txtEmail" ).val();
     var confirmEmail = $( "#txtConEmail" ).val();
     var password = $( "#txtPassword" ).val();
     var cofirmpassword = $( "#txtConpassword" ).val();
     var pin = $( "#basic" ).val();
     
//     alert(username+"--"+emailAddress+"--"+confirmEmail+"--"+password+"--"+pin);
     
     if(username.length>0 && emailAddress.length>0 && confirmEmail.length >0 && password.length>0 && cofirmpassword.length > 0 && pin.length > 0 )
     {
         if(emailAddress !=confirmEmail)
         {
         
             customAlert("please enter correct email","Message","ok");
         
         }
         else if(password != cofirmpassword)
         {
             customAlert("please enter correct password","Message","ok");
         }
         else
         {
             registerUser();
         }
     
     }
     else
     {
     customAlert("please fill all required field","Message","ok");
     
     }
 
 
 });




// register page setting
$(document).delegate('#id_login','click',function() 
{
   
     var username = $( "#txtLoginUserName" ).val();
     var password = $( "#txtLoginAPssword" ).val();
     var pin = $( "#txtLoginPin" ).val();
                  
     if(username.length>0 && password.length>0 && pin.length >0 )
     {
                     gotoLogin();
     }
     else
     {
         customAlert("please fill all required field","Message","ok");

     }
                     
                     
});

//show register page
$(document).delegate('#id_signup','click',function()
{
       $.mobile.changePage('#id_register_page');
});

// contact us div show
$(document).delegate('#id_PinCheck','click',function()
{
                     
    checkPin();

});

$(document).delegate('#Menu_popup','click',function()
{
     //    showFamile();
                     
                   
});


$(document).delegate('#my_family','click',function()
{
                    
                     showFamile();
                    

});

// show repeat order page with required info

$(document).delegate('#menu_repeat_order','click',function()
{
        showRepeatOrder();
});

