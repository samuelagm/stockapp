<?php

require('rO.php');
require('pagination.php');
require('edit.php');

class download extends rO{
	

	private $datastore;
	private $edited = false;
	private $f3;
	
	public function __construct($f3) {
 
		$this->f3 = $f3;
        $this->datastore = new DB\SQL\Mapper($f3->get('db'),'datastore');
    } 
	
	public function olddata($id = null){
	
		if($id == null){
		
			//$datastores = $this->f3->get('db')->exec('SELECT data FROM datastore');
			//echo $datastores;		
		}else{
			$datastores = $this->f3->get('db')->exec('SELECT data FROM datastore WHERE projectid=?', $id);
            //if(count($datastores) > 1){
				
                $this->json_to_csv(stripslashes($datastores[0]['data']));	
            //}else{
                 //echo array_pop($datastores);	
            //}
					
		}

		
	}
	
	
	public function newdata($id = null){
	
		if($id == null){
		
			//$datastores = $this->f3->get('db')->exec('SELECT data FROM datastore');
			//echo $datastores;		
		}else{
			$datastores = $this->f3->get('db')->exec('SELECT newdata FROM datastore WHERE projectid=?', $id);
            if(isset($datastores[0]['data'])){
				$this->edited = true;
                $this->json_to_csv(stripslashes($datastores[0]['data']));	
            }else{
                 echo "No editing has been made to this document";	
            }
					
		}

		
	}
		
	
    public function page($page){
    
        $p = new pagination($page);  
 		$datastores = $this->f3->get('db')->exec('SELECT * FROM datastore LIMIT ?, ?', array(1=>$p->start(), 2=>$p->limit()) );
		$this->OK($datastores);	   
        
    }    
	

	
	public function json_to_csv ($json) {
		//if (empty($argv[1])) die("The json file name or URL is missed\n");
		//$jsonFilename = $argv[1];
		 
		//$json = file_get_contents($jsonFilename);
		$array = json_decode($json, true);
		$f = fopen('php://output', 'w');
		 
		$firstLineKeys = false;
		
		foreach ($array as $line){
			if (empty($firstLineKeys)){
				$firstLineKeys = array_keys($line);
				fputcsv($f, $firstLineKeys);
				$firstLineKeys = array_flip($firstLineKeys);
			}
			// Using array_merge is important to maintain the order of keys acording to the first element
			fputcsv($f, array_merge($firstLineKeys, $line));
		}	
		
		$out_put_string = ob_get_clean();
		$filename = '';
		
		if($this->edited){
			$filename .= 'Edited_';
		}else{
			$filename .= 'Original_';
		}
		
		$filename .= date('d-m-Y');//.'_'.date('His');
		
		header('Pragma: public');
		header('Expires:0');
		header('Cache-Control:private', false);
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename='.$filename.'.csv');
		//header('Content-Transfer-Encoding: binary');
		
		echo($out_put_string);
			
	}

	
	
	
}


?>