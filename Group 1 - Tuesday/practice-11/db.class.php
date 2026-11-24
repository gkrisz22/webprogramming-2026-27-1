<?php
declare(strict_types=1);
namespace Webprogramming;
class Db {
  private \PDO|null $connection;
  public function __construct(string $connection_string, string $username = '', string $password = '') {
    $pdo = new \PDO($connection_string, $username, $password);
    $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    $this->connection = $pdo;
  }

  public function __destruct() {
    $this->connection = null;
  }
  
  public function query(string $sql, $parameters = []) {
    $stmt = $this->connection->prepare($sql);
    $stmt->execute($parameters);
    return $stmt->fetchAll();
  }
  
  public function execute(string $sql, $parameters = []) {
    return $this->connection
      ->prepare($sql)
      ->execute($parameters);
  }

  public function getConnection(): \PDO|null {
    return $this->connection;
  }

  public function getLastInsertedId(): int {
    return (int)$this->connection->lastInsertId();
  }
}