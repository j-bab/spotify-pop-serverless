# Serverless Infrastructure and API 

A proof of concept Api written in nodeJs, and the serverless configuration to deploy it and provision the necessary infrastructure in a CloudFormation stack.

## Getting started

You'll need the following installed on your system:

Node  
Aws Cli  
Serverless Framework

run `npm install` in the project directory

## Configuration

configure AWS cli and serverless:  
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

In the project directory, update config.json and change the AwsAccountId to your own.    
Change the region if you wish.  
Change the serviceName to something relevant to you but likely to be unique, as it is used to generate bucket names which must be globally unique.


## Secrets

The project has two encrypted secrets you need to add to your AWS account using the web console:   
Login to The AWS console, and go to "AWS Systems Manager"  
From there, navigate to "Parameter Store" (and make sure you are in the same region you will be deploying to)  
Click "create parameter" and for the name, enter "spotifyClientId"  
As type select "Secure String"  
Enter your apps spotify clientId as the value  
Click create parameter to save it encrypted.  
 
Repeat for a parameter called "spotifyClientSecret" and enter the spotify client secret as the value.

## Deployment

In the project directory, run:

### `serverless deploy`
Serverless will now attempt to access your secrets, decrypt them, and deploy your stack with the secrets in the lambda environment they are needed in.  
By default serverless will use the stage "dev" when deploying the stack

After a (long) while your cloudFormation will have been created and run, and if you look in your AWS console you should see your freshly created S3 buckets, dynamoDb table, Lambdas, Api Gateway and cloudFront distribution.
You should also see log groups in cloudWatch.

The Terminal output will show the ApiGateway end point for your function - you will need to add this to your React environment.

## Next steps
Infrastructure and API are now deployed.  

Now we can pull the [repository for the client app](https://github.com/j-bab/serverless-go-poc-client),
 configure it and deploy it to the app bucket we just created to serve from cloudFront
 
 