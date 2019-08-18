<?php

namespace App\Controller;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

use App\Entity\Url;
use App\Utils\UrlShortener;
use App\Repository\UrlRepository;
use App\Repository\UsersRepository;

class UrlController extends AbstractFOSRestController
{

    private $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * @Rest\Get("/api/url/{short}", name="getUrl", requirements={"short"="^.{7}$"})
     */
    public function getUrl($short, UrlRepository $urls) 
    {
        $entityManager = $this->getDoctrine()->getManager();
        $shortUrl = $urls->findOneBy(['shortUrl' => $short]);

        if(!is_null($shortUrl)) {
            $count = $shortUrl->getCount() + 1;
            $shortUrl->setCount($count);    

            $data = array(
                'id' => $shortUrl->getId(),
                'user' => $shortUrl->getUser(),
                'date' => $shortUrl->getDate(),
                'originalUrl' => $shortUrl->getOriginalUrl(),
                'shortUrl' => $shortUrl->getShortUrl(),
                'count' => $count,
            );

            $entityManager->persist($shortUrl);
            $entityManager->flush();

            return new JsonResponse($data, 200);
        }

        return new JsonResponse('Provided shorted path was not found', 404);
    }

    /**
     * @Rest\Get("/api/url/{user_id}", name="getUrlByUser", requirements={"user_id"="^\d+(?:-\d+)?$"})
     */
    public function getUrlByUser($user_id, UrlRepository $urls) 
    {
        $shortUrls = $urls->findBy(['user' => $user_id]);

        if(!empty($shortUrls)) {
            $response = $this->serializer->serialize($shortUrls, 'json');

            return new JsonResponse($response, 200);
        }

        return new JsonResponse('Provided user was not found', 404);
    }

    /**
     * @Rest\Post("/api/url", name="setUrl")
     */
    public function setUrl(Request $request, UrlRepository $urls, UsersRepository $users) 
    {
        $entityManager = $this->getDoctrine()->getManager();
        $httpClient = HttpClient::create();
        $url = new Url();

        $originalUrl = $request->request->get('originalUrl');
        $originalUrlResponse = $httpClient->request('GET', $originalUrl);
        $short = $request->request->get('shortUrl');
        $user = $request->request->get('user');

        if(is_null($originalUrl) || empty($originalUrl)) {
            return new JsonResponse('Original url was not provided', 400);
        }

        if($originalUrlResponse->getStatusCode() != 200) {
            return new JsonResponse('Original url is not valid', 500);
        }

        if(is_null($short)) {
            $short = '';
        } else {
            $shortUrls = $urls->findBy(['shortUrl' => $short]);

            if(!empty($shortUrls)) return new JsonResponse(array('code' => 'bad_short_url', 'message' => 'Short url was taken. Please enter another one'), 400);
        }
        
        $shortener = new UrlShortener($short);
        $userData = $users->findOneBy(['id' => $user]);

        $short = $shortener->getShort();
        $url->setOriginalUrl($originalUrl); 
        $url->setShortUrl($short);
        $url->setCount(0);
        $url->setUser($userData);

        $entityManager->persist($url);
        $entityManager->flush();

        $response = $this->serializer->serialize($url, 'json');

        return new JsonResponse($response, 200);
    }

    /**
     * @Rest\Get("/api/delete_urls", name="testDelete")
     */
    public function testDelete() 
    {   
        $entityManager = $this->getDoctrine()->getManager();
        $date = new \DateTime();
        $date = $date->modify('-15 days');
        $urls = $this->getDoctrine()
            ->getRepository(Url::class)
            ->findOldRecords($date);
        
        foreach($urls as $url) {
            $entityManager->remove($url);
        }

        $entityManager->flush();
        
        return new JsonResponse('is ok!', 200);
    }
}
