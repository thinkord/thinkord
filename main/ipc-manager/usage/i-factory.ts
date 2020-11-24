import { BaseChannel } from "../channel/base-channel";

export interface IFactory {
    setIPC(channel: BaseChannel): void;
    getIPC(): BaseChannel;
}
