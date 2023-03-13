const db = require("../models");
const Materi = db.materi;

exports.create = async (req, res) => {
    try {
        const data 
        = await Materi.create(req.body)
        res.json({
            message: "materi created successfully.",
            data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message ,
            data: null,
        });
    }
}

exports.getAll = async(req, res) => {
    try {
        const materi= await Materi.findAll()
        res.json({
            message: "Materi retrieved successfully.",
            data: materi,
        });
    } catch (error) {
        res.status(500).json({
            message: error.massage,
            data:null,
        });
    }
};

exports.update = async (req, res) => {
    try {
      const id = req.params.id;
      
      const materi = await Materi.findByPk(id, { rejectOnEmpty: true });
      materi.update(req.body, {
        where: { id }
      });
      res.json({
        message: 'Materi updated successfully.',
        data: materi
      });
    } catch(error) {
      res.status(500).json({
        message: error.message || 'Some error occurred while retrieving quiz',
        data: null
      });
    }
  };

exports.delete = async(req, res) => {
    const id = req.params.id
    try {
        const materi= await Materi.findByPk(id, { rejectOnEmpty: true })

        materi.destroy()

        res.json({
            message: "Materi deleted successfully."
        });
    } catch (error) {
        res.status(500),json({
            message: error.massage || "Some error occurred while retrieving quiz",
            data:null,
        });
    }
}

exports.findOne = async(req, res) => {
    const id = req.params.id
    try {
        const materi= await Materi.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: `Materi retrieved successfully with id=${id}.`,
            data: materi,
        });
    } catch (error) {
        res.status(500),json({
            message: error.massage || "Some error occurred while retrieving quiz",
            data:null,
        });
    }
};

exports.getByCategoryId = async (req, res) => {
    const id = req.params.id
    const materi = await Materi.findAll({
        where : {
            categoryId: id
        }
    })
    res.json({
        message: `Materi retrieved successfully with categoryId=${id}.`,
        data: materi,
    });
}