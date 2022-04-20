const tour_model = require("../models/tours");
const _ = require("underscore");
const fs = require("fs");
const upload = require("../utils/multi_image_cloudinary").upload;
const vm = require("v-response");


exports.create = async (req, res, next) => {
    if (!req.files || _.isEmpty(req.files)) {
        return res.status(400)
            .json(vm.ApiResponse(false, 400, "No file uploaded'"))
    }
    const files = req.files;
    try {
        let urls = [];
        let multiple = async (path) => await upload(path);
        for (const file of files) {
            const {path} = file;
            console.log("path", file);

            const newPath = await multiple(path);
            urls.push(newPath);
            fs.unlinkSync(path);
        }
        if (urls) {
            let body = req.body;
            let bodyw = _.extend(body, {multiple_image: urls,name:req.body.name});
            let new_user = new tour_model(bodyw);
            await new_user.save()
            res.redirect("/")
        }
        if (!urls) {
            return res.status(400)
                .json(vm.ApiResponse(false, 400, ""))
        }

    } catch (e) {
        console.log("err :", e);
        return next(e);
    }

};