$(document).ready(function () {
    if(!(localStorage.getItem('cyberchat'))){
        window.location.href='login.html'

    }
    $("#ppic").attr("src",`/uploads/${localStorage.getItem('cyberchat')}/1.png`)

    $("#html5-qrcode-button-camera-stop").on('click',function(){
        $("#html5-qrcode-anchor-scan-type-change").hide();
        $("#html5-qrcode-button-camera-start").addClass('.btn mb-1 btn-primary');

    })
    $("#html5-qrcode-button-camera-permission").addClass('btn mb-1 btn-primary');
    $("#html5-qrcode-anchor-scan-type-change").hide();



   
function load(){
    $.ajax({
        url:"http://localhost:6500/chats",
        type:"post",
        dataType: "json",
        data: { Sender:`${localStorage.getItem("cyberchat")}`
        },
       
        success: function(res){
            if(res.status==200){
                console.log(res.response)
              
                for (let i of res.response){
                    if(res.response.length==1){
                        $("#menu").append(
                            `<li class="nav-label" id="chats" onClick='loadbox(${i.CHATID},${i.SENDER})' data-recvid=${i.SENDER}><span class="nav-text"><a>UNKNOWN</a></span></li>`
                            );
                            return;
                    }
                    
                    if(i.SENDER==localStorage.getItem("cyberchat")){
                        $("#menu").append(
                            `<li class="nav-label" id="chats" onClick='loadbox(${i.CHATID},${i.RECIEVER})' data-recvid=${i.RECIEVER}><span class="nav-text"><a>${i.USERNAME}</a></span></li>`
                            );

                    }
                    // alert(i.USERNAME)
                   
                }
                
                
            }
            else if(res.status==500){
                $("#menu").append(
                    `<li class="nav-label"><span class="nav-text"><a>Chats not Available</a></span></li>`
                    );
            }
        }
        
    })
   

}
load();
$("#usrprof").on("click",function(){
    loadprofile();

})
function loadprofile(){
    $.ajax({
        url:"http://localhost:6500/userprofile",
        type:"post",
        dataType: "json",
        data: { Sender:`${localStorage.getItem("cyberchat")}`
        },
       
        success: function(res){
            if(res.status==200){
                console.log(res.response)
                $("#email").val(`${res.response[0].EMAILID}`)
                $("#username").val(`${res.response[0].USERNAME}`)
                $("#password").val(`${res.response[0].PASSWORD}`)
                
                
                
            }
            else if(res.status==500){
                alert("some error occured")
                
            }
        }
        
    })
   


}


$("#logout").on("click",function(){
    loadstatus(0);

    
      
        localStorage.removeItem("cyberchat")
      setTimeout(function(){
        window.location.href='login.html'
     },2000)
    // setTimeout(function(){

    // },2000)
})

$("#savedata").on("click",function(){
    $.ajax({
        url:"http://localhost:6500/userupdate",
        type:"post",
        dataType: "json",
        data: { Sender:`${localStorage.getItem("cyberchat")}`,username:$("#username").val(),pass:$("#password").val()
        },
       
        success: function(res){
            if(res.status==200){
               swal("Updated Succesfully","","success")
                
                
                
            }
            else if(res.status==500){
                swal("Updation  Failed","","error")
               console.log("error");
            }
        }
        
    })

})
$(".search_btn").click(function(){
       $("#srcres").html("");
})
$("#usrsearch").on("keyup",function(){
   
    let v=$(this).val();
    if(v.length==0){
        $("#srcres").html("");
        return;
    }
    $.ajax({
        url:"http://localhost:6500/usersearch",
        type:"post",
        dataType: "json",
        data: { text:v,
        },
       
        success: function(res){
               
            $("#srcres").html("");
            if(res.status==200){
               
                for( let i of res.response){

                    $("#srcres").append(`<div onClick='loadbox(0,${i.USERID})'>  ${i.USERNAME}</div>`)
                }
                console.log(res.response)
                
                
                
            }
            else if(res.status==500){
               console.log("error");
               $("#srcres").append(`<div onclick="">  NOT FOUND</div>`)
            }
        }
        
    })

    
});
function loadstatus(stats){  
    $.ajax({
    url:"http://localhost:6500/userstatus",
    type:"post",
    dataType: "json",
    data: { Sender:`${localStorage.getItem("cyberchat")}`,stat:stats
    },
   
    success: function(res){
        if(res.status==200){
            console.log(res.response)
            
            
            
        }
        else if(res.status==500){
           console.log("error");
        }
    }
    
})
}


loadstatus(1);



})