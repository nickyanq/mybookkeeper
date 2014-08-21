<?php

/**
 * File : provider.php
 * Created at 21-08-2014 12:52:13 PM
 * 
 * @author Corneliu Iancu - Opti Systems
 * @contact corneliu.iancu@opti.ro
 */
class Provider extends CI_Controller {

	private $UserModel;

	function __construct() {
		parent::__construct();
		$this->UserModel = new Mbk\Models\UserModel();
	}

	public function index() {

		die('kewwwl');
	}

	public function register() {

		if(!$this->input->post()){
			$this->output
				->set_content_type('application/json')
				->set_output(json_encode(array('code'=>'12','message'=>'Headers not send.')));
		} else {
			$response = $this->UserModel->registerUser((object) $this->input->post(), $this->encrypt);
		$this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));
		}
		
//		$data = array(
//			'firstname' => 'Corneliu',
//			'lastname' => 'Iancu',
//			'email' => 'corneliu3.iancu@opti.ro',
//			'gender' => 'Mr.',
//			'password' => 'password',
//		);
//
//
//		$response = $this->UserModel->registerUser((object) $data, $this->encrypt);
//		$this->output
//				->set_content_type('application/json')
//				->set_output(json_encode($response));

		
	}

}
