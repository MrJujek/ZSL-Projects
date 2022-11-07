<?php
  $conn=@new mysqli('localhost','mnowak','mnowak','mnowak');
  if(!$conn) die('Błąd połączenia');
  $conn->query("UPDATE licznik SET licz=licz+1");
  $rs=$conn->query("SELECT licz FROM licznik");
  $rec=$rs->fetch_array();
  echo $rec['licz'];
  $rs->close();
  $conn->close();
?>
