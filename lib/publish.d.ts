import { Logger } from '@serverless-cd/core';
export interface IProps {
    registry?: string;
    token?: string;
    codeDir?: string;
}
export default class Publish {
    private registry;
    private token;
    private codeDir;
    logger: Logger;
    constructor(props: IProps, logger: Logger);
    run(cwd: string): void;
    private handlerNpmrc;
    private readNpmrcFile;
}
