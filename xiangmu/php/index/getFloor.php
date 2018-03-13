<?php
header("Content-Type:application/json");
require_once("../init.php");
$output=[
];
$sql="select * from xz_index_product where seq_recommended!=0 order by seq_recommended";
$result=mysqli_query($conn,$sql);
$output["recommended"]=mysqli_fetch_all($result,1);
$sql="select * from xz_index_product where seq_new_arrival!=0 order by seq_new_arrival";
$result=mysqli_query($conn,$sql);
$output["new_arrival"]=mysqli_fetch_all($result,1);
$sql="select * from xz_index_product where seq_top_sale!=0 order by seq_top_sale";
$result=mysqli_query($conn,$sql);
$output["top_sale"]=mysqli_fetch_all($result,1);
echo json_encode($output);