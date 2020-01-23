/* eslint-disable */
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();


exports.handler = function (event, context, callback) {

    console.log("event : "+JSON.stringify(event));

    var producerID = event.pathParameters.producerId;
    //var producerID = '62f1657b-315a-4bbc-bf1c-cfb4baad2c1d';
    var tableName = process.env.ProducerTable;

    const params = {
        TableName: tableName,
        Key: {
            producerID: producerID
        }
    }
    
    docClient.get(params, (err,data)=>{
        if(err){
            console.log(null, err)
            callback(null, httpResponse(200, err));

        } else{
            console.log(data.Item.billingBalance);
            callback(null, httpResponse(200, data.Item.billingBalance));
        }
    })


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
}