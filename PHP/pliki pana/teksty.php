<form>
Podaj imię: <input type="text" name="imie"><br>
Podaj nazwisko: <input type="text" name="nazwisko"><br>
Podaj PESEL: <input type="text" name="pesel"><br>
<input type="submit" value="Oblicz">
</form>
<?php
if(isset($_GET['imie'],$_GET['nazwisko'],$_GET['pesel']))
{
	$imie=trim($_GET['imie']);
	$nazwisko=trim($_GET['nazwisko']);
	$pesel=trim($_GET['pesel']);
	echo "Inicjały: ".substr($imie,0,1).substr($nazwisko,0,1);
	//echo $imie[0].$nazwisko[0];
	if(strlen($pesel)==11&&is_numeric($pesel))
		if(($pesel[0]+$pesel[1]*3+$pesel[2]*7+$pesel[3]*9+$pesel[4]+$pesel[5]*3
		+$pesel[6]*7+$pesel[7]*9+$pesel[8]+$pesel[9]*3+$pesel[10])%10==0)
			echo 'PESEL prawidłowy';
		else
			echo 'PESEL z błędem';
	else
		echo 'PESEL nieprawidłowy';
	echo($pesel[9]%2==0)?'Jesteś kobietą':'Jesteś mężczyzną';
	echo 'Zaszyfrowane nazwisko: ';
	for($i=0;$i<strlen($nazwisko);$i++)
		echo chr(ord($nazwisko[$i])+2);
}
?>

