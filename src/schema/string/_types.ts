import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'
import { IIntlShape } from '../../i18n/placeholder'

export type TStringValidatorResult<Intl extends IIntlShape = IIntlShape> = TValidatorResult<
  yup.StringSchema,
  Intl
>

export type TStringValidator<Intl extends IIntlShape = IIntlShape> = TValidator<
  yup.StringSchema,
  Intl
>

export interface IStringProps extends IProps {}
