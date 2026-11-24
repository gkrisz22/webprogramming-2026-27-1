<?php

// include("check.php");
// include_once("check.php");
//require "db.class.php";

require_once "db.class.php";
use Webprogramming\Db;
$db = new Db("sqlite:./todos.db");

$priorities = [1 => "low", 2 => "normal", 3 => "high"];

// C# Person p = new Person(); p.getName() -> PHP $p->getName();
$todos = $db->query("SELECT * FROM todos");
/*
echo "<pre>";
print_r($todos);
echo "</pre>";

die("Hello");
*/

/*
$todos = [
    ["title" => "Buy milk", "done" => true],
    ["title" => "Learn PHP arrays", "done" => false],
    ["title" => "Water the plants", "done" => false],
    ["title" => "Clean the room", "done" => true],
    ["title" => "Read chapter 3", "done" => false],
];*/

$errors = [];
$title = "";
$done = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = trim($_POST["title"] ?? "");
    $done = isset($_POST["done"]);

    if ($title === "") {
        $errors["title"] = "Write a title.";
    } elseif (strlen($title) > 30) {
        $errors["title"] = "At most 30 characters.";
    }

    if (count($errors) === 0) {
        //$todos[] = ["title" => $title, "done" => $done];
        $db->execute("INSERT INTO todos (title, done) VALUES (:title, :done)", ["title" => $title, "done" => $done]);

        echo "Inserted row with id=".$db->getLastInsertedId();
        $title = "";
        $done = false;
    }
}

$doneCount = 0;
foreach ($todos as $todo) {
    if ($todo["done"]) {
        $doneCount++;
    }
}

$show = $_GET["show"] ?? "all";
$q = trim($_GET["q"] ?? "");

$visible = $todos;

$sql = "SELECT * FROM todos WHERE title LIKE :apple ";
if($show === "open") {
    $sql .= " AND done = 0"; // sql += "other string"
}
if($show == "done") {
    $sql .= " AND done = 1";
}

$visible = $db->query($sql, ["apple" => "%$q%"]);

/*
foreach ($todos as $todo) {
    if ($show === "done" && !$todo["done"]) continue;
    if ($show === "open" && $todo["done"]) continue;
    if (!str_contains(strtolower($todo["title"]), strtolower($q))) continue;
    $visible[] = $todo;
}*/
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Todos</title>
</head>
<body>
    <h1>Todos</h1>

    <p><?= $doneCount ?> of <?= count($todos) ?> done</p>

    <p>
        <a href="?show=all" <?= $show === "all" ? 'style="font-weight: bold"' : "" ?>>All</a>
        <a href="?show=open" <?= $show === "open" ? 'style="font-weight: bold"' : "" ?>>Open</a>
        <a href="?show=done" <?= $show === "done" ? 'style="font-weight: bold"' : "" ?>>Done</a>
    </p>

    <form method="get">
        <input type="hidden" name="show" value="<?= htmlspecialchars($show) ?>">
        <input name="q" value="<?= htmlspecialchars($q) ?>">
        <button>Search</button>
    </form>

    <?php if (count($visible) === 0): ?>
        <p>Nothing to do.</p>
    <?php else: ?>
        <ul>
        <?php foreach ($visible as $todo): ?>
            <?php if ($todo["done"]): ?>
                <li><s><?= htmlspecialchars($todo["title"]) ?> <?php echo $priorities[$todo["priority"]] ?> </s></li>
            <?php else: ?>
                <li><?= htmlspecialchars($todo["title"]) ?> <?= $priorities[$todo["priority"]] ?> </li>
            <?php endif; ?>
        <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <h2>Add a todo</h2>
    <form method="post">
        <input name="title" value="<?= htmlspecialchars($title) ?>">
        <?= $errors["title"] ?? "" ?>
        <label>
            <input type="checkbox" name="done" <?= $done ? "checked" : "" ?>>
            already done
        </label>
        <button>Add</button>
    </form>
</body>
</html>

<?php 
//require "db.class.php";
