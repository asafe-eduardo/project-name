import {Inject, Injectable} from "@nestjs/common";
import {Cat} from "./create-cat.dto";
import {REQUEST} from "@nestjs/core";
import {Request} from "express";

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    // constructor(@Inject(REQUEST) private request: Request) {
    // }

    create(cat: Cat) {
        this.cats.push(cat);
    }

    findAll(): Cat[] {
        return this.cats;
    }
}
