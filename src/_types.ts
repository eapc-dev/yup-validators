import * as yup from 'yup'

import { IIntlShape } from './i18n/placeholder'

export type TValidatorResult<S extends yup.AnySchema> = (schema: S, intl: IIntlShape) => S

export type TValidator<S extends yup.AnySchema> = () => TValidatorResult<S>

export interface IProps {
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
