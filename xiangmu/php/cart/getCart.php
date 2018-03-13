<?php
//data/cart/getCart.php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];//将来从SESSION中来
if($uid){
  $sql="select iid, lid, title, spec, price, count ,(select sm from ca_laptop_pic where laptop_id=lid limit 1) as sm ,is_checked from ca_shoppingcart_item inner join ca_laptop on product_id=lid where user_id=$uid";
  $result=mysqli_query($conn,$sql);
  echo json_encode(mysqli_fetch_all($result,1));
}