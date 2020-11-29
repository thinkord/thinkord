import { IIpcChannel } from "../ipc/IIpcChannel";

export abstract class BaseWindow {
    public abstract createWindow(channel: IIpcChannel[]): void;
}
