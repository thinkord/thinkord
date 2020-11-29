import { IFactory } from "./IFactory";
import { BaseChannel } from "../channel/BaseChannel";

export class HomeFactory implements IFactory {
    createIPC(channel: BaseChannel): BaseChannel {
        return channel;
    }
}
