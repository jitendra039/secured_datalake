import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
const yaml = require('js-yaml');
const fs   = require('fs');
import { NagSuppressions  } from 'cdk-nag'

export class S3Construct extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    //Reading config file
    const a = yaml.load(fs.readFileSync('test/test_config.yaml', 'utf8'));
    //Parsing config and creating s3 buckets
    Object.entries(a.bucket).forEach(bucketDetail=>{
      const bucketName: string = bucketDetail[0]
      const bucketProps: s3.BucketProps = bucketDetail[1]
      const contentRecomRawS3Bucket:s3.Bucket  = this.createS3Bucket(bucketName,bucketProps)
    })
  }
  
  // Method to create S3 Bucket
  private createS3Bucket(bucketName:string,bucketProps:s3.BucketProps): s3.Bucket {
    const contentRecomRawS3Bucket = new s3.Bucket(this, bucketName, {
      bucketKeyEnabled: bucketProps.bucketKeyEnabled,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      bucketName: bucketProps.bucketName,
      encryption: s3.BucketEncryption.KMS,
      encryptionKey: bucketProps.encryptionKey, // Get KMS key arn
      enforceSSL: bucketProps.enforceSSL,
      intelligentTieringConfigurations: bucketProps.intelligentTieringConfigurations,
      removalPolicy: bucketProps.removalPolicy,
      serverAccessLogsBucket: bucketProps.serverAccessLogsBucket,
      serverAccessLogsPrefix: bucketProps.serverAccessLogsPrefix,
      versioned: bucketProps.versioned
    });
    NagSuppressions.addResourceSuppressions(contentRecomRawS3Bucket,[
      {id:"AwsSolutions-S1",reason:"Testing S3 Bucket"}
      ])
    return contentRecomRawS3Bucket
  } 
}
