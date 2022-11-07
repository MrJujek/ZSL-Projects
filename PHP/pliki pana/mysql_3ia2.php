<?php
$conn=@new mysqli('inf16.tl.krakow.pl','mnowak','mnowak','hurtownia');
if($conn->connect_errno) die('Nie można połączyć się z serwerem');
$rs=$conn->query("SELECT nazwa,miasto FROM firmy WHERE miasto='Tarnów'");
while($rec=$rs->fetch_array())
	echo $rec['nazwa'],' ',$rec['miasto'],'<br>';
$rs->close();
$conn->close();
?>