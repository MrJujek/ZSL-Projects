<?php
  define("ILE",10);
  for($i=1;$i<=ILE;$i++)
  {
	$tab[$i]=rand(1,100);
	echo $tab[$i]."<br>";
  }
  //sortowanie
 
  do
  {
	$zamiana=false;
	for($i=1;$i<ILE;$i++)
	  {
		if($tab[$i]>$tab[$i+1])
		  {
			  $pom=$tab[$i];
			  $tab[$i]=$tab[$i+1];
			  $tab[$i+1]=$pom;
			  $zamiana=true;
		  }
	  }
  } while($zamiana==true);
  echo("Posortowane liczby:<br>");
  for($i=1;$i<=ILE;$i++)
  {
	echo $tab[$i]."<br>";
  }
  ?>
