import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'
import { IIntlShapeRich } from '../../i18n/placeholder'

export type TBooleanValidatorResult<Intl extends IIntlShapeRich = IIntlShapeRich> =
  TValidatorResult<yup.BooleanSchema<boolean>, Intl>

export type TBooleanValidator<Intl extends IIntlShapeRich = IIntlShapeRich> = TValidator<
  yup.BooleanSchema<boolean>,
  Intl
>

export interface IBooleanProps extends IProps {}
