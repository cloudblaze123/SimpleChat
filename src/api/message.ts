import { Message } from '@/models/Message';
import { messages as messagesMocked } from '@/mocks/messages';


function getMessages(): Message[] {
  return messagesMocked;
}

export { getMessages };