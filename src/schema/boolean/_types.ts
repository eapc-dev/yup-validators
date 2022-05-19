import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'
import { IIntlShape } from '../../i18n/placeholder'

export type TBooleanValidatorResult<Intl extends IIntlShape = IIntlShape> = TValidatorResult<
  yup.BooleanSchema<boolean>,
  Intl
>

export type TBooleanValidator<Intl extends IIntlShape = IIntlShape> = TValidator<
  yup.BooleanSchema<boolean>,
  Intl
>

export interface IBooleanProps extends IProps {}
