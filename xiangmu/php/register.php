<?php
	header("Content-Type:application/json");
	require_once("init.php");
	@$uname=$_REQUEST["uname"];
	@$upwd=$_REQUEST["upwd"];
	@$phone=$_REQUEST["phone"];
	$sql="insert into ca_user(uname,upwd,phone) values('$uname',md5('$upwd'),'$phone')";
	$result=mysqli_query($conn,$sql);
	if($result == true){
    echo "true";
  }else{
    echo "false";
  }
?>
