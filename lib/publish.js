"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@serverless-cd/core");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const dotenv_1 = require("dotenv");
class Publish {
    constructor(props, logger) {
        this.token = core_1.lodash.get(props, 'token', '');
        this.username = core_1.lodash.get(props, 'username', '');
        this.password = core_1.lodash.get(props, 'password', '');
        let registry = core_1.lodash.get(props, 'registry', '//registry.npmjs.org/');
        if (!core_1.lodash.endsWith(registry, '/')) {
            registry += '/';
        }
        if (core_1.lodash.startsWith(registry, 'https://')) {
            registry = registry.split('https:')[1];
        }
        else if (core_1.lodash.startsWith(registry, 'http://')) {
            registry = registry.split('http:')[1];
        }
        this.registry = registry;
        this.logger = logger;
        this.codeDir = core_1.lodash.get(props, 'codeDir', '');
    }
    run(cwd) {
        this.handlerNpmrc(cwd || process.env.DOWNLOAD_CODE_DIR);
        this.logger.info('run publish:');
        const resStr = (0, child_process_1.execSync)('npm publish', { cwd });
        this.logger.info(resStr.toString());
    }
    handlerNpmrc(cwd) {
        const npmrcUrl = path_1.default.join(cwd, this.codeDir, '.npmrc');
        this.logger.info(`npmrc url: ${npmrcUrl}`);
        const npmConfig = this.readNpmrcFile(npmrcUrl);
        if (this.token) {
            npmConfig[`${this.registry}:_authToken`] = this.token;
        }
        else if (!(this.username && this.password)) {
            throw new Error('Token not found, username and password is required');
        }
        else {
            // TODO: password
        }
        let npmrcString = '';
        for (const key in npmConfig) {
            console.log(npmConfig);
            npmrcString += `${key}=${npmConfig[key]}\n`;
        }
        fs_1.default.writeFileSync(npmrcUrl, npmrcString);
    }
    readNpmrcFile(npmrcUrl) {
        if (!fs_1.default.existsSync(npmrcUrl)) {
            return {};
        }
        const rcBuffer = fs_1.default.readFileSync(npmrcUrl);
        const npmConfig = (0, dotenv_1.parse)(rcBuffer);
        return npmConfig;
    }
}
exports.default = Publish;
//# sourceMappingURL=publish.js.map