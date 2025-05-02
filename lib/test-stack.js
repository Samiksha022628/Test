"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const events = require("aws-cdk-lib/aws-events");
const targets = require("aws-cdk-lib/aws-events-targets");
const bucket_config_1 = require("../bucket-config"); // Make sure this exists and works
class TestStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const buckets = (0, bucket_config_1.getBuckets)(this);
        for (const bucket of buckets) {
            const cleanupFunction = new lambda.Function(this, `S3CleanupFunction-${bucket.bucketName}`, {
                runtime: lambda.Runtime.NODEJS_18_X,
                handler: 'cleanup.handler',
                code: lambda.Code.fromAsset('lambda'), // Your Lambda code directory
                environment: {
                    BUCKET_NAME: bucket.bucketName,
                    MINUTES_OLD: '3',
                },
            });
            bucket.grantReadWrite(cleanupFunction);
            new events.Rule(this, `CleanupSchedule-${bucket.bucketName}`, {
                schedule: events.Schedule.rate(aws_cdk_lib_1.Duration.minutes(3)),
                targets: [new targets.LambdaFunction(cleanupFunction)],
            });
        }
    }
}
exports.TestStack = TestStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3Qtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkNBQTBEO0FBQzFELGlEQUFpRDtBQUNqRCxpREFBaUQ7QUFDakQsMERBQTBEO0FBQzFELG9EQUE4QyxDQUFDLGtDQUFrQztBQUVqRixNQUFhLFNBQVUsU0FBUSxtQkFBSztJQUNsQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sT0FBTyxHQUFHLElBQUEsMEJBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUVqQyxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzdCLE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRTtnQkFDMUYsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztnQkFDbkMsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLDZCQUE2QjtnQkFDcEUsV0FBVyxFQUFFO29CQUNYLFdBQVcsRUFBRSxNQUFNLENBQUMsVUFBVTtvQkFDOUIsV0FBVyxFQUFFLEdBQUc7aUJBQ2pCO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUV2QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFtQixNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQzVELFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxzQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3ZELENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUF6QkQsOEJBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcywgRHVyYXRpb24gfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBldmVudHMgZnJvbSAnYXdzLWNkay1saWIvYXdzLWV2ZW50cyc7XG5pbXBvcnQgKiBhcyB0YXJnZXRzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1ldmVudHMtdGFyZ2V0cyc7XG5pbXBvcnQgeyBnZXRCdWNrZXRzIH0gZnJvbSAnLi4vYnVja2V0LWNvbmZpZyc7IC8vIE1ha2Ugc3VyZSB0aGlzIGV4aXN0cyBhbmQgd29ya3NcblxuZXhwb3J0IGNsYXNzIFRlc3RTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBidWNrZXRzID0gZ2V0QnVja2V0cyh0aGlzKTtcblxuICAgIGZvciAoY29uc3QgYnVja2V0IG9mIGJ1Y2tldHMpIHtcbiAgICAgIGNvbnN0IGNsZWFudXBGdW5jdGlvbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgYFMzQ2xlYW51cEZ1bmN0aW9uLSR7YnVja2V0LmJ1Y2tldE5hbWV9YCwge1xuICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMThfWCxcbiAgICAgICAgaGFuZGxlcjogJ2NsZWFudXAuaGFuZGxlcicsXG4gICAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksIC8vIFlvdXIgTGFtYmRhIGNvZGUgZGlyZWN0b3J5XG4gICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgQlVDS0VUX05BTUU6IGJ1Y2tldC5idWNrZXROYW1lLFxuICAgICAgICAgIE1JTlVURVNfT0xEOiAnMycsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYnVja2V0LmdyYW50UmVhZFdyaXRlKGNsZWFudXBGdW5jdGlvbik7XG5cbiAgICAgIG5ldyBldmVudHMuUnVsZSh0aGlzLCBgQ2xlYW51cFNjaGVkdWxlLSR7YnVja2V0LmJ1Y2tldE5hbWV9YCwge1xuICAgICAgICBzY2hlZHVsZTogZXZlbnRzLlNjaGVkdWxlLnJhdGUoRHVyYXRpb24ubWludXRlcygzKSksXG4gICAgICAgIHRhcmdldHM6IFtuZXcgdGFyZ2V0cy5MYW1iZGFGdW5jdGlvbihjbGVhbnVwRnVuY3Rpb24pXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19