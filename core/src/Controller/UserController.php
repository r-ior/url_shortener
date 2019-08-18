<?php

namespace App\Controller;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
// use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use App\Entity\Users;
use App\Repository\UsersRepository;

class UserController extends AbstractFOSRestController
{
    private $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * @Rest\Post("/api/user/register", name="userRegister")
     */
    public function userRegistration(Request $request, UserPasswordEncoderInterface $encoder, ValidatorInterface $validator)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $user = new Users();

        $fullname = $request->request->get('fullname');
        $username = $request->request->get('username'); 
        $email = $request->request->get('email');
        $password = $request->request->get('password');
        
        $user->setFullname($fullname);
        $user->setEmail($email);
        $user->setUsername($username);
        $user->setPassword($encoder->encodePassword(
            $user,
            $password
        ));
        $user->setApiToken(sha1($username));

        $errors = $validator->validate($user);

        if(count($errors) > 0) {
            $errorMessages = (string) $errors;

            return new JsonResponse($errorMessages, 400);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(array('authToken' => $user->getAuthToken()), 200);
    }

    /**
     * @Rest\Post("/api/user/auth", name="userAuth")
     */
    public function userAuth(Request $request, UsersRepository $users, UserPasswordEncoderInterface $encoder)
    {
        if(!$request->request->has('username') || !$request->request->has('password')) {
            return new JsonResponse('Unauthorized', 401);
        }

        $username = $request->request->get('username');
        $password = $request->request->get('password');
        
        $user = $users->findOneBy(['username' => $username]);

        if(empty($user)) {
            return new JsonResponse('User not found', 404);
        }

        if(!$encoder->isPasswordValid($user, $password)) {
            return new JsonResponse('Credentials error', 401);
        }

        return new JsonResponse(array('id' => $user->getId(), 'authToken' => $user->getAuthToken()), 200);
    }
    
    /**
     * @Rest\Get("/api/user/{authToken}", name="userData")
     */
    public function userData($authToken, UsersRepository $users)
    {
        if(empty($authToken)) {
            return new JsonResponse('Unauthorized', 401);
        }

        $user = $users->findOneBy(['authToken' => $authToken]);

        if(!is_null($user)) {
            $user = $this->serializer->serialize($user, 'json');

            return new JsonResponse($user, 200);
        }

        return new JsonResponse('User not found', 404);
    }
}