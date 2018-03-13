<?php
//data/cart/addCart.php
require_once("../init.php");
//addCart.php?count=xxx&lid=xxx
@$lid=$_REQUEST["lid"];
@$count=$_REQUEST["count"];
session_start();
@$uid=$_SESSION["uid"];
if($lid&&$count&&$uid){
  $sql="select * from ca_shoppingcart_item where product_id=$lid and user_id=$uid";
  $result=mysqli_query($conn,$sql);
        //如果找不到，返回null
  if(!mysqli_fetch_row($result)){
    $sql="insert into ca_shoppingcart_item values (null,$uid,$lid,$count,0)";
  }else{
    $sql="update ca_shoppingcart_item set count=count+$count where product_id=$lid and user_id=$uid";
  }
  mysqli_query($conn,$sql);
}