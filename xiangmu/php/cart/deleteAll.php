<?php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
if($uid){
  $sql="delete from ca_shoppingcart_item where user_id=$uid";
  mysqli_query($conn,$sql);
}