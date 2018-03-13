var form=document.forms[0];
form.uname.onfocus=e=>getFocus(e);
form.upwd.onfocus=e=>getFocus(e);
form.cpwd.onfocus=e=>getFocus(e);
form.phone.onfocus=e=>getFocus(e);
function getFocus(e){
	e.target.className="txt_focus";
	var div=e.target.parentNode.parentNode.querySelector("div");
	div.className="vali_info";
	var span=e.target.parentNode.parentNode.querySelector("span");
	span.className="";
}
form.uname.onblur=(e)=>{
	vali(e.target,/^[\w.\S*]{6,12}$/);
}
function vali(txt,reg){
	txt.className="";
	var span=document.querySelector(".unamediv span");
	span.className="vali_info";
	var div=document.querySelector(".unamediv div");
	if(txt.value!=="" && txt.value!==null){		
		if(!reg.test(txt.value)){
			div.className="vali_fail";
			div.innerHTML="请输入正确用户名";
		}else{
			ajax({
				type:"get",
				url:"php/registerCheck.php",
				data:`uname=${txt.value}`
			}).then(data=>{
				if(data=="true"){
					div.className="vali_success";
					div.innerHTML="";
				}else{
					div.className="vali_fail";
					div.innerHTML="用户名已存在";
				}
			});
		}
	}else{
		div.className="vali_fail";
		div.innerHTML="用户名不能为空";
	}
}
form.upwd.onblur=function(e){
	vali1(e.target,/^\d{6,9}$/);
}
function vali1(txt,reg){
	txt.className="";
	var span=document.querySelector(".upwddiv span");
	span.className="vali_info";
	var div=document.querySelector(".upwddiv div");
	if(txt.value==""){
		div.className="vali_fail";
		div.innerHTML="密码不能为空";
	}else{
		if(!reg.test(txt.value)){
			div.className="vali_fail";
			div.innerHTML="密码输入的格式不正确";
			return false;
		}else{
			div.className="vali_success";
			div.innerHTML="";
			return true;
		}
	}
}
form.cpwd.onblur=function(){
	cpcheck(this,/^\d{6,9}$/);
}
function cpcheck(txt,reg){
	txt.className="";
	var span=document.querySelector(".cpwddiv span");
	span.className="vali_info";
	var div=document.querySelector(".cpwddiv div");
	if(txt.value!=""){
		if(reg.test(txt.value)){
			if(txt.value==form.upwd.value){
				div.className="vali_success";
				div.innerHTML="";
				return true;
			}else{
				div.className="vali_fail";
				div.innerHTML="两次密码不一致";
				return false;
			}
		}else{
			div.className="vali_fail";
			div.innerHTML="密码输入的格式不正确";
		}
	}else{
		div.className="vali_fail";
		div.innerHTML="确认密码不能为空";
	}
}
form.phone.onblur=function(){
	vali2(this,/^1[34578]\d{9}$/);
}
function vali2(txt,reg){
	txt.className="";
	var span=document.querySelector(".phonediv span");
	span.className="vali_info";
	var div=document.querySelector(".phonediv div");
	if(txt.value!=""){
		if(!reg.test(txt.value)){
			div.className="vali_fail";
			div.innerHTML="手机号码格式不正确";
			return false;
		}else{
			div.className="vali_success";
			div.innerHTML="";
			return true;
		}
	}else{
		div.className="vali_fail";
		div.innerHTML="电话号码不能为空";
	}
}
var txtCode=document.querySelector(".textCode");
var div=document.querySelector(".imgdiv div");
txtCode.onkeyup=function(){
    if(txtCode.value!=""){
        ajax({
            type:"get",
            url:"php/chkCode.php",
            data:"code="+txtCode.value
        }).then(text=>{
            if(text=="true"){
                div.innerHTML="验证码正确";
                div.className="vali_success";
				return true;
            }else{
                div.innerHTML="验证码错误";
                div.className="vali_fail";
				return false;
            }
        })
    }else{
		div.className="vali_fail";
        div.innerHTML="验证码不能为空";
    }
}
form.code.onblur=function(){
	if(form.code.value ==""){
		div.className="vali_fail";
        div.innerHTML="验证码不能为空";
	}
}
var imgCode=document.querySelector(".imgCode");
imgCode.onclick=function(){
    this.src = "php/getCode.php";
};

var registerbtn=document.querySelector("#registerbtn");
registerbtn.onclick=()=>{
	var tips=document.querySelectorAll("form>div>div");
	var bool=true;
	for(var tip of tips){
		if(tip.className!="vali_success"){
			bool=false;
		}
	}
	if(bool){
		ajax({
			type:"post",
			url:"php/register.php",
			data:`uname=${form.uname.value}&upwd=${form.upwd.value}&phone=${form.phone.value}`
		}).then(txt=>{
			console.log(txt);
			if(txt=="true") {
                alert("注册成功");
				location = "login.html";
            }
		});	
	}
}