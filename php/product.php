<?php
    
include('rO.php');
class product extends rO{
	

	private $product;
	private $f3;
	
	public function __construct($f3) {
 		
		$this->f3 = $f3;
        $this->product = new DB\SQL\Mapper($f3->get('db'),'product');
    } 
	
	public function get($id = null){
	
		if($id == null){
		
			$products = $this->f3->get('db')->exec('SELECT * FROM product ORDER BY id DESC ');
			$this->OK($products);		
		}else{
			$products = $this->f3->get('db')->exec('SELECT * FROM product WHERE id=?', $id);
            if(count($products) > 1){
                $this->OK($products);	
            }else{
                 $this->OK(array_pop($products));	
            }
					
		}

		
	}
 
    public function page($page){
    
        $p = new pagination($page);  
 		$products = $this->f3->get('db')->exec('SELECT * FROM product LIMIT ?, ?', array(1=>$p->start(), 2=>$p->limit()) );
		$this->OK($products);	   
        
    }    
	
	public function create(){
		
		$data = json_decode(stripslashes($this->f3->get('BODY')), true);
		$this->f3->set('data', $data);
		$this->product->copyFrom("data");
		$this->product->save();
		
		if(!$this->product->dry()){
			$this->OK($this->product->cast());

		}else{
			$this->FAIL("Something went wrong (ON CREATION)");
		}
		$this->product->reset();
		
	}
	
	public function update($id){
		$newq = 0;
        $oldq = 0;
		$this->product->reset();
		$this->f3->set('tO', json_decode(stripslashes($this->f3->get('BODY')),true));
		$this->product->load(array('id=?', $id));
        $tmpO = $this->product->cast();
        $oldq = $tmpO['quantity'] ;
		$this->product->copyFrom("tO");
		$this->product->save();
		
		if($this->product->dry()){
			$this->FAIL("Something went wrong (ON UPDATE)");
		}else{
            $r = $this->product->cast();
            $newq = $r['quantity'];
            //echo $oldq;
            //echo $newq;
            if($oldq < $newq){
                $this->f3->get('db')->exec("INSERT INTO log ( productid, action, quantity, year, month, day) values(?,'TOPUP',?, ?, ?, ?)", array(1=>$r['id'], 2=>($newq - $oldq), 3=>date('Y'), 4=>(int)date('m'), 5=>(int)date('d')));
            }else{
                 $this->f3->get('db')->exec("INSERT INTO log ( productid, action, quantity, year, month, day) values(?, 'SALE',?,?, ?, ?)", array(1=>$r['id'], 2=>($oldq - $newq), 3=>date('Y'), 4=>(int)date('m'), 5=>(int)date('d')));
            }

			$this->OK($r);			
		}
        
	}
	
	public function delete($id){
	
		$this->product->reset();
		$this->product->load(array('id=?', $id));
		
		if($this->product->erase()){
			$this->OK(true);
		}	
	}

}


?>