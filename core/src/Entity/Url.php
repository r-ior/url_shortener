<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UrlRepository")
 */
class Url
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

    /**
     * @ORM\Column(type="text")
     */
    private $originalUrl;

    /**
     * @ORM\Column(type="string", length=7, unique=true)
     * 
     */
    private $shortUrl;

     /**
     * @ORM\Column(type="integer")
     * 
     */
    private $count;

    public function __construct()
    {
        $this->date = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function setDate($date)
    {
        $this->date = $date;
    }

    public function getOriginalUrl()
    {
        return $this->originalUrl;
    }

    public function setOriginalUrl(string $originalUrl) 
    {
        $this->originalUrl = $originalUrl;
    }

    public function getShortUrl() 
    {
        return $this->shortUrl;
    }

    public function setShortUrl($shortUrl) 
    {
        $this->shortUrl = $shortUrl;
    }

    public function getCount() 
    {
        return $this->count;
    }

    public function setCount($count) 
    {
        $this->count = $count;
    }
}