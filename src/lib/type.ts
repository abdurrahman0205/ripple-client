export interface EventData {
  _id?: string;
  title: string;
  eventType: string; // string allows custom types
  eventDate: string; // "YYYY-MM-DD"
  location: string;
  thumbnail: string;
  description: string;
  guidelines: string[];
  organizer: string;
}