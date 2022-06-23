/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const Carousel = require('../models/CarouselModel');

//Add carousel on the database
module.exports.addCarousel = async (req, res) => {
    const { title, description, color } = req.body;

	try {
        const file = req.file;
        if (!file) return res.status(400).send('No image in the request');
        
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/carousel/`;

        const existCarousel = await Carousel.findOne(title);
        if (existCarousel) return res.status(400).json({ errorMessage: "Carousel already exist!", });
        
		const newCarousel = await Carousel.create({ 
            title: req.body.title,
            description: req.body.description,
            color: req.body.color,
            image: `${basePath}${fileName}`, // "http://localhost:3000/public/uploads/carousel/image-123456"
        });

        if(!newCarousel) return res.status(500).send('The carousel cannot be created');

		//res.status(200).send('The Category ' + newCategory.name +  ' added successfully');
        res.status(200).json(newCarousel);
	}
	catch (err) {
		res.status(500).json({
			errorMessage: " Failed, please try again!",
		});
	};
};

//Get carousel on the database
module.exports.getCarousel = async (req, res) => {
    try{
        const ListCarousel = await Carousel.find();

        if(!ListCarousel)
            res.status(500).json({success: false})
        res.status(200).send(ListCarousel);
    }catch(err){
        res.status(500).json({message: err})
    }
};

//Modify carousel on the database
module.exports.modifyCarousel = async (req, res) => {
    const idCarousel = req.params.id;

    if(!isValidObjectId(idCarousel))
        return res.status(500).json({success: false , message: 'Invalid ID: ' + idCarousel})
    
    try{
        let imagepath;
        const file = req.file;
        
        if (file) {
            const fileName = file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/carousel/`;
            imagepath = `${basePath}${fileName}`;
        } else {
            const carousel = await Product.findById(idCarousel);
            imagepath = carousel.image;
        }

        const updatedCarousel = await Carousel.findByIdAndUpdate(
            idCarousel,
            {
                title: req.body.title,
                description: req.body.description,
                color: req.body.color,
                image: imagepath, // "http://localhost:8000/public/upload/image-123456"
            },
            { new: true }
        );

        if (!updatedCarousel) return res.status(500).send('The carousel cannot be updated!');
        
        res.status(200).json(updatedCarousel);
        
    }catch(err){
        res.status(500).json({message: err})
    }
};

//Delete carousel on the database
module.exports.deleteCarousel = async (req, res) => {
    if(!isValidObjectId(req.params.id))
        return res.status(500).json({success: false , message: 'Invalid ID: ' + req.params.id})

    Carousel.findByIdAndDelete(req.params.id).then(carousel =>{
        if(carousel) {
            return res.status(200).json({success: true, message: 'The carousel is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "Carousel not found!"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err}) 
    })
};
