import {Body, Controller, Get, Param, Post, Query, Req} from "@nestjs/common";
import type {Request} from "express";
import {Cat, CreateCatDto} from "./create-cat.dto";
import {CatsService} from "./cats.service";

@Controller('cats')
export class CatsController {

    constructor(private catsService: CatsService) {
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(@Query('age') age: number, @Query('breed') breed: string): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns a #${id} cat`;
    }
}
