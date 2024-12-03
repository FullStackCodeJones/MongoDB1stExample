import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";

const router = express.Router();

// Full CRUD functionality
//C- CREATE - Post
//R- READ - Get
//U -UPDATE - Put/Patch
//D - DELETE - Delete

//For Read, we usually do an index route AND  a show route
//Index displays or gets many db items
//Show displays one, usually based on the id

//---------------------------------------------------------
//        ALL ROUTES
//-----------------------------------------------------

//Get Implements READ Functionality
// Be careful with the get route because it could be a huge amount of data
//=======Make sure that you are using async and await
//because database access request for asynchronous, but we need that data before we move on

router.get("/", async (req, res) => {
  let collection = await db.collection("grades");

  let results = await collection.find({}).limit(50).toArray();

  if (!results) res.send("not found").status(404);
  else res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  //in the connection remember that we have already accesed the sample training db
  //now we are going to access the grades collection in that database
  let collection = await db.collection("grades");

  //define the query
  //In this query we are going to search for a specific id
  let query = { _id: new ObjectId(req.params.id) };
  console.log(query);
  let result = await collection.findOne(query);

  if (!result) res.send("Not Found").status(404);
  else res.send(result).status(200);
});
export default router;
