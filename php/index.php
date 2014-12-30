<?php
	
	function sanitize($str, $quotes = ENT_NOQUOTES){
		$str = htmlspecialchars($str, $quotes);
		return $str;
	}
	
	//Create a stdClass instance to hold important information
	$return = new stdClass(); 
	$return->success = true;
	$return->errorMessage = "";
	$return->data = array();

	$method = $_POST;

	//Sanitize the string and json strings received from the front-end
	//Corresponds to 'data:{ js_string: val , js_array: arr,  js_object: obj }' in $.ajax
	if(isset($method['js_string'])) $string = sanitize($method['js_string']); 
	if(isset($method['js_array']))  $json_array = sanitize($method['js_array']); 
	if(isset($method['js_object'])) $json_object = sanitize($method['js_object']); 
	
	//Decode the json to get workable PHP variables
	$php_array = json_decode($json_array);
	$php_object = json_decode($json_object);
	
	//Alter values
	$php_array[0] = "Altered in the PHP script";
	$php_object->first = "Altered in the PHP script";
	
	//Make the altered data properties of $return object 
	$return->data['json_array']  = $php_array; 
	$return->data['json_object'] = $php_object;
	
	//Encode the stdClass object containing information and return data as a json string
	$json = json_encode($return);
	
	//Return the json string to the JavaScript
	echo $json;	
	
?>