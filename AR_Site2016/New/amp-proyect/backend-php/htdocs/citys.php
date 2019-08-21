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

//if (true) {
////    $response = json_encode(array('result' => 1, 'word' => $dictionary[$obj->searchterm]));
//
//    
//$var = array (
//  'items' => 
//  array (
//    0 => 
//    array (
//      'query' => '',
//      'results' => 
//      array (
//        0 => 'Montgomery, Alabama',
//        1 => 'Juneau, Alaska',
//        2 => 'Phoenix, Arizona',
//        3 => 'Little Rock, Arkansas',
//      ),
//    ),
//  ),
//);
//    
//$response = json_encode($var);
//
//    
//} else {
////    $response = json_encode(array('result' => 0, 'word' => 'Not Found'));
//    $response = json_encode('Error input');
//}
    //echo "asdasd";

if (isset($_REQUEST['query'])) {

$query = $_REQUEST['query'];

	$input = preg_quote($query, '~'); 	

	$data = array('Montgomery, Alabama', 'Juneau, Alaska', 'Phoenix, Arizona', 'Little Rock, Arkansas');

	$result = preg_grep('~' . $input . '~i', $data);
	
	$results = json_encode($result);

    echo ('{"items": [{"query": "'.$query.'", "results":'.$results. '}]}');
}

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');

//echo $response;


/**
AMP

header('Content-type: application/json');

header('Access-Control-Allow-Credentials: true');

header('Access-Control-Allow-Origin: https://xample-com.cdn.ampproject.org');

header('Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin');

header('AMP-Access-Control-Allow-Source-Origin: https://example.com');

**/
?>
