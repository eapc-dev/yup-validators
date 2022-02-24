import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'
import { IIntlShape } from '../../i18n/placeholder'

export type TNumberValidatorResult<Intl extends IIntlShape = IIntlShape> = TValidatorResult<
  yup.NumberSchema,
  Intl
>

export type TNumberValidator<Intl extends IIntlShape = IIntlShape> = TValidator<
  yup.NumberSchema,
  Intl
>

export interface INumberProps extends IProps {}
