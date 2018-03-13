<?php
@$code=$_REQUEST["code"];
session_start();
if(strtolower($code)==strtolower($_SESSION["captcha"])){
  echo "true";
}else{
  echo "false";
}