import {Body, Controller, ForbiddenException, Get, HttpStatus, Param, ParseIntPipe, Post, Query, UseFilters, UseInterceptors, UsePipes} from "@nestjs/common";
import type {Request} from "express";
import {Cat, CreateCatDto} from "./create-cat.dto";
import {CatsService} from "./cats.service";
import { HttpExceptionFilter } from "../http-exception.filter";
import { createCatSchema, ZodValidationPipe } from "../zod-validation.pipe";
import { LoggingInterceptor } from "../logging.interceptor";

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {

    constructor(private catsService: CatsService) {
    }

    @Post()
    @UseFilters(HttpExceptionFilter)
    @UsePipes(new ZodValidationPipe(createCatSchema))
    async create(@Body() createCatDto: CreateCatDto) {
        //this.catsService.create(createCatDto);
        throw new ForbiddenException('You are not allowed to create a cat');
    }

    @Get()
    async findAll(@Query('age') age: number, @Query('breed') breed: string): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id',new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number): string {
        return `This action returns a #${id} cat`;
    }
}
