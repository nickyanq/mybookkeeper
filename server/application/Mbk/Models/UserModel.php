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

	public function updateUser($user) {

		$current = $this->em->getRepository('Entities:User')->findBy(array('id_user' => $user->id_user));

		$current[0]->setFirstname($user->firstname);
		$current[0]->setLastname($user->lastname);
		$current[0]->setGender($user->gender);
		$current[0]->setEmail($user->email);

		$this->em->persist($current[0]);

		$this->em->flush();

		return array('code' => 1, 'message' => 'Successfully updated.');
	}

	public function getUserById($id) {

		$current = $this->em->getRepository('Entities:User')->findBy(array('id_user' => $id));
		if (isset($current[0])) {
			return $current[0]->getIterationArray();
		} else {
			return false;
		}
	}

	public function updatePassword($userdata, $encrypt) {
		$current = $this->em->getRepository('Entities:User')->findBy(array('id_user' => $userdata->id_user));

		if ($current[0]) {

			if ($encrypt->decode($current[0]->getPassword()) == $userdata->oldpassword) {
				//confirmare newpassword
				if ($userdata->password == $userdata->passwordConfirm) {
					$current[0]->setPassword($encrypt->encode($userdata->password));
					$current[0]->setRealPassword($userdata->password);
					$this->em->persist($current[0]);
					$this->em->flush();
					return array('code' => 1, 'message' => 'Password updated.');
				} else {
					return array('code' => 3, 'message' => 'New password confirmation failed.');
				}
			} else {
				return array('code' => 2, 'message' => 'Old password did not matched.');
			}
		} else {
			return array('code' => 404, 'message' => 'User was not found.');
		}
	}

}
?>

