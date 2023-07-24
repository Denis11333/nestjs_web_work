import { Module } from '@nestjs/common';
import {MessageGateway} from "./gateway";

@Module({
    providers:[MessageGateway],
    exports:[MessageGateway]
})
export class WebSocketsModule {}
