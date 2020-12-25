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
            this.factory.setIPC(new WindChannel("windprocess"));
            t.push(this.factory.getIPC());
            this.factory.setIPC(new HomeChannel("homeprocess"));
            t.push(this.factory.getIPC());
        }
        return t;
    }
    setControlFactory(): BaseChannel[] {
        const t: BaseChannel[] = [];
        if (this.factory) {
            this.factory.setIPC(new TestChannel("testprocess"));
            t.push(this.factory.getIPC());
        }
        return t;
    }

    // deletControlFactory(): void {
    //     this.controlChannel.forEach((obj, index) => {
    //         this.controlChannel.splice(index, 1);
    //     });
    // }
}
