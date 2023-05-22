import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const ddb = new AWS.DynamoDB.DocumentClient();

export async function handler(event) {
  console.log("Received SQS event:", JSON.stringify(event, null, 2));

  for (let record of event.Records) {
    // Parse the body from stringified JSON to a JavaScript object
    let body = JSON.parse(record.body);

    // Prepare your data as needed. Here we're just using the event data as is.
    const params = {
      TableName: "event-store-table", // replace with your table name
      Item: {
        Id: uuidv4(),
        EventName: body.EventName,
        EventData: body.EventData,
        CreatedAt: new Date().toISOString(),
      },
    };

    try {
      fibonacci(Math.floor(Math.random() * 4) + 36);
      const data = await ddb.put(params).promise();
      console.log("Success:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return "Done";
}

// Fibonacci function
function fibonacci(n) {
  if (n < 2) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
