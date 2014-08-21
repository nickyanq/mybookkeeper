<?php

namespace Mbk\Models;

class UserModel extends AbstractModel {

	public function registerUser($user, $encript) {
		//check email
		$user_exists = $this->em->getRepository('Entities:User')->findBy(array('email' => $user->email));
		if ($user_exists) {
			return array('code' => 201, 'message' => 'Email already in use.');
		}


		$usr = new \Mbk\Entities\User();

		$usr->postHydrate($user);

		$usr->setPassword($encript->encode($user->password));

		$usr->setRealPassword($user->password);

		$this->em->persist($usr);

		$this->em->flush();

		return array('code' => 202, 'message' => 'Successfull registration');
	}

	public function loginUser($user, $encrypt) {

		$_user = $this->em->getRepository('Entities:User')->findBy(array('email' => $user->email));

		if ($_user) {
			//check password
			if ($encrypt->decode($_user[0]->getPassword()) == $user->password) {
				return array('code' => 1, 'message' => 'Successfull login.', 'user' => $_user[0]->getIterationArray());
			} else {
				return array('code' => 2, 'message' => 'Password did not matched');
			}
		} else {
			return array('code' => 404, 'message' => 'User was not found');
		}

		die('loggin in..');
	}

}
?>

