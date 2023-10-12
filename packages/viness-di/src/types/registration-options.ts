import Lifecycle from "./lifecycle";

type RegistrationOptions = {
  /**
   * Customize the lifecycle of the registration
   * See https://github.com/microsoft/tsyringe#available-scopes for more information
   */
  lifecycle: Lifecycle;
};

export default RegistrationOptions;
