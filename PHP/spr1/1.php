<style>
td {
    width: 30px;
    height: 30px;
}
</style>
<?php
    echo "<b>Julian Dworzycki 4ib2</b><br>-------------------------------<br>";
    
    $tab = array();
    $tab_2 = array();
    $duplicate = array();
    $count = 0;

    for ($i = 0; $i< 30; $i++) {
        $tab[$i] = rand(-20, 20);
    }
    sort($tab);
    for ($i = 0; $i< 30; $i++) {
        echo $tab[$i]."<br>";
    }
    echo "-------------------------------<br>";

    for($j = 0; $j<30; $j++) {
        if (in_array($tab[$j], $tab_2)) {
            if (!in_array($tab[$j], $duplicate)) {
                array_push($duplicate, $tab[$j]);
                $count++;
            }
        } else {
            array_push($tab_2, $tab[$j]);
        }
    }
    
    echo "Powtarzajace sie: ";
    for ($i = 0; $i < count($duplicate); $i++) {
        echo $duplicate[$i]." ";
    }
    echo "<br>";
    echo "Wiecej niz raz: ".$count;

    echo "<br>-------------------------------<br><table>";
    for($i=1; $i<=5; $i++) {
        echo "<tr>";
        for ($j = 1; $j <=8; $j++) {
            echo "<td>";
            if ($i == 1 or $j == 1) {
                echo "<b>";
            }
            echo $i*$j."</b></td>";
        }
        echo "</tr>";
    }
    echo "</table><br>-------------------------------<br>";

    $string1 = "tekst do zamiany";
    echo $string1." => ";
    $array = explode(" ", $string1);
    for ($i = 0; $i < count($array); $i++) {
        if ((strlen($array[$i])%2) == 1) {
            $array[$i][0] = strtoupper($array[$i][0]);
            $array[$i][-1] = strtoupper($array[$i][-1]);
        }  
    }
    echo join(" ",$array);

    echo "<br>".$string1." => ";
    $array = explode(" ", $string1);
    for ($i = 0; $i < count($array); $i++) {
        if ((strlen($array[$i])%2) == 0) {
            $pomoc = $array[$i][0];
            $array[$i][0] = $array[$i][-1];
            $array[$i][-1] = $pomoc;
        }  
    }
    echo join(" ",$array);
?>