import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'

import { IProps, TValidator, TValidatorResult } from '../../_types'

export type TObjectValidatorResult<T extends ObjectShape = {}> = TValidatorResult<
  yup.ObjectSchema<T>
>

export type TObjectValidator<T extends ObjectShape = {}> = TValidator<yup.ObjectSchema<T>>

export interface IObjectProps extends IProps {}
