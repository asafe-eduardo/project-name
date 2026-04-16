import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema, z } from "zod";

export const createCatSchema = z.object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
}).required();

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        } catch (error) {
            throw new BadRequestException(error.errors);
        }
    }
}

export type CreateCatDto = z.infer<typeof createCatSchema>;