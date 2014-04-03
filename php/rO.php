<?php
	class rO{
		 
		function __constructor(){}
		//function OK($object){echo json_encode(array("response"=>"OK", "data"=>$object));}
		function OK($object){echo json_encode($object);}
        function RESPONSE($object){echo json_encode(array("response"=>"OK", "data"=>$object),true);}
		function FAIL($reason){echo json_encode(array("response"=>"FAILED", "data"=>$reason),true);}
		

		 public function create_guid($namespace = '') {    
			static $guid = '';
			$uid = uniqid("", true);
			$data = $namespace;
			$data .= $_SERVER['REQUEST_TIME'];
			$data .= $_SERVER['HTTP_USER_AGENT'];
			//$data .= $_SERVER['LOCAL_ADDR'];
			//$data .= $_SERVER['LOCAL_PORT'];
			$data .= $_SERVER['REMOTE_ADDR'];
			$data .= $_SERVER['REMOTE_PORT'];
			$hash = strtoupper(hash('ripemd128', $uid . $guid . md5($data)));
			$guid = substr($hash,  0,  8) .
					substr($hash,  8,  4) .
					substr($hash, 12,  4) .
					substr($hash, 16,  4) .
					substr($hash, 20, 12) ;
					
			return $guid;
		  }

	}
?>