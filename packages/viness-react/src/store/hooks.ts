import { useResolve } from '../hooks';
import { CommandDispatcher, commandDispatcherToken } from './command-dispatcher';

export const useCommandDispatcher = () => useResolve<CommandDispatcher>(commandDispatcherToken);
