<?php 

	require('rO.php');
	
	class User extends rO{
		
		private $f3;
		private $user;
		
		function __construct ($f3){
			$this->f3 = $f3;
			$this->user = new DB\SQL\Mapper($f3->get('db'), 'user');
		}
		
		function login(){
			
		    $this->user->load(array('email=? AND password=?', $this->f3->get('POST.email'), md5( $this->f3->get('POST.password')) ));
		
		    if($this->user->dry()){
                echo  $this->f3->get('POST.email');
                echo md5( $this->f3->get('POST.password'));
			    $this->FAIL("INVALID USERNAME OR PASSWORD");
		    }else{
 
                //session_start();
				
                //$this->f3->set('username',$this->user->firstname .' '.$this->user->firstname) ;
				//$this->f3->set('userid',$this->user->id );
				
               // $_SESSION['userid'] = $this->user->id ;
				//$_SESSION['username'] = $this->user->firstname .' '.$this->user->lastname;
				
			    //$f3->set('SESSION.cid', '$publisher->clientid');
			    $this->RESPONSE($this->user->cast());
		    }
		}
	}
?>