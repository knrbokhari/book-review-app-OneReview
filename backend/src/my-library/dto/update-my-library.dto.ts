import { PartialType } from '@nestjs/mapped-types';
import { CreateMyLibraryDto } from './create-my-library.dto';

export class UpdateMyLibraryDto extends PartialType(CreateMyLibraryDto) {}
