<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;
	$formatedDate = "";

	$conn = new mysqli("localhost", "group22", "COP4331", "group22_contacts");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
	    
		$sql = "SELECT * from CONTACTS WHERE (FirstName LIKE '%" .$inData["search"] . "%' OR LastName LIKE '%" .$inData["search"] . "%' ) and UserID=" . $inData["UserID"];

		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",";
				}
				$searchCount++;
				$searchResults .= '"' . $row["FirstName"] .  ' ' . $row["LastName"] . ' ' . $row["PhoneNumber"] . ' ' . $row["Email"] . ' ' . $row["DateCreated"] . ' ' . $row[ContactID] . '"';
			}
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}

	returnWithInfo( $searchResults, $searchCount );

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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults, $searchCount )
	{
		$retValue = '{"results":[' . $searchResults . '],"searchCount" :"' . $searchCount . '" ,"error":""}';

		sendResultInfoAsJson( $retValue );
	}
	
?>