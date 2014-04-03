<?php
/*header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0",false);
header("Pragma: no-cache");*/

//header('Content-type: application/json');

$f3=require('lib/base.php');

$db = new DB\SQL('mysql:host=localhost;port=3306;dbname=stockdb', 'root','');
$f3->set('db', $db);

$f3->config('config.ini');

session_start();

$f3->route('GET /', function (){
		echo View::instance()->render('index.html');
	});
	
$f3->route('GET /h', function (){
		echo View::instance()->render('home.html');
	});	

$f3->route('POST /login', 		function ($f3){$o = new User($f3);$o->login(); });	



$f3->route('GET /log/@date', 	function ($f3, $args){ $o = new evlog($f3); $o->get($args['date']); });

	
$f3->route('POST /product/@id', function ($f3){ $o = new product($f3); $o->create(); });
$f3->route('PUT /product/@id', function ($f3, $args){ $o = new product($f3); $o->update($args['id']); });
$f3->route('DELETE /product/@id', function ($f3, $args){ $o = new product($f3); $o->delete($args['id']); });
$f3->route('GET /product/@id', 		function ($f3, $args){ $o = new product($f3); $o->get($args['id']); });
$f3->route('GET /products', 		function ($f3, $args){ $o = new product($f3); $o->get(); });



$f3->route('GET /userref',
	function() {
		echo View::instance()->render('userref.htm');
	}
);

$f3->run();
