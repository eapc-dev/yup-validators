import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'
import { IIntlShapeRich } from '../../i18n/placeholder'

export type TArrayValidatorResult<
  T extends yup.AnySchema,
  Intl extends IIntlShapeRich = IIntlShapeRich
> = TValidatorResult<yup.ArraySchema<T>, Intl>

export type TArrayValidator<
  T extends yup.AnySchema,
  Intl extends IIntlShapeRich = IIntlShapeRich
> = TValidator<yup.ArraySchema<T>, Intl>

export interface IArrayProps extends IProps {}
