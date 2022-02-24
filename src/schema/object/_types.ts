import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'

import { IProps, TValidator, TValidatorResult } from '../../_types'
import { IIntlShape } from '../../i18n/placeholder'

export type TObjectValidatorResult<
  T extends ObjectShape = {},
  Intl extends IIntlShape = IIntlShape
> = TValidatorResult<yup.ObjectSchema<T>, Intl>

export type TObjectValidator<
  T extends ObjectShape = {},
  Intl extends IIntlShape = IIntlShape
> = TValidator<yup.ObjectSchema<T>, Intl>

export interface IObjectProps extends IProps {}
