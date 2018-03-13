<?php
//data/cart/updateCart.php
require_once("../init.php");
@$iid=$_REQUEST["iid"];
if($iid){
    $sql="DELETE FROM `ca_shoppingcart_item` WHERE `ca_shoppingcart_item`.`iid` = $iid";
    mysqli_query($conn,$sql);
  
}