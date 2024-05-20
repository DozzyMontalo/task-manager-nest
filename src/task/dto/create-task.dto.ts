import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsString()
    @IsOptional()
    completed: boolean;
  }