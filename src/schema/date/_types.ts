import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'
import { IIntlShape } from '../../i18n/placeholder'

export type TDateValidatorResult<Intl extends IIntlShape = IIntlShape> = TValidatorResult<
  yup.DateSchema,
  Intl
>

export type TDateValidator<Intl extends IIntlShape = IIntlShape> = TValidator<yup.DateSchema, Intl>

export interface IDateProps extends IProps {}
