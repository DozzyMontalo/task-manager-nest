import { IsOptional, IsString } from "class-validator";

export class EditTaskDto {
    
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsString()
    @IsOptional()
    completed?: boolean;
  }