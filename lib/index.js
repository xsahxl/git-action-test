"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core_1 = require("@serverless-cd/core");
const publish_1 = __importDefault(require("./publish"));
const os_1 = __importDefault(require("os"));
const run = (inputs, context, logger) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info('start npm-publish');
    logger.info(`inputs: ${JSON.stringify(inputs)}`);
    const newInputs = (0, core_1.getInputs)(inputs, context);
    logger.info(`newInputs: ${JSON.stringify(newInputs)}`);
    logger.info(`newInputs: ${JSON.stringify(context)}`);
    const publish = new publish_1.default(newInputs, logger);
    yield publish.run(context.cwd || process.env.DOWNLOAD_CODE_DIR || os_1.default.tmpdir());
    logger.info('end npm-publish');
});
exports.run = run;
exports.default = publish_1.default;
//# sourceMappingURL=index.js.map