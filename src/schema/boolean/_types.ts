import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'

export type TBooleanValidatorResult = TValidatorResult<yup.BooleanSchema>

export type TBooleanValidator = TValidator<yup.BooleanSchema>

export interface IBooleanProps extends IProps {}
