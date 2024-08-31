import { Model } from "sequelize";
import { Column, PrimaryKey, Table } from "sequelize-typescript";


@Table({
  tableName: 'product',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}