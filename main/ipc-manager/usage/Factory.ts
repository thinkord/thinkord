import { IFactory } from "./IFactory";
import { BaseChannel } from "../channel/BaseChannel";

export class Factory implements IFactory {
    createIPC(channel: BaseChannel): BaseChannel {
        return channel;
    }
}
