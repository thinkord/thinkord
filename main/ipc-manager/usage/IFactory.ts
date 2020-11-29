import { BaseChannel } from "../channel/BaseChannel";

export interface IFactory {
    createIPC(channel: BaseChannel): BaseChannel;
}
