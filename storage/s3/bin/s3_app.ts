#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3Construct } from '../lib/s3_construct';

const app = new cdk.App();
const obj = new S3Construct(app, 'S3Construct', {env:{
  account:'',
  region: 'ca-central-1'
}});