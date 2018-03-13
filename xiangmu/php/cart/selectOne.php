<?php
require_once("../init.php");
@$chkOne=$_REQUEST["chkOne"];
@$iid=$_REQUEST["iid"];
if($iid!=null&&$chkOne!=null){
  $sql="update ca_shoppingcart_item set is_checked=$chkOne where iid=$iid";
  mysqli_query($conn,$sql);
}