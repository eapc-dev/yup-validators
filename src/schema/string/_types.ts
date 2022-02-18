import * as yup from 'yup'

import { IIntlShape } from '../../i18n/placeholder'

export type TStringValidatorResult = (
  schema: yup.StringSchema,
  intl: IIntlShape
) => yup.StringSchema

export type TStringValidator = () => TStringValidatorResult

export interface IStringProps {
  /**
   * Wether to enable or not this validator.
   * @default true
   */
  active?: boolean

  /**
   * Defines a custom message ID for this validator.
   * @default undefined
   */
  message?: string
}
