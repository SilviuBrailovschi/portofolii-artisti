import {Body, Controller, Delete, Get, Param, Post, Put, Options, Head, UploadedFile, UseInterceptors, Query, Res, HttpStatus} from '@nestjs/common';
import {PortfolioItemService} from './portfolio-item.service';
import {PortfolioItem} from './portfolio-item.interface';
import {FileInterceptor} from '@nestjs/platform-express';
import sharp from 'sharp';
import { Response } from 'express';

@Controller('portfolio-item')
export class PortfolioItemController {
    constructor(private readonly portfolioItemService: PortfolioItemService) {}

    @Options('*') // Handle all OPTIONS requests
    options(@Res() res: Response) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(HttpStatus.OK).json({ message: 'OPTIONS endpoint reached' });
    }

    @Head(':id') // Handle HEAD requests for a specific item
    async headItem(@Param('id') id: string, @Res() res: Response) {
        const itemExists = await this.portfolioItemService.findById(id);
        if (!itemExists) {
            return res.status(HttpStatus.NOT_FOUND).end();
        }

        res.set('X-Custom-Header', 'Some Value');
        return res.status(HttpStatus.OK).end();
    }

    @Get() // GET /portfolio-item
    async findAll(@Query('status') status?: string): Promise<PortfolioItem[]> {
        return this.portfolioItemService.findByStatus(status);
    }

    @Get(':id') // GET /portfolio-item/:id
    async findById(@Param('id') id: string): Promise<PortfolioItem> {
        return this.portfolioItemService.findById(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image_data'))
    async create(@UploadedFile() file: Express.Multer.File, @Body() body: any): Promise<PortfolioItem> {
        if (file) {
            body.image_data = await sharp(file.buffer)
                .resize({width: 1024})
                .jpeg({quality: 80})
                .toBuffer();
        } else {
            throw new Error('Image file is required.');
        }

        return this.portfolioItemService.create(body);
    }

    @Put(':id') // PUT /portfolio-item/:id
    @UseInterceptors(FileInterceptor('image_data'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any
    ): Promise<PortfolioItem> {
        if (file) {
            body.image_data = await sharp(file.buffer)
                .resize({ width: 1024 })
                .jpeg({ quality: 80 })
                .toBuffer();
        }

        return this.portfolioItemService.update(id, body);
    }

    @Delete(':id') // DELETE /portfolio-item/:id
    async delete(@Param('id') id: string): Promise<void> {
        return this.portfolioItemService.delete(id);
    }
}
