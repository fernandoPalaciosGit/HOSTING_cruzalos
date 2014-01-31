<?php
$nombreArchivo = $_FILES['user_file']['name'];
$tempArchivo = $_FILES['user_file']['tmp_name'];
if(move_uploaded_file($tempArchivo,"uploadFiles/".$nombreArchivo)){
	echo "uploadFiles/".$nombreArchivo;
}
else{
	print_r($_FILES);
}
?>