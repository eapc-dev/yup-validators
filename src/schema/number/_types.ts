import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'
import { IIntlShapeRich } from '../../i18n/placeholder'

export type TNumberValidatorResult<Intl extends IIntlShapeRich = IIntlShapeRich> = TValidatorResult<
  yup.NumberSchema,
  Intl
>

export type TNumberValidator<Intl extends IIntlShapeRich = IIntlShapeRich> = TValidator<
  yup.NumberSchema,
  Intl
>

export interface INumberProps extends IProps {}
