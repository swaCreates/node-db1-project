const express= require('express');
const db= require('../data/dbConfig.js');

const router= express.Router();

router.get('/', async (req, res, next) => {
    try{
        // translates to SELECT * FROM "accounts";

        const accounts= await db.select('*').from('accounts');
        // shorthand would be db('accounts');
        res.json(accounts);
    } catch(err){
        next(err);
    };
});

router.get('/:id', validateAccountId(), async (req, res, next) => {
    try{
        // SELECT * FROM "accounts" WHERE "id" = ? LIMIT 1;
        // destructure account because knex would return an arr with the object at 1st index

        // 1. This SQL method originally returns an array, so we want to specify using the
        // `first` keyword to return to us the exact object in the array

        const account= await db.first('*').from('accounts').where('id', req.params.id);
        // shorthand db('accounts').where('id', req.params.id).first();

        res.json(account);
    } catch(err){
        next(err);
    }; 
});

router.post('/', validateAccountInfo(), async (req, res, next) => {
    try{
        const payload= {
            name: req.body.name,
            budget: req.body.budget
        }
        
        // translates to `INSERT INTO "accounts" ("name", "budget") VALUES (?, ?);`

        // 1. This SQL method also returns an array, so we want to specify using the
        // `first` keyword to return to us the exact object in the array

        // 2. This SQL method returns the id of the created post
        // therefore we want to make another axios call to db to retreive 
        // newly created post.

        // shorthand db('accounts').insert(payload);
        // db('accounts').where('id', newAccount).first();
        const [newAccount]= await db.select('*').from('accounts').insert(payload);
        const getNewAccount= await db.first('*').from('accounts').where('id', newAccount);
        res.status(201).json(getNewAccount);
    } catch(err){
        next(err);
    };
});

router.put('/:id', validateAccountInfo(), validateAccountId(), async (req, res, next) => {
    try{
        const payload= {
            name: req.body.name,
            budget: req.body.budget
        }

        // translates to `UPDATE "accounts" SET "name" = ? AND "budget" = ? WHERE "id" = ?;`

        // 1. This SQL method will return the `count` 
        // example: `1` of what object/data was updated

        await db('accounts').where('id', req.params.id).update(payload);
        const updatedAccount= await db('accounts').where('id', req.params.id).first();
        res.json(updatedAccount);        
    } catch(err){
        next(err);
    };
});

router.delete('/:id', validateAccountId(), async (req, res, next) => {
    try{
        // translates to `DELETE FROM "messages" WHERE "id" = ?;`

        await db('accounts').where('id', req.params.id).del();
        res.status(204).end();
    } catch(err){
        next(err);
    };
});

// validates account ID exists
function validateAccountId() {
    return async (req, res, next) =>{
      try{
        const accountById= await db('accounts').where('id', req.params.id).first();
        if(accountById){
          req.account= accountById;
          next();
        } else{
          res.status(404).json({
            request_errorMessage: 'Invalid account id or account does not exist'
          })
        }
      } catch(err){
        console.log(err);
        next(err);
      }
    }
}

// validates object is being sent correctly
function validateAccountInfo() {
    return (req, res, next) => {
      if(!req.body){
        return res.status(400).json({
          error_message: 'Missing account data',
        })
      } else if(!req.body.name){
        return res.status(400).json({
          error_message: 'Missing required name field',
        })
      } else if(!req.body.budget){
        return res.status(400).json({
          error_message: 'Missing required budget field',
        })
      } else{
        next();
      }
    }
}

module.exports= router;