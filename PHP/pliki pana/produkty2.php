<?php
$conn=@new mysqli('localhost','root',NULL,'gstadnik');
if($conn->connect_errno) die('Brak połączenia z MySQL');
$conn->query('SET NAMES UTF8');
$id='';
$nazwa='';
$cena='';
$ilosc='';
$przycisk='Dodaj';
if(isset($_GET['akcja']))
	switch($_GET['akcja'])
	{
		case 'Dodaj':
			if(isset($_GET['nazwa'],$_GET['cena'],$_GET['ilosc']))
			{
			$nazwa=$_GET['nazwa'];
			$cena=$_GET['cena'];
			$ilosc=$_GET['ilosc'];
			$stmt=$conn->prepare("INSERT INTO produkty(nazwa,cena,ilosc) 
			VALUES(?,?,?)") or die('Insert nie działa');
			$stmt->bind_param("sdi",$nazwa,$cena,$ilosc);
			$stmt->execute();
			$nazwa='';
			$cena='';
			$ilosc='';
			}
			break;
		case 'Usuń':
			if(isset($_GET['id']))
			{
				$id=$_GET['id'];
				$stmt=$conn->prepare("DELETE FROM produkty WHERE id=?") or die('Nie działa usuwanie');
				$stmt->bind_param("i",$id);
				$stmt->execute();
				$id='';
			}
			break;
		case 'Edytuj':
			if(isset($_GET['id']))
			{
				$id=$_GET['id'];
				$stmt=$conn->prepare("SELECT nazwa,cena,ilosc FROM produkty 
				WHERE id=?") or die('Nie można pobrać rekordu');
				$stmt->bind_param("i",$id);
				$stmt->execute();
				$result=$stmt->get_result();
				$rec=$result->fetch_assoc();
				$nazwa=$rec['nazwa'];
				$cena=$rec['cena'];
				$ilosc=$rec['ilosc'];
				$przycisk='Zapisz';
			}
			break;
		case 'Zapisz':
			if(isset($_GET['id'],$_GET['nazwa'],$_GET['cena'],$_GET['ilosc']))
			{
				$nazwa=$_GET['nazwa'];
				$cena=$_GET['cena'];
				$ilosc=$_GET['ilosc'];
				$id=$_GET['id'];
				$stmt=$conn->prepare("UPDATE produkty SET nazwa=?,cena=?,ilosc=? WHERE id=?") or die('Nie działa UPDATE');
				$stmt->bind_param("sdii",$nazwa,$cena,$ilosc,$id);
				$stmt->execute();
				$nazwa='';
				$cena='';
				$ilosc='';
				$id='';
			}
			break;
	}
$stmt=$conn->prepare('select id,nazwa,cena,ilosc from produkty');
$stmt->execute();
$rs=$stmt->get_result();
?>
<table border=1><tr><th>Nazwa</th><th>Cena</th><th>Ilość</th>
<th>Usuwanie</th><th>Edycja</th></tr>
<?php
while($rec=$rs->fetch_assoc())
{
	echo '<form><tr>
	<td><input type="hidden" name="id" value="',$rec['id'],'">',
	$rec['nazwa'],'</td>
	<td>',$rec['cena'],'</td>
	<td>',$rec['ilosc'],'</td>
	<td><a href="?akcja=Usuń&id=',$rec['id'],'">Usuń</a></td>
	<td><input type="submit" name="akcja" value="Edytuj"></td>
	</tr></form>';
}
echo "
</table><br><form>
<input type='hidden' name='id' value='$id'>
Nazwa: <input type='text' name='nazwa' value='$nazwa'><br>
Cena: <input type='text' name='cena' value='$cena'><br>
Ilość: <input type='text' name='ilosc' value='$ilosc'><br>
<input type='submit' name='akcja' value='$przycisk'></form>
";
$rs->close();
$conn->close();
?>