import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
const yaml = require('js-yaml');
const fs   = require('fs');

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
      bucketName: bucketProps.bucketName,
      encryption: bucketProps.encryption,
      encryptionKey: bucketProps.encryptionKey,
      enforceSSL: bucketProps.enforceSSL,
      intelligentTieringConfigurations: bucketProps.intelligentTieringConfigurations,
      removalPolicy: bucketProps.removalPolicy,
      serverAccessLogsBucket: bucketProps.serverAccessLogsBucket,
      serverAccessLogsPrefix: bucketProps.serverAccessLogsPrefix,
      versioned: bucketProps.versioned
    });
    return contentRecomRawS3Bucket
  } 
}
