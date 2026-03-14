export type EntityId = string;

export interface DomainEvent {
  type: string;
  occurredAt: Date;
}
