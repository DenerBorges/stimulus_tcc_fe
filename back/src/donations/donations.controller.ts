import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CheckoutRequestDto } from './dto/checkout.dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post(':checkout')
  async process(@Body() body: CheckoutRequestDto) {
    const { project, reward, user, payment } = body;
    const donationCreated = await this.donationsService.process(
      project,
      reward,
      user,
      payment,
    );
    return donationCreated;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.donationsService.findOne(id);
  }
}
