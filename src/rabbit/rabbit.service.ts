import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amq from 'amqplib';
import { exit } from 'process';

@Injectable()
export class RabbitService implements OnModuleInit, OnModuleDestroy {
  private connection: amq.ChannelModel;
  private channel: amq.Channel;
  private readonly QUEUE_NAME: string = 'xray';

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    try {
      this.connection = await amq.connect(
        this.config.get<string>('RABBITMQ_URL') || '',
      );
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.QUEUE_NAME, { durable: true });
    } catch (err) {
      throw new Error(`Cannot establish RabbitMQ connection: ${err}`);
      exit(1);
    }
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }

  publish(message: string) {
    if (!this.channel) {
      throw new Error('Rabbitmq channel is not initialized');
    }
    this.channel.sendToQueue(this.QUEUE_NAME, Buffer.from(message), {
      persistent: true,
    });
  }

  async consume(
    onMessage: (msg: amq.ConsumeMessage) => void | Promise<void>,
  ): Promise<void> {
    if (!this.channel) {
      throw new Error('Rabbitmq channel is not initialized');
    }
    await this.channel.consume(
      this.QUEUE_NAME,
      (msg) => {
        if (msg) {
          try {
            onMessage(msg);
            this.channel.ack(msg);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (err) {
            this.channel.nack(msg, false, true);
          }
        }
      },
      {
        noAck: false,
      },
    );
    return;
  }
}
