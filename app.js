const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/databse');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const Product= require('./models/product')
const User= require('./models/user');
const { request } = require('https');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
      .then(user => {
        console.log(user);
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
console.log('entering middlewarer');


Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
 User.hasMany(Product);

sequelize.sync()
.then(result=>{
    //    console.log(result);
    console.log("finding user");
return User.findByPk(1)

}).then(user=>{
if(!user){
    console.log("no user");
    User.create({name:'Max',email:'test@test.com'})

}else{
    console.log("user is present");
    return user;
}

}).then(user=>{
    console.log(user);
    app.listen(3000); 
}

)
.catch(err=>{console.log(err);})


