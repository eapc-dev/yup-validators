import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'

export type TDateValidatorResult = TValidatorResult<yup.DateSchema>

export type TDateValidator = TValidator<yup.DateSchema>

export interface IDateProps extends IProps {}
