(()=>{
  var form=document.forms["loginForm"],
      txtName=form.uname,
      txtPwd=form.upwd,
      valiTip=form.children[0],
      btnLogin=form.elements["btnLogin"];
  btnLogin.onclick=function(){
    if(txtName.value.trim()===""){
      valiTip.style.display="block";
      valiTip.innerHTML="用户名不能为空";
    }else if(txtPwd.value.trim()===""){
      valiTip.style.display="block";
      valiTip.innerHTML="密码不能为空";
    }else{
      ajax({
        type:"post",
        url:"php/login.php",
        data:"uname="+txtName.value+"&upwd="+txtPwd.value
      }).then(text=>{
        if(text=="false"){
            valiTip.style.display="block";
            valiTip.innerHTML="用户名或密码错误!";
        }else{
            //如果有search
            if(location.search!==""){
                location=decodeURIComponent(
                    location.search.slice(6)
                );
            }else {
                alert("登录成功");
                location = "index.html";
            }
        }
      })
    }
  }
})()