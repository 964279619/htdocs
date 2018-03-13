<?php
	$conn=mysqli_connect("localhost","root","","ca", 3306);
	$sql="set names UTF8";
	mysqli_query($conn, $sql);
	header('Access-Control-Allow-Origin:*');