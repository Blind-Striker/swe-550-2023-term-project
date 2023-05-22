import AWS from "aws-sdk";
const ses = new AWS.SES({ region: "eu-central-1" });

export async function handler(event) {
  console.log("Received SQS event:", JSON.stringify(event, null, 2));

  for (let record of event.Records) {
    let body = JSON.parse(record.body);

    let emailParams = {
      Source: "denizirgin@gmail.com", // replace with your verified SES email
      Destination: {
        ToAddresses: [
          "canaltin96@gmail.com", // replace with recipient email address
        ],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: JSON.stringify(body, null, 2),
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Test email",
        },
      },
    };

    try {
      // Create artificial CPU bound work
      fibonacci(Math.floor(Math.random() * 4) + 36);

      console.log("Email sent:", emailParams);
    } catch (err) {
      console.error("Failed to send email:", err);
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
