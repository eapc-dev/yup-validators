import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'

import { IProps, TValidator, TValidatorResult } from '../../_types'
import { IIntlShapeRich } from '../../i18n/placeholder'

export type TObjectValidatorResult<
  T extends ObjectShape = {},
  Intl extends IIntlShapeRich = IIntlShapeRich
> = TValidatorResult<yup.ObjectSchema<T>, Intl>

export type TObjectValidator<
  T extends ObjectShape = {},
  Intl extends IIntlShapeRich = IIntlShapeRich
> = TValidator<yup.ObjectSchema<T>, Intl>

export interface IObjectProps extends IProps {}
