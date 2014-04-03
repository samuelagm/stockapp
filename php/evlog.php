<?php
    
include('rO.php');
class evlog extends rO{
	

	private $log;
	private $f3;
	
	public function __construct($f3) {
 		
		$this->f3 = $f3;
        $this->log = new DB\SQL\Mapper($f3->get('db'),'log');
    } 
	
	public function get($datestring){
	    $dateArr = explode(',', $datestring);
        $year = $dateArr[0];
        $month = $dateArr[1];
		$logs = $this->f3->get('db')->exec("SELECT product.name, sum(log.quantity) as sale FROM log
                                            LEFT JOIN product ON log.productid = product.id
                                            WHERE action = 'SALE' and year = ? and month = ?
                                            GROUP BY log.productid 
                                            ORDER BY product.name ASC ", 
                                            array(1=>$year, 2=>$month));

        $productnames = $this->f3->get('db')->exec("SELECT name FROM product ORDER BY product.name ASC ");

    
        $labels = array();
        $values = array();
        $soldnames = array();
        $keylog = array();

        
 
            
                   
        for($h = 0; $h < count($logs) ; $h++){
            array_push($soldnames, $logs[$h]['name']);
            $keylog[$logs[$h]['name']] = $logs[$h]['sale'];
        }
            

        for($i = 0; $i < count($productnames) ; $i++){
            array_push($labels, $productnames[$i]['name']);
            array_push($values, 0);
        }
            

        for($j = 0; $j < count($labels) ; $j++){
            if(in_array($labels[$j], $soldnames)){
                $values[$j] = (int)$keylog[$labels[$j]];
                
            }
           
        }
        
        $output = array();
        for($k = 0; $k < count($labels); $k++){
            array_push($output, array('x'=>$labels[$k], 'y'=> $values[$k]));
        }

        echo json_encode($output);
	}
}
   

?>