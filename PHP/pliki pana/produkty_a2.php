<?php
$conn=new mysqli('localhost','mnowak','mnowak','mnowak');
if(!$conn) exit('Brak połączenia');
$nazwa='';
$cena='';
$ilosc='';
$id='';
$przycisk='Dodaj';
if(isset($_GET['co']))
	switch($_GET['co'])
	{
		case 'Dodaj':
			if(isset($_GET['nazwa'],$_GET['cena'],$_GET['ilosc']))
			{
				$nazwa=$_GET['nazwa'];
				$cena=$_GET['cena'];
				$ilosc=$_GET['ilosc'];
				$conn->query("INSERT INTO produkty_a2(nazwa,cena,ilosc) 
				VALUES('$nazwa',$cena,$ilosc)");
			}
			break;
		case 'Usuń':
			if(isset($_GET['id']))
			{
				$conn->query("DELETE FROM produkty_a2 WHERE id=".$_GET['id']);
			}
			break;	
		case 'Edytuj':
			if(isset($_GET['id']))
			{
				$wynik=$conn->query("SELECT nazwa,cena,ilosc FROM produkty_a2 WHERE id=".$_GET['id']);
				if($wynik->num_rows>0)
				{
					$rekord=$wynik->fetch_array();
					$nazwa=$rekord['nazwa'];
					$cena=$rekord['cena'];
					$ilosc=$rekord['ilosc'];
					$id=$_GET['id'];
					$przycisk='Zapisz';
				}
			}
			break;		
		case 'Zapisz':
			if(isset($_GET['id'],$_GET['nazwa'],$_GET['cena'],$_GET['ilosc']))
			{
				$nazwa=$_GET['nazwa'];
				$cena=$_GET['cena'];
				$ilosc=$_GET['ilosc'];
				$conn->query("UPDATE produkty_a2 SET nazwa='$nazwa',cena=$cena,
				ilosc=$ilosc WHERE id=".$_GET['id']);
				$nazwa='';
				$cena='';
				$ilosc='';
			}
			break;
	}

$wynik=$conn->query('SELECT id,nazwa,cena,ilosc FROM produkty_a2 ORDER BY nazwa');
if($wynik->num_rows>0)
{
	echo '<table border=1>';
	echo '<tr><th>Lp</th><th>Nazwa</th><th>Cena</th><th>Ilość</th><th>Edytowanie</th>
	<th>Usuwanie</th></tr>';
	$lp=1;
	while($rekord=$wynik->fetch_array())
	{
		echo "<form><tr><td>$lp</td><td><input type='hidden' name='id' value='".
		$rekord['id']."'>".$rekord['nazwa'].'</td><td>'.$rekord['cena'].'</td><td>'.
		$rekord['ilosc'].'</td><td><input type="submit" name="co" value="Edytuj"></td><td>
		<input type="submit" name="co" value="Usuń"></td></tr></form>';
		$lp++;
	}
	echo '</table>';
}
$conn->close();
echo '
<form>
<input type="hidden" name="id" value="'.$id.'">
Nazwa produktu: <input type="text" name="nazwa" value="'.$nazwa.'"><br>
Cena: <input type="text" name="cena" value="'.$cena.'"><br>
Ilość: <input type="text" name="ilosc" value="'.$ilosc.'"><br>
<input type="submit" name="co" value="'.$przycisk.'">
</form>
';
?>