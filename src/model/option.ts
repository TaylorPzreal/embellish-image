import { Filter } from "./filter";

export class Option {
  public width?: number;
  public height?: number;
  public transform?: [number, number];
  public scale?: number;
  public filters?: Filter[];
}
