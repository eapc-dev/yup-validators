import * as yup from 'yup'

import { IProps, TValidator, TValidatorResult } from '../../_types'

export type TStringValidatorResult = TValidatorResult<yup.StringSchema>

export type TStringValidator = TValidator<yup.StringSchema>

export interface IStringProps extends IProps {}
