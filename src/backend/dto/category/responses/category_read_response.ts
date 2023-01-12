import { CategoryImageReadResponse } from '../../category_image/responses/category_image_read_response';
import { StoreDivisionImageReadResponse } from '../../store_division_image/responses/store_division_image_read_response';
import { CautionType } from '../../../enums/caution_type';
import { ExpirationDateDescription } from '../../../enums/expiration_date_description';
import { SelectableType } from '../../../enums/selectable_type';
export interface CategoryReadResponse{

  category_id: string;
  category_name: string;
  depth: number;
  parent_category_id: string;
  full_path: string;
  sort_priority: number;
  sort_priority_for_store: number;
  caution: CautionType;
  selectable_type: SelectableType;
  expiration_date_description: ExpirationDateDescription;
  category_images: CategoryImageReadResponse[];
  store_division_images: StoreDivisionImageReadResponse[];
  creation_date: Date;
  last_update: Date;

}
