<?php
for($i=1;$i<11;$i++)
{
	$tab[$i]=rand(0,100);
	echo $tab[$i].'<br>';
}
sort($tab);
echo 'Po sortowaniu:<br>';
for($i=0;$i<10;$i++)
{
	echo $tab[$i].'<br>';
}
?>
