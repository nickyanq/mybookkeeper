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
	private $PrivateUser = false;

	function __construct() {
		parent::__construct();
		$this->UserModel = new Mbk\Models\UserModel();
	}

	private function setResponse(array $array) {
		$this->output->set_content_type('application/json')->set_output(json_encode($array));
	}

	public function index() {

		$this->setResponse(array('code' => '101', 'message' => 'Welcome to mybookeeper API.'));
	}

	public function register() {

		if (!$this->input->post()) {

			$this->setResponse(array('code' => '12', 'message' => 'Headers not send.'));
		} else {
			$response = $this->UserModel->registerUser((object) $this->input->post(), $this->encrypt);

			$this->setResponse($response);
		}
	}

	public function login() {
		$_POST = array(
			'email' => 'corneliu.iancu@opti.ro',
			'password' => 'password'
		);
		if (!$this->input->post()) {
			$this->setResponse(array('code' => '12', 'message' => 'Headers not send.'));
			return;
		}

		$response = $this->UserModel->loginUser((object) $this->input->post(), $this->encrypt);

		if ($response['code'] == 1) {
			$this->session->set_userdata('logged', $response['user']);
		}
		$this->setResponse($response);
	}

	public function auth() {

		$this->PrivateUser = $this->session->userdata('logged');

		if ($this->PrivateUser) {
			$this->setResponse(array('code' => 1, 'message' => 'The user is logged.', 'user' => $this->UserModel->getUserById($this->PrivateUser['id_user'])));
		} else {
			$this->setResponse(array('code' => 2, 'message' => 'No logged user', 'user' => $this->PrivateUser));
		}
	}

	public function logout() {
		$this->session->unset_userdata('logged');
		$this->setResponse(array('code' => 1, 'message' => 'The session was cleared'));
	}

	public function updateUser() {

		if (!$this->input->post()) {
			$this->setResponse(array('code' => '12', 'message' => 'Headers not send.'));
			return;
		}

		$response = $this->UserModel->updateUser((object) $this->input->post());

		$this->setResponse((array) $response);
	}

	public function updatePassword() {
		if(!$this->input->post()){
			$this->setResponse(array('code' => '12', 'message' => 'Headers not send.'));
			return;
		}
		
		$response = $this->UserModel->updatePassword((object) $this->input->post(),$this->encrypt);

		$this->setResponse((array) $response);
		
	}

}
