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
Product.findByPk(prodId).then(product=>{
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
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
 Product.create({
  title:title,
  price:price,
  imageUrl:imageUrl,
  description:description
 }).then(res=>{console.log("Created Product");res.redirect('/admin/products')}).catch(err=>{console.log(err);})

};

exports.getProducts =async (req, res, next) => {

  let products = await Product.findAll();
   let k=(products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  };
  k(products);
};

exports.postDeleteProduct=(req,res,next)=>{
  const prodId= req.body.productId;
  Product.findByPk(prodId).then(product=>{return product.destroy()}).then(()=>{console.log("DELETE OBJECT") ;res.redirect('/admin/products')}).catch(err=>{console.log(err);});
 

}