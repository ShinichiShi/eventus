import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { EventsService } from './events.service';

// Create DTO for type safety and validation
export class CreateEventDto {
  title: string;
  date: Date;
  category: string;
  description?: string;
  location?: string;
  capacity?: number;
  organizer?: string;
}

export class UpdateEventDto extends CreateEventDto {
  status?: string;
}

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getEvents(
    @Query('category') category?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('status') status?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    console.log('Received request with filters:', { category, startDate, endDate, status, page, limit });
    return this.eventsService.findAll({
      category,
      startDate,
      endDate,
      status,
      page,
      limit,
    });
  }

  // Get single event by ID
  @Get(':id')
  async getEvent(@Param('id') id: string) {
    const event = await this.eventsService.findOne(id);
    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    return event;
  }
  // Create new event
  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    try {
      console.log('Received event:', createEventDto);
      return await this.eventsService.create(createEventDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create event' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update event
  @Put(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    try {
      const updatedEvent = await this.eventsService.update(id, updateEventDto);
      if (!updatedEvent) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return updatedEvent;
    } catch (error) {
      throw new HttpException(
        'Failed to update event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete event
  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    try {
      const deletedEvent = await this.eventsService.delete(id);
      if (!deletedEvent) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Event successfully deleted',
        event: deletedEvent,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to delete event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get upcoming events
  @Get('filter/upcoming')
  async getUpcomingEvents(@Query('limit') limit: number = 5) {
    return this.eventsService.findUpcoming(limit);
  }

  // Get events by category
  @Get('category/:category')
  async getEventsByCategory(
    @Param('category') category: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.eventsService.findByCategory(category, page, limit);
  }

  // Search events
  @Get('search/query')
  async searchEvents(
    @Query('q') searchQuery: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.eventsService.search(searchQuery, page, limit);
  }
}
