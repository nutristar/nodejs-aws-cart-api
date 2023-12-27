import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartStatuses } from '../models';
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // your database username
  host: 'database-2.cbfoq7ivu7m6.us-east-1.rds.amazonaws.com', // your database server
  database: 'postgres', // your database name
  password: '123123123', // your database password
  port: 5432, // default port for PostgreSQL
});

// module.exports = pool;



@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string): Promise<Cart> {
    return this.userCarts[userId];
  }

  async createByUserId(userId: string):  Promise<Cart> {
    const id = v4();
    const userCart: Cart = {
      id,
      user_id: userId, 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString(), 
      status: CartStatuses.OPEN, 
      items: [],
    };
  
    this.userCarts[userId] = userCart;
    console.log("createByUserId!!!!!!",userCart)
    const query = 'INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(query, [userCart.id, userCart.user_id, userCart.created_at, userCart.updated_at, userCart.status]);
    

  
    return userCart;
  }
  


 
  async findOrCreateByUserId(userId: string): Promise<Cart> {   //22222222222222222222222222
    let userCart = this.findByUserId(userId);
    console.log(" findOrCreateByUserId --- 1",userCart)
    if (!userCart) {
      console.log(" findOrCreateByUserId---2",userCart)
      return this.createByUserId(userId);
    }
    return userCart;
  }


  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const userCart = await this.findOrCreateByUserId(userId);
    const updatedCart = {
      ...userCart,
      items: [...items],
    };
    const query = 'UPDATE carts SET items = $1 WHERE id = $2';
    await pool.query(query, [updatedCart.items, userId]);
    this.userCarts[userId] = updatedCart;
    return updatedCart;
  }

  async removeByUserId(userId: string): Promise<void> {
    const query = 'DELETE FROM carts WHERE user_id = $1';
    await pool.query(query, [userId]);
    delete this.userCarts[userId];
  }
 
  

}


// import { Injectable } from '@nestjs/common';

// import { v4 } from 'uuid';

// import { Cart, CartStatuses } from '../models';
// const { Pool } = require('pg');
// const pool = new Pool({
//   // параметры подключения
// });


// @Injectable()
// export class CartService {
//   private userCarts: Record<string, Cart> = {};

//   async findByUserId(userId: string): Promise<Cart> {
//     return this.userCarts[userId];
//   }

//   async createByUserId(userId: string):  Promise<Cart> {
//     const id = v4();
//     const userCart: Cart = {
//       id,
//       user_id: userId, 
//       created_at: new Date().toISOString(), 
//       updated_at: new Date().toISOString(), 
//       status: CartStatuses.OPEN, 
//       items: [],
//     };
  
//     this.userCarts[userId] = userCart;
//     console.log("createByUserId!!!!!!",userCart)
//     const query = 'INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES ($1, $2, $3, $4, $5)';
//     await pool.query(query, [userCart.id, userCart.user_id, userCart.created_at, userCart.updated_at, userCart.status]);
    

  
//     return userCart;
//   }
  


 
//   async findOrCreateByUserId(userId: string): Promise<Cart> {   //22222222222222222222222222
//     let userCart = this.findByUserId(userId);
//     console.log(" findOrCreateByUserId --- 1",userCart)
//     if (!userCart) {
//       console.log(" findOrCreateByUserId---2",userCart)
//       return this.createByUserId(userId);
//     }
//     return userCart;
//   }


//   async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
//     const userCart = await this.findOrCreateByUserId(userId);
//     const updatedCart = {
//       ...userCart,
//       items: [...items],
//     };
//     const query = 'UPDATE carts SET items = $1 WHERE id = $2';
//     await pool.query(query, [updatedCart.items, userId]);
//     this.userCarts[userId] = updatedCart;
//     return updatedCart;
//   }

//   async removeByUserId(userId: string): Promise<void> {
//     const query = 'DELETE FROM carts WHERE user_id = $1';
//     await pool.query(query, [userId]);
//     delete this.userCarts[userId];
//   }
 
  

// }
