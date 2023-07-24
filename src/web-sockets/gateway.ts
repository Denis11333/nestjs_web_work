import {Logger} from "@nestjs/common";
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {Unit} from "../units/units.model";
import {ServiceMan} from "../service-man/service-man.model";


@WebSocketGateway({cors: true})
export class MessageGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor() {
    }

    private logger: Logger = new Logger("MessageGateway");

    @WebSocketServer() wss: Server;

    connectedUsers: Map<string, Socket> = new Map<string, Socket>();

    afterInit(server: Server) {
        this.logger.log("Initialized");
    }

    handleDisconnect(client: Socket) {
        const clientId = client.handshake.query.userId;
        this.connectedUsers.delete(clientId as string);
        this.logger.log(`Client Disconnected: ${client.id}, with name ${clientId}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        const clientId = client.handshake.query.userId;
        this.connectedUsers.set(clientId as string, client);
        this.logger.log(`Client Connected: ${client.id}, with name ${clientId}`);
    }

    sendChangedUnitToUsers(clientsNames: string[], unit: Unit) {
        clientsNames.map(name => {
            const client = this.connectedUsers.get(name)

            if (client) {
                client.emit('receiveUnit', unit)
                this.logger.log('unit send to ' + name)
            }
        })
    }

    sendSavedUnitToUsers(clientsNames: string[], unit: Unit, currentUser: string) {
        clientsNames.map(name => {
            const client = this.connectedUsers.get(name)

            if (client && name !== currentUser) {
                client.emit('saveUnit', unit)
                this.logger.log('unit send to ' + name)
            }
        })
    }

    sendDeletedUnitToUsers(clientsNames: string[], unit: Unit) {
        clientsNames.map(name => {
            const client = this.connectedUsers.get(name)

            if (client) {
                client.emit('deleteUnit', unit)
                this.logger.log('unit delete to ' + name)
            }
        })
    }

    sendChangedServiceManToUsers(clientNames: string[], serviceMan: ServiceMan) {
        clientNames.map(name => {
            const client = this.connectedUsers.get(name)

            if (client) {
                client.emit('receiveServiceMan', serviceMan)
                this.logger.log('serviceMan send to ' + name)
            }
        })
    }

    sendDeletedServiceManToUsers(clientNames: string[], serviceMan: ServiceMan, currentUser: string) {
        clientNames.map(name => {
            const client = this.connectedUsers.get(name)

            if (client && name !== currentUser) {
                client.emit('deleteServiceMan', serviceMan)
                this.logger.log('serviceMan deleted to ' + name)
            }
        })
    }

    sendSavedServiceManToUsers(clientNames: string[], serviceMan: ServiceMan, currentUser: string) {
        clientNames.map(name => {
            const client = this.connectedUsers.get(name)

            if (client && name !== currentUser) {
                client.emit('saveServiceMan', serviceMan)
                this.logger.log('serviceMan save to ' + name)
            }
        })
    }

    deleteSharedUnits(currentUsername: string, userNameToDeleteSharedUnits: string) {
        const client = this.connectedUsers.get(userNameToDeleteSharedUnits)
        if (client?.connected) {
            client.emit('sharedUnitsDelete', currentUsername)
            this.logger.log('Shared units was delete to ' + userNameToDeleteSharedUnits)
        }
    }
}
