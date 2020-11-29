import { HomeChannel } from "../channel/HomeChannel";
import { BaseChannel } from "../channel/BaseChannel";
import { WindChannel } from "../channel/WindChannel";
import { TestChannel } from "../channel/TestChannel";
import { IFactory } from "./IFactory";

export class UsageChannel {
    factory?: IFactory;

    constructor(factory: IFactory) {
        this.factory = factory;
    }

    setHomeFactory(): BaseChannel[] {
        const t: BaseChannel[] = [];
        if (this.factory) {
            // t.push(this.factory.createIPC("windprocess"));
            t.push(this.factory.createIPC(new WindChannel("windprocess")));
            t.push(this.factory.createIPC(new HomeChannel("homeprocess")));
        }
        return t;
    }
    setControlFactory(): BaseChannel[] {
        const t: BaseChannel[] = [];
        if (this.factory) {
            t.push(this.factory.createIPC(new TestChannel("testprocess")));
        }
        return t;
    }
}
