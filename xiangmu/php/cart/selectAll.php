<?php
require_once("../init.php");
@$chkAll=$_REQUEST["chkAll"];
session_start();
@$uid=$_SESSION["uid"];
if($chkAll!=null){
  $sql="update ca_shoppingcart_item set is_checked=$chkAll where user_id=$uid";
  mysqli_query($conn,$sql);
}