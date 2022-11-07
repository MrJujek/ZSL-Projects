<?php
$conn=@new mysqli('localhost','root','','gstadnik');
if($conn->connect_errno)
	echo 'Brak połączenia z MySQL';
else
{
	$conn->query("SET NAMES UTF8");
	$przycisk='Dodaj';
	$imie='';
	$nazwisko='';
	$pensja='';
	if(isset($_GET['akcja']))
	{
		switch($_GET['akcja'])
		{
			case 'Dodaj':
				$imie=$_GET['imie'];
				$nazwisko=$_GET['nazwisko'];
				$pensja=$_GET['pensja'];
				$sql="INSERT INTO pracownicy_4Ib1(imie,nazwisko,pensja) VALUES('$imie','$nazwisko',$pensja)";
				//echo $sql;
				$conn->query($sql) or die('Nie dodano rekordu');
				break;
			case 'Usuń':
				$id=$_GET['id'];
				$sql="DELETE FROM pracownicy_4Ib1 
				WHERE id=$id";
				$conn->query($sql) or die('Nie można usunąć rekordu');
				break;
			case 'Edytuj':
				$id=$_GET['id'];
				$rs=$conn->query("SELECT imie,nazwisko,pensja FROM pracownicy_4Ib1 WHERE id=$id");
				$rec=$rs->fetch_assoc();
				$imie=$rec['imie'];
				$nazwisko=$rec['nazwisko'];
				$pensja=$rec['pensja'];
				$przycisk='Zapisz';
				break;
			case 'Zapisz':
				$id=$_GET['id'];
				$imie=$_GET['imie'];
				$nazwisko=$_GET['nazwisko'];
				$pensja=$_GET['pensja'];
				$sql="UPDATE pracownicy_4Ib1 SET imie='$imie',
				nazwisko='$nazwisko',pensja=$pensja
				WHERE id=$id";
				$conn->query($sql) or die('Nie można zapisać rekordu');
				break;				
		}
	}
	$rs=$conn->query("SELECT imie,nazwisko,pensja,id FROM pracownicy_4Ib1");
	if($rs->num_rows>0)
	{	
		echo '<table border=1>
		<tr><th>Imię</th><th>Nazwisko</th>
		<th>Pensja</th><th>Usuwanie</th><th>Edycja</th></tr>';
		while($rec=$rs->fetch_assoc())
		{
			$id=$rec['id'];
			echo "<form><tr><td><input type='hidden' name='id' value='$id'>",$rec['imie'],'</td><td>',
			$rec['nazwisko'],'</td><td>',
			$rec['pensja'],"</td><td><a href='?id=$id&akcja=Usuń'>Usuń</a></td>
			<td><input type='submit' name='akcja' value='Edytuj'></td></tr></form>";
		}
		echo '</table>';
	}
	$rs->close();
	echo "
	<br><form>
	<input type='hidden' name='id' value='$id'>
	Imię: <input type='text' name='imie' value='$imie'><br>
	Nazwisko: <input type='text' name='nazwisko' value='$nazwisko'><br>
	Pensja: <input type='text' name='pensja'  value='$pensja'><br>
	<input type='submit' name='akcja' value='$przycisk'>
	</form>
	";
	
}
$conn->close();
?>
