<?php
session_start();
?>
<HTML>
<HEAD>
  <TITLE>Wylogowanie</TITLE>
</HEAD>
<BODY>
<?php
  echo "U¿ytkownik " . $_SESSION["login"];
  echo " zosta³ wylogowany.";
  session_destroy();
?>
</BODY>
</HTML>
