<?php
	header("Content-Type:application/json");
	require("init.php");
	@$uname=$_REQUEST['uname'];
	@$upwd=$_REQUEST['upwd'];
	if($uname&&$upwd){
	$sql="select uid from ca_user where uname='$uname' 
	and binary upwd=md5('$upwd')";
	$result=mysqli_query($conn, $sql);
	$user=mysqli_fetch_row($result);
	if($user){
		session_start();
		$_SESSION["uid"]=$user[0];
		echo"true";
		}else{
//		$row=mysqli_fetch_row($result);
//		if($row==null){
//			echo "用户名或者密码错误";
//		}else{
//			echo  "登录成功";
		echo"false";
		}
	}
	