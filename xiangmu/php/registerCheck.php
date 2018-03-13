<?php
require_once("init.php");
@$uname=$_REQUEST['uname'];
$sql="SELECT * from ca_user where uname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row!=null){
	echo "false";
}else{
	echo "true";
}
?>