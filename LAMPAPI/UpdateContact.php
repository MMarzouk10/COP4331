<?php
	$inData = getRequestInfo();
	
	$firstname = $inData["FirstName"];
	$lastname = $inData["LastName"];
	$phonenumber = $inData["PhoneNumber"];
	$email = $inData["Email"];
	$userId = $inData["UserID"];
	$contactId = $inData["ContactID"];

	$conn = new mysqli("localhost", "group22", "COP4331", "group22_contacts");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "UPDATE CONTACTS SET FirstName = '".$firstname."',
									LastName= '".$lastname."', 
									PhoneNumber= '".$phonenumber."', 
									Email= '".$email."'  
									WHERE  UserID= ". $userId . " and ContactID=". $contactId;

		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>