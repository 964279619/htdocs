function $(id){
	return document.getElementById(id);
}
function createxhr(){
	if(window.XMLHttpRequest){
		var xhr=new XMLHttpRequest();
	}else{
		var xhr=new ActiveXObject("Microsoft.XMLhttp");
	}
	return xhr;
}
