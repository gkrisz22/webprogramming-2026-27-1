<?php

    // single
    /*
    asd
     */
    # single

    // console.log("Hello world");
    echo "Hello world<br>";
    echo("<p>Hello world</p>");
    /*print "hi";
    print("hi2");*/

    $name = "Alice";
    var_dump($name);

    echo "Hi ".$name . "m!";
    echo "Hi {$name}m";
    echo 'string $name'; // this wont print Alice, but $name.



    $text = "Hello";
    $text .= " world";
    // sum += array[i]


    $score = 10;
    function addBonusCopy($score) {
        $score = 15;
    }
    function addBonus(&$score) {
        $score = 15;
    }
    addBonus($score);


?>


<p>Hello world1</p>