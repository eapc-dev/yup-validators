import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'

export type TArrayValidatorResult<T extends yup.AnySchema> = TValidatorResult<yup.ArraySchema<T>>

export type TArrayValidator<T extends yup.AnySchema> = TValidator<yup.ArraySchema<T>>

export interface IArrayProps extends IProps {}
