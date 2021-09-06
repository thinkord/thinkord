import { IFactory } from "./i-factory";
import { BaseChannel } from "../channel/base-channel";

export class Factory implements IFactory {
    channel!: BaseChannel;
    setIPC(channel: BaseChannel): void {
        this.channel = channel;
    }
    getIPC(): BaseChannel {
        return this.channel;
    }
}
