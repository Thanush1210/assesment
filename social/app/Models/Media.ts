import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public tweet: string;

  @column()
  public caption: string;

  @column()
  public comment: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
