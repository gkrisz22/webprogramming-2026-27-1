<?php
// Run in a terminal, in this folder:   php check.php
// The last line tells you whether you are ready for PHP 3.

$problems = [];

function line(string $label, string $value): void
{
    echo str_pad($label, 22) . $value . PHP_EOL;
}

if (PHP_SAPI !== "cli") {
    header("Content-Type: text/plain; charset=UTF-8");
}

echo "PHP 3 setup check" . PHP_EOL;
echo "-----------------" . PHP_EOL;

// 1. PHP version
line("PHP version:", PHP_VERSION);
if (PHP_VERSION_ID < 80000) {
    $problems[] = "Install PHP 8.0 or newer (see Installing PHP in the PHP 1 article).";
}

// 2. Which php.ini is used
$ini = php_ini_loaded_file();
line("php.ini:", $ini === false ? "none loaded" : $ini);

// 3. SQLite support
$hasSqlite = extension_loaded("pdo_sqlite");
line("pdo_sqlite:", $hasSqlite ? "yes" : "NO");
if (!$hasSqlite) {
    $problems[] = "SQLite is not turned on. Run:   php fix.php";
}

// 4. Can we create a database file in this folder?
if ($hasSqlite) {
    $file = __DIR__ . "/check-test.db";
    try {
        $pdo = new PDO("sqlite:$file");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->exec("CREATE TABLE t (id INTEGER PRIMARY KEY, name TEXT)");
        $pdo->exec("INSERT INTO t (name) VALUES ('ok')");
        $name = $pdo->query("SELECT name FROM t")->fetchColumn();
        $pdo = null;
        line("Write a database:", $name === "ok" ? "yes" : "NO");
        if ($name !== "ok") {
            $problems[] = "The test database did not work. Show this output to your teacher.";
        }
    } catch (Throwable $e) {
        line("Write a database:", "NO");
        $problems[] = "Cannot create a file in this folder: " . $e->getMessage()
            . "\n  Move the folder somewhere you can write, for example Documents.";
    } finally {
        $pdo = null;
        if (file_exists($file)) {
            @unlink($file);
        }
    }
}

echo PHP_EOL;
if (count($problems) === 0) {
    echo "Ready for PHP 3" . PHP_EOL;
} else {
    foreach ($problems as $problem) {
        echo "- " . $problem . PHP_EOL;
    }
    echo PHP_EOL . "Not ready: fix the points above, then run  php check.php  again." . PHP_EOL;
}
