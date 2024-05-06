import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import {Construct} from 'constructs';
import * as path from "node:path";

export class AppsyncMergedApiCarsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const carAssemblyApi = new appsync.GraphqlApi(this, 'car-manufacturing-api', {
      name: 'Car Assembly API',
      definition: appsync.Definition.fromFile('car-assembly.schema.graphql'),
    });

    const carAssemblyNoneDataSource = new appsync.NoneDataSource(this, 'car-none-data-source', {
      api: carAssemblyApi,
    });

    carAssemblyApi.createResolver('get-car-resolver', {
      typeName: 'Query',
      fieldName: 'getCar',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(path.join('src', 'car-assembly', 'resolvers', 'get-car.js')),
      dataSource: carAssemblyNoneDataSource,
    });

    const partsManufacturingApi = new appsync.GraphqlApi(this, 'parts-manufacturing-api', {
      name: 'Parts Manufacturing API',
      definition: appsync.Definition.fromFile('parts-manufacturing.schema.graphql'),
    });

    const partsManufacturingNoneDataSource = new appsync.NoneDataSource(this, 'parts-manufacturing-none-data-soruce', {
      api: partsManufacturingApi,
    });

    partsManufacturingApi.createResolver('get-part-resolver', {
      typeName: 'Query',
      fieldName: 'getPart',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(path.join('src', 'parts-manufacturing', 'resolvers', 'get-part.js')),
      dataSource: partsManufacturingNoneDataSource,
    });

    partsManufacturingApi.createResolver('car-parts-resolver', {
      typeName: 'Car',
      fieldName: 'parts',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(path.join('src', 'parts-manufacturing', 'resolvers', 'car-parts.js')),
      dataSource: partsManufacturingNoneDataSource,
    });

    new appsync.GraphqlApi(this, 'wheely-api', {
      name: 'Wheely API',
      definition: appsync.Definition.fromSourceApis({
        sourceApis: [
          {
            sourceApi: carAssemblyApi,
            mergeType: appsync.MergeType.AUTO_MERGE,
          },
          {
            sourceApi: partsManufacturingApi,
            mergeType: appsync.MergeType.AUTO_MERGE,
          },
        ],
      }),
    });
  }
}
