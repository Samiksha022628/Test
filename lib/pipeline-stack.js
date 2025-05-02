"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const pipelines_1 = require("aws-cdk-lib/pipelines");
const test_stack_1 = require("./test-stack");
class PipelineStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const pipeline = new pipelines_1.CodePipeline(this, 'Pipeline', {
            pipelineName: 'S3CleanupPipeline',
            synth: new pipelines_1.ShellStep('SynthStep', {
                input: pipelines_1.CodePipelineSource.gitHub('Samiksha022628/Test', 'main'),
                commands: [
                    'npm ci',
                    'npm install -g aws-cdk',
                    'cdk synth',
                ],
            }),
        });
        const appStage = new S3CleanupStage(this, 'AppStage', {
            env: {
                account: process.env.CDK_DEFAULT_ACCOUNT,
                region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
            },
        });
        pipeline.addStage(appStage);
    }
}
exports.PipelineStack = PipelineStack;
class S3CleanupStage extends aws_cdk_lib_1.Stage {
    constructor(scope, id, props) {
        super(scope, id, props);
        new test_stack_1.TestStack(this, 'TestStack');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBbUU7QUFFbkUscURBQW9GO0FBQ3BGLDZDQUF5QztBQUd6QyxNQUFhLGFBQWMsU0FBUSxtQkFBSztJQUN0QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sUUFBUSxHQUFHLElBQUksd0JBQVksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2hELFlBQVksRUFBRSxtQkFBbUI7WUFDakMsS0FBSyxFQUFFLElBQUkscUJBQVMsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hDLEtBQUssRUFBRSw4QkFBa0IsQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUMvRDtnQkFDQyxRQUFRLEVBQUU7b0JBQ1IsUUFBUTtvQkFDUix3QkFBd0I7b0JBQ3hCLFdBQVc7aUJBQ1o7YUFDRixDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNwRCxHQUFHLEVBQUU7Z0JBQ0gsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO2dCQUN4QyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSxXQUFXO2FBQ3REO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUExQkgsc0NBMEJHO0FBRUQsTUFBTSxjQUFlLFNBQVEsbUJBQUs7SUFDaEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLHNCQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBTdGFnZSwgU3RhZ2VQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcbmltcG9ydCB7IENvZGVQaXBlbGluZSwgQ29kZVBpcGVsaW5lU291cmNlLCBTaGVsbFN0ZXAgfSBmcm9tICdhd3MtY2RrLWxpYi9waXBlbGluZXMnO1xyXG5pbXBvcnQgeyBUZXN0U3RhY2sgfSBmcm9tICcuL3Rlc3Qtc3RhY2snO1xyXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBTdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBDb2RlUGlwZWxpbmUodGhpcywgJ1BpcGVsaW5lJywge1xyXG4gICAgICAgIHBpcGVsaW5lTmFtZTogJ1MzQ2xlYW51cFBpcGVsaW5lJyxcclxuICAgICAgICBzeW50aDogbmV3IFNoZWxsU3RlcCgnU3ludGhTdGVwJywge1xyXG4gICAgICAgICAgaW5wdXQ6IENvZGVQaXBlbGluZVNvdXJjZS5naXRIdWIoJ1NhbWlrc2hhMDIyNjI4L1Rlc3QnLCAnbWFpbicsIC8vIHJlcGxhY2UgJ1NhbWlrc2hhMDIyNjI4JyB3aXRoIHlvdXIgZ2l0aHViIHVzZXJuYW1lIGFuZCAnYnVja2V0LWNsZWFudXAtdGhyb3VnaC1jZGsnIHdpdGggeW91ciBnaXRodWIgcmVwb1xyXG4gICAgICAgICksXHJcbiAgICAgICAgICBjb21tYW5kczogW1xyXG4gICAgICAgICAgICAnbnBtIGNpJyxcclxuICAgICAgICAgICAgJ25wbSBpbnN0YWxsIC1nIGF3cy1jZGsnLFxyXG4gICAgICAgICAgICAnY2RrIHN5bnRoJyxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgYXBwU3RhZ2UgPSBuZXcgUzNDbGVhbnVwU3RhZ2UodGhpcywgJ0FwcFN0YWdlJywge1xyXG4gICAgICAgIGVudjoge1xyXG4gICAgICAgICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfQUNDT1VOVCxcclxuICAgICAgICAgIHJlZ2lvbjogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfUkVHSU9OIHx8ICd1cy1lYXN0LTEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gIFxyXG4gICAgICBwaXBlbGluZS5hZGRTdGFnZShhcHBTdGFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGNsYXNzIFMzQ2xlYW51cFN0YWdlIGV4dGVuZHMgU3RhZ2Uge1xyXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFnZVByb3BzKSB7XHJcbiAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG4gIFxyXG4gICAgICBuZXcgVGVzdFN0YWNrKHRoaXMsICdUZXN0U3RhY2snKTtcclxuICAgIH1cclxuICB9XHJcbiJdfQ==