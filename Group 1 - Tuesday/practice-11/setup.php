<?php
// Open http://localhost:8080/setup.php to create todos.db.
// Open it again at any time to reset the table to these five todos.

$pdo = new PDO("sqlite:./todos.db");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$pdo->exec("DROP TABLE IF EXISTS todos");

$pdo->exec("
    CREATE TABLE todos (
        id       INTEGER PRIMARY KEY AUTOINCREMENT,
        title    TEXT    NOT NULL,
        done     INTEGER NOT NULL DEFAULT 0,
        priority INTEGER NOT NULL DEFAULT 2
    )
");

$pdo->exec("
    INSERT INTO todos (title, done, priority) VALUES
        ('Buy milk',         1, 2),
        ('Learn PHP arrays', 0, 3),
        ('Water the plants', 0, 1),
        ('Clean the room',   1, 3),
        ('Read chapter 3',   0, 2)
");

$count = $pdo->query("SELECT COUNT(*) FROM todos")->fetchColumn();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Setup</title>
</head>
<body>
    <p>todos.db is ready with <?= $count ?> todos.</p>
    <p><a href="index.php">Back to the list</a></p>
</body>
</html>
