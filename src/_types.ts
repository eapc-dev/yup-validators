import * as yup from 'yup'
import Reference from 'yup/lib/Reference'
import { Maybe } from 'yup/lib/types'

import { IIntlShape } from './i18n/placeholder'

export type TReference<T> = T | Reference<T>

export type TReferenceProps<T extends Maybe<object>> = {
  [key in keyof T]: T[key] extends Maybe<object> ? TReferenceProps<T[key]> : TReference<T[key]>
}

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
