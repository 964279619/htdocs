<?php
header("Content-Type:application/json");
require_once("../init.php");
//@$kw=$_REQUEST["kw"];
//$sql="select *,(select md from ca_laptop_pic where laptop_id=lid limit 1) as md from ca_laptop ";
//if($kw){
//  //$kw:"mac 256g i7"
//  $kws=explode(" ",$kw);//$kw.split(" ")
//  //$kws=["mac","256g","i7"]
//  for($i=0;$i<count($kws);$i++){
//    $kws[$i]=" title like '%$kws[$i]%' ";
//  }
//  //$kws=[
//    //" title like '%mac%' ",
//    //" title like '%256g%' ",
//    //" title like '%i7%' "
//  //];
//  $where=   //$kws.join(" and ")
//    " where ".implode(" and ",$kws);
//  //$where=" where title like '%mac%' and title like '%256g%' and title like '%i7%' ";
//  $sql.=$where;
//}
//$pageSize=10;
//$result=mysqli_query($conn,$sql);
//$rows=mysqli_fetch_all($result,1);
//$count=count($rows);
//@$pno=$_REQUEST["pno"];
//if(!$pno) $pno=1;
//$sql.=" limit ".($pno-1)*$pageSize.",$pageSize";
// $output=[
//   "pageSize"=>$pageSize,
//   "count"=>$count,
//   "pageCount"=>ceil($count/$pageSize),
//   "pno"=>$pno,
//   "data"=>
//     mysqli_fetch_All(mysqli_query($conn,$sql),1)
// ];
//echo json_encode($output);

function getProductsByKw(){
	global $conn;
	$output=[
		"count"=>0,//总个数
		"pageSize"=>10,//每页9个
		"pageCount"=>0,//总页数
		"pno"=>0,//现在第几页
		"data"=>[]//商品列表
	];
	@$pno=(int)$_REQUEST["pno"];
	if($pno) $output["pno"]=$pno;
	@$kw=$_REQUEST["kw"];
	//$sql="select lid,price,title,(select md from ca_laptop_pic where lid=lid limit 1) as md from ca_laptop ";
	$sql="select lid,price,discount_price,title,(select md from ca_laptop_pic where laptop_id=lid limit 1) as md from ca_laptop ";
	if($kw){
		//$kw=mac 256g
		//将$kw按空格切割为数组
		$kws=explode(" ",$kw);//js:split
		//$kws:[mac,256g]
		for($i=0;$i<count($kws);$i++){
			$kws[$i]=" title like '%".$kws[$i]."%' ";
		}
		//$kws:[
			//" title like '%mac%' ",
			//" title like '%256g%' "
		//]
		$sql.=" where ".implode(" and ",$kws);
		               //js: $kws.join(" and ")
	}
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
	$output["count"]=count($products);
	$output["pageCount"]=
		ceil($output["count"]/$output["pageSize"]);
	//$sql.= limit pageNo*pageSize,pageSize
	$sql.=" limit ".
				(($output["pno"]-1)*$output["pageSize"]).
		    ",".
				$output["pageSize"];
	$result=mysqli_query($conn,$sql);
	$output["data"]=mysqli_fetch_all($result,1);
	echo json_encode($output);
}
getProductsByKw();