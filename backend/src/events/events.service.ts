import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../schemas/event.schema';
import { CreateEventDto, UpdateEventDto } from './events.controller';

interface FilterOptions {
  category?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async findAll(filters: FilterOptions) {
    const query: any = {};
    console.log(filters);
    // Set default values for pagination
    const currentPage = filters.page || 1;
    const itemsPerPage = filters.limit || 10;
    const skip = (currentPage - 1) * itemsPerPage;

    if (filters.category && filters.category !== 'all') {
      query.category  = filters.category;
    }

    if (filters.startDate) {
      query.date = { $gte: new Date(filters.startDate) }; 
    }

    if (filters.endDate) {
      query.date = { ...query.date, $lte: new Date(filters.endDate) };
    }

    if (filters.status && filters.status !== 'all') {
      const now = new Date();
      if (filters.status === 'upcoming') {
        query.date = { $gte: now };
      } else if (filters.status === 'past') {
        query.date = { $lt: now };
      }
    }
    console.log('Final MongoDB query:', query);
    const total = await this.eventModel.countDocuments(query);
    const events = await this.eventModel
      .find(query)
      .sort({ date: 1 })
      .skip(skip)
      .limit(itemsPerPage);

    return {
      events,
      total,
      page: currentPage,
      pages: Math.ceil(total / itemsPerPage),
    };
  }

  async findOne(id: string) {
    return this.eventModel.findById(id);
  }

  async create(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true });
  }

  async delete(id: string) {
    return this.eventModel.findByIdAndDelete(id);
  }

  async findUpcoming(limit = 5) {
    return this.eventModel
      .find({
        date: { $gte: new Date() },
      })
      .sort({ date: 1 })
      .limit(limit);
  }

  async findByCategory(category: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const total = await this.eventModel.countDocuments({ category });
    const events = await this.eventModel
      .find({ category })
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);

    return {
      events,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async search(query: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const searchRegex = new RegExp(query, 'i');
    const searchQuery = {
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
      ],
    };

    const total = await this.eventModel.countDocuments(searchQuery);
    const events = await this.eventModel
      .find(searchQuery)
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);

    return {
      events,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }
}
