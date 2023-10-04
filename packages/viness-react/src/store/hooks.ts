import { useResolve } from '../hooks';
import { ActionDispatcher, IActionDispatcher } from './action-dispatcher';

export const useActionDispatcher = () => useResolve<ActionDispatcher>(IActionDispatcher);
