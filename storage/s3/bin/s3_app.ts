#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3Construct } from '../lib/s3_construct';
import { AwsSolutionsChecks, HIPAASecurityChecks, NIST80053R5Checks } from 'cdk-nag'

const app = new cdk.App();
const obj = new S3Construct(app, 'S3Construct', {env:{
  account:'',
  region: 'ca-central-1'
}});
cdk.Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }))
cdk.Aspects.of(app).add(new HIPAASecurityChecks({ verbose: true }))
cdk.Aspects.of(app).add(new NIST80053R5Checks({ verbose: true }))