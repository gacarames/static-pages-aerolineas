<?php

$dictionary = array('one' => 'uno', 'two' => 'due', 'three' => 'tre');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
    }
    exit;
}
//
//$json = file_get_contents('php://input');
//$obj = json_decode($json);

if (true) {
//    $response = json_encode(array('result' => 1, 'word' => $dictionary[$obj->searchterm]));

    
$var = array (
  'items' => 
  array (
    0 => 
    array (
      'cart_items' => 
      array (
        0 => 
        array (
          'address' => 'Bahía Blanca',
          'cod_dest' => 'BHI',
          'cod_pais' => 'AR',
        ),
        1 => 
        array (
          'address' => 'Bariloche',
          'cod_dest' => 'BRC',
          'cod_pais' => 'AR',
        ),
        2 => 
        array (
          'address' => 'Buenos Aires',
          'cod_dest' => 'BUE',
          'cod_pais' => 'AR',
        ),
        3 => 
        array (
          'address' => 'Comodoro Rivadavia',
          'cod_dest' => 'CRD',
          'cod_pais' => 'AR',
        ),
      ),
    ),
  ),
);
    
$response = json_encode($var);

}
else {
//    $response = json_encode(array('result' => 0, 'word' => 'Not Found'));
    $response = json_encode($var);
}
//echo "asdasd";

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo $response;


/**
AMP

header('Content-type: application/json');

header('Access-Control-Allow-Credentials: true');

header('Access-Control-Allow-Origin: https://xample-com.cdn.ampproject.org');

header('Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin');

header('AMP-Access-Control-Allow-Source-Origin: https://example.com');

**/
?>
