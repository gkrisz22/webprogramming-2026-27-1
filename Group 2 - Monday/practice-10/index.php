<?php
$todos = [
    ["title" => "Buy milk1", "done" => true],
    ["title" => "Learn PHP arrays", "done" => false],
    ["title" => "Water the plants", "done" => true],
    ["title" => "Clean the room", "done" => true],
    ["title" => "Read chapter 3", "done" => false],
];


$title = "";
$done = false;
$errors = [];
if($_SERVER["REQUEST_METHOD"] === "POST") {
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";

    $title = trim($_POST["title"] ?? "");
    $done = isset($_POST["done"]) ? true : false;

    if($title === "") {
        $errors["title"] = "Title is missing";
    }
    elseif (strlen($title) > 30) {
        $errors["title"] = "At most 30 chars.";
    }

    if(count($errors) === 0) {
        $todos[] = ["title" => $title, "done" => $done];
        $title = "";
        $done = false;
    }
}


//$todos = [];

echo "Hello world<br>";
// length: count($array)

echo "You have " . count($todos) . " todos.<br>";


$done = 0;
foreach($todos as $todo) {
    echo $todo["title"] . " <br>";

    if($todo["done"])
        $done++;
}

/* 
    In html:
    <?= $todo["title] ?>
    PHP:
    <?php echo $todo["title"]; ?>
*/

$show = $_GET["show"] ?? "all";
echo $show;

// "  learn  " -> "learn"
$q = trim($_GET["q"] ?? "");

$visible = [];
foreach($todos as $todo) {
    if($show === "done" && !$todo["done"]) continue;
    if($show === "open" && $todo["done"]) continue;

    if(!str_contains(strtolower($todo["title"]), strtolower($q))) continue;

    $visible[] = $todo;
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Todos</h1>

    <p>
        <a href="?show=all" <?=  $show === "all" ?  'style="font-weight: bold;"' : ''  ?> >All</a>
        <a href="?show=open" <?=  $show === "open" ?  'style="font-weight: bold;"' : ''  ?> >Open</a>
        <a href="?show=done" <?=  $show === "done" ?  'style="font-weight: bold;"' : ''  ?> >Done</a>
    </p>

    <form method="get">
        <input type="hidden" name="show" value="<?= $show ?>" >
        <input name="q" value="<?= $q ?>">
        <button type="submit">Search</button>
    </form>

    <?php if(count($todos) === 0): ?>
        <p>Nothing to do.</p>
    <?php else: ?>
        <p><?= $done ?> of <?= count($todos) ?> done</p>
        <ul>
            <!--
            <li><s>Buy milk</s></li>
            <li>Learn PHP arrays</li>
            -->
            <?php foreach($visible as $todo): ?>
                <?php if($todo["done"]): ?> 
                    <li><s><?= $todo["title"] ?></s></li>
                <?php else: ?>
                    <li><?= $todo["title"] ?></li>
                <?php endif; ?>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>


    <h2>Add a Todo</h2>
    <form method="post">
        <input name="title" value="<?= $title ?>">
        <?= $errors["title"] ?? "" ?>
        <label>
            <input type="checkbox" name="done" <?= $done ? "checked" : "" ?>> <!-- <input type="checkbox" checked> -->
            Already done
        </label>

        <button>Add</button>
    </form>
</body>
</html>