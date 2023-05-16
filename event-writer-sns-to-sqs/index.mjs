import AWS from 'aws-sdk';

const sqs = new AWS.SQS();

export async function handler(event, context) {
    console.log('Received SNS event:', JSON.stringify(event, null, 2));
    
    const snsMessage = event.Records[0].Sns.Message;
    
    const params = {
        QueueUrl: 'https://sqs.eu-central-1.amazonaws.com/377140207735/event-processor-sqs',
        MessageBody: snsMessage
    };

    try {
        const data = await sqs.sendMessage(params).promise();
        console.log('Success:', data);
    } catch (err) {
        console.error('Error:', err);
    }

    return 'Done';
};