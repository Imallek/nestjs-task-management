import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  /*
    We have to provide IsOptional decorator (although we have mentioned it in the TS).
    Reason is that TS doesn't exit post-compilation and for validation we have to
    explicitly mentioned that field is optional and then apply the remaining validation rules
     */

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
