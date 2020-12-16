import { BaseChannel } from "../channel/base-channel";
import { SystemChannel } from "../channel/system-channel";
import { HomeChannel } from "../channel/home-channel";
import { WindowChannel } from "../channel/window-channel";
import { MediaChannel } from "../channel/media-channel";
import { TestChannel } from "../channel/test-channel";
import { IFactory } from "./i-factory";

export class UsageChannel {
    factory?: IFactory;

    constructor(factory: IFactory) {
        this.factory = factory;
    }

    setHomeFactory(): BaseChannel[] {
        const t: BaseChannel[] = [];
        if (this.factory) {
            this.factory.setIPC(new WindowChannel("window-channel"));
            t.push(this.factory.getIPC());
            this.factory.setIPC(new HomeChannel("home-channel"));
            t.push(this.factory.getIPC());
            this.factory.setIPC(new MediaChannel("media-channel"));
            t.push(this.factory.getIPC());
        }
        return t;
    }

    setControlFactory(): BaseChannel[] {
        const t: BaseChannel[] = [];
        if (this.factory) {
            this.factory.setIPC(new SystemChannel("system-channel"));
            t.push(this.factory.getIPC());
            this.factory.setIPC(new TestChannel("test-channel"));
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
