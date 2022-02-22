import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'

export type TNumberValidatorResult = TValidatorResult<yup.NumberSchema>

export type TNumberValidator = TValidator<yup.NumberSchema>

export interface INumberProps extends IProps {}
