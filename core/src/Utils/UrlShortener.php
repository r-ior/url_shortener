<?php 

namespace App\Utils;

class UrlShortener
{

    private $url;

    private $short;

    public function __construct($short)
    {
        if($short != '') {
            $this->short = $short;
        } else {
            $this->setShort();
        }
    }

    public function getShort()
    {
        return $this->short;
    }

    public function setShort()
    {
        $short = substr(md5(microtime()), rand(0, 26), 7);

        return $this->short = $short;
    }

    public function getUrl()
    {
        if($this->url == '') {
            $this->setUrl();
        }

        return $this->url;
    }

    public function setUrl()
    {   
        $short = $this->getShort();
        $url = (string) ( isset( $_SERVER['HTTPS'] ) ? "https" : "http" ) . "://$_SERVER[HTTP_HOST]/$short";

        $this->url = $url;
    }
}