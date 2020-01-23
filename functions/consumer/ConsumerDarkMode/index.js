/* eslint-disable */
import config from './config.js'
const AWS = require('aws-sdk')
var lambda = new AWS.Lambda();
AWS.config.region = 'eu-west-1';

exports.handler = async function (event, context) {

    /***************************************************************************
    *QUERY CONSUMER TABLE
    ***************************************************************************/
    var body = JSON.parse(event.body)
    console.log('Event: ', JSON.stringify(event))
    console.log('Payload: ', JSON.stringify(body))
    console.log('Payload: ', JSON.stringify(body.darkMode))


    var consumerId = event.pathParameters.consumerId
    var darkMode = body.darkMode

    // var consumerId = '0a01683d-8734-4d38-b1ed-71161ee84afc';
    // var darkMode = false

    const consumerTable = process.env.ConsumerInfoTable;

    let readCosnumerTableParams = {
        TableName: consumerTable,
        IndexName: "Cognito_Id-index",
        KeyConditionExpression: "Cognito_Id = :i",
        ExpressionAttributeValues: {
            ":i": consumerId
        }
    };

    let getParams = {}
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient()
        getParams = await dynamodb.query(readCosnumerTableParams).promise()

    } catch (putError) {
        console.log('Failed to Query Consumer Table')
        console.log('readParams', readCosnumerTableParams, putError)
        return httpResponse(500, putError)
    }

    console.log("Read Parameters " + JSON.stringify(readCosnumerTableParams))
    console.log("------------Query Results from Consumer Params " + JSON.stringify(getParams))

    /***************************************************************************
    *UPDATE CONSUMER TABLE WITH SURVEY RESPONSE DETAILS
    ***************************************************************************/

    console.log("Dark Mode value: ", darkMode)


    let darkModeParams = {
        TableName: consumerTable,
        Key: {
            Cognito_Id: consumerId,
            Phone_Number: getParams.Items[0].Phone_Number
        },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: 'set #darkMode = :darkMode',
        ExpressionAttributeNames: {
            '#darkMode': 'darkMode'
        },
        ExpressionAttributeValues: {
            ':darkMode': darkMode
        }
    }


    let consumerObject = {}
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient()
        consumerObject = await dynamodb.update(darkModeParams).promise()
        console.log('Successfully updated the consumer object. Consumer Object: ', consumerObject)
    } catch (putError) {
        console.log('There was an error updating the consumer object', putError)
        return httpResponse(500, putError)
    }

    var responseObject = {
        "consumerId": consumerObject.Attributes.Cognito_Id,
        "darkMode": consumerObject.Attributes.darkMode,
    }

    return httpResponse(200, responseObject)
}


function httpResponse(statusCode, body) {
    return {
        isBase64Encoded: false,
        // TODO: the front-end does not currently handle non-success status codes well, so unless an internal server error has occurred, a 200 HTTP
        // status code is returned, while the error status code is passed in the body. Consider changing this.
        statusCode: statusCode == 500 ? statusCode : 200,
        body: JSON.stringify({
            statusCode: statusCode,
            body: body
        }),
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS 
        },
    }
}