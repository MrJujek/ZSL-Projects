<?php
session_start();
if (!isset($_SESSION["login"])){
  header("Location: logowanie.php");
 exit();
}
?>
<HTML>
<HEAD>
  <TITLE>Tajne/poufne</TITLE>
</HEAD>
<BODY>
<?php
  echo "Witaj " . $_SESSION["login"];
  echo "<A href='wyloguj.php?" . SID . "'>";
  echo "[Wyloguj]</A>";
?>
  <BR><B>tajne dane</B>
</BODY>
</HTML>
