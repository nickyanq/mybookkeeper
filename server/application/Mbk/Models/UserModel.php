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

}
?>

