let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our book model

let Book = require('../model/books');
// get route for the book list page  - read operation

router.get('/',(req,res,next)=>{
    Book.find((err,bookList)=>{
        if(err){
            return console.error(err);
        }
        else {
            //console.log(BookList);
            res.render('book/list', {title: 'Books', BookList:bookList});
        }
    });
});
/* GET ROUTE FOR DISPLAYING THE ADD PAGE - CREATE operation*/
router.get('/add',(req,res,next)=>{
    res.render('book/add', {title: 'Add book'});
})
/* POST Route for processing the add page - CREATE operation*/
router.post('/add',(req,res,next)=>{
let newBoook=Book({
    "name": req.body.name,
    "author":req.body.author,
    "published":req.body.published,
    "description":req.body.description,
    "price":req.body.price
});
Book.create(newBoook,(err,Book)=>{
    if(err){
        console.log(err);
        res.end(err);
    }
    else{
        res.redirect('/bookList');
    }
})
});
/* GET Route for displaying the edit page - update operation */
router.get('/edit',(req,res,next)=>{
let id=req.params.id;
Book.findById(id,(err,bookToEdit)=>{
    if(err){
        console.log(err);
        res.end(err);
    }
    else{
        res.redirect('/book/edit',{title:'Edit Book',book:bookToEdit});
    }
}) 
});
/* POST Route for processing theh EDIT page */
router.post('/edit',(req,res,next)=>{
let id=req.params.id;
let updatedBook=Book({"id":id,
    "name":req.body.name,
    "author":req.body.author,
    "published":req.body.published,
    "description":req.body.description,
    "price":req.body.price
});
Book.updateOne({_id:id}, updatedBook,(err)=>{
    if(err){
        console.log(err);
        res.end(err);
    }
    else{
        res.redirect('/bookList');
    }
});

});
/* GET tp perform deletion - DELETE operation */
router.get('/delete/:id',(req,res,next)=>{
let id=req.params.id;
Book.remove({_id:id},(err)=>{
    if(err){
        console.log(err);
        res.end(err);
    }
    else{
        res.redirect('/bookList');
    }
});

});
module.exports = router;