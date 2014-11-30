<?php
ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(-1);
require_once('TwitterAPIExchange.php');
$settings = array(
    'oauth_access_token' => "16959366-xuQd7MI05hH0yzXpHvNaMhSLlOIbtTyI4ex74ho1h",
    'oauth_access_token_secret' => "t24yRZDyFVNtj8t3fjcLiVhfSQr0fJUsVW1ZOPdAAKlJc",
    'consumer_key' => "HahvGiDdKr1pW18WbXAi9x0oC",
    'consumer_secret' => "sy8l9gOoSFLEDvrFsLjPu91pLYgOBj8iDtQAAidw0oczmiozil"
);

//yyyy-mm-dd
$tweetsUntil = date('Y-m-d', strtotime("-3 week"));
$url = 'https://api.twitter.com/1.1/search/tweets.json';
$getfield = '?result_type=recent&q=%23'.$_GET["q"].'&count=75';

//$getfield = '?result_type=recent&q=%23'.$_GET["q"].'since%3A'.utf8_encode($tweetsUntil).'&count=75';
//$url           = 'https://api.twitter.com/1.1/search/tweets.json';
//$getfield      = '?q=%23F08';
$requestMethod = 'GET';

$twitter = new TwitterAPIExchange($settings);
$jsonData =  $twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest();
$jsonData = json_decode($jsonData, TRUE);
//var_dump($jsonData);
$count = 0;

foreach($jsonData["statuses"] as $tweet) {
	$user = $tweet["user"];
	$datestamp = new DateTime($tweet["created_at"]);
	$datestamp = date_format($datestamp, 'Y-m-d H:i:s');
	echo "<p>", $count++, $datestamp, " : ", $user["name"]," : \t", $tweet["text"],  "</p>";
}