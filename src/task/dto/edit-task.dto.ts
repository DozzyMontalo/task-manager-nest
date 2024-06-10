import { IsBoolean, IsOptional, IsString } from "class-validator";

export class EditTaskDto {
    
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsBoolean()
    @IsOptional()
    completed?: boolean;
  }