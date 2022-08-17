"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function run(githubToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (github.context.eventName !== 'issues') {
                core.info(`目前仅支持 issues 触发, 你的类型是${github.context.eventName}`);
                return;
            }
            core.info(`The run token = '${githubToken}'`);
            const payload = github.context
                .payload;
            const username = core.getInput('user_name');
            core.info(`Hello ${username}`);
            core.info(`username === admin : ${username === 'admin'}`);
            core.info(`event name = ${github.context.eventName}`);
            const octokit = github.getOctokit(githubToken);
            const { owner, repo } = github.context.repo;
            const issue_number = payload.issue.number;
            const regex = /\[([^\]]+)\]/g;
            const array = regex.exec(payload.issue.title);
            core.info(`触发的issue : owner: ${owner}, repo = ${repo}, issue_number = ${issue_number}`);
            if (array == null) {
                core.info(`没有找到标签, 回复一下`);
                yield octokit.issues.createComment({
                    owner,
                    repo,
                    issue_number,
                    body: `没有找到[xxx]类型的标签`
                });
                return;
            }
            const labelName = array[1];
            core.info(`预计的标签名: labelname is = ${labelName}`);
            const allLabels = yield octokit.issues.listLabelsForRepo({
                owner,
                repo
            });
            const labelText = allLabels.data
                .map(data => {
                return data.name;
            })
                .join(',');
            core.info(`找到了一堆标签 ${labelText}`);
            let haveResult = false;
            for (const label of allLabels.data) {
                const labels = [label.name];
                if (labelName.toUpperCase() === label.name.toUpperCase()) {
                    core.info('找到了标签, 标上');
                    yield octokit.issues.addLabels({
                        owner,
                        repo,
                        issue_number,
                        labels
                    });
                    haveResult = true;
                    break;
                }
            }
            if (!haveResult) {
                core.info(`没找到标签 ${labelName}, 回复下, 可能是新问题, 现在先短暂回复一下`);
                yield octokit.issues.createComment({
                    owner,
                    repo,
                    issue_number,
                    body: `没有找到 ${labelName}`
                });
            }
            core.info('run success');
        }
        catch (error) {
            core.error('The action run error:');
            core.error(error);
            core.setFailed(error.message);
        }
    });
}
exports.run = run;
