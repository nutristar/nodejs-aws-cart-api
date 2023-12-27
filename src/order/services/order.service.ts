import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // your database username
  host: 'database-2.cbfoq7ivu7m6.us-east-1.rds.amazonaws.com', // your database server
  database: 'postgres', // your database name
  password: '123123123', // your database password
  port: 5432, // default port for PostgreSQL
});

@Injectable()
export class OrderService {
  private orders: Record<string, Order> = {}

  findById(orderId: string): Order {
    return this.orders[ orderId ];
  }

  create(data: any) {
    const id = v4()
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };

    this.orders[ id ] = order;
    // Construct your SQL INSERT query with all the necessary fields
    const query = 'INSERT INTO orders (user_id, cart_id, items, total, ...) VALUES ($1, $2, $3, $4, ...)';
    // Execute the query with the order details
    // await pool.query(query, [orderDetails.userId, orderDetails.cartId, orderDetails.items, orderDetails.total, ...]);
    pool.query(query, [order.userId, order.cartId, order.items, order.total ]);

    // Return some confirmation or the created order data
    // return orderDetails;

    return order;
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[ orderId ] = {
      ...data,
      id: orderId,
    }
  }
}
