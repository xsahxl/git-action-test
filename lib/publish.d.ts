import { Logger } from '@serverless-cd/core';
export interface IProps {
    registry?: string;
    token?: string;
    username?: string;
    password?: string;
}
export default class Publish {
    private registry;
    private token;
    private username;
    private password;
    logger: Logger;
    constructor(props: IProps, logger: Logger);
    run(): void;
    private handlerNpmrc;
    private readNpmrcFile;
}
