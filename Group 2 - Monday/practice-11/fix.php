<?php
// Run in a terminal, in this folder:   php fix.php
// It turns on SQLite for PHP if it is off. Then run:   php check.php
//
// Windows: creates or edits php.ini next to php.exe. The old file is kept as php.ini.bak.
// macOS and Linux: changes nothing, it prints the command to run.

function say(string $text = ""): void
{
    echo $text . PHP_EOL;
}

function fixWindows(string $phpDir, string|false $loadedIni): void
{
    $extDir = $phpDir . DIRECTORY_SEPARATOR . "ext";

    if (!file_exists($extDir . DIRECTORY_SEPARATOR . "php_pdo_sqlite.dll")) {
        say("Cannot find $extDir\\php_pdo_sqlite.dll.");
        say("Download the Zip of PHP again from windows.php.net and extract all of it to $phpDir.");
        return;
    }

    $ini = $loadedIni !== false ? $loadedIni : $phpDir . DIRECTORY_SEPARATOR . "php.ini";

    if (!file_exists($ini)) {
        $dev = $phpDir . DIRECTORY_SEPARATOR . "php.ini-development";
        $ok = file_exists($dev) ? @copy($dev, $ini) : @file_put_contents($ini, "[PHP]" . PHP_EOL) !== false;
        if (!$ok) {
            say("Cannot create $ini.");
            say("Open the terminal as administrator and run  php fix.php  again.");
            return;
        }
        say("Created $ini");
    } elseif (!file_exists($ini . ".bak")) {
        @copy($ini, $ini . ".bak");
        say("Saved a copy of the old file as $ini.bak");
    }

    $text = file_get_contents($ini);
    $add = [];

    // Lines without a ; in front are active. Only add what is not active yet.
    if (!preg_match('/^\s*extension_dir\s*=/mi', $text)) {
        $add[] = 'extension_dir = "' . $extDir . '"';
    }
    foreach (["pdo_sqlite", "sqlite3"] as $name) {
        if (!preg_match('/^\s*extension\s*=\s*"?(php_)?' . $name . '(\.dll)?"?\s*$/mi', $text)) {
            $add[] = "extension=$name";
        }
    }

    if (count($add) === 0) {
        say("$ini already turns SQLite on, but PHP did not load it.");
        say("Show the output of  php check.php  to your teacher.");
        return;
    }

    $block = PHP_EOL . "; Added by fix.php (web programming, PHP 3)" . PHP_EOL
        . implode(PHP_EOL, $add) . PHP_EOL;

    if (@file_put_contents($ini, $block, FILE_APPEND) === false) {
        say("Cannot write $ini.");
        say("Open the terminal as administrator and run  php fix.php  again.");
        return;
    }

    say("Added to $ini:");
    foreach ($add as $line) {
        say("  $line");
    }
    say();
    say("Done. Now run:   php check.php");
}

if (extension_loaded("pdo_sqlite")) {
    say("SQLite is already on. Nothing to change.");
    say("Run  php check.php  to check the rest.");
    exit;
}

if (PHP_OS_FAMILY === "Windows") {
    fixWindows(dirname(PHP_BINARY), php_ini_loaded_file());
} elseif (PHP_OS_FAMILY === "Darwin") {
    say("Your PHP has no SQLite. Reinstall PHP with Homebrew:");
    say("  brew reinstall php");
    say("Then open a new terminal and run  php check.php");
} else {
    say("Your PHP has no SQLite. Install it with your package manager:");
    say("  Debian, Ubuntu:  sudo apt install php-sqlite3");
    say("  Fedora:          sudo dnf install php-pdo");
    say("  Arch:            sudo pacman -S php-sqlite, then remove the ; before");
    say("                   extension=pdo_sqlite in /etc/php/php.ini");
    say("Then run  php check.php");
}
