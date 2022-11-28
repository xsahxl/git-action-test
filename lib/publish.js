"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@serverless-cd/core");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const dotenv_1 = require("dotenv");
class Publish {
    constructor(props, logger) {
        this.token = core_1.lodash.get(props, 'token', '');
        // this.username = _.get(props, 'username', '');
        // this.password = _.get(props, 'password', '');
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
    run(cwd = process.env.DOWNLOAD_CODE_DIR) {
        const npmrcUrl = path_1.default.join(cwd, this.codeDir, '.npmrc');
        const npmrcString = this.handlerNpmrc(npmrcUrl);
        fs_extra_1.default.outputFile(npmrcUrl, npmrcString);
        this.logger.info('run publish:');
        console.log(fs_extra_1.default.readFileSync(npmrcUrl).toString());
        try {
            const resStr = (0, child_process_1.execSync)('npm publish', {
                cwd: path_1.default.join(cwd, this.codeDir)
            });
            fs_extra_1.default.removeSync(npmrcUrl);
            this.logger.info(resStr.toString());
        }
        catch (err) {
            fs_extra_1.default.removeSync(npmrcUrl);
            throw err;
        }
    }
    handlerNpmrc(npmrcUrl) {
        this.logger.info(`npmrc url: ${npmrcUrl}`);
        const npmConfig = this.readNpmrcFile(npmrcUrl);
        if (this.token) {
            npmConfig[`${this.registry}:_authToken`] = this.token;
        }
        // env: userconfig 
        let npmrcString = '';
        for (const key in npmConfig) {
            console.log(npmConfig);
            npmrcString += `${key}=${npmConfig[key]}\n`;
        }
        this.logger.info('npmrcString: ');
        // this.logger.info(npmrcString);
        console.info(npmrcString);
        return npmrcString;
    }
    readNpmrcFile(npmrcUrl) {
        if (!fs_extra_1.default.existsSync(npmrcUrl)) {
            return {};
        }
        const rcBuffer = fs_extra_1.default.readFileSync(npmrcUrl);
        const npmConfig = (0, dotenv_1.parse)(rcBuffer);
        return npmConfig;
    }
}
exports.default = Publish;
/*
  * TODO: username:password
# email=xxxx@163.com
# always-auth=true
# _auth=base64(user:password)
# //registry.npmjs.org/:_auth=base64(user:password)
# //registry.npmjs.org/:username=user
# //registry.npmjs.org/:_password=password
*/
//# sourceMappingURL=publish.js.map