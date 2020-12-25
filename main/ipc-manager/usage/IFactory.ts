import { BaseChannel } from "../channel/BaseChannel";

export interface IFactory {
    setIPC(channel: BaseChannel): void;
    getIPC(): BaseChannel;
}
