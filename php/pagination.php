<?php

/**
 * pagination short summary.
 *
 * pagination description.
 *
 * @version 1.0
 * @author Samuel Agbonkpolo
 */
class pagination
{


     private $pageSize = 14;
     private $page = 0;
     
     public function __construct($_page){
        $this->page = $_page;
     }
     
     public function limit(){
        return ( $this->page * $this->pageSize );
     }
     
     public function start(){
       
        return ( $this->limit() - $this->pageSize );
     }
     
    
}
