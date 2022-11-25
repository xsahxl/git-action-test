import { Logger } from '@serverless-cd/core';
import Publish from './publish';
export declare const run: (inputs: Record<string, any>, context: Record<string, any>, logger: Logger) => Promise<void>;
export default Publish;
