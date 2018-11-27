<?php
require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../dao/GameDAO.php';


class GameController extends Controller{

  function __construct(){
    $this->gameDAO = new GameDAO();
  }

  public function index(){
    $this->set('title','ChickenOut');
  }

}
