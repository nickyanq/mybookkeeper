<?php

namespace Mbk\Models;

use Doctrine\ORM\EntityManager;

class AbstractModel {

    /**
     *
     * @var EntityManager $em;
     */
    protected $em;

    function __construct() {
        $this->em = \Doctrine::getInstance()->getEm();
    }

//    public function getNextId($table) {
//        $q = "SHOW TABLE STATUS LIKE '$table'";
//
//        $stmt = $this->em->getConnection()->prepare($q);
//        $stmt->execute();
//        $r = $stmt->fetchAll();
//        return $r[0]['Auto_increment'];
//    }
//
//    public function getCurrentId($table, $column) {
//        $q = "select * from $table order by $column desc limit 1";
//        $stmt = $this->em->getConnection()->prepare($q);
//        $stmt->execute();
//        $r = $stmt->fetchAll();
//        if (isset($r[0]['id']))
//            return $r[0]['id'];
//        else
//            return 1;
//    }

}
