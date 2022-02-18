import * as yup from 'yup'

import { IIntlShape } from '../../i18n/placeholder'

export type TStringValidatorResult = (
  schema: yup.StringSchema,
  intl: IIntlShape
) => yup.StringSchema

export type TStringValidator = () => TStringValidatorResult

export interface IStringProps {
  active?: boolean
  message?: string
}
