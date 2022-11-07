<?php
	function pole_pr($a,$b)
	{
	  $wynik=$a*$b;
	  return $wynik;
	}

	echo('
	<form method="GET">
	Podaj bok a: <input type="text" name="bok_a"><br>
	Podaj bok b: <input type="text" name="bok_b"><br>
	<input type="submit" value="Oblicz">
	');
	if(isset($_GET['bok_a'])&&isset($_GET['bok_b']))
	{
	  $bok_a=$_GET['bok_a'];
	  $bok_b=$_GET['bok_b'];
	  echo("Pole prostokąta o długościach boków 
	  $bok_a i $bok_b = ".pole_pr($bok_a,$bok_b));
	}
	?>