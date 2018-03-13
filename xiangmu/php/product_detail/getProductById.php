<?php
header("Content-Type:application/json");
require_once("../init.php");
@$lid=$_REQUEST["lid"];
$output=[
  //product_info:{lid, family_id, title, subtitle, price, promise},
  //icon_list:[
    //{sm, md, lg},
    //{sm, md, lg},
    //...
  //],
  //specs:[
    //{lid, spec},
    //{lid, spec},
    //...
  //]
];
if($lid){
  $sql="select * from ca_laptop where lid=$lid";
  $output["product_info"]=
   mysqli_fetch_all(mysqli_query($conn,$sql),1)[0];
  
  $sql="select * from ca_laptop_pic where laptop_id=$lid";
  $output["icon_list"]=
    mysqli_fetch_all(mysqli_query($conn,$sql),1);

  $family_id=$output["product_info"]["fid"];
//  $sql="select * from ca_laptop_family where fid=$";
//   $output["fname"]=
//      mysqli_fetch_all(mysqli_query($conn,$sql),1);
  $sql="select lid, title,spec from ca_laptop where fid=$family_id";
  $output["specs"]=
    mysqli_fetch_all(mysqli_query($conn,$sql),1);
  echo json_encode($output);
}