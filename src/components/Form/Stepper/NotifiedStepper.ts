import { withNotification } from '../hoc/withNotification';
import { Stepper, StepperProps } from './Stepper';

/**
 * The notified stepper is an extension of the `Stepper`
 * component with a status notification message
 * underneath it.
 */
export const NotifiedStepper = withNotification<StepperProps, HTMLInputElement>(Stepper);
