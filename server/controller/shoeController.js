require('../models/database')
const { collection } = require('../models/Brands');
const Brand = require('../models/Brands')
const Shoes = require('../models/Shoes')


// GET homepage

exports.homepage = async(req,res) => {
    try {
        const limitNumber = 20;
        const brands = await Brand.find({}).limit(limitNumber)
        const latest = await Shoes.find({}).sort({_id: -1}).limit(limitNumber); 

        const sneakers = {latest}

        res.render('index', {title: 'Sneakers- Home', brands, sneakers})
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"})
        
    }
}

// GET Brands

exports.exploreBrands = async(req,res) => {
    try {
        const limitNumber = 20;
        const brands = await Brand.find({}).limit(limitNumber)
        res.render('brands', {title: 'Sneakers - Brands', brands})
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"})
        
    }
}

// GET Brands by Id

exports.exploreBrandsById = async(req, res) => { 
    try {
      let brandId = req.params.id;
      const limitNumber = 20;
      const brandById = await Shoes.find({ 'brand': brandId }).limit(limitNumber);
      res.render('brands', { title: 'Sneakers - Brands', brandById } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 


// Get Collection
exports.exploreCollection = async(req, res) => {
    try {
      let shoesId = req.params.id;
      const collection = await Shoes.findById(shoesId);
      res.render('collection', { title: 'Sneakers - Collection', collection } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 

// Add Sneaker
exports.addShoes = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('add-sneaker', { title: 'Sneakers: Add Sneaker', infoErrorsObj,infoSubmitObj } );
  }

// POST Add Sneaker
exports.addShoesOnPost = async(req, res) => {

  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newShoes = new Shoes({
      name: req.body.name,
      price: req.body.price,
      brand: req.body.brand,
      image: newImageName
    });

    await newShoes.save();

    req.flash('infoSubmit', 'Sneaker has been added.')
    res.redirect('/');

  } catch(error) {
    req.flash('infoErrors', error);
    res.redirect('/add-sneaker');
    }
  }

  // Delete Shoes
exports.deleteShoesById = (req,res) => {
    Shoes.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            res.status(400).json(err)
            return
        }
        res.redirect('/')
    })
}


// Update Shoes
// exports.updateShoes = async(req, res) => {
//   try {
//     const res = await Shoes.updateOne({ name: 'New Sneaker' }, { name: 'New Sneaker Updated' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateShoes();

// About Us
exports.aboutUs = async(req, res) => {
  res.render('about-us', { title: 'Sneakers: About Us'} );
}

// async function insertDummyCategoryData() {
//     try {
//         await Brands.insertMany([
//             {
//                 "name": "Nike",
//                 "image": "nike.png"
//             },
//             {
//                 "name": "Adidas",
//                 "image": "adidas.png"
//             },
//             {
//                 "name": "Air Jordan",
//                 "image": "jordan.png"
//             },
//             {
//                 "name": "Yeezy",
//                 "image": "Yeezy.jpg"
//             },
//             {
//                 "name": "Converse",
//                 "image": "converse.png"
//             },
//         ])
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDummyCategoryData();

// async function insertDummyCategoryData() {
//         try {
//             await Shoes.insertMany([
//                 { 
//                     "name": "Nike Air Force 1 '07",
//                     "brand": "Nike",
//                     "price": 110,
//                     "image": "https://media.gq.com/photos/61019f0a0bf452849a346d65/master/w_1280,c_limit/Nike-Air-Force-1-'07-sneakers.jpg"
//                 },
//                 { 
//                     "name": "Nike Dunk Low 'Navy'",
//                     "brand": "Nike",
//                     "price": 189,
//                     "image": "https://media.gq.com/photos/6284ff8769b411d0f3704dfd/master/w_1280,c_limit/shoe-2.jpg"
//                 },
//                 { 
//                     "name": "Adidas Originals Stan Smith White/Green",
//                     "brand": "Adidas",
//                     "price": 100,
//                     "image": "https://assets.adidas.com/images/w_600,f_auto,q_auto/b4ec75ec6a224503beddac5a01573328_9366/Stan_Smith_Shoes_White_Q47226.jpg"
//                 },
//                 { 
//                     "name": "Adidas NMD R1 PK",
//                     "brand": "Adidas",
//                     "price": 220,
//                     "image": "https://sneakernews.com/wp-content/uploads/2021/03/adidas-nmd-r1-primeknit-core-black-core-black-core-black-GZ0066-4.jpg"
//                 },
//                 { 
//                     "name": "Adidas NMD R1 Primeknit 'Cloud White'",
//                     "brand": "Adidas",
//                     "price": 180,
//                     "image": "https://sneakerbardetroit.com/wp-content/uploads/2021/03/adidas-NMD-R1-Primeknit-Cloud-White-FX6768-Release-Date-1068x750.jpg"
//                 },
//                 { 
//                     "name": "Air Jordan 11 Retro 'Space Jam' 2016",
//                     "brand": "Air Jordan",
//                     "price": 375,
//                     "image": "https://cdn.flightclub.com/750/TEMPLATE/012597/1.jpg"
//                 },
//                 { 
//                     "name": "Jordan 11 Retro",
//                     "brand": "Air Jordan",
//                     "price": 350,
//                     "image": "https://media.gq.com/photos/61ae8b790d615a23f08b5a25/master/w_1280,c_limit/Jordan-11-Retro-sneakers.jpg"
//                 },
//                 { 
//                     "name": "Jordan 1 Retro Royal",
//                     "brand": "Air Jordan",
//                     "price": 450,
//                     "image": "https://media.gq.com/photos/6102d55a250171c13b378bbf/master/w_1280,c_limit/Jordan-1-Retro-Royal-sneakers.jpg"
//                 },
//                 { 
//                     "name": "Jordan x Off-White 5 Retro",
//                     "brand": "Air Jordan",
//                     "price": 575,
//                     "image": "https://media.gq.com/photos/6102d55b9fed4b197c4e0290/master/w_1280,c_limit/Jordan-x-Off-White-5-Retro-sneakers.jpg"
//                 },
//                 { 
//                     "name": "Yeezy 450 'Cloud White'",
//                     "brand": "Yeezy",
//                     "price": 250,
//                     "image": "https://media.gq.com/photos/61ae8b8406c1f085f5bc2848/master/w_1280,c_limit/Yeezy-450-sneakers.jpg"
//                 },
//                 { 
//                     "name": "Yeezy Boost 350 V2 Core Black Red",
//                     "brand": "Yeezy",
//                     "price": 500,
//                     "image": "https://images.stockx.com/images/Adidas-Yeezy-Boost-350-V2-Core-Black-Red-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1606319240"
//                 },
//                 { 
//                     "name": "Yeezy 500 Bone White",
//                     "brand": "Yeezy",
//                     "price": 250,
//                     "image": "https://media.gq.com/photos/6102d90691172db7a13bcb64/master/w_1280,c_limit/Yeezy-500-sneakers.jpg"
//                 },
//                 { 
//                     "name": "Yeezy Foam RNNR Sand",
//                     "brand": "Yeezy",
//                     "price": 310,
//                     "image": "https://media.gq.com/photos/6102d90792f256cef5e4a280/master/w_1280,c_limit/Yeezy-Foam-RNNR-sneakers.jpg"
//                 },
//                 { 
//                     "name": "Converse Chuck Taylor All-Star 70 Ox",
//                     "brand": "Converse",
//                     "price": 150,
//                     "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRlKYwBrKOj_EJNb8PQLdzYTJlY2gSJTvGYQ&usqp=CAU"
//                 },
//                 { 
//                     "name": "Converse Chuck Taylor All-Star 70 Hi",
//                     "brand": "Converse",
//                     "price": 165,
//                     "image": "https://images.stockx.com/images/Converse-Chuck-Taylor-All-Star-70s-Hi-Comme-des-Garcons-PLAY-Blue-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1624461197"
//                 },

//             ])
//         } catch (error) {
//             console.log('err', + error)
//         }
//     }
    
//     insertDummyCategoryData();
