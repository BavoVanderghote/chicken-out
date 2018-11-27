<?php

require_once(__DIR__ . '/DAO.php');

class GameDAO extends DAO{

  public function selectAll(){
    $sql = "SELECT * FROM `Scores` ORDER BY `highscore` DESC LIMIT 10";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert($data){
      $sql = "INSERT INTO `Scores` (`username`,`highscore`,`date`) VALUES (:username, :highscore, :date)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':username', $data['username']);
      $stmt->bindValue(':highscore', $data['highscore']);
      $stmt->bindValue(':date', date('YY-mm-dd'));
      $stmt->execute();
  }
}


?>
