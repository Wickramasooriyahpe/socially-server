import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { JwtAuthGuard } from './../auth/jwt.guard';
import { PublisherUpdateDto } from './publisherUpdateDto';

@Controller('publisher')
export class PublisherController {
    constructor(private readonly publisherService: PublisherService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    public async getPublisher(@Request() req) {
        const userId = req.user.userId
        const publisher = await this.publisherService.findPublisherById(userId);
        return { phoneNumber: publisher.phoneNumber, name: publisher.userName };
    }

    @Put('update')
    @UseGuards(JwtAuthGuard)
    updateAdvertiser(@Body() publisherUpdateDto: PublisherUpdateDto, @Request() req): Promise<{ userName: string }> {
        const userName = publisherUpdateDto.userName;
        const userId = req.user.userId
        return this.publisherService.updatePublisher(userName, userId);
    }
}
