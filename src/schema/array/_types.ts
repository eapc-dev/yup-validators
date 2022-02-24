import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'
import { IIntlShape } from '../../i18n/placeholder'

export type TArrayValidatorResult<
  T extends yup.AnySchema,
  Intl extends IIntlShape = IIntlShape
> = TValidatorResult<yup.ArraySchema<T>, Intl>

export type TArrayValidator<
  T extends yup.AnySchema,
  Intl extends IIntlShape = IIntlShape
> = TValidator<yup.ArraySchema<T>, Intl>

export interface IArrayProps extends IProps {}
