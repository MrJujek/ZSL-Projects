<HTML>
<HEAD>
  <TITLE>Kalkulator</TITLE>
</HEAD>
<BODY>
<form>
Podaj pierwszą liczbę: <input type="text" name="liczba1"><br>
Podaj drugą liczbę: <input type="text" name="liczba2"><br>
Podaj operator (+,-,*,/): <input type="text" name="op"><br>
<input type="submit" value="Oblicz">
</form>
<?php
  if(isset($_GET['liczba1'])&&isset($_GET['liczba2'])&&isset($_GET['op']))
  {
	$l1=$_GET['liczba1'];
	$l2=$_GET['liczba2'];
	$op=$_GET['op'];
	switch($op)
	{
		case '+':
			echo("$l1$op$l2=".($l1+$l2));
			break;
		case '-':
			echo("$l1$op$l2=".($l1-$l2));
			break;
		case '*':
			echo("$l1$op$l2=".($l1*$l2));
			break;
		case '/':
			if($l2==0)
				echo('Nie można dzielić przez zero!');
			else
				echo("$l1$op$l2=".($l1/$l2));
			break;
		default:
			echo('Nieprawidłowy operator');
	}
  }
?>
</BODY>
</HTML>
