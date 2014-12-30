/*Returns the jqXHR object*/
	function theAjax(val, arr, obj) {
			return $.ajax({
						 url : 'php/',
						 type: 'POST',
						data:{ js_string: val , js_array: arr,  js_object: obj }
						});
	}
			
	/*Determine what is done with the data when it is returned by the server */
	function processData(response /*textStatus, jqXHR*/) {
			var response = JSON.parse(response),
					html = "";
			if(response.success) {
							
				html += "<p>" + "First Array item value: " + response.data.json_array[0] + "</p>";
				html += "<p>" + "First object property value: " + response.data.json_object.first + "</p>";
					
				$('#container #response-container').empty().append(html);
			}
	}	
			
	/* Obtain the data to be sent to the server and intiate Ajax*/
	function doAjax() {
		var value , array, object, ajax;
					
		//Hardcoded data values for demonstration purposes
		value = 'A string';  
		array = JSON.stringify( ['arr_item1', 'arr_item2', 'arr_item3']);
		object = JSON.stringify({first: 'obj_item1', second: 'obj_item2', third: 'obj_item3'});
					
		//Pass the values to the AJAX request and specify function arg for 'done' callback
		ajax = theAjax(value, array, object);
		ajax.done(processData);
		ajax.fail(function( jqXHR, textStatus, errorThrown) {
				//Output error information
		});
	}

								
	$(document).ready(function(){
		$('#container :button').click(function(event){
			doAjax();
		});
	});