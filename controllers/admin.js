const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
 
  });
};

exports.getEditProduct = (req, res, next) => {
const editMode=req.query.edit;
if(!editMode){
 return  res.redirect('/');
}

const prodId= req.params.productId;
req.user.getProducts({where:{id:prodId}})
//Product.findByPk(prodId)
.then(products=>{
  const product=products[0];
if(!product){
  console.log("product not found");
 return res.redirect('/')
}
console.log("product found");
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
 editing: editMode,
 product:product
  });

}).catch(err=>{console.log(err);})


};

exports.postEditProduct= (req,res,next)=>{
  console.log('this is user----------');
  console.log(req.user);

  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
console.log("inside post edit product");
Product.findByPk(prodId).then(product=>{
  product.title=updatedTitle;
product.imageUrl= updatedImageUrl;
product.price=updatedPrice;
product.description=updatedDescription;
return product.save()
}).then(result=>{console.log("PRODUCT UPDATED");res.redirect('/admin/products')}).catch(err=>{console.log(err);})

}


exports.postAddProduct = (req, res, next) => {
  console.log('this is user ------------------');
  console.log(req.user);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  //  userId:req.user.id
  }).then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts =async (req, res, next) => {
req.user.getProducts()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err=>{console.log(err);})
  
};

exports.postDeleteProduct=(req,res,next)=>{
  const prodId= req.body.productId;
  Product.findByPk(prodId).then(product=>{return product.destroy()}).then(()=>{console.log("DELETE OBJECT") ;res.redirect('/admin/products')}).catch(err=>{console.log(err);});
 

}