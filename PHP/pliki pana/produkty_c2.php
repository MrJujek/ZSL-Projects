<?php
$conn=new mysqli('localhost','mnowak','mnowak','mnowak');
if(!$conn) exit('Błąd połączenia');
$wynik=$conn->query('SELECT id,nazwa,cena,ilosc FROM produkty_b1 ORDER BY nazwa,cena');
if($wynik->num_rows>0)
{
	echo '<table border=1>';
	echo '<tr><th>Lp</th><th>Nazwa</th><th>Cena</th><th>Ilość</th><th>Edytowanie</th><th>
	Usuwanie</th></tr>';
	$lp=1;
	while($rekord=$wynik->fetch_array())
	{
		echo '<tr><td>'.$lp.'</td><td>'.$rekord['nazwa'].'</td><td>'.$rekord['cena'].
		'</td><td>'.$rekord['ilosc'].'</td><td><input type="submit" value="Edytuj">
		</td><td><input type="submit" value="Usuń"></td></tr>';
		$lp++;
	}
	echo '</table>';	
}
$conn->close();
?>