export interface IEvent {
  source: string;
  event: string;
  payload: { id: string };
  thumbnail: string;
}
export interface IEventHistory {
  id: string;
  created_at: string;
  event: string;
  description: string;
  payload: {
    event: string;
    source: string;
    payload: unknown;
  };
  subscription: {
    id: string;
    created_at: string;
    status: string;
    events: string[];
    callback_url: string;
    source: ISource;
  };
}
export interface ISource {
  id: string;
  created_at: string;
  status: string;
  name: string;
  description: string;
  events: string[];
  thumbnail: string;
}

export interface ISubscription {
  id: string;
  created_at: string;
  status: string;
  events: string[];
  callback_url: string;
  source: ISource;
}
