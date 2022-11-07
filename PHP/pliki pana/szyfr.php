<form method="GET">
Podaj PESEL: <input type="text" name="tekst"><br>
<input type="submit" value="Szyfruj">
</form>
<?php
	if(isset($_GET['tekst']))
	{
		$t=trim($_GET['tekst']);
		for($i=0;$i<strlen($t);$i++)
		{
			echo chr((ord($t[$i])+13)%26+55);
			//echo '<br>';
		}
	}
?>
