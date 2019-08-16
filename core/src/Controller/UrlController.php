<?php

namespace App\Controller;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

use App\Entity\Url;
use App\Utils\UrlShortener;
use App\Repository\UrlRepository;

class UrlController extends AbstractFOSRestController
{

    private $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * @Rest\Get("/api/url/{short}", name="getUrl")
     */
    public function getUrl($short, URLRepository $urls) 
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
     * @Rest\Post("/api/url", name="setUrl")
     */
    public function setUrl(Request $request, URLRepository $urls) 
    {
        $entityManager = $this->getDoctrine()->getManager();
        $url = new Url();
        $originalUrl = $request->request->get('originalUrl');
        $short = $request->request->get('shortUrl');

        if(is_null($originalUrl) || empty($originalUrl)) {
            return new JsonResponse('Original url was not provided', 400);
        }
        
        if(is_null($short)) {
            $short = '';
        } else {
            $shortUrls = $urls->findBy(['shortUrl' => $short]);

            if(!empty($shortUrls)) return new JsonResponse('Short url was taken. Please enter another one', 400);
        }
        
        $shortener = new UrlShortener($short);

        $short = $shortener->getShort();
        $url->setOriginalUrl($originalUrl); 
        $url->setShortUrl($short);
        $url->setCount(0);

        $entityManager->persist($url);
        $entityManager->flush();

        $response = $this->serializer->serialize($url, 'json');

        return new JsonResponse($response, 200);
    }
}
