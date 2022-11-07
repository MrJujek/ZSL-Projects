<?php
$conn=@new mysqli('localhost','root',NULL,'gstadnik');
if($conn->connect_errno) die('Brak połączenia z MySQL');
$conn->query('SET NAMES UTF8');

if(isset($_GET['akcja']))
	switch($_GET['akcja'])
	{
		case 'Dodaj':
			if(isset($_GET['nazwa'],$_GET['cena'],$_GET['ilosc']))
			{
			$nazwa=$_GET['nazwa'];
			$cena=$_GET['cena'];
			$ilosc=$_GET['ilosc'];
			$conn->query("INSERT INTO produkty(nazwa,cena,ilosc) 
			VALUES('$nazwa',$cena,$ilosc)") or die('Insert nie działa');
			}
			break;
		case 'Usuń':
			if(isset($_GET['id']))
			{
				$id=$_GET['id'];
				$conn->query("DELETE FROM produkty WHERE id=$id") 
				or die('Usuwanie nie działa');
			}
			break;
	}
$rs=$conn->query('select id,nazwa,cena,ilosc from produkty');
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
	<td><input type="submit" name="akcja" value="Usuń"></td>
	<td><input type="submit" name="akcja" value="Edytuj"></td>
	</tr></form>';
}
echo "
</table><br><form>
Nazwa: <input type='text' name='nazwa'><br>
Cena: <input type='text' name='cena'><br>
Ilość: <input type='text' name='ilosc'><br>
<input type='submit' name='akcja' value='Dodaj'></form>
";
$rs->close();
$conn->close();
?>