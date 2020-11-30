import { IFactory } from "./IFactory";
import { BaseChannel } from "../channel/BaseChannel";

export class Factory implements IFactory {
    channel!: BaseChannel;
    setIPC(channel: BaseChannel): void {
        this.channel = channel;
    }
    getIPC(): BaseChannel {
        return this.channel;
    }
}
