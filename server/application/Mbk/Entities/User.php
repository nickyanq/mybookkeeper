<?php

namespace Mbk\Entities;

use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity 
 * @Table(name="users")
 */
class User extends AbstractEntity {

    /**
     * @Id  @Column(type="integer")
     * @GeneratedValue
     */
    protected $id_user;

    /**
     *
     * @Column(type="string",nullable=true) @var string 
     */
    protected $lastname;

    /**
     * @Column(type="string",nullable=true) @var string 
     */
    protected $firstname;

    /**
     * @Column(type="string",unique=true) @var string 
     */
    protected $email;

    /**
     * @Column(type="string") @var string 
     */
    protected $gender;

    /**
     * @Column(type="string") @var string 
     */
    private $password;

	/**
     * @Column(type="string") @var string 
     */
	private $realPassword;
	
    /**
     * @Column(type="datetime")
     */
    protected $created_date;

    function __construct() {
        $this->created_date = new \DateTime("now");
//        $this->items = new ArrayCollection();
//        $this->operator_items = new ArrayCollection();
//        $this->orders = new ArrayCollection();
//        
//        $this->partnerNewsletter=new ArrayCollection();
    }

	public function getId_user() {
		return $this->id_user;
	}

	public function getLastname() {
		return $this->lastname;
	}

	public function getFirstname() {
		return $this->firstname;
	}

	public function getEmail() {
		return $this->email;
	}

	public function getGender() {
		return $this->gender;
	}

	public function getPassword() {
		return $this->password;
	}

	public function getCreated_date() {
		return $this->created_date;
	}

	public function getRealPassword() {
		return $this->realPassword;
	}

	public function setId_user($id_user) {
		$this->id_user = $id_user;
	}

	public function setLastname($lastname) {
		$this->lastname = $lastname;
	}

	public function setFirstname($firstname) {
		$this->firstname = $firstname;
	}

	public function setEmail($email) {
		$this->email = $email;
	}

	public function setGender($gender) {
		$this->gender = $gender;
	}

	public function setPassword($password) {
		$this->password = $password;
	}

	public function setCreated_date($created_date) {
		$this->created_date = $created_date;
	}

	public function setRealPassword($realPassword) {
		$this->realPassword = $realPassword;
	}


}

?>
