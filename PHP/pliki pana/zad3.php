<form method="GET">
    <input type="text" name="tekst"/>
    <input type="submit" value="OK"/>
</form>
<?php
if(isset($_GET['tekst']))
{
	$klucz='KONIECMATURY';
	$text=$_GET['tekst'];
	$d=strlen($text);
	for($i=0;$i<$d;$i++)
	{
		$pos=strpos($klucz,$text[$i]);
		if($pos===false)
			echo $text[$i];
		else
			echo($pos%2==0)?$klucz[$pos+1]:$klucz[$pos-1];
	}
}
?>



